/* ─────────────────────────────────────────────────────────────
   Digital Land & Property Portal — app.js
   Full 3D Architectural Cadastre Engine:
   - Diverse Architectural Typologies:
       * L-Shaped Courtyard Villas
       * High-Tech Cylindrical Glass Towers
       * Stepped Terrace Penthouse Cascades
       * Twin Towers with Illuminated Skybridge at Fl-7
       * Gable-Roofed Heritage Duplex Blocks
       * Commercial Pilotis Pods
   - Floor Subdivisions into Individual Flats (Flat 101, 102, 201...)
   - Dedicated 3D-ULPIN per Subdivided Flat Unit
   - Full Profile Photos & Verified Digital Credentials per Persona
   - Person A through Person Z Comprehensive Directory
───────────────────────────────────────────────────────────── */

// ── ROLE CREDENTIALS & PROFILE PHOTOS ─────────────────────────
const USER_ROLES = {
  citizen: {
    key: 'citizen',
    name: 'Person X',
    roleTitle: 'Registered Citizen / Property Owner',
    idNumber: 'CIT-98472-PX',
    email: 'person.x@citizen.ap.gov.in',
    clearance: 'Level 1 (Citizen Freehold)',
    assignedProperty: 'Flat 201 (IN-AP-040B-FL02-U201)',
    passkey: '0x7f8a92b3c4d5e6f1a8b9c0d1e2f3a4b5',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    avatar: 'PX',
    icon: '👤',
    actionBtnText: 'Apply For Transfer',
    bannerTitle: 'Welcome, Person X (Citizen Mode)',
    bannerDesc: 'You can check your flat ownership, view 3D boundaries, inspect your specific bank loan, and apply for name transfers.'
  },
  advocate: {
    key: 'advocate',
    name: 'Advocate Verma',
    roleTitle: 'Senior Legal Counsel / Advocate',
    idNumber: 'BAR-AP-2004/891',
    email: 'verma.legal@barassociation.ap.org',
    clearance: 'Level 3 (Legal Due Diligence Audit)',
    assignedProperty: 'Jurisdiction: High Court of AP & NTR District',
    passkey: '0x4a9b8c7d6e5f0123456789abcdef0123',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    avatar: 'AV',
    icon: '⚖️',
    actionBtnText: 'Run Title Search Audit',
    bannerTitle: 'Advocate Legal Workspace',
    bannerDesc: 'Verify 30-year chain of title deeds (Person Z ➔ Person Y ➔ Person X), inspect non-encumbrance certificates, and audit mortgage liens.'
  },
  employee: {
    key: 'employee',
    name: 'Tahsildar K. Rao',
    roleTitle: 'Revenue Officer / Govt. Tahsildar',
    idNumber: 'GOV-REV-4089-AP',
    email: 'k.rao.tahsildar@revenue.ap.gov.in',
    clearance: 'Level 5 (State Mutation Sign-Off Authority)',
    assignedProperty: 'Cadastral Zone: Vijayawada Urban & Kondapalli',
    passkey: '0x9c3d2e1f0a8b7c6d5e4f3a2b1c0d9e8f',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    avatar: 'TR',
    icon: '🏛️',
    actionBtnText: 'Approve Pending Mutations',
    bannerTitle: 'Government Revenue Officer Console',
    bannerDesc: 'Authorize and approve property name mutations, verify cadastral boundary surveys, and mint official 3D-ULPIN flat certificates.'
  },
  surveyor: {
    key: 'surveyor',
    name: 'Surveyor Anand',
    roleTitle: 'Cadastral Surveyor & GIS Specialist',
    idNumber: 'GIS-SURV-2018-09',
    email: 'anand.survey@apsac.ap.gov.in',
    clearance: 'Level 4 (Spatial Vector Georeferencing)',
    assignedProperty: 'Survey Grid: Zone 40B, Vijayawada Datum',
    passkey: '0x2e1f4a3b6c5d8e7f0a9b8c7d6e5f4a3b',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    avatar: 'SA',
    icon: '📐',
    actionBtnText: 'Digitize Blueprint',
    bannerTitle: 'Cadastral Surveyor & Spatial Studio',
    bannerDesc: 'Georeference old revenue maps, extract parcel boundary polygons, and inspect 3D volumetric coordinates.'
  },
  bank: {
    key: 'bank',
    name: 'Loan Officer Priya',
    roleTitle: 'State Bank Chief Mortgage Officer',
    idNumber: 'SBI-MORT-5521-VJA',
    email: 'priya.n@sbi.co.in',
    clearance: 'Level 3 (Banking Lien & Mortgage Registrar)',
    assignedProperty: 'Financial Registry: State Bank of India VJA',
    passkey: '0x5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    avatar: 'LP',
    icon: '🏦',
    actionBtnText: 'Stamp New Mortgage Lien',
    bannerTitle: 'Bank Mortgage & Valuation Desk',
    bannerDesc: 'Stamp home loan encumbrances (Active: ₹28,50,000 on Property ID IN-AP-040B-FL02-U201), verify property valuations, and release loan clearances.'
  }
};

let currentRoleKey = 'citizen';

function changeUserRole(roleKey) {
  currentRoleKey = roleKey;
  const role = USER_ROLES[roleKey] || USER_ROLES.citizen;

  const topSelect = document.getElementById('topbarRoleSelect');
  const sideSelect = document.getElementById('sidebarRoleSelect');
  if (topSelect) topSelect.value = roleKey;
  if (sideSelect) sideSelect.value = roleKey;

  // Update Photos
  const topImg = document.getElementById('topbarImgElem');
  const sideImg = document.getElementById('footerImgElem');
  const bannerImg = document.getElementById('bannerImgElem');
  const hudAvatar = document.getElementById('hudAvatarImg');

  if (topImg) topImg.src = role.photo;
  if (sideImg) sideImg.src = role.photo;
  if (bannerImg) bannerImg.src = role.photo;
  if (hudAvatar) hudAvatar.src = role.photo;

  // Update Banner & Text
  const rbTitle = document.getElementById('rbTitle');
  const rbDesc = document.getElementById('rbDesc');
  const rbCredPill = document.getElementById('rbCredPill');
  const rbActionBtn = document.getElementById('btnRolePrimaryAction');
  const hudRole = document.getElementById('hudRoleName');

  if (rbTitle) rbTitle.textContent = role.bannerTitle;
  if (rbDesc) rbDesc.textContent = role.bannerDesc;
  if (rbCredPill) rbCredPill.textContent = `ID: ${role.idNumber}`;
  if (rbActionBtn) rbActionBtn.textContent = role.actionBtnText;
  if (hudRole) hudRole.textContent = `${role.name}`;

  const fName = document.getElementById('footerUserName');
  const fRole = document.getElementById('footerUserRole');
  if (fName) fName.textContent = role.name;
  if (fRole) fRole.textContent = role.roleTitle.split('/')[0];

  updateModalCredentials(role);
}
window.changeUserRole = changeUserRole;

function updateModalCredentials(role) {
  const mPhoto = document.getElementById('modalIdPhoto');
  const mName = document.getElementById('modalIdName');
  const mRole = document.getElementById('modalIdRole');
  const mIdNum = document.getElementById('modalIdNumber');
  const mEmail = document.getElementById('modalIdEmail');
  const mClearance = document.getElementById('modalIdClearance');
  const mProp = document.getElementById('modalIdProperty');
  const mPass = document.getElementById('modalIdPasskey');

  if (mPhoto) mPhoto.src = role.photo;
  if (mName) mName.textContent = role.name;
  if (mRole) mRole.textContent = role.roleTitle;
  if (mIdNum) mIdNum.textContent = role.idNumber;
  if (mEmail) mEmail.textContent = role.email;
  if (mClearance) mClearance.textContent = role.clearance;
  if (mProp) mProp.textContent = role.assignedProperty;
  if (mPass) mPass.textContent = role.passkey;
}

function openCredentialsModal() {
  updateModalCredentials(USER_ROLES[currentRoleKey]);
  const overlay = document.getElementById('credentialsModalOverlay');
  if (overlay) overlay.classList.add('active');
}
window.openCredentialsModal = openCredentialsModal;

