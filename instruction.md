# Urgent aftercare warnings collapse and overlap once a healing day is chosen

Inkline Piercing's aftercare page lets a visitor pick a piercing area and then say how many days it has been since their appointment. Below the picker, the page is meant to show grouped healing guidance, including two distinct urgent callouts: one for signs that mean "contact the studio" and one for signs that mean "see a doctor right away".

## Symptom

Bug: after choosing how many days it has been since the appointment, the urgent guidance is wrong or missing, and the layout of the whole panel falls apart. Reading the page straight through from the introduction down past the healing instructions, a client is left with no way to judge whether what they are experiencing is normal healing, something the studio should look at, or a medical emergency — someone with spreading redness, a fever, or severe pain gets no escalation advice at all, because the callouts that carry that advice are the ones failing.

To reproduce: open the aftercare section, choose a piercing area, then click one of the "days since your appointment" options.

- The "see a doctor right away" callout is often not rendered at all, or renders with no warning signs listed under it.
- The "contact the studio" callout can also come back empty — its heading is there but there are no signs beneath it.
- Which of the two callouts appears (and whether it has any content) changes depending on which day option is selected; some day options produce one callout, others produce none.
- Instead of two separate urgent callouts, the page can show them merged — one of them ends up rendered inside the other rather than as its own section.
- The everyday healing list is presented as though it belonged to the day picker: the "days since your appointment" wording is repeated inside that common-signs block.
- At a normal desktop width (around 1280px), the two urgent callouts sit on top of one another — their boxes visually overlap — and content is pushed past the left edge of the viewport.
- In a narrow window, the day options are laid out in a single line that runs off the side of the screen instead of flowing onto more than one row, so some options are unreachable.

## Expected behavior

After a piercing area and a day option are selected:

- Both urgent callouts are always rendered: one for contacting the studio and one for seeing a doctor right away, so the page always makes clear which symptoms warrant a call and which warrant immediate medical attention.
- Each of those two callouts lists at least one concrete warning sign — never an empty section — and this holds for every single day option that can be chosen, not just some of them.
- The two urgent callouts are siblings on the page: neither is contained inside the other, and each is clearly its own titled section.
- The everyday healing list stands on its own and does not repeat the "days since your appointment" wording; that wording belongs only to the picker itself.
- At 1280px wide, the two urgent callouts each have a real, non-zero size, do not overlap each other, and stay fully within the horizontal bounds of the page.
- In a narrow window, the day options wrap onto two or more rows; every option keeps a visible size and stays inside the page width so all of them can be clicked.

In the broken screenshot below, after picking a day option, the "see a doctor right away" callout is missing and "contact the studio" shows a bare heading, its box overlapping and spilling past the left edge.

![Current behaviour](/app/problem_assets/broken.png)As you can see, in the target screenshot both callouts render as separate titled sections, each listing warning signs like spreading redness, fever.

![Intended behaviour](/app/problem_assets/target.png)