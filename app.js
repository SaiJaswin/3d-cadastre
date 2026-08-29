/* ─────────────────────────────────────────────────────────────
   Digital Land & Property Portal — app.js
   With:
   - Dynamic Persona/Role Switcher (Citizen, Advocate, Employee, Surveyor, Bank)
   - Person X, Person Y, Person Z
   - Three.js Grounded 3D Engine
───────────────────────────────────────────────────────────── */

// ── ROLE DEFINITIONS & SWITCHER ──────────────────────────────
const USER_ROLES = {
  citizen: {
    name: 'Person X',
    roleTitle: 'Registered Citizen',
    avatar: 'PX',
    icon: '👤',
    badge: 'Citizen Access',
    bannerTitle: 'Welcome, Person X (Citizen Mode)',
    bannerDesc: 'You can check your property ownership, view 3D house boundaries, see bank loan status, and apply to transfer property names.'
  },
  advocate: {
    name: 'Advocate Verma',
    roleTitle: 'Legal Counsel / Advocate',
    avatar: 'AV',
    icon: '⚖️',
    badge: 'Legal Due Diligence Mode',
    bannerTitle: 'Advocate Legal Workspace',
    bannerDesc: 'Verify 30-year chain of title deeds (Person Z ➔ Person Y ➔ Person X), inspect non-encumbrance certificates, and audit mortgage liens.'
  },
  employee: {
    name: 'Tahsildar K. Rao',
    roleTitle: 'Revenue Officer / Govt. Employee',
    avatar: 'TR',
    icon: '🏛️',
    badge: 'Official Govt. Authority',
    bannerTitle: 'Government Revenue Officer Console',
    bannerDesc: 'Authorize and approve property name mutations, verify cadastral boundary surveys, and mint official 3D-ULPIN property certificates.'
  },
  surveyor: {
    name: 'Surveyor Anand',
    roleTitle: 'Cadastral Surveyor / Engineer',
    avatar: 'SA',
    icon: '📐',
    badge: 'Survey & Spatial Mode',
    bannerTitle: 'Cadastral Surveyor & Spatial Studio',
    bannerDesc: 'Georeference old revenue maps, extract parcel boundary polygons, and ensure 100% solid foundation grounding on elevation datum (+47.30m).'
  },
  bank: {
    name: 'Loan Officer Priya',
    roleTitle: 'State Bank Mortgage Officer',
    avatar: 'LP',
    icon: '🏦',
    badge: 'Banking & Lien Portal',
    bannerTitle: 'Bank Mortgage & Valuation Desk',
    bannerDesc: 'Stamp home loan encumbrances (Active: ₹35,00,000 on Property ID IN-AP-040B-FL02), verify property valuations, and release loan clearances.'
  }
};

function changeUserRole(roleKey) {
  const role = USER_ROLES[roleKey] || USER_ROLES.citizen;

  // Sync both dropdowns
  const topSelect = document.getElementById('topbarRoleSelect');
  const sideSelect = document.getElementById('sidebarRoleSelect');
  if (topSelect) topSelect.value = roleKey;
  if (sideSelect) sideSelect.value = roleKey;

  // Update Top Banner
  const rbIcon = document.getElementById('rbIcon');
  const rbTitle = document.getElementById('rbTitle');
  const rbDesc = document.getElementById('rbDesc');
  const rbBadge = document.getElementById('rbBadge');
  if (rbIcon) rbIcon.textContent = role.icon;
  if (rbTitle) rbTitle.textContent = role.bannerTitle;
  if (rbDesc) rbDesc.textContent = role.bannerDesc;
  if (rbBadge) rbBadge.textContent = role.badge;

  // Update Sidebar Footer Profile Card
  const fAvatar = document.getElementById('footerAvatar');
  const fName = document.getElementById('footerUserName');
  const fRole = document.getElementById('footerUserRole');
  if (fAvatar) fAvatar.textContent = role.avatar;
  if (fName) fName.textContent = role.name;
  if (fRole) fRole.textContent = role.roleTitle;

  console.log(`[Role Switch] Switched active profile to: ${role.roleTitle} (${role.name})`);
}
window.changeUserRole = changeUserRole;

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

