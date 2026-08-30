/* ─────────────────────────────────────────────────────────────
   Digital Land & Property Portal — app.js
   Full 3D Interactive Cadastre Engine:
   - Floor-by-Floor Dynamic 3D-ULPINs & Specific Floor Slabs
   - Unique Bank Loans per Property / Floor / Person
   - Full Roster of Persons (Person A through Person Z)
   - Strict Role-Based Restrictions & Permissions
   - 3D Hover Tooltips, Explode Slices & Dynamic Lighting
───────────────────────────────────────────────────────────── */

// ── ROSTER OF PERSONS (Person A to Person Z) ──────────────────
const PERSON_ROSTER = [
  { id: 'CIT-001', name: 'Person A', ulpin: 'IN-AP-040B-FL01-A', floor: 'Floor 1 (Flat 101)', size: '145 m²', loan: 'HDFC Home Loan: ₹18,00,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-002', name: 'Person B', ulpin: 'IN-AP-040B-FL01-B', floor: 'Floor 1 (Shop 1)', size: '210 m²', loan: 'ICICI Commercial Loan: ₹75,00,000', type: 'Commercial', status: 'Verified Owner' },
  { id: 'CIT-003', name: 'Person C', ulpin: 'IN-AP-040B-FL02-C', floor: 'Floor 2 (Flat 202)', size: '160 m²', loan: 'No Loan (Debt Free)', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-004', name: 'Person D', ulpin: 'IN-AP-040B-FL01-D', floor: 'Floor 1 (Flat 104)', size: '130 m²', loan: 'Axis Bank Loan: ₹15,20,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-005', name: 'Person E', ulpin: 'IN-AP-040B-FL03-E', floor: 'Floor 3 (Flat 301)', size: '175 m²', loan: 'SBI Home Loan: ₹22,00,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-006', name: 'Person F', ulpin: 'IN-AP-040B-FL03-F', floor: 'Floor 3 (Flat 302)', size: '185 m²', loan: 'Canara Bank Loan: ₹19,50,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-007', name: 'Person G', ulpin: 'IN-AP-040B-FL04-G', floor: 'Floor 4 (Flat 401)', size: '190 m²', loan: 'No Loan (Clear Title)', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-008', name: 'Person H', ulpin: 'IN-AP-040B-FL04-H', floor: 'Floor 4 (Flat 402)', size: '195 m²', loan: 'Bank of Baroda: ₹24,00,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-009', name: 'Person I', ulpin: 'IN-AP-040B-FL05-I', floor: 'Floor 5 (Tower 1)', size: '240 m²', loan: 'Union Bank Loan: ₹31,00,000', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-010', name: 'Person J', ulpin: 'IN-AP-040B-FL05-J', floor: 'Floor 5 (Tower 2)', size: '240 m²', loan: 'No Loan (Clear Title)', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-011', name: 'Person K', ulpin: 'IN-AP-040B-FL06-K', floor: 'Floor 6 (Penthouse)', size: '320 m²', loan: 'Kotak Bank Loan: ₹45,00,000', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-012', name: 'Person L', ulpin: 'IN-AP-040B-FL02-L', floor: 'Floor 2 (Office 2A)', size: '280 m²', loan: 'ICICI Business Loan: ₹55,00,000', type: 'Commercial', status: 'Verified Owner' },
  { id: 'CIT-013', name: 'Person M', ulpin: 'IN-AP-040B-FL03-M', floor: 'Floor 3 (Office 3A)', size: '290 m²', loan: 'HDFC Business Loan: ₹60,00,000', type: 'Commercial', status: 'Verified Owner' },
  { id: 'CIT-014', name: 'Person N', ulpin: 'IN-AP-040B-FL01-N', floor: 'Floor 1 (Flat 102)', size: '150 m²', loan: 'SBI Loan: ₹16,80,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-015', name: 'Person O', ulpin: 'IN-AP-040B-FL02-O', floor: 'Floor 2 (Flat 203)', size: '155 m²', loan: 'No Loan (Clear Title)', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-016', name: 'Person P', ulpin: 'IN-AP-040B-FL03-P', floor: 'Floor 3 (Flat 303)', size: '165 m²', loan: 'PNB Home Loan: ₹17,50,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-017', name: 'Person Q', ulpin: 'IN-AP-040B-FL04-Q', floor: 'Floor 4 (Flat 403)', size: '170 m²', loan: 'Axis Bank: ₹21,00,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-018', name: 'Person R', ulpin: 'IN-AP-040B-FL05-R', floor: 'Floor 5 (Tower 3)', size: '250 m²', loan: 'No Loan (Clear Title)', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-019', name: 'Person S', ulpin: 'IN-AP-040B-FL06-S', floor: 'Floor 6 (Tower 3)', size: '260 m²', loan: 'HDFC Loan: ₹38,00,000', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-020', name: 'Person T', ulpin: 'IN-AP-040B-FL07-T', floor: 'Floor 7 (Tower 3)', size: '270 m²', loan: 'SBI Loan: ₹42,00,000', type: 'Apartments', status: 'Verified Owner' },
  { id: 'CIT-021', name: 'Person U', ulpin: 'IN-AP-040B-FL01-U', floor: 'Floor 1 (Clinic)', size: '180 m²', loan: 'ICICI Loan: ₹30,00,000', type: 'Commercial', status: 'Verified Owner' },
  { id: 'CIT-022', name: 'Person V', ulpin: 'IN-AP-040B-FL02-V', floor: 'Floor 2 (Studio)', size: '120 m²', loan: 'No Loan (Clear Title)', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-023', name: 'Person W', ulpin: 'IN-AP-040B-FL03-W', floor: 'Floor 3 (Studio)', size: '125 m²', loan: 'Federal Bank: ₹11,50,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-024', name: 'Person X', ulpin: 'IN-AP-040B-FL02',   floor: 'Floor 2 (Flat 201)', size: '180 m²', loan: 'State Bank Loan: ₹28,50,000', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-025', name: 'Person Y', ulpin: 'IN-AP-040B-FL01',   floor: 'Floor 1 (Ground Floor)', size: '220 m²', loan: 'No Loan (Clear Title)', type: 'Residential', status: 'Verified Owner' },
  { id: 'CIT-026', name: 'Person Z', ulpin: 'IN-AP-040B-FL04',   floor: 'Floor 4 (Penthouse)', size: '350 m²', loan: 'Mortgage Cleared (NOC Issued)', type: 'Apartments', status: 'Original Title' }
];

// ── ROLE DEFINITIONS & RESTRICTIONS ──────────────────────────
const USER_ROLES = {
  citizen: {
    key: 'citizen',
    name: 'Person X',
    roleTitle: 'Registered Citizen',
    avatar: 'PX',
    icon: '👤',
    actionBtnText: 'Apply For Transfer',
    bannerTitle: 'Welcome, Person X (Citizen Mode)',
    bannerDesc: 'You can check your property ownership, view 3D house boundaries, see your bank loan status, and apply to transfer property names.',
    allowedActions: ['apply_transfer', 'view_records', 'search_property']
  },
  advocate: {
    key: 'advocate',
    name: 'Advocate Verma',
    roleTitle: 'Legal Counsel / Advocate',
    avatar: 'AV',
    icon: '⚖️',
    actionBtnText: 'Run Title Search Audit',
    bannerTitle: 'Advocate Legal Workspace',
    bannerDesc: 'Verify 30-year chain of title deeds (Person Z ➔ Person Y ➔ Person X), inspect non-encumbrance certificates, and audit mortgage liens.',
    allowedActions: ['view_records', 'title_search', 'audit_deeds', 'search_property']
  },
  employee: {
    key: 'employee',
    name: 'Tahsildar K. Rao',
    roleTitle: 'Revenue Officer / Govt. Employee',
    avatar: 'TR',
    icon: '🏛️',
    actionBtnText: 'Approve Pending Mutations',
    bannerTitle: 'Government Revenue Officer Console',
    bannerDesc: 'Authorize and approve property name mutations, verify cadastral boundary surveys, and mint official 3D-ULPIN property certificates.',
    allowedActions: ['approve_mutation', 'mint_ulpin', 'view_records', 'override_bounds', 'search_property']
  },
  surveyor: {
    key: 'surveyor',
    name: 'Surveyor Anand',
    roleTitle: 'Cadastral Surveyor / Engineer',
    avatar: 'SA',
    icon: '📐',
    actionBtnText: 'Digitize New Blueprint',
    bannerTitle: 'Cadastral Surveyor & Spatial Studio',
    bannerDesc: 'Georeference old revenue maps, extract parcel boundary polygons, and inspect 3D volumetric coordinates.',
    allowedActions: ['digitize_map', 'verify_coordinates', 'view_records', 'search_property']
  },
  bank: {
    key: 'bank',
    name: 'Loan Officer Priya',
    roleTitle: 'State Bank Mortgage Officer',
    avatar: 'LP',
    icon: '🏦',
    actionBtnText: 'Stamp New Mortgage Lien',
    bannerTitle: 'Bank Mortgage & Valuation Desk',
    bannerDesc: 'Stamp home loan encumbrances (Active: ₹28,50,000 on Property ID IN-AP-040B-FL02), verify property valuations, and release loan clearances.',
    allowedActions: ['stamp_lien', 'issue_noc', 'view_records', 'search_property']
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

  const rbIcon = document.getElementById('rbIcon');
  const rbTitle = document.getElementById('rbTitle');
  const rbDesc = document.getElementById('rbDesc');
  const rbActionBtn = document.getElementById('btnRolePrimaryAction');
  const hudRole = document.getElementById('hudRoleName');

  if (rbIcon) rbIcon.textContent = role.icon;
  if (rbTitle) rbTitle.textContent = role.bannerTitle;
  if (rbDesc) rbDesc.textContent = role.bannerDesc;
  if (rbActionBtn) rbActionBtn.textContent = role.actionBtnText;
  if (hudRole) hudRole.textContent = `${role.roleTitle} (${role.name})`;

  const fAvatar = document.getElementById('footerAvatar');
  const fName = document.getElementById('footerUserName');
  const fRole = document.getElementById('footerUserRole');
  if (fAvatar) fAvatar.textContent = role.avatar;
  if (fName) fName.textContent = role.name;
  if (fRole) fRole.textContent = role.roleTitle;
}
window.changeUserRole = changeUserRole;

function executeRoleAction() {
  const role = USER_ROLES[currentRoleKey];
  if (currentRoleKey === 'citizen') {
    switchPage('mutations');
    alert('Citizen Action: Please fill out the Property Transfer form to submit deed papers to Tahsildar.');
  } else if (currentRoleKey === 'advocate') {
    switchPage('ledger');
    alert('Advocate Action: 30-Year Title Search completed for Property IN-AP-040B-FL02. All deed hashes verified against blockchain.');
  } else if (currentRoleKey === 'employee') {
    switchPage('mutations');
    alert('Govt. Officer Action: Reviewing pending mutation application TRF-3102. Ready to sign digital approval certificate.');
  } else if (currentRoleKey === 'surveyor') {
    switchPage('cartography');
  } else if (currentRoleKey === 'bank') {
    switchPage('ledger');
    alert('Bank Officer Action: Mortgage verification active. State Bank Lien of ₹28,50,000 stamped on Property IN-AP-040B-FL02.');
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
  generator:   'Create Property ID',
  ledger:      'Check Ownership & Loans',
  ownership:   'Property Owners List',
  mutations:   'Ownership Transfer Status',
  cartography: 'Old Map Digitizer',
  gateway:     'Security & Logins',
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

// ── 3D BUILDINGS DEFINITIONS WITH FLOOR-BY-FLOOR DATA ────────
const TYPE_PALETTE = {
  residential: '#10b981',
  commercial:  '#6366f1',
  mixed:       '#06b6d4'
};

// Map of 16 building complexes with dedicated floor-level 3D-ULPINs and personalized loans
const NEIGHBOURHOOD_BUILDINGS = [
  {
    id: 'NZ-01', x: -36, z: 22, w: 10, d: 8, floors: 4, type: 'residential', name: 'House Block Z-1',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-1', label: 'Ground Floor', owner: 'Person Y', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-1', label: 'Floor 1 (Flat 101)', owner: 'Person Y', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-1', label: 'Floor 2 (Flat 201)', owner: 'Person E', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'SBI Home Loan: ₹22,00,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-1', label: 'Floor 3 (Flat 301)', owner: 'Person F', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'Canara Bank: ₹19,50,000' }
    ]
  },
  {
    id: 'NZ-02', x: -22, z: 22, w: 10, d: 8, floors: 4, type: 'residential', name: 'House Block Z-2',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-2', label: 'Ground Floor', owner: 'Person A', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'HDFC Home Loan: ₹18,00,000' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-2', label: 'Floor 1 (Flat 101)', owner: 'Person A', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'HDFC Home Loan: ₹18,00,000' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-2', label: 'Floor 2 (Flat 201)', owner: 'Person N', prevOwner: 'Person A', origOwner: 'Person Z', loan: 'SBI Loan: ₹16,80,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-2', label: 'Floor 3 (Flat 301)', owner: 'Person O', prevOwner: 'Person A', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' }
    ]
  },
  {
    id: 'NZ-03', x: -8, z: 22, w: 10, d: 8, floors: 4, type: 'commercial', name: 'Commercial Block Z-3',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-3', label: 'Ground Retail', owner: 'Person B', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'ICICI Commercial Loan: ₹75,00,000' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-3', label: 'Floor 1 (Shop 1)', owner: 'Person B', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'ICICI Commercial Loan: ₹75,00,000' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-3', label: 'Floor 2 (Office 2A)', owner: 'Person L', prevOwner: 'Person B', origOwner: 'Person Z', loan: 'ICICI Business Loan: ₹55,00,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-3', label: 'Floor 3 (Office 3A)', owner: 'Person M', prevOwner: 'Person B', origOwner: 'Person Z', loan: 'HDFC Business Loan: ₹60,00,000' }
    ]
  },
  {
    id: 'NZ-04', x: 6, z: 22, w: 10, d: 8, floors: 4, type: 'residential', name: 'House Block Z-4 (Person X)',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-4', label: 'Ground Floor (Base)', owner: 'Person Y', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-4', label: 'Floor 1 (Flat 101)', owner: 'Person Y', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02',   label: 'Floor 2 (Flat 201)', owner: 'Person X', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'State Bank Loan: ₹28,50,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-4', label: 'Floor 3 (Penthouse)', owner: 'Person G', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' }
    ]
  },
  {
    id: 'NZ-05', x: 20, z: 22, w: 10, d: 8, floors: 4, type: 'residential', name: 'House Block Z-5',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-5', label: 'Ground Floor', owner: 'Person C', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'No Loan (Debt Free)' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-5', label: 'Floor 1 (Flat 101)', owner: 'Person C', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'No Loan (Debt Free)' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-5', label: 'Floor 2 (Flat 201)', owner: 'Person H', prevOwner: 'Person C', origOwner: 'Person Z', loan: 'Bank of Baroda: ₹24,00,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-5', label: 'Floor 3 (Flat 301)', owner: 'Person P', prevOwner: 'Person C', origOwner: 'Person Z', loan: 'PNB Home Loan: ₹17,50,000' }
    ]
  },
  {
    id: 'NZ-06', x: 34, z: 22, w: 9, d: 8, floors: 3, type: 'residential', name: 'House Block Z-6',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-6', label: 'Ground Floor', owner: 'Person D', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'Axis Bank Loan: ₹15,20,000' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-D', label: 'Floor 1 (Flat 101)', owner: 'Person D', prevOwner: 'Person Z', origOwner: 'Person Z', loan: 'Axis Bank Loan: ₹15,20,000' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-6', label: 'Floor 2 (Flat 201)', owner: 'Person Q', prevOwner: 'Person D', origOwner: 'Person Z', loan: 'Axis Bank: ₹21,00,000' }
    ]
  },
  {
    id: 'NZ-07', x: -36, z: 6, w: 10, d: 9, floors: 6, type: 'residential', name: 'Apartment Block Z-7',
    floorData: [
      { floor: 0, ulpin: 'IN-AP-040B-FL00-7', label: 'Ground Floor', owner: 'Person X', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 1, ulpin: 'IN-AP-040B-FL01-7', label: 'Floor 1 (Flat 101)', owner: 'Person X', prevOwner: 'Person Y', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 2, ulpin: 'IN-AP-040B-FL02-7', label: 'Floor 2 (Flat 201)', owner: 'Person U', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'ICICI Loan: ₹30,00,000' },
      { floor: 3, ulpin: 'IN-AP-040B-FL03-7', label: 'Floor 3 (Flat 301)', owner: 'Person V', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'No Loan (Clear Title)' },
      { floor: 4, ulpin: 'IN-AP-040B-FL04-7', label: 'Floor 4 (Flat 401)', owner: 'Person W', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'Federal Bank: ₹11,50,000' },
      { floor: 5, ulpin: 'IN-AP-040B-FL05-7', label: 'Floor 5 (Penthouse)', owner: 'Person K', prevOwner: 'Person X', origOwner: 'Person Z', loan: 'Kotak Bank: ₹45,00,000' }
    ]
  },
  {
    id: 'NZ-14', x: -14, z: -14, w: 13, d: 11, floors: 12, type: 'mixed', name: 'Green Crest Tower 1',
    floorData: Array.from({ length: 12 }, (_, i) => ({
      floor: i + 1,
      ulpin: `IN-AP-040B-T1-FL0${i+1}`,
      label: `Floor ${i+1} (Unit ${i+1}01)`,
      owner: (i === 1) ? 'Person X' : (i % 2 === 0) ? `Person ${String.fromCharCode(65 + (i % 20))}` : 'Person Y',
      prevOwner: 'Person Z',
      origOwner: 'Person Z',
      loan: (i === 1) ? 'State Bank: ₹28,50,000' : (i % 3 === 0) ? `HDFC Loan: ₹${25 + i * 2},00,000` : 'No Loan (Clear Title)'
    }))
  }
];

