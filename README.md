# AI Demand, Compute Pricing, and Investment

An interactive two-tier dynamic partial-equilibrium model linking frontier and commodity AI choices to compute demand, supplier cash flow, investment, and future capacity.

Live site: https://forkhead-box-protein-p2.github.io/ai-demand-investment-model/

Repository: https://github.com/Forkhead-box-protein-P2/ai-demand-investment-model

## Run locally

Open `index.html` in a browser, or double-click `Open Model.command` on macOS. No package installation or build is required. The model runs in the browser; equation rendering uses MathJax from jsDelivr and requires an internet connection.

For an HTTP preview, run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder, then visit http://127.0.0.1:8000. Stop the server with Control-C.

## Edit with Codex

Add this folder as a local project in Codex. `AGENTS.md` contains the project instructions. The complete editable site, including styles and model equations, is in `index.html`.

The site began with the downloaded `ai_compute_lab.html` from October 4, 2026. It now models frontier AI, commodity AI, and a no-AI outside option using minimal multinomial logit shares. Each tier has its own price, capability, usage, and compute intensity. The continuous frontier pace controls frontier value growth, commodity catch-up, frontier markup compression, and training demand. Both scenarios share ordinary adoption growth. The compute supply, cash-flow, NPV, investment, and capacity rules remain unchanged.

The report documents all equations, normalization, and assumptions. Presets are illustrative, and sensitivity frequencies describe assumed parameter ranges rather than estimated probabilities. Pacing can increase or decrease investment.

Time zero is the pace change: training demand changes immediately, while installed capacity is inherited from the full-pace reference. Investment and retirement adjust capacity afterward, so annual investment can dip, recover, and overshoot. Investment includes replacement of retiring capacity. An N-year cumulative result includes flows beginning at years 0 through N−1; the chart's year-N flow starts the following year and is excluded. Adoption growth and falling compute per use can offset each other, yielding a nearly flat compute-investment path even as AI usage rises.

## Validate changes

Run `node tests/model.test.cjs` with Node.js. The suite checks tier sorting, the outside option, normalization, equilibrium residuals, compute accounting, capacity dynamics, continuous pace, parameter boundaries, and investment effects of both signs across randomized cases. Browser verification also covers controls, chart selection, presets, sensitivity sampling, equation rendering, and responsive layout.

## Publish updates

GitHub Pages publishes the repository root on the `main` branch. `.nojekyll` keeps the site as plain static HTML. Commit and push reviewed changes to `main`; GitHub then deploys them automatically.

Use the normal GitHub CLI sign-in for `Forkhead-box-protein-P2` when pushing. Do not embed credentials in source files or remote URLs.

## Storage

This Documents folder holds only source and small intentional deliverables. There are no generated dependencies or build outputs. Future persistent generated artifacts belong under `~/Library/Application Support/CodexProjectData/AIComputeInvestmentModel/`; disposable work belongs in system temporary storage. Keep generated work within 250 MiB and retain at most two generations, stopping before the limit. Resolve symlinks before choosing any output path.
