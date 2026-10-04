# AI Demand, Compute Pricing, and Investment

An interactive dynamic partial-equilibrium model linking final AI usage, service pricing, compute demand, supplier cash flow, investment, and future capacity.

Live site: https://forkhead-box-protein-p2.github.io/ai-demand-investment-model/

Repository: https://github.com/Forkhead-box-protein-P2/ai-demand-investment-model

## Run locally

Open `index.html` in a browser, or double-click `Open Model.command` on macOS. No package installation or build is required. The model runs in the browser; equation rendering uses MathJax from jsDelivr and requires an internet connection.

For an HTTP preview, run `python3 -m http.server 8000 --bind 127.0.0.1` from this folder, then visit http://127.0.0.1:8000. Stop the server with Control-C.

## Edit with Codex

Add this folder as a local project in Codex. `AGENTS.md` contains the project instructions. The complete editable site, including styles and model equations, is in `index.html`.

The initial `index.html` is an exact copy of the downloaded `ai_compute_lab.html` from October 4, 2026. Publishing setup does not change the model, assumptions, citations, or layout.

## Publish updates

GitHub Pages publishes the repository root on the `main` branch. `.nojekyll` keeps the site as plain static HTML. Commit and push reviewed changes to `main`; GitHub then deploys them automatically.

Use the normal GitHub CLI sign-in for `Forkhead-box-protein-P2` when pushing. Do not embed credentials in source files or remote URLs.

## Storage

This Documents folder holds only source and small intentional deliverables. There are no generated dependencies or build outputs. Future persistent generated artifacts belong under `~/Library/Application Support/CodexProjectData/AIComputeInvestmentModel/`; disposable work belongs in system temporary storage. Keep generated work within 250 MiB and retain at most two generations, stopping before the limit. Resolve symlinks before choosing any output path.