// ── THREE.JS VIEWER WITH DYNAMIC FLOOR SELECTION ──────────────
class ThreeCadastreViewer {
  constructor(containerId, isHeroMini = false) {
    this.container = document.getElementById(containerId);
    this.isHeroMini = isHeroMini;
    this.viewMode = 'storey';
    this.maxFloorsVisible = 12;
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
    this.scene.fog = new THREE.FogExp2(0x080c16, 0.007);

    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 1000);
    this.defaultCamPos = this.isHeroMini ? new THREE.Vector3(70, 65, 80) : new THREE.Vector3(85, 75, 95);
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
      this.controls.maxDistance = 300;
      this.controls.target.set(0, 10, 0);
    }

    this.setupLighting();
    this.buildTerrain();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('click', (e) => this.onCanvasClick(e));
    this.renderer.domElement.addEventListener('mousemove', (e) => this.onCanvasMouseMove(e));
    this.renderer.domElement.addEventListener('mouseleave', () => this.hideHoverTooltip());

    this.buildBuildings();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xdbeafe, 0.65);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.95);
    this.sunLight.position.set(60, 100, 45);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.scene.add(this.sunLight);

    this.fillLight = new THREE.DirectionalLight(0x38bdf8, 0.35);
    this.fillLight.position.set(-60, 40, -40);
    this.scene.add(this.fillLight);
  }

  setLightingMode(mode) {
    this.lightingMode = mode;
    if (mode === 'day') {
      this.scene.background.setHex(0x080c16);
      this.scene.fog.color.setHex(0x080c16);
      this.ambientLight.color.setHex(0xdbeafe);
      this.ambientLight.intensity = 0.65;
      this.sunLight.color.setHex(0xffffff);
      this.sunLight.intensity = 0.95;
    } else if (mode === 'sunset') {
      this.scene.background.setHex(0x181024);
      this.scene.fog.color.setHex(0x181024);
      this.ambientLight.color.setHex(0xfbbf24);
      this.ambientLight.intensity = 0.55;
      this.sunLight.color.setHex(0xf97316);
      this.sunLight.intensity = 0.90;
    } else if (mode === 'night') {
      this.scene.background.setHex(0x03060d);
      this.scene.fog.color.setHex(0x03060d);
      this.ambientLight.color.setHex(0x38bdf8);
      this.ambientLight.intensity = 0.35;
      this.sunLight.color.setHex(0x60a5fa);
      this.sunLight.intensity = 0.40;
    }
  }

  buildTerrain() {
    const groundGeo = new THREE.PlaneGeometry(240, 240, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x0e1726, roughness: 0.85 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const grid = new THREE.GridHelper(240, 48, 0x38bdf8, 0x1e293b);
    grid.position.y = 0.05;
    this.scene.add(grid);

    const riverGeo = new THREE.PlaneGeometry(240, 35);
    const riverMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, transparent: true, opacity: 0.7 });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.08, -55);
    this.scene.add(river);

    const roadMat = new THREE.MeshStandardMaterial({ color: 0x182035, roughness: 0.9 });
    const r1 = new THREE.Mesh(new THREE.PlaneGeometry(240, 7), roadMat);
    r1.rotation.x = -Math.PI / 2;
    r1.position.set(0, 0.06, 14);
    r1.receiveShadow = true;
    this.scene.add(r1);

    [-42, -15, 13, 40].forEach(rx => {
      const rCross = new THREE.Mesh(new THREE.PlaneGeometry(6, 120), roadMat);
      rCross.rotation.x = -Math.PI / 2;
      rCross.position.set(rx, 0.06, 8);
      rCross.receiveShadow = true;
      this.scene.add(rCross);
    });
  }

  buildBuildings() {
    this.buildingMeshes.forEach(m => this.scene.remove(m));
    this.buildingMeshes = [];

    const floorHeight = 2.4;
    const slabThick = 0.28;
    const explodeGap = this.isExploded ? 1.2 : 0;

    NEIGHBOURHOOD_BUILDINGS.forEach(b => {
      const isFiltered = (this.activeTypeFilter === 'all' || b.type === this.activeTypeFilter);
      const group = new THREE.Group();
      group.userData = { ...b };

      const bColor = new THREE.Color(TYPE_PALETTE[b.type] || '#10b981');

      // Footing pad
      const footingPad = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 1.2, 0.6, b.d + 1.2),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
      );
      footingPad.position.set(0, 0.3, 0);
      footingPad.receiveShadow = true;
      footingPad.castShadow = true;
      footingPad.userData = {
        buildingId: b.id,
        ulpin_3d: `${b.floorData[0] ? b.floorData[0].ulpin : 'IN-AP-040B-FL00'}`,
        floorLabel: 'Ground Foundation',
        owner: b.floorData[0] ? b.floorData[0].owner : 'Person Y',
        prevOwner: 'Person Z',
        loan: 'No Loan (Clear Title)',
        type: b.type,
        name: b.name
      };
      group.add(footingPad);

      if (this.viewMode === 'solid') {
        const totalH = b.floors * floorHeight;
        const solidMesh = new THREE.Mesh(
          new THREE.BoxGeometry(b.w, totalH, b.d),
          new THREE.MeshStandardMaterial({
            color: bColor,
            roughness: 0.35,
            transparent: !isFiltered,
            opacity: isFiltered ? 0.95 : 0.25
          })
        );
        solidMesh.position.set(0, 0.6 + totalH / 2, 0);
        solidMesh.castShadow = true;
        solidMesh.receiveShadow = true;
        solidMesh.userData = {
          buildingId: b.id,
          ulpin_3d: b.floorData[1] ? b.floorData[1].ulpin : 'IN-AP-040B-FL01',
          floorLabel: `Solid Building (${b.floors} Floors)`,
          owner: b.floorData[1] ? b.floorData[1].owner : 'Person X',
          prevOwner: 'Person Y',
          loan: b.floorData[1] ? b.floorData[1].loan : 'State Bank Loan',
          type: b.type,
          name: b.name
        };
        group.add(solidMesh);

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(solidMesh.geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: isFiltered ? 0.35 : 0.1 })
        );
        edges.position.copy(solidMesh.position);
        group.add(edges);

      } else {
        const visibleFloors = Math.min(b.floors, this.maxFloorsVisible);

        for (let f = 0; f < visibleFloors; f++) {
          const fData = (b.floorData && b.floorData[f]) ? b.floorData[f] : {
            floor: f + 1,
            ulpin: `IN-AP-040B-FL0${f+1}`,
            label: `Floor ${f+1} (Flat ${f+1}01)`,
            owner: `Person ${String.fromCharCode(65 + ((f * 3) % 26))}`,
            prevOwner: 'Person Y',
            loan: (f % 2 === 0) ? `SBI Loan: ₹${18 + f * 4},00,000` : 'No Loan (Clear Title)'
          };

          const floorGroup = new THREE.Group();
          const floorBaseY = 0.6 + f * (floorHeight + explodeGap);

          // Floor Slab Mesh
          const slab = new THREE.Mesh(
            new THREE.BoxGeometry(b.w + 0.3, slabThick, b.d + 0.3),
            new THREE.MeshStandardMaterial({
              color: 0x475569,
              roughness: 0.6,
              transparent: !isFiltered,
              opacity: isFiltered ? 1.0 : 0.25
            })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          slab.castShadow = true;
          slab.receiveShadow = true;
          slab.userData = {
            buildingId: b.id,
            ulpin_3d: fData.ulpin,
            floorLabel: fData.label,
            owner: fData.owner,
            prevOwner: fData.prevOwner,
            origOwner: 'Person Z',
            loan: fData.loan,
            type: b.type,
            name: b.name,
            floor: f + 1
          };
          floorGroup.add(slab);

          // Floor Walls Mesh
          const wallH = floorHeight - slabThick;
          const wall = new THREE.Mesh(
            new THREE.BoxGeometry(b.w, wallH, b.d),
            new THREE.MeshStandardMaterial({
              color: bColor,
              roughness: 0.45,
              transparent: !isFiltered,
              opacity: isFiltered ? 0.85 : 0.2
            })
          );
          wall.position.set(0, floorBaseY + slabThick + wallH / 2, 0);
          wall.castShadow = true;
          wall.receiveShadow = true;
          wall.userData = slab.userData; // Share exact floor metadata
          floorGroup.add(wall);

          group.add(floorGroup);
        }

        if (visibleFloors === b.floors) {
          const roofY = 0.6 + b.floors * (floorHeight + explodeGap);
          const roof = new THREE.Mesh(
            new THREE.ConeGeometry(Math.max(b.w, b.d) * 0.72, 2.2, 4),
            new THREE.MeshStandardMaterial({
              color: 0x991b1b,
              roughness: 0.5,
              transparent: !isFiltered,
              opacity: isFiltered ? 1.0 : 0.25
            })
          );
          roof.position.set(0, roofY + 1.1, 0);
          roof.rotation.y = Math.PI / 4;
          roof.castShadow = true;
          roof.userData = {
            buildingId: b.id,
            ulpin_3d: `${b.floorData[b.floors - 1] ? b.floorData[b.floors - 1].ulpin : 'IN-AP-040B-ROOF'}`,
            floorLabel: 'Roof / Terrace',
            owner: 'Common Property Unit',
            prevOwner: 'Person Z',
            loan: 'No Loan (Common Area)',
            type: b.type,
            name: b.name
          };
          group.add(roof);
        }
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
      if (hit.object && hit.object.userData && hit.object.userData.ulpin_3d) {
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

    const idElem = document.getElementById(this.isHeroMini ? 'thtId' : 'fullThtId');
    const ownerElem = document.getElementById(this.isHeroMini ? 'thtOwner' : 'fullThtOwner');
    const floorElem = document.getElementById(this.isHeroMini ? 'thtFloor' : 'fullThtFloor');
    const loanElem = document.getElementById(this.isHeroMini ? 'thtLoan' : 'fullThtLoan');

    if (idElem) idElem.textContent = data.ulpin_3d;
    if (ownerElem) ownerElem.textContent = `Owner: ${data.owner}`;
    if (floorElem) floorElem.textContent = data.floorLabel || `Floor ${data.floor || '1'}`;
    if (loanElem) loanElem.textContent = `Loan: ${data.loan || 'No Loan (Clear Title)'}`;

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
      if (hit.object && hit.object.userData && hit.object.userData.ulpin_3d) {
        updateAllPropertyDetails(hit.object.userData);
        
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
    const endCam = new THREE.Vector3(targetX + 32, 26, targetZ + 32);
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
    this.buildBuildings();
  }

  setFilterType(type) {
    this.activeTypeFilter = type;
    this.buildBuildings();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.buildBuildings();
  }

  sliceFloors(maxFloors) {
    this.maxFloorsVisible = parseInt(maxFloors);
    this.buildBuildings();
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

// ── UPDATE UI PANELS DYNAMICALLY PER FLOOR & PERSON ───────────
function updateAllPropertyDetails(data) {
  const ulpin = data.ulpin_3d || 'IN-AP-040B-FL02';
  const owner = data.owner || 'Person X';
  const prevOwner = data.prevOwner || 'Person Y';
  const origOwner = data.origOwner || 'Person Z';
  const name = data.name || 'House Block Z-4';
  const floorLabel = data.floorLabel || (data.floor ? `Floor ${data.floor}` : 'Floor 2 (Flat 201)');
  const loan = data.loan || 'State Bank Loan: ₹28,50,000';
  const type = data.type || 'residential';

  // Dashboard Dossier
  const dVal = document.getElementById('dashUlpinVal');
  const dBadge = document.getElementById('dashUlpinBadge');
  const dFloor = document.getElementById('dashFloorLevelVal');
  const dOwner = document.getElementById('dashOwnerVal');
  const dPrev = document.getElementById('dashPrevOwnerVal');
  const dOrig = document.getElementById('dashOrigOwnerVal');
  const dLoan = document.getElementById('dashMortgageVal');

  if (dVal) dVal.textContent = ulpin;
  if (dBadge) dBadge.textContent = `ID: ${ulpin}`;
  if (dFloor) dFloor.textContent = floorLabel;
  if (dOwner) dOwner.textContent = `${owner} (100% Ownership)`;
  if (dPrev) dPrev.textContent = `${prevOwner} (Previous Owner)`;
  if (dOrig) dOrig.textContent = `${origOwner} (Original 1987 Owner)`;
  if (dLoan) {
    dLoan.textContent = loan;
    dLoan.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }

  // 3D Map Explorer
  const inspUlpin = document.getElementById('inspUlpin');
  const inspFloor = document.getElementById('inspFloorLevel');
  const inspOwner = document.getElementById('inspOwner');
  const inspPrev = document.getElementById('inspPrevOwner');
  const inspLoan = document.getElementById('inspLoanBadge');

  if (inspUlpin) inspUlpin.textContent = ulpin;
  if (inspFloor) inspFloor.textContent = `${floorLabel} · ${name}`;
  if (inspOwner) inspOwner.textContent = owner;
  if (inspPrev) inspPrev.textContent = prevOwner;
  if (inspLoan) {
    inspLoan.textContent = loan;
    inspLoan.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }

  // Legal Ledger
  const lUlpin = document.getElementById('lUlpin');
  const lOwner = document.getElementById('lOwner');
  const lFloor = document.getElementById('lFloorLevel');
  const lName = document.getElementById('lName');
  const lRrrOwner = document.getElementById('lRrrOwner');
  const lRrrLoan = document.getElementById('lRrrLoan');
  const lRrrLoanBadge = document.getElementById('lRrrLoanBadge');
  const lTitle = document.getElementById('ledgerDossierTitle');
  const lDocDeed = document.getElementById('lDocDeedMeta');

  if (lUlpin) lUlpin.textContent = ulpin;
  if (lOwner) lOwner.textContent = `${owner} (100% Title)`;
  if (lFloor) lFloor.textContent = floorLabel;
  if (lName) lName.textContent = name;
  if (lRrrOwner) lRrrOwner.textContent = `${owner} (100% Full Owner)`;
  if (lRrrLoan) lRrrLoan.textContent = loan;
  if (lRrrLoanBadge) {
    lRrrLoanBadge.textContent = loan.includes('No Loan') ? 'Debt Free ✓' : 'Mortgage Active';
    lRrrLoanBadge.className = loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow';
  }
  if (lTitle) lTitle.textContent = `Floor Record: ${ulpin}`;
  if (lDocDeed) lDocDeed.textContent = `Transferred from ${prevOwner} to ${owner}`;

  // Update Ownership Chain Avatars & Names
  const cName1 = document.getElementById('chainName1');
  const cName2 = document.getElementById('chainName2');
  const cName3 = document.getElementById('chainName3');
  const cAv1 = document.getElementById('chainAvatar1');
  const cAv2 = document.getElementById('chainAvatar2');
  const cAv3 = document.getElementById('chainAvatar3');

  if (cName1) cName1.textContent = owner;
  if (cName2) cName2.textContent = prevOwner;
  if (cName3) cName3.textContent = origOwner;
  if (cAv1) cAv1.textContent = owner.replace('Person ', 'P');
  if (cAv2) cAv2.textContent = prevOwner.replace('Person ', 'P');
  if (cAv3) cAv3.textContent = origOwner.replace('Person ', 'P');
}
window.updateAllPropertyDetails = updateAllPropertyDetails;

let dashEngine = null;
let fullEngine = null;

function toggleExplodeFloors() {
  if (dashEngine) dashEngine.toggleExplode();
  if (fullEngine) fullEngine.toggleExplode();
  const btn = document.getElementById('btnExplodeFloors');
  const btnFull = document.getElementById('btnExplodeFull');
  const active = dashEngine && dashEngine.isExploded;
  if (btn) btn.style.borderColor = active ? '#06b6d4' : '';
  if (btnFull) btnFull.innerHTML = active ? '<span>Collapse Floors</span>' : '<span>Explode Floor Slices</span>';
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
    dashEngine.controls.target.set(0, 10, 0);
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
  if (disp) disp.textContent = val >= 12 ? 'All Floors (Ground to Roof)' : `Floors 1 to ${val}`;
  if (fullEngine) fullEngine.sliceFloors(val);
}
window.sliceBuildingFloors = sliceBuildingFloors;

function resetFullCamera() {
  if (fullEngine && fullEngine.controls) {
    fullEngine.camera.position.copy(fullEngine.defaultCamPos);
    fullEngine.controls.target.set(0, 10, 0);
  }
}
window.resetFullCamera = resetFullCamera;

function setCameraViewpoint(type) {
  if (!fullEngine) return;
  if (type === 'iso') {
    fullEngine.camera.position.set(85, 75, 95);
    fullEngine.controls.target.set(0, 10, 0);
  } else if (type === 'top') {
    fullEngine.camera.position.set(0, 140, 0.1);
    fullEngine.controls.target.set(0, 0, 0);
  } else if (type === 'front') {
    fullEngine.camera.position.set(0, 20, 120);
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

function previewFloorUlpin(val) {
  document.getElementById('mintedUlpin').textContent = `IN-AP-040B-${val}`;
}
window.previewFloorUlpin = previewFloorUlpin;

function generateNewUlpin(event) {
  event.preventDefault();
  const floor = document.getElementById('genFloor').value;
  const newUlpin = `IN-AP-040B-${floor}`;
  const owner = document.getElementById('genOwnerName').value || 'Person X';
  const loan = document.getElementById('genLoanAmount').value || 'No Loan (Clear Title)';

  document.getElementById('mintedUlpin').textContent = newUlpin;
  document.getElementById('mintedOwner').textContent = owner;
  document.getElementById('mintedLoan').textContent = loan;

  updateAllPropertyDetails({
    ulpin_3d: newUlpin,
    owner: owner,
    prevOwner: 'Person Y',
    origOwner: 'Person Z',
    floorLabel: `Floor ${floor.replace('FL', '')}`,
    loan: loan,
    name: `Newly Registered House Unit`
  });
}
window.generateNewUlpin = generateNewUlpin;

function executeLedgerQuery() {
  const query = document.getElementById('ledgerQueryInput').value.trim();
  if (!query) return;

  const matchPerson = PERSON_ROSTER.find(p => p.ulpin.toLowerCase() === query.toLowerCase() || p.name.toLowerCase() === query.toLowerCase());
  if (matchPerson) {
    updateAllPropertyDetails({
      ulpin_3d: matchPerson.ulpin,
      owner: matchPerson.name,
      prevOwner: 'Person Y',
      origOwner: 'Person Z',
      floorLabel: matchPerson.floor,
      loan: matchPerson.loan,
      name: `${matchPerson.name}'s Property Unit`
    });
  } else {
    updateAllPropertyDetails({
      ulpin_3d: query,
      owner: 'Person X',
      prevOwner: 'Person Y',
      origOwner: 'Person Z',
      floorLabel: 'Floor 2 (Flat 201)',
      loan: 'State Bank Loan: ₹28,50,000',
      name: 'Queried House Unit'
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

// Populate Person A through Person Z in the Owners Table
function populateOwnersTable() {
  const tbody = document.getElementById('ownersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  PERSON_ROSTER.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="mono">${p.id}</td>
      <td><div class="owner-cell"><div class="mini-avatar">${p.name.replace('Person ', 'P')}</div><strong>${p.name}</strong></div></td>
      <td class="mono text-cyan font-bold">${p.ulpin}</td>
      <td>${p.floor}</td>
      <td>${p.size}</td>
      <td><span class="${p.loan.includes('No Loan') ? 'badge badge-green' : 'badge badge-yellow'}">${p.loan}</span></td>
      <td><span class="badge badge-green">${p.status}</span></td>
      <td><button class="btn-sm btn-outline" onclick="inspectPersonProperty('${p.ulpin}')">View</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function inspectPersonProperty(ulpin) {
  switchPage('ledger');
  document.getElementById('ledgerQueryInput').value = ulpin;
  executeLedgerQuery();
}
window.inspectPersonProperty = inspectPersonProperty;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    dashEngine = new ThreeCadastreViewer('dashThreeCanvasContainer', true);
  }, 100);

  setTimeout(() => {
    fullEngine = new ThreeCadastreViewer('fullThreeCanvasContainer', false);
  }, 200);

  populateOwnersTable();
  changeUserRole('citizen');
});