function closeCredentialsModal() {
  const overlay = document.getElementById('credentialsModalOverlay');
  if (overlay) overlay.classList.remove('active');
}
window.closeCredentialsModal = closeCredentialsModal;

function selectRoleAndClose(roleKey) {
  changeUserRole(roleKey);
  closeCredentialsModal();
}
window.selectRoleAndClose = selectRoleAndClose;

function executeRoleAction() {
  const role = USER_ROLES[currentRoleKey];
  if (currentRoleKey === 'citizen') {
    switchPage('mutations');
    alert('Citizen Action: Submit flat transfer deed application for Tahsildar approval.');
  } else if (currentRoleKey === 'advocate') {
    switchPage('ledger');
    alert('Advocate Action: 30-Year Title Search completed for Flat ULPIN. All deed hashes verified against blockchain.');
  } else if (currentRoleKey === 'employee') {
    switchPage('mutations');
    alert('Govt. Officer Action: Reviewing pending mutation application TRF-3102. Ready to sign digital approval certificate.');
  } else if (currentRoleKey === 'surveyor') {
    switchPage('cartography');
  } else if (currentRoleKey === 'bank') {
    switchPage('ledger');
    alert('Bank Officer Action: Mortgage verification active. State Bank Lien stamped on selected Flat ULPIN.');
  }
}
window.executeRoleAction = executeRoleAction;

function approveMutationPrompt(appId) {
  if (currentRoleKey !== 'employee') {
    showRoleRestrictionModal('🏛️', 'Government Officer Permission Required', `Only a Government Employee (Tahsildar) has the legal authority to approve or reject property mutation applications like ${appId}.`, 'employee');
  } else {
    alert(`✓ Tahsildar Authority: Application ${appId} has been successfully approved and digitally certified!`);
  }
}
window.approveMutationPrompt = approveMutationPrompt;

function showRoleRestrictionModal(icon, title, message, targetRoleKey) {
  const overlay = document.getElementById('roleModalOverlay');
  const rmIcon = document.getElementById('rmIcon');
  const rmTitle = document.getElementById('rmTitle');
  const rmMessage = document.getElementById('rmMessage');
  const rmSwitchBtn = document.getElementById('rmSwitchBtn');

  if (rmIcon) rmIcon.textContent = icon;
  if (rmTitle) rmTitle.textContent = title;
  if (rmMessage) rmMessage.textContent = message;
  if (rmSwitchBtn) {
    rmSwitchBtn.textContent = `Switch to ${USER_ROLES[targetRoleKey].roleTitle}`;
    rmSwitchBtn.onclick = () => {
      changeUserRole(targetRoleKey);
      closeRoleModal();
    };
  }
  if (overlay) overlay.classList.add('active');
}

function closeRoleModal() {
  const overlay = document.getElementById('roleModalOverlay');
  if (overlay) overlay.classList.remove('active');
}
window.closeRoleModal = closeRoleModal;

// ── NAVIGATION ───────────────────────────────
const pageTitles = {
  dashboard:   'Home Dashboard',
  map3d:       '3D Property Map',
  generator:   'Create Flat 3D-ULPIN',
  ledger:      'Check Ownership & Loans',
  ownership:   'Flats Directory (A to Z)',
  mutations:   'Ownership Transfers',
  cartography: 'Old Map Digitizer',
  gateway:     'Security & Credentials',
  audit:       'Activity History'
};

function switchPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const targetPage = document.getElementById('page-' + pageId);
  const targetNav = document.querySelector(`[data-page="${pageId}"]`);

  if (targetPage) targetPage.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  const bcrumb = document.getElementById('breadcrumb');
  if (bcrumb) bcrumb.textContent = pageTitles[pageId] || pageId;

  if (pageId === 'dashboard' && dashEngine) dashEngine.onResize();
  if (pageId === 'map3d' && fullEngine) fullEngine.onResize();
}
window.switchPage = switchPage;

document.querySelectorAll('.nav-item[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    switchPage(link.dataset.page);
  });
});

const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
    setTimeout(() => {
      if (dashEngine) dashEngine.onResize();
      if (fullEngine) fullEngine.onResize();
    }, 320);
  });
}

function switchTab(btn, tabId) {
  const card = btn.closest('.card');
  card.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  card.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.classList.add('active');
}
window.switchTab = switchTab;

