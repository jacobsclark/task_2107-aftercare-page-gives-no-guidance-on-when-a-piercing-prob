FROM us-docker.pkg.dev/afterquery-compute/compute-images/sand-app-base@sha256:dc40aeb1d0c0842f7d13f2b73fa2901c997171d13db704d2d36d0830ada3fe13
WORKDIR /app/1yvAB781u1ok7n7fYn4N
COPY 1yvAB781u1ok7n7fYn4N/package*.json ./
RUN npm install --no-audit --no-fund --legacy-peer-deps
COPY 1yvAB781u1ok7n7fYn4N /app/1yvAB781u1ok7n7fYn4N
COPY problem_assets /app/problem_assets
WORKDIR /app/1yvAB781u1ok7n7fYn4N
CMD ["bash"]
