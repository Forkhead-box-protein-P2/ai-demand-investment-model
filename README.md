# AI Demand, Compute Pricing, and Investment

An interactive dynamic partial-equilibrium model linking AI usage and service pricing to compute demand, supplier cash flow, investment, and future capacity.

Live site: https://forkhead-box-protein-p2.github.io/ai-demand-investment-model/

Experimental two-price page: https://forkhead-box-protein-p2.github.io/ai-demand-investment-model/two-tier.html

Repository: https://github.com/Forkhead-box-protein-P2/ai-demand-investment-model

## Run locally

Open `index.html` in a browser, or double-click `Open Model.command` on macOS. No package installation or build is required. The model runs in the browser; equation rendering uses MathJax from jsDelivr and requires an internet connection.

For an HTTP preview, run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder, then visit http://127.0.0.1:8000. Stop the server with Control-C.

## Edit with Codex

Add this folder as a local project in Codex. `AGENTS.md` contains the project instructions. Both pages are standalone HTML files containing their styles, model equations, and controls. The navigation links let visitors switch between them.

`index.html` is the original model from the downloaded `ai_compute_lab.html`, with its constant-elasticity demand equation, adoption and frontier demand-growth meanings, original presets, and evidence table preserved. It is the default main page. Navigation, accessible control labels, chart tick formatting, and cumulative horizon accounting have been improved.

`two-tier.html` holds the experimental frontier/commodity formulation. Users choose frontier AI, commodity AI, or a no-AI outside option through multinomial logit shares. Each tier has its own price, capability, usage, and compute intensity. A capability-and-price index controls usage per participating opportunity through one additional elasticity, η. Its baseline 0.50 and sensitivity range 0–1 are assumptions; η=0 recovers the prior quantity formulation. Both scenarios use the same initial index normalization. The continuous frontier pace controls frontier value growth, commodity catch-up, frontier markup compression, and training demand. Both scenarios share ordinary adoption growth. The compute supply, cash-flow, NPV, investment, and capacity rules remain unchanged.

The two-tier research baseline was reviewed October 5, 2026. It matches a historical Sonnet/Haiku 3:1 price gap and an own-service elasticity proxy near −1.11 using β=1.27 and η=0.50, conditional on preference, cost, and usage-intensity assumptions. This is a proxy calibration, not a fitted market-wide forecast or a preservation of the original aggregate demand elasticity. The report includes the derivation, live calibration checks, an input-by-input evidence table, and eleven primary references. It distinguishes physical compute, list prices, capability benchmarks, firm adoption, and task participation. Commodity is not synonymous with open source. Capability catch-up and markup decay have independent time scales; the unmeasured extra catch-up from pacing and the outside-option weight are exposed to sensitivity analysis.

Each report documents its equations, normalization, and assumptions. The experimental page includes an evidence-informed baseline, a diffusion-favoring scenario, and a frontier-dependence scenario. The comparison cases vary price sensitivity, frontier value growth, training share, and catch-up/markup timing; all other inputs retain the baseline. Their parameter differences are assumptions, not separate empirical estimates. Lab contracts and financing are not modeled. Sensitivity frequencies describe assumed parameter ranges rather than estimated probabilities. Pacing can increase or decrease investment.

Time zero is the pace change: training demand changes immediately, while installed capacity is inherited from the full-pace reference. Investment and retirement adjust capacity afterward, so annual investment can dip, recover, and overshoot. Investment includes replacement of retiring capacity. An N-year cumulative result includes flows beginning at years 0 through N−1; the chart's year-N flow starts the following year and is excluded. Adoption growth and falling compute per use can offset each other, yielding a nearly flat compute-investment path even as AI usage rises.

## Validate changes

Run `node tests/model.test.cjs` with Node.js to check the experimental two-tier page. The suite checks tier sorting, the outside option, normalization, equilibrium residuals, compute accounting, capacity dynamics, continuous pace, parameter boundaries, and investment effects of both signs across randomized cases. Verify the original model against its preserved equations and presets. Browser verification covers navigation between both pages, controls, chart selection, presets, sensitivity sampling, equation rendering, and responsive layout.

## Publish updates

GitHub Pages publishes the repository root on the `main` branch. `.nojekyll` keeps the site as plain static HTML. Commit and push reviewed changes to `main`; GitHub then deploys them automatically.

Use the normal GitHub CLI sign-in for `Forkhead-box-protein-P2` when pushing. Do not embed credentials in source files or remote URLs.

## Storage

This Documents folder holds only source and small intentional deliverables. There are no generated dependencies or build outputs. Future persistent generated artifacts belong under `~/Library/Application Support/CodexProjectData/AIComputeInvestmentModel/`; disposable work belongs in system temporary storage. Keep generated work within 250 MiB and retain at most two generations, stopping before the limit. Resolve symlinks before choosing any output path.