// ── DIVERSE ARCHITECTURAL BUILDINGS & SUBDIVIDED FLATS ────────
const ARCHITECTURAL_BUILDINGS = [
  // 1. L-Shaped Courtyard Villa (NZ-01)
  {
    id: 'NZ-01', x: -44, z: 24, w: 14, d: 14, floors: 3, archType: 'l-shaped', category: 'residential',
    name: 'L-Shaped Courtyard Villa 1',
    flatsPerFloor: [
      {
        floor: 1,
        flats: [
          { unitId: 'U101', name: 'Flat 101 (East Wing)', bhk: '3 BHK', carpet: '150 m²', ulpin: 'IN-AP-040B-FL01-U101', owner: 'Person Y', prev: 'Person Z', loan: 'No Loan (Clear Title)', color: '#10b981' },
          { unitId: 'U102', name: 'Flat 102 (West Wing)', bhk: '2 BHK', carpet: '115 m²', ulpin: 'IN-AP-040B-FL01-U102', owner: 'Person A', prev: 'Person Y', loan: 'HDFC Home Loan: ₹18,00,000', color: '#10b981' }
        ]
      },
      {
        floor: 2,
        flats: [
          { unitId: 'U201', name: 'Flat 201 (East Wing)', bhk: '3 BHK Duplex', carpet: '165 m²', ulpin: 'IN-AP-040B-FL02-U201', owner: 'Person E', prev: 'Person Y', loan: 'SBI Home Loan: ₹22,00,000', color: '#10b981' },
          { unitId: 'U202', name: 'Flat 202 (West Wing)', bhk: '2 BHK', carpet: '120 m²', ulpin: 'IN-AP-040B-FL02-U202', owner: 'Person F', prev: 'Person Y', loan: 'Canara Bank: ₹19,50,000', color: '#10b981' }
        ]
      },
      {
        floor: 3,
        flats: [
          { unitId: 'U301', name: 'Flat 301 (Penthouse Deck)', bhk: '4 BHK Luxury', carpet: '260 m²', ulpin: 'IN-AP-040B-FL03-U301', owner: 'Person G', prev: 'Person Z', loan: 'No Loan (Clear Title)', color: '#10b981' }
        ]
      }
    ]
  },

  // 2. Gable-Roofed Heritage Duplex (NZ-04 - Person X's Residence)
  {
    id: 'NZ-04', x: -18, z: 24, w: 12, d: 10, floors: 4, archType: 'heritage', category: 'residential',
    name: 'Gable Heritage Duplex (Person X)',
    flatsPerFloor: [
      {
        floor: 1,
        flats: [
          { unitId: 'U101', name: 'Flat 101 (Ground Flat)', bhk: '2 BHK', carpet: '110 m²', ulpin: 'IN-AP-040B-FL01-U101', owner: 'Person Y', prev: 'Person Z', loan: 'No Loan (Clear Title)', color: '#10b981' },
          { unitId: 'U102', name: 'Flat 102 (Garden Unit)', bhk: '2 BHK', carpet: '120 m²', ulpin: 'IN-AP-040B-FL01-U102', owner: 'Person N', prev: 'Person Y', loan: 'SBI Loan: ₹16,80,000', color: '#10b981' }
        ]
      },
      {
        floor: 2,
        flats: [
          { unitId: 'U201', name: 'Flat 201 (East Wing, 3BHK)', bhk: '3 BHK Premium', carpet: '160 m²', ulpin: 'IN-AP-040B-FL02-U201', owner: 'Person X', prev: 'Person Y', loan: 'State Bank Home Loan: ₹28,50,000', color: '#10b981' },
          { unitId: 'U202', name: 'Flat 202 (West Wing, 2BHK)', bhk: '2 BHK', carpet: '115 m²', ulpin: 'IN-AP-040B-FL02-U202', owner: 'Person C', prev: 'Person X', loan: 'No Loan (Debt Free)', color: '#10b981' },
          { unitId: 'U203', name: 'Flat 203 (South Studio)', bhk: '1 BHK', carpet: '65 m²', ulpin: 'IN-AP-040B-FL02-U203', owner: 'Person O', prev: 'Person X', loan: 'No Loan (Clear Title)', color: '#10b981' }
        ]
      },
      {
        floor: 3,
        flats: [
          { unitId: 'U301', name: 'Flat 301 (Balcony Suite)', bhk: '3 BHK', carpet: '155 m²', ulpin: 'IN-AP-040B-FL03-U301', owner: 'Person H', prev: 'Person C', loan: 'Bank of Baroda: ₹24,00,000', color: '#10b981' },
          { unitId: 'U302', name: 'Flat 302 (North Unit)', bhk: '2 BHK', carpet: '115 m²', ulpin: 'IN-AP-040B-FL03-U302', owner: 'Person P', prev: 'Person C', loan: 'PNB Home Loan: ₹17,50,000', color: '#10b981' }
        ]
      },
      {
        floor: 4,
        flats: [
          { unitId: 'U401', name: 'Flat 401 (Roof Attic)', bhk: '3 BHK Attic', carpet: '180 m²', ulpin: 'IN-AP-040B-FL04-U401', owner: 'Person Q', prev: 'Person D', loan: 'Axis Bank: ₹21,00,000', color: '#10b981' }
        ]
      }
    ]
  },

  // 3. Commercial Pilotis Pod (NZ-03)
  {
    id: 'NZ-03', x: 8, z: 24, w: 14, d: 10, floors: 4, archType: 'commercial', category: 'commercial',
    name: 'Commercial Pilotis Hub Z-3',
    flatsPerFloor: [
      {
        floor: 1,
        flats: [
          { unitId: 'U1A', name: 'Unit 1A (Retail Showroom)', bhk: 'Commercial Retail', carpet: '210 m²', ulpin: 'IN-AP-040B-FL01-U1A', owner: 'Person B', prev: 'Person Y', loan: 'ICICI Commercial Loan: ₹75,00,000', color: '#6366f1' },
          { unitId: 'U1B', name: 'Unit 1B (Bistro / Cafe)', bhk: 'Commercial Retail', carpet: '130 m²', ulpin: 'IN-AP-040B-FL01-U1B', owner: 'Person U', prev: 'Person Y', loan: 'ICICI Loan: ₹30,00,000', color: '#6366f1' }
        ]
      },
      {
        floor: 2,
        flats: [
          { unitId: 'U2A', name: 'Unit 2A (Tech Office)', bhk: 'Office Suite', carpet: '280 m²', ulpin: 'IN-AP-040B-FL02-U2A', owner: 'Person L', prev: 'Person B', loan: 'ICICI Business Loan: ₹55,00,000', color: '#6366f1' }
        ]
      },
      {
        floor: 3,
        flats: [
          { unitId: 'U3A', name: 'Unit 3A (Design Studio)', bhk: 'Office Suite', carpet: '290 m²', ulpin: 'IN-AP-040B-FL03-U3A', owner: 'Person M', prev: 'Person B', loan: 'HDFC Business Loan: ₹60,00,000', color: '#6366f1' }
        ]
      }
    ]
  },

  // 4. Cylindrical Glass Helix Tower (NZ-13)
  {
    id: 'NZ-13', x: -44, z: -14, w: 12, d: 12, floors: 10, archType: 'cylindrical', category: 'towers',
    name: 'Cylindrical Helix Tower West',
    flatsPerFloor: Array.from({ length: 10 }, (_, i) => ({
      floor: i + 1,
      flats: [
        { unitId: `U${i+1}01`, name: `Unit ${i+1}01 (East Curvature)`, bhk: '3 BHK Panorama', carpet: '175 m²', ulpin: `IN-AP-040B-CYL-FL0${i+1}-U${i+1}01`, owner: (i === 1) ? 'Person X' : `Person ${String.fromCharCode(65 + (i % 20))}`, prev: 'Person Z', loan: (i % 2 === 0) ? `Union Bank: ₹${26 + i * 2},00,000` : 'No Loan (Clear Title)', color: '#06b6d4' },
        { unitId: `U${i+1}02`, name: `Unit ${i+1}02 (West Curvature)`, bhk: '2 BHK Panorama', carpet: '135 m²', ulpin: `IN-AP-040B-CYL-FL0${i+1}-U${i+1}02`, owner: `Person ${String.fromCharCode(66 + (i % 20))}`, prev: 'Person Z', loan: `Canara Bank: ₹${20 + i * 2},00,000`, color: '#06b6d4' }
      ]
    }))
  },

  // 5. Stepped Terrace Cascade (NZ-14)
  {
    id: 'NZ-14', x: -16, z: -14, w: 14, d: 12, floors: 12, archType: 'stepped', category: 'towers',
    name: 'Stepped Terrace Cascade 1',
    flatsPerFloor: Array.from({ length: 12 }, (_, i) => ({
      floor: i + 1,
      flats: [
        { unitId: `U${i+1}01`, name: `Flat ${i+1}01 (Terrace Deck)`, bhk: (i > 8) ? '4 BHK Penthouse' : '3 BHK Cascade', carpet: (i > 8) ? '280 m²' : '160 m²', ulpin: `IN-AP-040B-STP-FL${i+1 < 10 ? '0'+(i+1) : i+1}-U${i+1}01`, owner: `Person ${String.fromCharCode(65 + (i % 26))}`, prev: 'Person Z', loan: (i % 3 === 0) ? `SBI Loan: ₹${30 + i * 2},00,000` : 'No Loan (Clear Title)', color: '#06b6d4' }
      ]
    }))
  },

  // 6. Twin Skybridge Towers (NZ-15 & NZ-16 connected at Fl-7)
  {
    id: 'NZ-15', x: 12, z: -14, w: 13, d: 11, floors: 12, archType: 'twin', category: 'towers',
    name: 'Twin Skybridge Tower (Alpha & Beta)',
    flatsPerFloor: Array.from({ length: 12 }, (_, i) => ({
      floor: i + 1,
      flats: [
        { unitId: `U${i+1}01`, name: `Flat ${i+1}01 (Tower Alpha)`, bhk: '3 BHK Skyview', carpet: '170 m²', ulpin: `IN-AP-040B-TW1-FL${i+1 < 10 ? '0'+(i+1) : i+1}-U${i+1}01`, owner: (i === 6) ? 'Person S' : `Person ${String.fromCharCode(67 + (i % 20))}`, prev: 'Person Z', loan: `HDFC Loan: ₹${35 + i * 2},00,000`, color: '#38bdf8' },
        { unitId: `U${i+1}02`, name: `Flat ${i+1}02 (Tower Beta ${i === 6 ? '• Skybridge Deck' : ''})`, bhk: (i === 6) ? 'Bridge Penthouse' : '3 BHK Skyview', carpet: (i === 6) ? '320 m²' : '170 m²', ulpin: `IN-AP-040B-TW2-FL${i+1 < 10 ? '0'+(i+1) : i+1}-U${i+1}02`, owner: (i === 6) ? 'Person S' : `Person ${String.fromCharCode(68 + (i % 20))}`, prev: 'Person Z', loan: (i === 6) ? 'HDFC Loan: ₹38,00,000' : 'No Loan (Clear Title)', color: '#38bdf8' }
      ]
    }))
  }
];

// ── THREE.JS ENGINE WITH DIVERSE ARCHITECTURAL MESHES ─────────
class ThreeCadastreViewer {
  constructor(containerId, isHeroMini = false) {
    this.container = document.getElementById(containerId);
    this.isHeroMini = isHeroMini;
    this.viewMode = 'flats';
    this.maxFloorsVisible = 14;
    this.autoRotate = false;
    this.isExploded = false;
    this.activeTypeFilter = 'all';
    this.lightingMode = 'day';
    this.buildingMeshes = [];

    if (!this.container) return;
    this.initScene();
  }

