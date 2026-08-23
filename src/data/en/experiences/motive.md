---
title: "Senior Embedded Engineer — VG3.x Platform Owner"
company: "Motive (formerly KeepTruckin)"
period: "December 2018 - Present"
location: "United States"
order: 1
pdf: true
---

Technical owner of the VG3.x vehicle gateway firmware platform — the ~300,000-device installed base carrying Motive's ELD, safety, and telematics traffic — and embedded lead for VG5AI connectivity (LTE and GPS). 635 commits since 2019, 20+ engineering design and RCA documents in the last 24 months, and 457 pull requests reviewed against 230 authored: roughly two reviews for every change I write.

The pattern across this work is the same one: don't just close the incident, remove the class of incident, then make the next one diagnosable.

## Platform Architecture

- **Multi-chip GNSS abstraction.** Architected and still own the abstraction that lets VG3.x ship two GNSS vendors (u-blox and Quectel) behind one feature surface — hardware capability used where present, emulated in software where absent, so features above the GPS layer never branch on part number. Quantified the behavioural delta between vendors (24.6% vs 20.8% short-trip fleet penetration) to replace folklore with a measured baseline.
- **Multi-modem cellular stack.** Built hardware auto-detection across three cellular modules so a single firmware image serves all of them. That foundation made the KORE second-carrier integration tractable — 30 tracked issues covering SIM detection, APN/roaming/MTU, and OPLMN negotiation directly with the carrier, removing single-carrier dependency for the fleet.
- **Wi-Fi hotspot, end to end (2020–2026).** Drivers and throughput through to the full commercial control surface: bandwidth throttling, domain blacklisting, upload throttling, and iptables accounting. Designed a throttle-to-zero model with a device-local heartbeat endpoint that preserves the product experience at the data cap instead of degrading it.
- **OTA resilience.** Firmware-update self-recovery from slot corruption, converting a truck-roll/RMA class of failure into a self-healing one fleet-wide.

## Impact

- **Closed SEV2 OF-895**, a six-month latency incident Backend and SRE had formally exhausted. Conceived and drove device-side instrumentation, staged a beta build to 1,000 production devices under EQA control, and root-caused an HTTP/2 auto-negotiation defect that only manifests at 600k-device scale. **Mexico P90 breadcrumb latency 470s → 90s across 11,000 devices; US average 4,070s → 359s.** Shipped the fix as runtime config rather than a hardcode, and authored the RCA.
- **Made cellular COGS modellable.** Proved the data-usage pipeline was pushing 5–25% of all traffic into an unattributed bucket and replaced it with service-level accounting: **unattributed traffic down to under 2%, reconciled against carrier totals to within ~4 MB.** The attribution query was adopted into the recurring AT&T monthly data-usage pipeline feeding pricing decisions.
- **Fleet-wide CPU optimization** — load average down ~25% at P90/P95 and ~28% at P99, live on 150,000 devices and promoted to the GA default. I diagnosed and directed it; engineers I mentored wrote most of the code.
- **Low-power and wakeup work** cutting parked-vehicle power draw 30–50%, with false-positive wakeups down ~20% at p90/p95 (each spurious wake costs ~19% additional battery through a full power-state transition).
- **Fleet convergence across 299,503 devices**, staged 200 → 11k → 40k → GA for deliberate blast-radius control.

## Platform & People

- **Rebuilt how every embedded engineer builds and tests VG3.x** — migrated CI from Prow to Tekton, then merged the local development flow with CI and added macOS Apple Silicon as a supported build platform. Published a four-item roadmap at rollout and delivered all four within ten months, backward compatible so no one's in-flight work broke.
- **Prototyped remote shell access to fleet devices** over AWS IoT secure tunnelling with the IoT team — live debugging of a field device with no firmware release and no truck roll, attacking the reason field investigations are slow at all.
- **Carried the VG3.x release train** — five release candidates in six weeks across GA, hotfix, and beta tracks, plus BSP releases across four repositories.
- **Mentored delivery on flagship work**, growing engineers from defined measurement tasks to owning impact analyses in GA releases. Selected to represent Embedded on the company's Enhanced GPS product initiative.
- **Resolved 20 customer escalations as assignee**, including two avoided RMAs and a same-week configuration fix for an enterprise account under active churn discussion — no firmware release required.