// ── PROPERTY DATA (Person X, Person Y, Person Z) ──────────────
const PRICE_PALETTE = {
  11314: '#047857',
  11455: '#10b981',
  11473: '#6ee7b7',
  13743: '#fde047',
  13756: '#f59e0b',
  13856: '#ea580c',
  13942: '#f97316',
  14797: '#ef4444',
  14830: '#b91c1c',
  unknown: '#94a3b8'
};

const NEIGHBOURHOOD_BUILDINGS = [
  { id: 'NZ-01', x: -36, z: 22, w: 10, d: 8,  floors: 4, price: 11455, ulpin_3d: 'IN-AP-040B-FL01', owner: 'Person Y (100%)', prevOwner: 'Person Z', origOwner: 'Person Z', name: 'House Block Z-1' },
  { id: 'NZ-02', x: -22, z: 22, w: 10, d: 8,  floors: 4, price: 11314, ulpin_3d: 'IN-AP-040B-FL01-B', owner: 'Person A (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-2' },
  { id: 'NZ-03', x: -8,  z: 22, w: 10, d: 8,  floors: 4, price: 11455, ulpin_3d: 'IN-AP-040B-FL01-C', owner: 'Person B (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-3' },
  { id: 'NZ-04', x: 6,   z: 22, w: 10, d: 8,  floors: 4, price: 13856, ulpin_3d: 'IN-AP-040B-FL02', owner: 'Person X (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-4 (Person X)' },
  { id: 'NZ-05', x: 20,  z: 22, w: 10, d: 8,  floors: 4, price: 13743, ulpin_3d: 'IN-AP-040B-FL02-B', owner: 'Person C (100%)', prevOwner: 'Person X', origOwner: 'Person Z', name: 'House Block Z-5' },
  { id: 'NZ-06', x: 34,  z: 22, w: 9,  d: 8,  floors: 3, price: 11473, ulpin_3d: 'IN-AP-040B-FL01-D', owner: 'Person D (100%)', prevOwner: 'Person Z', origOwner: 'Person Z', name: 'House Block Z-6' },

  { id: 'NZ-07', x: -36, z: 6,  w: 10, d: 9,  floors: 6, price: 13743, ulpin_3d: 'IN-AP-040B-FL03', owner: 'Person X (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-7' },
  { id: 'NZ-08', x: -22, z: 6,  w: 10, d: 9,  floors: 5, price: 14797, ulpin_3d: 'IN-AP-040B-FL03-B', owner: 'Person Y (100%)', prevOwner: 'Person Z', origOwner: 'Person Z', name: 'Commercial Block Z-8' },
  { id: 'NZ-09', x: -8,  z: 6,  w: 10, d: 9,  floors: 6, price: 14830, ulpin_3d: 'IN-AP-040B-FL03-C', owner: 'Person Z (100%)', prevOwner: 'Original', origOwner: 'Person Z', name: 'Commercial Block Z-9' },
  { id: 'NZ-10', x: 6,   z: 6,  w: 10, d: 9,  floors: 6, price: 13756, ulpin_3d: 'IN-AP-040B-FL04', owner: 'Person X (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-10' },
  { id: 'NZ-11', x: 20,  z: 6,  w: 10, d: 9,  floors: 7, price: 13942, ulpin_3d: 'IN-AP-040B-FL04-B', owner: 'Person Y (100%)', prevOwner: 'Person Z', origOwner: 'Person Z', name: 'House Block Z-11' },
  { id: 'NZ-12', x: 34,  z: 6,  w: 9,  d: 9,  floors: 5, price: 13856, ulpin_3d: 'IN-AP-040B-FL02', owner: 'Person X (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'House Block Z-12' },

  { id: 'NZ-13', x: -32, z: -14, w: 12, d: 11, floors: 9,  price: 13743, ulpin_3d: 'IN-AP-040B-FL05', owner: 'Person Z (100%)', prevOwner: 'Original', origOwner: 'Person Z', name: 'Tower West' },
  { id: 'NZ-14', x: -14, z: -14, w: 13, d: 11, floors: 12, price: 11455, ulpin_3d: 'IN-AP-040B-FL06', owner: 'Person X (100%)', prevOwner: 'Person Y', origOwner: 'Person Z', name: 'Green Tower 1' },
  { id: 'NZ-15', x: 4,   z: -14, w: 13, d: 11, floors: 12, price: 11473, ulpin_3d: 'IN-AP-040B-FL06-B', owner: 'Person Y (100%)', prevOwner: 'Person Z', origOwner: 'Person Z', name: 'Green Tower 2' },
  { id: 'NZ-16', x: 22,  z: -14, w: 12, d: 11, floors: 10, price: 11314, ulpin_3d: 'IN-AP-040B-FL05-B', owner: 'Person Z (100%)', prevOwner: 'Original', origOwner: 'Person Z', name: 'Green Tower 3' }
];

// ── 3D VIEWER CLASS (GROUNDED & STABLE) ───────────────────────
class ThreeCadastreViewer {
  constructor(containerId, isHeroMini = false) {
    this.container = document.getElementById(containerId);
    this.isHeroMini = isHeroMini;
    this.viewMode = 'storey';
    this.maxFloorsVisible = 12;
    this.autoRotate = false;
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
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 - 0.05;
      this.controls.minDistance = 15;
      this.controls.maxDistance = 300;
      this.controls.target.set(0, 10, 0);
    }

    this.setupLighting();
    this.buildGroundedTerrain();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.renderer.domElement.addEventListener('click', (e) => this.onCanvasClick(e));

    this.buildBuildings();
    this.animate();

    window.addEventListener('resize', () => this.onResize());
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.65);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.95);
    sunLight.position.set(60, 100, 45);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    this.scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.35);
    fillLight.position.set(-60, 40, -40);
    this.scene.add(fillLight);
  }

  buildGroundedTerrain() {
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

    NEIGHBOURHOOD_BUILDINGS.forEach(b => {
      const group = new THREE.Group();
      group.userData = { ...b };

      const bColor = new THREE.Color(PRICE_PALETTE[b.price] || '#10b981');

      const footingPad = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 1.2, 0.6, b.d + 1.2),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
      );
      footingPad.position.set(0, 0.3, 0);
      footingPad.receiveShadow = true;
      footingPad.castShadow = true;
      footingPad.userData = { ...b, elemName: 'Concrete Foundation Footing' };
      group.add(footingPad);

      if (this.viewMode === 'solid') {
        const totalH = b.floors * floorHeight;
        const solidMesh = new THREE.Mesh(
          new THREE.BoxGeometry(b.w, totalH, b.d),
          new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.35 })
        );
        solidMesh.position.set(0, 0.6 + totalH / 2, 0);
        solidMesh.castShadow = true;
        solidMesh.receiveShadow = true;
        solidMesh.userData = { ...b };
        group.add(solidMesh);

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(solidMesh.geometry),
          new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 })
        );
        edges.position.copy(solidMesh.position);
        group.add(edges);

      } else {
        const visibleFloors = Math.min(b.floors, this.maxFloorsVisible);

        for (let f = 0; f < visibleFloors; f++) {
          const floorGroup = new THREE.Group();
          const floorBaseY = 0.6 + f * floorHeight;

          const slab = new THREE.Mesh(
            new THREE.BoxGeometry(b.w + 0.3, slabThick, b.d + 0.3),
            new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
          );
          slab.position.set(0, floorBaseY + slabThick / 2, 0);
          slab.castShadow = true;
          slab.receiveShadow = true;
          slab.userData = { ...b, floor: f + 1 };
          floorGroup.add(slab);

          const wallH = floorHeight - slabThick;
          const wall = new THREE.Mesh(
            new THREE.BoxGeometry(b.w, wallH, b.d),
            new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.45 })
          );
          wall.position.set(0, floorBaseY + slabThick + wallH / 2, 0);
          wall.castShadow = true;
          wall.receiveShadow = true;
          wall.userData = { ...b, floor: f + 1 };
          floorGroup.add(wall);

          group.add(floorGroup);
        }

        if (visibleFloors === b.floors) {
          const roofY = 0.6 + b.floors * floorHeight;
          const roof = new THREE.Mesh(
            new THREE.ConeGeometry(Math.max(b.w, b.d) * 0.72, 2.2, 4),
            new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.5 })
          );
          roof.position.set(0, roofY + 1.1, 0);
          roof.rotation.y = Math.PI / 4;
          roof.castShadow = true;
          roof.userData = { ...b };
          group.add(roof);
        }
      }

      group.position.set(b.x, 0, b.z);
      this.scene.add(group);
      this.buildingMeshes.push(group);
    });
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
        break;
      }
    }
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