  initScene() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080c16);
    this.scene.fog = new THREE.FogExp2(0x080c16, 0.006);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 1000);
    this.defaultCamPos = this.isHeroMini ? new THREE.Vector3(75, 70, 85) : new THREE.Vector3(90, 80, 100);
    this.camera.position.copy(this.defaultCamPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
      this.controls.minDistance = 15;
      this.controls.maxDistance = 350;
      this.controls.target.set(0, 12, 0);
    }

    this.setupLighting();
    this.buildTerrain();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('click', (e) => this.onCanvasClick(e));
    this.renderer.domElement.addEventListener('mousemove', (e) => this.onCanvasMouseMove(e));
    this.renderer.domElement.addEventListener('mouseleave', () => this.hideHoverTooltip());

    this.buildArchitecturalBuildings();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.95);
    this.sunLight.position.set(70, 110, 50);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.scene.add(this.sunLight);

    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    this.fillLight.position.set(-70, 50, -50);
    this.scene.add(this.fillLight);
  }

  setLightingMode(mode) {
    this.lightingMode = mode;
    if (mode === 'day') {
      this.scene.background.setHex(0x080c16);
      this.scene.fog.color.setHex(0x080c16);
      this.ambientLight.color.setHex(0xdbeafe);
      this.ambientLight.intensity = 0.7;
      this.sunLight.color.setHex(0xffffff);
      this.sunLight.intensity = 0.95;
    } else if (mode === 'sunset') {
      this.scene.background.setHex(0x181024);
      this.scene.fog.color.setHex(0x181024);
      this.ambientLight.color.setHex(0xfbbf24);
      this.ambientLight.intensity = 0.6;
      this.sunLight.color.setHex(0xf97316);
      this.sunLight.intensity = 0.95;
    } else if (mode === 'night') {
      this.scene.background.setHex(0x03060d);
      this.scene.fog.color.setHex(0x03060d);
      this.ambientLight.color.setHex(0x38bdf8);
      this.ambientLight.intensity = 0.35;
      this.sunLight.color.setHex(0x60a5fa);
      this.sunLight.intensity = 0.45;
    }
  }

  buildTerrain() {
    const groundGeo = new THREE.PlaneGeometry(260, 260, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0e1726, roughness: 0.85 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const grid = new THREE.GridHelper(260, 52, 0x38bdf8, 0x1e293b);
    grid.position.y = 0.05;
    this.scene.add(grid);

    // River
    const riverGeo = new THREE.PlaneGeometry(260, 38);
    const riverMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, transparent: true, opacity: 0.75 });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.08, -60);
    this.scene.add(river);

    // Roads
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x182035, roughness: 0.9 });
    const r1 = new THREE.Mesh(new THREE.PlaneGeometry(260, 8), roadMat);
    r1.rotation.x = -Math.PI / 2;
    r1.position.set(0, 0.06, 12);
    r1.receiveShadow = true;
    this.scene.add(r1);

    [-50, -20, 18, 48].forEach(rx => {
      const rCross = new THREE.Mesh(new THREE.PlaneGeometry(7, 130), roadMat);
      rCross.rotation.x = -Math.PI / 2;
      rCross.position.set(rx, 0.06, 6);
      rCross.receiveShadow = true;
      this.scene.add(rCross);
    });
  }

  buildArchitecturalBuildings() {
    this.buildingMeshes.forEach(m => this.scene.remove(m));
    this.buildingMeshes = [];

    const floorHeight = 2.4;
    const slabThick = 0.28;
    const explodeGap = this.isExploded ? 1.4 : 0;

    ARCHITECTURAL_BUILDINGS.forEach(b => {
      const isFiltered = (this.activeTypeFilter === 'all' || b.category === this.activeTypeFilter);
      const group = new THREE.Group();
      group.userData = { ...b };

      // 1. Concrete Base Footing
      const footing = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 1.4, 0.6, b.d + 1.4),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
      );
      footing.position.set(0, 0.3, 0);
      footing.receiveShadow = true;
      group.add(footing);

      const visibleFloors = Math.min(b.floors, this.maxFloorsVisible);

      // Render Each Architectural Typology
      for (let f = 0; f < visibleFloors; f++) {
        const floorBaseY = 0.6 + f * (floorHeight + explodeGap);
        const fInfo = b.flatsPerFloor[f] || { floor: f + 1, flats: [] };
        const flatsList = fInfo.flats;
        const numFlats = flatsList.length || 1;

        if (b.archType === 'cylindrical') {
          // Circular Disc Slab
          const cylRadius = b.w * 0.48;
          const slab = new THREE.Mesh(
            new THREE.CylinderGeometry(cylRadius + 0.2, cylRadius + 0.2, slabThick, 24),
            new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          group.add(slab);

          // Subdivided Cylindrical Slices (Flats)
          flatsList.forEach((flat, fi) => {
            const thetaLength = (Math.PI * 2) / numFlats;
            const thetaStart = fi * thetaLength;
            const flatMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(cylRadius, cylRadius, floorHeight - slabThick, 16, 1, false, thetaStart, thetaLength - 0.05),
              new THREE.MeshStandardMaterial({
                color: new THREE.Color(flat.color),
                roughness: 0.3,
                transparent: !isFiltered,
                opacity: isFiltered ? 0.85 : 0.2
              })
            );
            flatMesh.position.set(0, floorBaseY + slabThick + (floorHeight - slabThick) / 2, 0);
            flatMesh.castShadow = true;
            flatMesh.userData = { ...flat, buildingName: b.name, arch: 'Cylindrical Helix Glass Tower', complexId: b.id };
            group.add(flatMesh);
          });

        } else if (b.archType === 'l-shaped') {
          // L-shaped footprint with 2 subdivided wings
          const wingW = b.w * 0.55;
          const wingD = b.d * 0.55;

          const slab = new THREE.Mesh(
            new THREE.BoxGeometry(b.w, slabThick, b.d),
            new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          group.add(slab);

          flatsList.forEach((flat, fi) => {
            const posX = fi === 0 ? -b.w * 0.22 : b.w * 0.22;
            const posZ = fi === 0 ? b.d * 0.22 : -b.d * 0.22;
            const fMesh = new THREE.Mesh(
              new THREE.BoxGeometry(wingW - 0.3, floorHeight - slabThick, wingD - 0.3),
              new THREE.MeshStandardMaterial({
                color: new THREE.Color(flat.color),
                roughness: 0.4,
                transparent: !isFiltered,
                opacity: isFiltered ? 0.88 : 0.2
              })
            );
            fMesh.position.set(posX, floorBaseY + slabThick + (floorHeight - slabThick) / 2, posZ);
            fMesh.castShadow = true;
            fMesh.userData = { ...flat, buildingName: b.name, arch: 'L-Shaped Courtyard Villa', complexId: b.id };
            group.add(fMesh);
          });

        } else if (b.archType === 'stepped') {
          // Stepped setbacks every 3 floors
          const stepIndex = Math.floor(f / 3);
          const currentW = Math.max(b.w - stepIndex * 2.5, 6);
          const currentD = Math.max(b.d - stepIndex * 2.0, 6);

          const slab = new THREE.Mesh(
            new THREE.BoxGeometry(currentW + 0.4, slabThick, currentD + 0.4),
            new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          group.add(slab);

          const flat = flatsList[0] || { unitId: `U${f+1}01`, name: `Flat ${f+1}01`, bhk: '3 BHK', carpet: '160 m²', ulpin: `IN-AP-040B-STP-FL0${f+1}-U01`, owner: 'Person X', loan: 'No Loan', color: '#06b6d4' };
          const fMesh = new THREE.Mesh(
            new THREE.BoxGeometry(currentW, floorHeight - slabThick, currentD),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(flat.color),
              roughness: 0.35,
              transparent: !isFiltered,
              opacity: isFiltered ? 0.9 : 0.2
            })
          );
          fMesh.position.set(0, floorBaseY + slabThick + (floorHeight - slabThick) / 2, 0);
          fMesh.castShadow = true;
          fMesh.userData = { ...flat, buildingName: b.name, arch: 'Stepped Terrace Cascade', complexId: b.id };
          group.add(fMesh);

        } else if (b.archType === 'twin') {
          // Two separate towers side by side with a Skybridge at floor 7
          const tW = b.w * 0.42;
          const tD = b.d;
          const gap = b.w * 0.16;

          [- (tW / 2 + gap), (tW / 2 + gap)].forEach((tx, ti) => {
            const slab = new THREE.Mesh(
              new THREE.BoxGeometry(tW + 0.3, slabThick, tD + 0.3),
              new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
            );
            slab.position.set(tx, floorBaseY + slabThick / 2, 0);
            group.add(slab);

            const flat = flatsList[ti] || flatsList[0] || { unitId: `U${f+1}0${ti+1}`, name: `Flat ${f+1}0${ti+1}`, bhk: '3 BHK', carpet: '170 m²', ulpin: `IN-AP-040B-TW-FL0${f+1}-U0${ti+1}`, owner: 'Person S', loan: 'HDFC Loan', color: '#38bdf8' };
            const fMesh = new THREE.Mesh(
              new THREE.BoxGeometry(tW, floorHeight - slabThick, tD),
              new THREE.MeshStandardMaterial({
                color: new THREE.Color(flat.color),
                roughness: 0.35,
                transparent: !isFiltered,
                opacity: isFiltered ? 0.9 : 0.2
              })
            );
            fMesh.position.set(tx, floorBaseY + slabThick + (floorHeight - slabThick) / 2, 0);
            fMesh.castShadow = true;
            fMesh.userData = { ...flat, buildingName: b.name, arch: 'Twin Skybridge Towers', complexId: b.id };
            group.add(fMesh);
          });

          // Skybridge connection on Floor 7
          if (f === 6) {
            const bridgeMesh = new THREE.Mesh(
              new THREE.BoxGeometry(gap * 2 + 1, floorHeight - slabThick, tD * 0.55),
              new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, transparent: true, opacity: 0.95 })
            );
            bridgeMesh.position.set(0, floorBaseY + slabThick + (floorHeight - slabThick) / 2, 0);
            bridgeMesh.userData = {
              unitId: 'U700-BRIDGE',
              name: 'Skybridge Lounge & Observatory (Fl-7)',
              bhk: 'Civic Amenity',
              carpet: '180 m²',
              ulpin: 'IN-AP-040B-TW-SKYBRIDGE-FL07',
              owner: 'Common Condominium Association',
              prev: 'Person Z',
              loan: 'No Loan (Common Skybridge)',
              buildingName: b.name,
              arch: 'Skybridge Interconnection'
            };
            group.add(bridgeMesh);
          }

        } else {
          // Standard / Heritage / Commercial with Subdivided Flat Slabs
          const slab = new THREE.Mesh(
            new THREE.BoxGeometry(b.w + 0.4, slabThick, b.d + 0.4),
            new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          group.add(slab);

          flatsList.forEach((flat, fi) => {
            const flatW = (b.w - 0.2) / numFlats;
            const posX = -b.w / 2 + flatW / 2 + fi * flatW;
            const fMesh = new THREE.Mesh(
              new THREE.BoxGeometry(flatW - 0.2, floorHeight - slabThick, b.d - 0.2),
              new THREE.MeshStandardMaterial({
                color: new THREE.Color(flat.color),
                roughness: 0.45,
                transparent: !isFiltered,
                opacity: isFiltered ? 0.88 : 0.2
              })
            );
            fMesh.position.set(posX, floorBaseY + slabThick + (floorHeight - slabThick) / 2, 0);
            fMesh.castShadow = true;
            fMesh.userData = { ...flat, buildingName: b.name, arch: b.archType === 'heritage' ? 'Gable Heritage Duplex' : 'Commercial Pilotis Pod', complexId: b.id };
            group.add(fMesh);
          });
        }
      }

      // Pitched Roof for Heritage
      if (b.archType === 'heritage' && visibleFloors === b.floors) {
        const roofY = 0.6 + b.floors * (floorHeight + explodeGap);
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(Math.max(b.w, b.d) * 0.72, 2.6, 4),
          new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 })
        );
        roof.position.set(0, roofY + 1.3, 0);
        roof.rotation.y = Math.PI / 4;
        group.add(roof);
      }

      group.position.set(b.x, 0, b.z);
      this.scene.add(group);
      this.buildingMeshes.push(group);
    });
  }

  onCanvasMouseMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    let found = null;
    for (let hit of intersects) {
      if (hit.object && hit.object.userData && hit.object.userData.ulpin) {
        found = hit.object.userData;
        break;
      }
    }

    if (found) {
      this.showHoverTooltip(found, event.clientX - rect.left, event.clientY - rect.top);
    } else {
      this.hideHoverTooltip();
    }
  }

  showHoverTooltip(data, x, y) {
    const ttId = this.isHeroMini ? 'dashHoverTooltip' : 'fullHoverTooltip';
    const tt = document.getElementById(ttId);
    if (!tt) return;

    const flatName = document.getElementById(this.isHeroMini ? 'thtFlatName' : 'fullThtFlatName');
    const bhkElem = document.getElementById(this.isHeroMini ? 'thtBhk' : 'fullThtBhk');
    const idElem = document.getElementById(this.isHeroMini ? 'thtId' : 'fullThtId');
    const ownerElem = document.getElementById(this.isHeroMini ? 'thtOwner' : 'fullThtOwner');
    const loanElem = document.getElementById(this.isHeroMini ? 'thtLoan' : 'fullThtLoan');
    const archElem = document.getElementById(this.isHeroMini ? 'thtArch' : 'fullThtArch');

    if (flatName) flatName.textContent = data.name;
    if (bhkElem) bhkElem.textContent = `${data.bhk || 'Flat'} • ${data.carpet || '140 m²'}`;
    if (idElem) idElem.textContent = data.ulpin;
    if (ownerElem) ownerElem.textContent = `Owner: ${data.owner}`;
    if (loanElem) loanElem.textContent = `Loan: ${data.loan || 'No Loan (Clear Title)'}`;
    if (archElem) archElem.textContent = `Structure: ${data.arch || 'Architectural Unit'}`;

    tt.style.left = `${x}px`;
    tt.style.top = `${y}px`;
    tt.style.display = 'block';
  }

  hideHoverTooltip() {
    const ttId = this.isHeroMini ? 'dashHoverTooltip' : 'fullHoverTooltip';
    const tt = document.getElementById(ttId);
    if (tt) tt.style.display = 'none';
  }

  onCanvasClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    for (let hit of intersects) {
      if (hit.object && hit.object.userData && hit.object.userData.ulpin) {
        updateAllFlatDetails(hit.object.userData);
        
        const origColor = hit.object.material.color.clone();
        hit.object.material.color.set(0x38bdf8);
        setTimeout(() => hit.object.material.color.copy(origColor), 400);

        this.flyToBuilding(hit.object.position.x + hit.object.parent.position.x, hit.object.position.z + hit.object.parent.position.z);
        break;
      }
    }
  }

  flyToBuilding(targetX, targetZ) {
    if (!this.controls) return;
    const startCam = this.camera.position.clone();
    const endCam = new THREE.Vector3(targetX + 28, 24, targetZ + 28);
    const startTarget = this.controls.target.clone();
    const endTarget = new THREE.Vector3(targetX, 8, targetZ);

    let progress = 0;
    const anim = () => {
      progress += 0.04;
      if (progress <= 1) {
        this.camera.position.lerpVectors(startCam, endCam, progress);
        this.controls.target.lerpVectors(startTarget, endTarget, progress);
        requestAnimationFrame(anim);
      }
    };
    anim();
  }

  toggleExplode() {
    this.isExploded = !this.isExploded;
    this.buildArchitecturalBuildings();
  }

  setFilterType(type) {
    this.activeTypeFilter = type;
    this.buildArchitecturalBuildings();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.buildArchitecturalBuildings();
  }

  sliceFloors(maxFloors) {
    this.maxFloorsVisible = parseInt(maxFloors);
    this.buildArchitecturalBuildings();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.controls) {
      if (this.autoRotate) this.controls.autoRotate = true;
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }
}

