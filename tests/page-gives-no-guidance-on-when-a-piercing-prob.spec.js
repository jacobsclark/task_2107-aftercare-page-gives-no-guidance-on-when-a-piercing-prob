const { test, expect } = require('@playwright/test');

const BASE = (process.env.APP_URL || 'http://localhost:3000').replace(/\/+$/, '');
const AFTERCARE = BASE + '/aftercare';

/* ------------------------------------------------------------------ *
 * Browser-side helpers (injected into every page.evaluate below).
 * They locate UI purely by visible text / structure, never by source.
 * ------------------------------------------------------------------ */
const HELPERS = `
const norm = (s) => (s || '').replace(/\\s+/g, ' ').trim();
const textOf = (el) => norm(el && el.textContent);
const DAY_RE = /days since your appointment/i;
const STUDIO_RE = /contact the studio/i;
const DOCTOR_RE = /see a doctor/i;
const deepestMatches = (re) => Array.from(document.body.querySelectorAll('*')).filter(function (el) {
  if (!re.test(textOf(el))) { return false; }
  return !Array.from(el.children).some(function (c) { return re.test(textOf(c)); });
});
const itemsIn = (node) => Array.from(node.querySelectorAll('li,[role="listitem"]')).map(textOf).filter(Boolean);
const isVisible = (node) => {
  const r = node.getBoundingClientRect();
  return node.getClientRects().length > 0 && r.width > 0 && r.height > 0;
};
const boxOf = (el) => {
  let node = el;
  for (let i = 0; i < 6 && node && node !== document.body; i += 1) {
    const items = itemsIn(node);
    if (items.length) { return { node: node, items: items }; }
    node = node.parentElement;
  }
  return { node: el, items: [] };
};
const pickBox = (re, avoidRe) => {
  const boxes = deepestMatches(re).map(boxOf);
  const good = boxes.filter(function (b) { return b.items.length > 0 && isVisible(b.node); });
  const pool = good.length ? good : boxes;
  if (avoidRe) {
    const clean = pool.filter(function (b) { return !avoidRe.test(textOf(b.node)); });
    if (clean.length) { return clean[0]; }
  }
  return pool.length ? pool[0] : null;
};
const rectOf = (node) => {
  const r = node.getBoundingClientRect();
  return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
};
const pickControls = (root) => {
  const buttons = Array.from(root.querySelectorAll('button')).filter(function (b) { return !DAY_RE.test(textOf(b)); });
  if (buttons.length >= 2) { return buttons; }
  const radios = Array.from(root.querySelectorAll('input[type=radio],[role=radio]'));
  if (radios.length >= 2) { return radios; }
  return null;
};
const dayControls = () => {
  const labels = deepestMatches(DAY_RE);
  if (!labels.length) { return []; }
  let node = labels[0];
  for (let up = 0; up < 8 && node; up += 1) {
    let sib = node.nextElementSibling;
    while (sib) {
      const found = pickControls(sib);
      if (found) { return found; }
      sib = sib.nextElementSibling;
    }
    const parent = node.parentElement;
    if (parent) {
      const found = pickControls(parent);
      if (found) { return found; }
    }
    node = parent;
  }
  return [];
};
const geomOf = (el) => {
  const target = el.tagName === 'INPUT' ? (el.closest('label') || el) : el;
  const r = target.getBoundingClientRect();
  return {
    text: textOf(target) || norm(target.getAttribute('aria-label')),
    left: r.left, right: r.right, top: r.top, width: r.width, height: r.height
  };
};
`;

async function openAftercare(page) {
  await page.goto(AFTERCARE, { waitUntil: 'domcontentloaded' });
  await expect(page.getByText(/days since your appointment/i).first()).toBeVisible({ timeout: 20000 });
}

async function dayOptionGeoms(page) {
  return page.evaluate(`(() => {${HELPERS}
    const controls = dayControls();
    return {
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      options: controls.map(geomOf)
    };
  })()`);
}

async function tagDayControls(page) {
  return page.evaluate(`(() => {${HELPERS}
    const controls = dayControls();
    controls.forEach(function (el, i) { el.setAttribute('data-pw-day', String(i)); });
    return controls.length;
  })()`);
}

async function clickDay(page, index) {
  const count = await tagDayControls(page);
  expect(count).toBeGreaterThan(index);
  const target = page.locator('[data-pw-day="' + index + '"]');
  try {
    await target.click({ timeout: 3000 });
  } catch (err) {
    await page.evaluate((i) => {
      const el = document.querySelector('[data-pw-day="' + i + '"]');
      if (el) { el.click(); }
    }, index);
  }
  await page.waitForTimeout(250);
}

async function urgentReport(page) {
  return page.evaluate(`(() => {${HELPERS}
    const s = pickBox(STUDIO_RE, DOCTOR_RE);
    const d = pickBox(DOCTOR_RE, STUDIO_RE);
    let commonHasDayLabel = null;
    let nested = null;
    if (s && d) {
      let a = s.node;
      while (a && !a.contains(d.node)) { a = a.parentElement; }
      commonHasDayLabel = a ? DAY_RE.test(textOf(a)) : null;
      nested = (s.node === d.node) || s.node.contains(d.node) || d.node.contains(s.node);
    }
    return {
      studio: s ? { items: s.items, rect: rectOf(s.node), visible: isVisible(s.node), text: textOf(s.node).slice(0, 200) } : null,
      doctor: d ? { items: d.items, rect: rectOf(d.node), visible: isVisible(d.node), text: textOf(d.node).slice(0, 200) } : null,
      nested: nested,
      commonHasDayLabel: commonHasDayLabel,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    };
  })()`);
}

