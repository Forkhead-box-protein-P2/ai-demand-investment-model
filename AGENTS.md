# AI Compute Investment Model

The canonical source is `index.html`, imported from the user's downloaded `ai_compute_lab.html` on October 4, 2026. It is a standalone HTML/CSS/JavaScript site with MathJax equation rendering. No dependency install or build is needed.

- Preserve the user's equations, assumptions, evidence references, and visual layout unless the requested change calls for updating them. Distinguish economic changes from presentation changes.
- Validate the browser interactions relevant to a change: frontier pace, horizon, presets, assumption inputs, chart selection, reset, and sensitivity sampling. Verify equation rendering when changing mathematical markup.
- GitHub repository: `Forkhead-box-protein-P2/ai-demand-investment-model`. GitHub Pages publishes `main` from `/`; maintain `index.html` and `.nojekyll` at the root. Use the fox account's normal authentication without storing credentials in the repository.
- Keep generated datasets, sweeps, logs, caches, dependencies, and builds outside iCloud. Documents and Desktop are synced. Resolve symlinks before selecting output paths. Persistent generated work belongs in `~/Library/Application Support/CodexProjectData/AIComputeInvestmentModel/`; disposable work belongs in system temporary storage. Use a 250-MiB working budget with at most two retained generations and stop safely at the limit. `.gitignore` does not prevent iCloud syncing.
- Preserve original downloads and existing user data. Never touch Messages/iMessage data or its iCloud containers.
- Read `~/AgentNotes/claude-codex.md` at the start of a session. Append a dated entry when changing global instructions, background jobs, folder locations, or storage layout.