// ── UPDATE UI PANELS DYNAMICALLY PER FLAT & PERSON ────────────
let currentSelectedBuilding = ARCHITECTURAL_BUILDINGS[1]; // NZ-04 default

function updateAllFlatDetails(data) {
  const ulpin = data.ulpin || 'IN-AP-040B-FL02-U201';
  const name = data.name || 'Flat 201 (East Wing, 3BHK)';
  const owner = data.owner || 'Person X';
  const prevOwner = data.prev || 'Person Y';
  const loan = data.loan || 'State Bank Home Loan: ₹28,50,000';
  const arch = data.arch || 'Gable Courtyard Villa Block';
  const carpet = data.carpet || '160 m² (1,722 sq.ft)';

  // Find matching building complex to populate flat buttons
  if (data.complexId) {
    const foundB = ARCHITECTURAL_BUILDINGS.find(b => b.id === data.complexId);
    if (foundB) {
      currentSelectedBuilding = foundB;
      renderFlatButtonsForBuilding(foundB, data.unitId);
    }
  }

  // Dashboard Dossier
  const dVal = document.getElementById('dashUlpinVal');
  const dBadge = document.getElementById('dashUlpinBadge');
  const dFloor = document.getElementById('dashFloorLevelVal');
  const dOwner = document.getElementById('dashOwnerVal');
  const dPrev = document.getElementById('dashPrevOwnerVal');
  const dLoan = document.getElementById('dashMortgageVal');
  const dArch = document.getElementById('dashArchStyle');
  const dCarpet = document.getElementById('dashCarpetArea');

  if (dVal) dVal.textContent = ulpin;
  if (dBadge) dBadge.textContent = `ID: ${ulpin}`;
  if (dFloor) dFloor.textContent = name;
  if (dOwner) dOwner.textContent = `${owner} (100% Ownership)`;
  if (dPrev) dPrev.textContent = `${prevOwner} (Sold in 2019)`;
  if (dArch) dArch.textContent = arch;
  if (dCarpet) dCarpet.textContent = carpet;
  if (dLoan) {
    dLoan.textContent = loan;
    dLoan.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }

  // 3D Map Explorer
  const inspUlpin = document.getElementById('inspUlpin');
  const inspFloor = document.getElementById('inspFloorLevel');
  const inspOwner = document.getElementById('inspOwner');
  const inspArch = document.getElementById('inspArch');
  const inspLoan = document.getElementById('inspLoanBadge');
  const inspCarpet = document.getElementById('inspCarpet');

  if (inspUlpin) inspUlpin.textContent = ulpin;
  if (inspFloor) inspFloor.textContent = name;
  if (inspOwner) inspOwner.textContent = `${owner} (100%)`;
  if (inspArch) inspArch.textContent = arch;
  if (inspCarpet) inspCarpet.textContent = carpet;
  if (inspLoan) {
    inspLoan.textContent = loan;
    inspLoan.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }

  // Legal Ledger
  const lUlpin = document.getElementById('lUlpin');
  const lOwner = document.getElementById('lOwner');
  const lFloor = document.getElementById('lFloorLevel');
  const lName = document.getElementById('lName');
  const lCarpetElem = document.getElementById('lCarpet');
  const lRrrOwner = document.getElementById('lRrrOwner');
  const lRrrLoan = document.getElementById('lRrrLoan');
  const lRrrLoanBadge = document.getElementById('lRrrLoanBadge');
  const lTitle = document.getElementById('ledgerDossierTitle');
  const lDocDeed = document.getElementById('lDocDeedMeta');

  if (lUlpin) lUlpin.textContent = ulpin;
  if (lOwner) lOwner.textContent = `${owner} (100% Title)`;
  if (lFloor) lFloor.textContent = name;
  if (lName) lName.textContent = arch;
  if (lCarpetElem) lCarpetElem.textContent = carpet;
  if (lRrrOwner) lRrrOwner.textContent = `${owner} (100% Full Owner)`;
  if (lRrrLoan) lRrrLoan.textContent = loan;
  if (lRrrLoanBadge) {
    lRrrLoanBadge.textContent = loan.includes('No Loan') ? 'Debt Free ✓' : 'Mortgage Active';
    lRrrLoanBadge.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }
  if (lTitle) lTitle.textContent = `Flat Record: ${ulpin}`;
  if (lDocDeed) lDocDeed.textContent = `Transferred from ${prevOwner} to ${owner}`;

  // Update Ownership Chain Avatars & Names
  const cName1 = document.getElementById('chainName1');
  const cName2 = document.getElementById('chainName2');
  const cAv1 = document.getElementById('chainAvatar1');
  const cAv2 = document.getElementById('chainAvatar2');

  if (cName1) cName1.textContent = owner;
  if (cName2) cName2.textContent = prevOwner;
  if (cAv1) cAv1.textContent = owner.replace('Person ', 'P');
  if (cAv2) cAv2.textContent = prevOwner.replace('Person ', 'P');
}
window.updateAllFlatDetails = updateAllFlatDetails;

