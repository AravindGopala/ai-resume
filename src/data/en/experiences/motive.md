---
title: "Senior Embedded Engineer — Vehicle Gateway Platform Owner"
company: "Motive (formerly KeepTruckin)"
period: "December 2018 - Present"
location: "United States"
order: 1
pdf: true
---

Technical owner of the vehicle gateway firmware platform behind a fleet of several hundred thousand connected commercial vehicles, and embedded lead for connectivity on the next-generation AI dashcam platform. Over 600 commits since 2019, 20+ engineering design and RCA documents in the last two years, and roughly two pull requests reviewed for every one I author.

The pattern across this work is the same one: don't just close the incident, remove the class of incident, then make the next one diagnosable.

## Platform Architecture

- **Multi-vendor GNSS abstraction.** Architected and still own the abstraction that lets the platform ship two different GNSS vendors behind one feature surface — hardware capability used where present, emulated in software where absent, so features above the GPS layer never branch on part number. Quantified the behavioural delta between vendors to replace folklore with a measured baseline.
- **Multi-modem cellular stack.** Built hardware auto-detection across three cellular modules so a single firmware image serves all of them. That foundation later made a second-carrier integration tractable end to end — SIM detection, APN/roaming/MTU handling, and network negotiation with the carrier directly — removing single-carrier dependency for the fleet.
- **Wi-Fi hotspot, end to end (2020–2026).** Drivers and throughput through to the full commercial control surface: bandwidth throttling, domain blacklisting, upload throttling, and traffic accounting. Designed a throttle-to-zero model with a device-local heartbeat endpoint that preserves the product experience at the data cap instead of degrading it.
- **OTA resilience.** Firmware-update self-recovery from update-slot corruption, converting a truck-roll/RMA class of failure into a self-healing one fleet-wide.

## Impact

- **Closed a six-month SEV2 latency incident** that two other engineering functions had formally exhausted. Conceived and drove device-side instrumentation, staged a beta build to a controlled production cohort, and root-caused an HTTP protocol-negotiation defect that only manifests at several-hundred-thousand-device scale. **Regional P90 ingestion latency improved roughly 5x and fleet-wide average by an order of magnitude.** Shipped the fix as runtime configuration rather than a hardcode, and authored the RCA.
- **Made per-feature cellular cost attributable.** Proved the data-usage pipeline was pushing a large share of traffic into an unattributed bucket and replaced it with service-level accounting, reconciled against carrier-reported totals. The resulting attribution moved cellular cost from estimated to modellable and was adopted into a recurring monthly reporting pipeline.
- **Fleet-wide CPU optimization** — load average down ~25% at P90/P95 and ~28% at P99, rolled out to 150,000 devices and promoted to the platform default. I diagnosed and directed it; engineers I mentored wrote most of the code.
- **Low-power and wakeup work** cutting parked-vehicle power draw 30–50%, with false-positive wakeups down ~20% at p90/p95 — each spurious wake costs roughly 19% additional battery through a full power-state transition.
- **Fleet-wide firmware convergence across the entire installed base**, staged in widening cohorts for deliberate blast-radius control.

## Platform & People

- **Rebuilt how every embedded engineer builds and tests the platform** — migrated CI to Tekton, then merged the local development flow with CI and added macOS Apple Silicon as a supported build platform. Published a four-item roadmap at rollout and delivered all four within ten months, backward compatible so no one's in-flight work broke.
- **Prototyped remote shell access to fleet devices** over secure IoT tunnelling — live debugging of a field device with no firmware release and no truck roll, attacking the reason field investigations are slow at all.
- **Carried the release train** — five release candidates in six weeks across GA, hotfix, and beta tracks, plus BSP releases across four repositories.
- **Mentored delivery on flagship work**, growing engineers from defined measurement tasks to owning impact analyses in GA releases. Selected to represent Embedded on a company-wide GPS product initiative.
- **Resolved 20 customer escalations as assignee**, including two avoided hardware returns and a same-week configuration fix for an enterprise account at risk — no firmware release required.