function updateAllPropertyDetails(data) {
  const ulpin = data.ulpin_3d || 'IN-AP-040B-FL02';
  const owner = data.owner || 'Person X (100% Ownership)';
  const prevOwner = data.prevOwner || 'Person Y (Sold in 2019)';
  const origOwner = data.origOwner || 'Person Z (Original 1987 Owner)';
  const name = data.name || 'House Block Z-4';

  const dVal = document.getElementById('dashUlpinVal');
  const dBadge = document.getElementById('dashUlpinBadge');
  const dOwner = document.getElementById('dashOwnerVal');
  const dPrev = document.getElementById('dashPrevOwnerVal');
  const dOrig = document.getElementById('dashOrigOwnerVal');

  if (dVal) dVal.textContent = ulpin;
  if (dBadge) dBadge.textContent = `ID: ${ulpin}`;
  if (dOwner) dOwner.textContent = owner;
  if (dPrev) dPrev.textContent = prevOwner;
  if (dOrig) dOrig.textContent = origOwner;

  const inspUlpin = document.getElementById('inspUlpin');
  const inspName = document.getElementById('inspName');
  const inspOwner = document.getElementById('inspOwner');
  const inspPrev = document.getElementById('inspPrevOwner');
  const inspOrig = document.getElementById('inspOrigOwner');

  if (inspUlpin) inspUlpin.textContent = ulpin;
  if (inspName) inspName.textContent = name;
  if (inspOwner) inspOwner.textContent = owner;
  if (inspPrev) inspPrev.textContent = prevOwner;
  if (inspOrig) inspOrig.textContent = origOwner;

  const lUlpin = document.getElementById('lUlpin');
  const lOwner = document.getElementById('lOwner');
  const lName = document.getElementById('lName');
  const lTitle = document.getElementById('ledgerDossierTitle');

  if (lUlpin) lUlpin.textContent = ulpin;
  if (lOwner) lOwner.textContent = owner;
  if (lName) lName.textContent = `${name}, Floor 2, Flat 201`;
  if (lTitle) lTitle.textContent = `Property Record: ${ulpin}`;
}
window.updateAllPropertyDetails = updateAllPropertyDetails;