function renderFlatButtonsForBuilding(building, activeUnitId = 'U201') {
  const container = document.getElementById('floorFlatsList');
  if (!container) return;
  container.innerHTML = '';

  const allFlatsInBuilding = [];
  building.flatsPerFloor.forEach(f => f.flats.forEach(flat => allFlatsInBuilding.push(flat)));

  allFlatsInBuilding.slice(0, 4).forEach(flat => {
    const btn = document.createElement('button');
    btn.className = `fsp-btn ${flat.unitId === activeUnitId ? 'active' : ''}`;
    btn.textContent = `${flat.unitId}: ${flat.owner}`;
    btn.onclick = () => {
      updateAllFlatDetails({ ...flat, complexId: building.id, arch: building.name });
    };
    container.appendChild(btn);
  });
}

function selectFlatUnit(unitId) {
  if (!currentSelectedBuilding) return;
  for (let f of currentSelectedBuilding.flatsPerFloor) {
    const match = f.flats.find(fl => fl.unitId === unitId);
    if (match) {
      updateAllFlatDetails({ ...match, complexId: currentSelectedBuilding.id, arch: currentSelectedBuilding.name });
      break;
    }
  }
}
window.selectFlatUnit = selectFlatUnit;

function flyToArchitectureType(type) {
  let target = null;
  if (type === 'l-shaped') target = ARCHITECTURAL_BUILDINGS[0];
  else if (type === 'heritage') target = ARCHITECTURAL_BUILDINGS[1];
  else if (type === 'commercial') target = ARCHITECTURAL_BUILDINGS[2];
  else if (type === 'cylindrical') target = ARCHITECTURAL_BUILDINGS[3];
  else if (type === 'stepped') target = ARCHITECTURAL_BUILDINGS[4];
  else if (type === 'twin') target = ARCHITECTURAL_BUILDINGS[5];

  if (target) {
    if (dashEngine) dashEngine.flyToBuilding(target.x, target.z);
    if (fullEngine) fullEngine.flyToBuilding(target.x, target.z);
    if (target.flatsPerFloor[0] && target.flatsPerFloor[0].flats[0]) {
      updateAllFlatDetails({ ...target.flatsPerFloor[0].flats[0], complexId: target.id, arch: target.name });
    }
  }
}
window.flyToArchitectureType = flyToArchitectureType;

let dashEngine = null;
let fullEngine = null;

function toggleExplodeFloors() {
  if (dashEngine) dashEngine.toggleExplode();
  if (fullEngine) fullEngine.toggleExplode();
  const btn = document.getElementById('btnExplodeFloors');
  const btnFull = document.getElementById('btnExplodeFull');
  const active = dashEngine && dashEngine.isExploded;
  if (btn) btn.style.borderColor = active ? '#06b6d4' : '';
  if (btnFull) btnFull.innerHTML = active ? '<span>Collapse Flats</span>' : '<span>Explode Flat Slices</span>';
}
window.toggleExplodeFloors = toggleExplodeFloors;

function filterByPropertyType(type) {
  document.querySelectorAll('#dashTypeFilter .filter-pill').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.filter-chip-group .filter-btn').forEach(b => b.classList.remove('active'));
  
  if (event && event.target) event.target.classList.add('active');

  if (dashEngine) dashEngine.setFilterType(type);
  if (fullEngine) fullEngine.setFilterType(type);
}
window.filterByPropertyType = filterByPropertyType;

let currentLighting = 'day';
function toggleLightingMode() {
  const modes = ['day', 'sunset', 'night'];
  const nextIdx = (modes.indexOf(currentLighting) + 1) % modes.length;
  currentLighting = modes[nextIdx];

  const icon = document.getElementById('lightingIcon');
  const label = document.getElementById('lightingLabel');
  if (currentLighting === 'day') {
    if (icon) icon.textContent = '☀️';
    if (label) label.textContent = 'Day View';
  } else if (currentLighting === 'sunset') {
    if (icon) icon.textContent = '🌅';
    if (label) label.textContent = 'Sunset View';
  } else {
    if (icon) icon.textContent = '🌙';
    if (label) label.textContent = 'Night View';
  }

  if (dashEngine) dashEngine.setLightingMode(currentLighting);
  if (fullEngine) fullEngine.setLightingMode(currentLighting);
}
window.toggleLightingMode = toggleLightingMode;