function overlaps(a, b) {
  const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
  const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
  return dx > 1 && dy > 1;
}

function rowCount(options) {
  const tops = [];
  for (const o of options) {
    if (!tops.some((t) => Math.abs(t - o.top) <= 4)) { tops.push(o.top); }
  }
  return tops.length;
}

/* --------------------------- fail to pass --------------------------- */

test('[F2P] doctor-level urgent callout renders with warning signs after picking a day option', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);

  const before = await dayOptionGeoms(page);
  expect(before.options.length).toBeGreaterThanOrEqual(2);

  await clickDay(page, 0);
  const report = await urgentReport(page);

  expect(report.doctor, 'a "see a doctor" callout should be rendered').not.toBeNull();
  expect(report.doctor.visible).toBe(true);
  expect(report.doctor.items.length).toBeGreaterThanOrEqual(1);
});

test('[F2P] urgent guidance is its own area with two unmerged callouts, not part of the day picker', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);
  await clickDay(page, 0);

  const report = await urgentReport(page);

  expect(report.studio, 'a "contact the studio" callout should be rendered').not.toBeNull();
  expect(report.doctor, 'a "see a doctor" callout should be rendered').not.toBeNull();
  expect(report.studio.items.length).toBeGreaterThanOrEqual(1);
  expect(report.doctor.items.length).toBeGreaterThanOrEqual(1);
  // The two callouts are distinct boxes, not one merged block.
  expect(report.nested).toBe(false);
  // The urgent guidance area must not contain the day-selection label.
  expect(report.commonHasDayLabel).toBe(false);
});

test('[F2P] both urgent callouts keep their warning signs for every day option', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);

  const geoms = await dayOptionGeoms(page);
  const total = geoms.options.length;
  expect(total).toBeGreaterThanOrEqual(3);

  for (let i = 0; i < total; i += 1) {
    await clickDay(page, i);
    const report = await urgentReport(page);
    const label = geoms.options[i].text || String(i);

    expect(report.studio, 'studio callout missing for option: ' + label).not.toBeNull();
    expect(report.doctor, 'doctor callout missing for option: ' + label).not.toBeNull();
    expect(report.studio.items.length, 'studio warning signs missing for option: ' + label)
      .toBeGreaterThanOrEqual(1);
    expect(report.doctor.items.length, 'doctor warning signs missing for option: ' + label)
      .toBeGreaterThanOrEqual(1);
  }
});

test('[F2P] at 1280px the two urgent callouts do not overlap and stay inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);
  await clickDay(page, 0);

  const report = await urgentReport(page);
  expect(report.studio).not.toBeNull();
  expect(report.doctor).not.toBeNull();

  expect(overlaps(report.studio.rect, report.doctor.rect)).toBe(false);

  for (const rect of [report.studio.rect, report.doctor.rect]) {
    expect(rect.width).toBeGreaterThan(0);
    expect(rect.height).toBeGreaterThan(0);
    expect(rect.left).toBeGreaterThanOrEqual(-1);
    expect(rect.right).toBeLessThanOrEqual(report.innerWidth + 1);
  }

  expect(report.scrollWidth).toBeLessThanOrEqual(report.innerWidth + 1);
});

test('[F2P] day-since-appointment options wrap onto multiple rows in a narrow window', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await openAftercare(page);

  const geoms = await dayOptionGeoms(page);
  expect(geoms.options.length).toBeGreaterThanOrEqual(3);

  for (const option of geoms.options) {
    expect(option.width).toBeGreaterThan(0);
    expect(option.height).toBeGreaterThan(0);
    expect(option.left).toBeGreaterThanOrEqual(-1);
    expect(option.right).toBeLessThanOrEqual(geoms.innerWidth + 1);
  }

  expect(rowCount(geoms.options)).toBeGreaterThanOrEqual(2);
});

/* --------------------------- pass to pass --------------------------- */

test('[P2P] aftercare check-in tool offers several day-since-appointment options', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);

  const geoms = await dayOptionGeoms(page);
  expect(geoms.options.length).toBeGreaterThanOrEqual(3);
  for (const option of geoms.options) {
    expect(option.text.length).toBeGreaterThan(0);
  }
});

test('[P2P] header navigation reaches the aftercare page from the home page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: 'Aftercare', exact: true }).first().click();
  await expect(page).toHaveURL(/\/aftercare/);
  await expect(page.getByText(/days since your appointment/i).first()).toBeVisible({ timeout: 20000 });
});

test('[P2P] choosing a day option keeps the tool rendered with guidance items', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);
  await clickDay(page, 0);

  const listItems = await page.evaluate(`(() => {${HELPERS}
    return Array.from(document.body.querySelectorAll('li,[role="listitem"]')).map(textOf).filter(Boolean).length;
  })()`);

  expect(listItems).toBeGreaterThanOrEqual(1);
  await expect(page.getByText(/days since your appointment/i).first()).toBeVisible();
});

test('[P2P] aftercare page shows the medical disclaimer in the footer', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await openAftercare(page);

  await expect(page.getByText(/does not replace medical advice/i).first()).toBeVisible();
});