let dashEngine = null;
let fullEngine = null;

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

function generateNewUlpin(event) {
  event.preventDefault();
  const floor = document.getElementById('genFloor').value;
  const newUlpin = `IN-AP-040B-${floor}`;
  const owner = document.getElementById('genOwnerName').value || 'Person X';
  const prevOwner = document.getElementById('genPrevOwnerName').value || 'Person Y';

  document.getElementById('mintedUlpin').textContent = newUlpin;
  document.getElementById('mintedOwner').textContent = owner;

  updateAllPropertyDetails({
    ulpin_3d: newUlpin,
    owner: `${owner} (100% Ownership)`,
    prevOwner: `${prevOwner} (Transferred)`,
    origOwner: 'Person Z',
    name: `Newly Registered House (${floor})`
  });
}
window.generateNewUlpin = generateNewUlpin;

function executeLedgerQuery() {
  const query = document.getElementById('ledgerQueryInput').value.trim();
  if (!query) return;

  const found = NEIGHBOURHOOD_BUILDINGS.find(b => b.ulpin_3d.toLowerCase().includes(query.toLowerCase()));
  if (found) {
    updateAllPropertyDetails(found);
  } else {
    updateAllPropertyDetails({
      ulpin_3d: query,
      owner: 'Person X (100% Ownership)',
      prevOwner: 'Person Y',
      origOwner: 'Person Z',
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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    dashEngine = new ThreeCadastreViewer('dashThreeCanvasContainer', true);
  }, 100);

  setTimeout(() => {
    fullEngine = new ThreeCadastreViewer('fullThreeCanvasContainer', false);
  }, 200);

  // Initialize Default Role
  changeUserRole('citizen');
});