function setDashboardViewMode(mode) {
  document.querySelectorAll('#dashViewToggle .view-pill').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  if (dashEngine) dashEngine.setViewMode(mode);
}
window.setDashboardViewMode = setDashboardViewMode;

function rotateDashCamera() {
  if (dashEngine && dashEngine.controls) dashEngine.controls.autoRotate = !dashEngine.controls.autoRotate;
}
window.rotateDashCamera = rotateDashCamera;

function zoomDashCamera(delta) {
  if (dashEngine && dashEngine.camera) dashEngine.camera.position.z += delta;
}
window.zoomDashCamera = zoomDashCamera;

function resetDashCamera() {
  if (dashEngine && dashEngine.controls) {
    dashEngine.camera.position.copy(dashEngine.defaultCamPos);
    dashEngine.controls.target.set(0, 12, 0);
  }
}
window.resetDashCamera = resetDashCamera;

function openFullLegalDossier() {
  switchPage('ledger');
}
window.openFullLegalDossier = openFullLegalDossier;

function setFullViewMode(mode) {
  document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btnMode' + mode.charAt(0).toUpperCase() + mode.slice(1));
  if (btn) btn.classList.add('active');
  if (fullEngine) fullEngine.setViewMode(mode);
}
window.setFullViewMode = setFullViewMode;

function sliceBuildingFloors(val) {
  const disp = document.getElementById('levelDisplay');
  if (disp) disp.textContent = val >= 14 ? 'All Levels (Ground to Penthouse)' : `Floors 1 to ${val}`;
  if (fullEngine) fullEngine.sliceFloors(val);
}
window.sliceBuildingFloors = sliceBuildingFloors;

function resetFullCamera() {
  if (fullEngine && fullEngine.controls) {
    fullEngine.camera.position.copy(fullEngine.defaultCamPos);
    fullEngine.controls.target.set(0, 12, 0);
  }
}
window.resetFullCamera = resetFullCamera;

function setCameraViewpoint(type) {
  if (!fullEngine) return;
  if (type === 'iso') {
    fullEngine.camera.position.set(90, 80, 100);
    fullEngine.controls.target.set(0, 12, 0);
  } else if (type === 'top') {
    fullEngine.camera.position.set(0, 150, 0.1);
    fullEngine.controls.target.set(0, 0, 0);
  } else if (type === 'front') {
    fullEngine.camera.position.set(0, 20, 130);
    fullEngine.controls.target.set(0, 15, 0);
  }
}
window.setCameraViewpoint = setCameraViewpoint;

function toggleAutoRotate() {
  if (!fullEngine || !fullEngine.controls) return;
  fullEngine.autoRotate = !fullEngine.autoRotate;
  fullEngine.controls.autoRotate = fullEngine.autoRotate;
  const btn = document.getElementById('btnAutoRotate');
  if (btn) btn.style.color = fullEngine.autoRotate ? '#10b981' : '#94a3b8';
}
window.toggleAutoRotate = toggleAutoRotate;

function updateGeneratedFlatPreview() {
  const fl = document.getElementById('genFloor').value;
  const un = document.getElementById('genUnit').value;
  document.getElementById('mintedUlpin').textContent = `IN-AP-040B-${fl}-${un}`;
}
window.updateGeneratedFlatPreview = updateGeneratedFlatPreview;

function generateNewUlpin(event) {
  event.preventDefault();
  const fl = document.getElementById('genFloor').value;
  const un = document.getElementById('genUnit').value;
  const newUlpin = `IN-AP-040B-${fl}-${un}`;
  const owner = document.getElementById('genOwnerName').value || 'Person X';
  const carpet = document.getElementById('genCarpet').value || '160 m²';
  const loan = document.getElementById('genLoanAmount').value || 'No Loan (Clear Title)';

  document.getElementById('mintedUlpin').textContent = newUlpin;
  document.getElementById('mintedOwner').textContent = owner;
  document.getElementById('mintedFloorLevel').textContent = `${un} (${fl})`;
  document.getElementById('mintedLoan').textContent = loan;

  updateAllFlatDetails({
    ulpin: newUlpin,
    owner: owner,
    prev: 'Person Y',
    name: `${un} (${fl})`,
    carpet: carpet,
    loan: loan,
    arch: 'Newly Subdivided Unit'
  });
}
window.generateNewUlpin = generateNewUlpin;

function executeLedgerQuery() {
  const query = document.getElementById('ledgerQueryInput').value.trim();
  if (!query) return;

  // Search across all flats in all complexes
  let foundFlat = null;
  for (let b of ARCHITECTURAL_BUILDINGS) {
    for (let f of b.flatsPerFloor) {
      for (let fl of f.flats) {
        if (fl.ulpin.toLowerCase().includes(query.toLowerCase()) || fl.owner.toLowerCase().includes(query.toLowerCase()) || fl.unitId.toLowerCase().includes(query.toLowerCase())) {
          foundFlat = { ...fl, complexId: b.id, arch: b.name };
          break;
        }
      }
      if (foundFlat) break;
    }
    if (foundFlat) break;
  }

  if (foundFlat) {
    updateAllFlatDetails(foundFlat);
  } else {
    updateAllFlatDetails({
      ulpin: query,
      owner: 'Person X',
      prev: 'Person Y',
      name: 'Queried Flat Unit',
      carpet: '160 m²',
      loan: 'State Bank Home Loan: ₹28,50,000',
      arch: 'Queried Block'
    });
  }
}
window.executeLedgerQuery = executeLedgerQuery;

function handleQuickUlpinSearch(event) {
  if (event.key === 'Enter') lookupQuickUlpin();
}
window.handleQuickUlpinSearch = handleQuickUlpinSearch;

function lookupQuickUlpin() {
  const q = document.getElementById('globalSearch').value.trim();
  if (!q) return;
  switchPage('ledger');
  document.getElementById('ledgerQueryInput').value = q;
  executeLedgerQuery();
}
window.lookupQuickUlpin = lookupQuickUlpin;

