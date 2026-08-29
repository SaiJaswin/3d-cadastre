# 🏛️ 3D-ULPIN Spatial Cadastre & Legal Ledger Platform (3d-cadastre)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/WebGL-Three.js-black.svg)](https://threejs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)
[![ISO 19152 LADM](https://img.shields.io/badge/Standard-ISO_19152_LADM-green.svg)](https://www.iso.org/standard/51206.html)

> **Comprehensive Land Administration System (ISO 19152 LADM)** integrating volumetric 3D property boundaries, deterministic 3D-ULPIN generation, AI cadastral georeferencing, and zero-trust security gateway.

---

## 🌟 4-Group Architecture Integration

| Group | Repository | Core Role in Platform |
|---|---|---|
| **Group 1** | [`CrispCoke/CartoNex`](https://github.com/CrispCoke/CartoNex/tree/group1) | **AI Cadastral Pipeline**: Legacy map vectorisation, OCR boundary extraction, and ETRS-GK25 georeferencing. |
| **Group 2** | [`amith2427/security_gateway`](https://github.com/amith2427/security_gateway) | **Security Gateway**: Zero-trust OAuth 2.0 / JWT RS256 token verification and RBAC matrix. |
| **Group 3** | [`FreshWater96/SIH`](https://github.com/FreshWater96/SIH) | **BhuSOT-4D Cadastre**: Geodetic voxel encoding and deterministic 3D-ULPIN generation (`/v1/identifiers/generate`). |
| **Group 4** | [`mandapatiyashwant-maker/legal_ledger`](https://github.com/mandapatiyashwant-maker/legal_ledger) | **Legal Ledger Backend**: Legal summary queries (`/legal-summary/{ulpin_3d}`), BAUnits, Parties, RRRs, and Mutation workflows. |

---

## 🚀 Key Features

1. **Interactive 3D Cadastre WebGL Engine**:
   - Storey-by-storey level slicing and solid building volumetric views.
   - **100% Grounded Stability**: Every building sits firmly anchored on concrete footing pads (`PV-JA`, `PV-A`, `PV-PM`) on the **N2000 elevation datum (+47.300m)** with zero floating artifacts.
   - Property price valuation heatmaps per storey level (Figure 4 Nordic LCA reference).

2. **Citizen-Friendly Persona Architecture (Person X, Person Y, Person Z)**:
   - **Person X**: Current Registered Title Holder (100% Ownership).
   - **Person Y**: Previous Owner / Seller (2011–2019).
   - **Person Z**: Original 1987 Allotment Holder.
   - Clean vertical visual flow connectors tracking 30-year deed chains.

3. **Multi-Role Persona Switcher**:
   - 👤 **Citizen / Owner (`Person X`)**: Ownership verification, 3D boundaries, and mutation applications.
   - ⚖️ **Advocate / Legal Counsel (`Advocate Verma`)**: Legal due diligence, 30-year deed tracing, and non-encumbrance certificate inspection.
   - 🏛️ **Govt. Employee / Tahsildar (`Tahsildar K. Rao`)**: Authorize name mutations, verify surveys, and sign off digital property IDs.
   - 📐 **Cadastral Surveyor / Engineer (`Surveyor Anand`)**: Digitizing paper maps and validating 3D spatial boundary coordinates.
   - 🏦 **Bank / Loan Officer (`Loan Officer Priya`)**: Stamp and release mortgage liens (Active loan: ₹35,00,000 on Property ID `IN-AP-040B-FL02`).

---

## 💻 Quick Start

### Option A: Open directly in Browser
Simply double-click `index.html` in your file explorer or serve using any static server:
```bash
python -m http.server 8080
```
Then navigate to: **`http://localhost:8080`**

### Option B: Run with FastAPI Legal Ledger
```bash
uvicorn app.main:app --reload --port 8000
```
Navigate to: **`http://localhost:8000`**

---

## 📂 File Structure

```
├── index.html            # Main SPA dashboard, 3D explorer, and role-switcher UI
├── styles.css            # Dark-mode glassmorphism styling and responsive layout
├── app.js                # Three.js 3D WebGL rendering engine and interactive HUD
└── README.md             # Platform documentation and architecture overview
```
