---
title: "Senior Embedded Engineer — Vehicle Gateway Platform Owner"
company: "Motive (formerly KeepTruckin)"
period: "December 2018 - Present"
location: "United States"
order: 1
pdf: true
---

Technical owner of the vehicle gateway firmware platform behind a fleet of several hundred thousand connected commercial vehicles, and embedded lead for connectivity on the next-generation AI dashcam platform. The work I am handed is usually the work that crosses a boundary: the defect that only reproduces at fleet scale, the cost nobody can attribute, the incident another function has already exhausted.

- **Own the platform I built.** Architected the multi-vendor GNSS abstraction and the multi-modem cellular stack the fleet still runs on — one firmware image across two GNSS vendors and three cellular modules, hardware capability used where present and emulated where absent — and continue to extend both years later. The same ownership covers Wi-Fi hotspot and its commercial controls, and OTA self-recovery from update-slot corruption, which turned a truck-roll class of failure into a self-healing one.
- **Closed a six-month SEV2 two other functions had formally exhausted.** Took the position that a failure invisible from the backend had to be evidenced on the device, drove new instrumentation through a controlled production cohort, and root-caused an HTTP protocol-negotiation defect that only manifests at fleet scale. Regional P90 ingestion latency improved roughly 5x and the fleet-wide average by an order of magnitude. Shipped as runtime configuration rather than a hardcode, so the fleet can be steered without a release.
- **Made per-feature cellular cost attributable rather than estimated.** Proved the accounting pipeline I had originally built was pushing a large share of traffic into an unattributed bucket, replaced it with service-level accounting, and reconciled it against carrier-reported totals. The attribution was adopted into recurring monthly cost reporting outside Engineering.
- **Delivered fleet-scale efficiency through other engineers.** Diagnosed and directed a CPU optimization that cut load average ~25% at P90/P95 and ~28% at P99 across 150,000 devices and became the platform default, alongside low-power work cutting parked-vehicle draw 30–50%. I own the analysis and the rollout; the engineers I mentored own most of the code.
- **Built the leverage the team runs on.** Rebuilt CI and the local development environment so every embedded engineer builds through the path CI uses, adding macOS Apple Silicon support and publishing a rollout roadmap I closed out in full. Prototyped remote shell access into live field devices to attack the reason investigations are slow at all, and carry the release train across GA, hotfix, and beta tracks.