// ── POPULATE CITIZEN DIRECTORY (Person A to Z) ───────────────
const PERSON_A_TO_Z = [
  { id: 'CIT-001', name: 'Person A', ulpin: 'IN-AP-040B-FL01-U102', arch: 'L-Courtyard Villa', unit: 'Flat 102 (West)', size: '115 m²', loan: 'HDFC Home Loan: ₹18,00,000', status: 'Verified' },
  { id: 'CIT-002', name: 'Person B', ulpin: 'IN-AP-040B-FL01-U1A',  arch: 'Commercial Pod', unit: 'Unit 1A (Retail)', size: '210 m²', loan: 'ICICI Commercial: ₹75,00,000', status: 'Verified' },
  { id: 'CIT-003', name: 'Person C', ulpin: 'IN-AP-040B-FL02-U202', arch: 'Gable Villa', unit: 'Flat 202 (West)', size: '115 m²', loan: 'No Loan (Debt Free)', status: 'Verified' },
  { id: 'CIT-004', name: 'Person D', ulpin: 'IN-AP-040B-FL01-U101', arch: 'Gable Villa', unit: 'Flat 101 (Ground)', size: '130 m²', loan: 'Axis Bank Loan: ₹15,20,000', status: 'Verified' },
  { id: 'CIT-005', name: 'Person E', ulpin: 'IN-AP-040B-FL02-U201', arch: 'L-Courtyard Villa', unit: 'Flat 201 (East)', size: '165 m²', loan: 'SBI Home Loan: ₹22,00,000', status: 'Verified' },
  { id: 'CIT-006', name: 'Person F', ulpin: 'IN-AP-040B-FL02-U202', arch: 'L-Courtyard Villa', unit: 'Flat 202 (West)', size: '120 m²', loan: 'Canara Bank: ₹19,50,000', status: 'Verified' },
  { id: 'CIT-007', name: 'Person G', ulpin: 'IN-AP-040B-FL03-U301', arch: 'L-Courtyard Villa', unit: 'Flat 301 (Deck)', size: '260 m²', loan: 'No Loan (Clear Title)', status: 'Verified' },
  { id: 'CIT-008', name: 'Person H', ulpin: 'IN-AP-040B-FL03-U301', arch: 'Gable Villa', unit: 'Flat 301 (Balcony)', size: '155 m²', loan: 'Bank of Baroda: ₹24,00,000', status: 'Verified' },
  { id: 'CIT-009', name: 'Person I', ulpin: 'IN-AP-040B-CYL-FL01-U101', arch: 'Cylinder Tower', unit: 'Unit 101 (East)', size: '175 m²', loan: 'Union Bank: ₹31,00,000', status: 'Verified' },
  { id: 'CIT-010', name: 'Person J', ulpin: 'IN-AP-040B-CYL-FL02-U202', arch: 'Cylinder Tower', unit: 'Unit 202 (West)', size: '135 m²', loan: 'No Loan (Clear Title)', status: 'Verified' },
  { id: 'CIT-011', name: 'Person K', ulpin: 'IN-AP-040B-STP-FL08-U01', arch: 'Stepped Cascade', unit: 'Flat 801 (Cascade)', size: '220 m²', loan: 'Kotak Bank: ₹45,00,000', status: 'Verified' },
  { id: 'CIT-012', name: 'Person L', ulpin: 'IN-AP-040B-FL02-U2A',  arch: 'Commercial Pod', unit: 'Unit 2A (Office)', size: '280 m²', loan: 'ICICI Business: ₹55,00,000', status: 'Verified' },
  { id: 'CIT-013', name: 'Person M', ulpin: 'IN-AP-040B-FL03-U3A',  arch: 'Commercial Pod', unit: 'Unit 3A (Design)', size: '290 m²', loan: 'HDFC Business: ₹60,00,000', status: 'Verified' },
  { id: 'CIT-014', name: 'Person N', ulpin: 'IN-AP-040B-FL01-U102', arch: 'Gable Villa', unit: 'Flat 102 (Garden)', size: '120 m²', loan: 'SBI Loan: ₹16,80,000', status: 'Verified' },
  { id: 'CIT-015', name: 'Person O', ulpin: 'IN-AP-040B-FL02-U203', arch: 'Gable Villa', unit: 'Flat 203 (Studio)', size: '65 m²',  loan: 'No Loan (Clear Title)', status: 'Verified' },
  { id: 'CIT-016', name: 'Person P', ulpin: 'IN-AP-040B-FL03-U302', arch: 'Gable Villa', unit: 'Flat 302 (North)', size: '115 m²', loan: 'PNB Home Loan: ₹17,50,000', status: 'Verified' },
  { id: 'CIT-017', name: 'Person Q', ulpin: 'IN-AP-040B-FL04-U401', arch: 'Gable Villa', unit: 'Flat 401 (Attic)', size: '180 m²', loan: 'Axis Bank: ₹21,00,000', status: 'Verified' },
  { id: 'CIT-018', name: 'Person R', ulpin: 'IN-AP-040B-TW1-FL05-U01', arch: 'Twin Towers', unit: 'Flat 501 (Tower Alpha)', size: '170 m²', loan: 'No Loan (Clear Title)', status: 'Verified' },
  { id: 'CIT-019', name: 'Person S', ulpin: 'IN-AP-040B-TW2-FL07-U702', arch: 'Twin Towers', unit: 'Flat 702 (Skybridge Deck)', size: '320 m²', loan: 'HDFC Loan: ₹38,00,000', status: 'Verified' },
  { id: 'CIT-020', name: 'Person T', ulpin: 'IN-AP-040B-TW1-FL09-U01', arch: 'Twin Towers', unit: 'Flat 901 (Skyview)', size: '170 m²', loan: 'SBI Loan: ₹42,00,000', status: 'Verified' },
  { id: 'CIT-021', name: 'Person U', ulpin: 'IN-AP-040B-FL01-U1B',  arch: 'Commercial Pod', unit: 'Unit 1B (Bistro)', size: '130 m²', loan: 'ICICI Loan: ₹30,00,000', status: 'Verified' },
  { id: 'CIT-022', name: 'Person V', ulpin: 'IN-AP-040B-CYL-FL05-U501', arch: 'Cylinder Tower', unit: 'Unit 501 (Panorama)', size: '175 m²', loan: 'No Loan (Clear Title)', status: 'Verified' },
  { id: 'CIT-023', name: 'Person W', ulpin: 'IN-AP-040B-CYL-FL06-U602', arch: 'Cylinder Tower', unit: 'Unit 602 (Panorama)', size: '135 m²', loan: 'Federal Bank: ₹11,50,000', status: 'Verified' },
  { id: 'CIT-024', name: 'Person X', ulpin: 'IN-AP-040B-FL02-U201', arch: 'Gable Villa', unit: 'Flat 201 (East Wing, 3BHK)', size: '160 m²', loan: 'State Bank: ₹28,50,000', status: 'Verified Owner' },
  { id: 'CIT-025', name: 'Person Y', ulpin: 'IN-AP-040B-FL01-U101', arch: 'L-Courtyard Villa', unit: 'Flat 101 (East)', size: '150 m²', loan: 'No Loan (Clear Title)', status: 'Verified Owner' },
  { id: 'CIT-026', name: 'Person Z', ulpin: 'IN-AP-040B-STP-FL12-U01', arch: 'Stepped Cascade', unit: 'Flat 1201 (Sky Deck)', size: '350 m²', loan: 'Mortgage Cleared (NOC)', status: 'Original Title' }
];

function populateOwnersTable() {
  const tbody = document.getElementById('ownersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  PERSON_A_TO_Z.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${p.id}</td>
      <td><div class="owner-cell"><div class="mini-avatar">${p.name.replace('Person ', 'P')}</div><strong>${p.name}</strong></div></td>
      <td class="mono text-cyan font-bold">${p.ulpin}</td>
      <td><span class="badge badge-blue">${p.arch}</span></td>
      <td><strong>${p.unit}</strong></td>
      <td>${p.size}</td>
      <td><span class="${p.loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow'}">${p.loan}</span></td>
      <td><span class="badge badge-green">${p.status}</span></td>
      <td><button class="btn-sm btn-outline" onclick="inspectPersonFlat('${p.ulpin}')">Inspect</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function inspectPersonFlat(ulpin) {
  switchPage('ledger');
  document.getElementById('ledgerQueryInput').value = ulpin;
  executeLedgerQuery();
}
window.inspectPersonFlat = inspectPersonFlat;

// ── POPULATE CREDENTIALS DIRECTORY (PAGE 8) ───────────────────
function populateCredentialsDirectory() {
  const grid = document.getElementById('credDirectoryGrid');
  if (!grid) return;
  grid.innerHTML = '';

  Object.values(USER_ROLES).forEach(r => {
    const card = document.createElement('div');
    card.className = 'cred-card';
    card.innerHTML = `
      <div class="cred-card-top">
        <div class="cred-photo"><img src="${r.photo}" alt="${r.name}" /></div>
        <div class="cred-titles">
          <span class="cred-name">${r.name}</span>
          <span class="cred-role">${r.roleTitle}</span>
          <span class="cred-dept">ID: ${r.idNumber}</span>
        </div>
      </div>
      <div class="cred-details-box">
        <div class="cd-row"><label>Email:</label><span>${r.email}</span></div>
        <div class="cd-row"><label>Clearance:</label><span class="badge badge-green" style="font-size:9px;">${r.clearance.split('(')[0]}</span></div>
        <div class="cd-row"><label>Passkey:</label><code class="text-cyan font-mono" style="font-size:10px;">${r.passkey.slice(0, 16)}...</code></div>
      </div>
      <button class="btn btn-primary btn-sm" style="width:100%;margin-top:auto;" onclick="selectRoleAndClose('${r.key}')">
        Login & Switch to ${r.name}
      </button>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    dashEngine = new ThreeCadastreViewer('dashThreeCanvasContainer', true);
  }, 100);

  setTimeout(() => {
    fullEngine = new ThreeCadastreViewer('fullThreeCanvasContainer', false);
  }, 200);

  populateOwnersTable();
  populateCredentialsDirectory();
  changeUserRole('citizen');
  renderFlatButtonsForBuilding(ARCHITECTURAL_BUILDINGS[1], 'U201');
});
