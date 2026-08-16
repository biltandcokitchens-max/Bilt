/* ------------------------------------------------------------------
   three-view.js  ·  the 3D room

   Builds a real kitchen out of the room model — carcasses, fronts,
   handles, kicks, benchtops, appliances — and lets you orbit it and
   click a cabinet to select it.

   Orbit control is hand-rolled rather than pulled from three/addons so
   there is exactly one external module path to go wrong.
   ------------------------------------------------------------------ */

import * as THREE from 'three';
import { productById, MATERIALS, FINISHES, BENCHTOPS, APPLIANCES, SETTINGS } from './data.js';
import { roomWalls, wallSegment, wallSegments, roomPolygon, layout, wallLength, benchtopRuns } from './room.js';
import { doorWidths, drawerFrontHeights } from './cutlist.js';

const M = 0.001;              // mm → metres
const FRONT_T = 18 * M;

/* ------------------------------------------------------------------
   Realism layer

   Three things do most of the work: image-based lighting so surfaces
   reflect a room rather than being flat-shaded, a clearcoat on painted
   and gloss fronts, and micro-variation in roughness so nothing looks
   mathematically perfect.
   ------------------------------------------------------------------ */

/* Faint mottling in the roughness channel. Real melamine is never
   uniformly smooth, and the eye reads perfect uniformity as CGI. */
let microTex = null;
function microRoughness() {
  if (microTex) return microTex;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const img = g.createImageData(256, 256);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 178 + (Math.random() - 0.5) * 26;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  g.filter = 'blur(1px)';
  g.drawImage(c, 0, 0);
  microTex = new THREE.CanvasTexture(c);
  microTex.wrapS = microTex.wrapT = THREE.RepeatWrapping;
  microTex.repeat.set(3, 3);
  return microTex;
}

/* ---------- materials ---------- */
function makeMatCache() {
  const cache = new Map();
  return {
    get(colour, { grain = false, rough = 0.72, metal = 0, front = false } = {}) {
      const key = `${colour}|${grain}|${rough}|${metal}|${front}`;
      if (cache.has(key)) return cache.get(key);

      const common = {
        color: new THREE.Color(colour),
        roughness: rough,
        metalness: metal,
        roughnessMap: microRoughness(),
        envMapIntensity: front ? 1.0 : 0.6,
      };

      /* Doors and drawer fronts are lacquered or foil-wrapped, so they
         get a clearcoat. The glossier the finish, the stronger it is. */
      const m = front
        ? new THREE.MeshPhysicalMaterial({
            ...common,
            clearcoat: rough < 0.3 ? 1.0 : rough < 0.8 ? 0.35 : 0.12,
            clearcoatRoughness: rough < 0.3 ? 0.04 : 0.28,
            sheen: rough > 0.8 ? 0.2 : 0,
            sheenRoughness: 0.8,
            sheenColor: new THREE.Color('#ffffff'),
          })
        : new THREE.MeshStandardMaterial(common);

      if (grain) {
        m.map = grainTexture(colour);
        m.bumpMap = m.map;
        m.bumpScale = 0.012;
      }
      cache.set(key, m);
      return m;
    },
    dispose() {
      cache.forEach((m) => { m.map?.dispose(); m.dispose(); });
      cache.clear();
    },
  };
}

/* ------------------------------------------------------------------
   Bevelled panel geometry.

   A cabinet door is not a sharp-cornered box — it has a small radius on
   the face and a softened edge that catches light. Reproducing that is
   the difference between "3D boxes" and "cabinetry".
   ------------------------------------------------------------------ */
const panelGeoCache = new Map();
function panelGeometry(w, h, d) {
  const key = `${w.toFixed(4)}|${h.toFixed(4)}|${d.toFixed(4)}`;
  if (panelGeoCache.has(key)) return panelGeoCache.get(key);

  const r = Math.min(0.0022, w / 2 - 0.001, h / 2 - 0.001);   // 2.2mm corner
  const bev = Math.min(0.0012, d / 3);                        // 1.2mm edge break
  const sw = w - bev * 2, sh = h - bev * 2;

  const shape = new THREE.Shape();
  shape.moveTo(-sw / 2 + r, -sh / 2);
  shape.lineTo(sw / 2 - r, -sh / 2);
  shape.quadraticCurveTo(sw / 2, -sh / 2, sw / 2, -sh / 2 + r);
  shape.lineTo(sw / 2, sh / 2 - r);
  shape.quadraticCurveTo(sw / 2, sh / 2, sw / 2 - r, sh / 2);
  shape.lineTo(-sw / 2 + r, sh / 2);
  shape.quadraticCurveTo(-sw / 2, sh / 2, -sw / 2, sh / 2 - r);
  shape.lineTo(-sw / 2, -sh / 2 + r);
  shape.quadraticCurveTo(-sw / 2, -sh / 2, -sw / 2 + r, -sh / 2);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d - bev * 2, bevelEnabled: true, bevelThickness: bev,
    bevelSize: bev, bevelSegments: 2, curveSegments: 4, steps: 1,
  });
  geo.translate(0, 0, -(d - bev * 2) / 2);
  geo.computeVertexNormals();
  panelGeoCache.set(key, geo);
  return geo;
}

/* engineered stone: fine speckle over the base colour */
const speckCache = new Map();
function speckleTexture(colour) {
  if (speckCache.has(colour)) return speckCache.get(colour);
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = colour;
  g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 9000; i++) {
    const a = 0.03 + Math.random() * 0.14;
    g.fillStyle = Math.random() > 0.55 ? `rgba(0,0,0,${a})` : `rgba(255,255,255,${a})`;
    const r = Math.random() * 1.9;
    g.beginPath();
    g.arc(Math.random() * 512, Math.random() * 512, r, 0, 6.283);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.repeat.set(2, 2);
  speckCache.set(colour, t);
  return t;
}

function grainTexture(colour) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = colour;
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 130; i++) {
    const y = Math.random() * 256;
    g.strokeStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.05})`;
    g.lineWidth = 0.4 + Math.random() * 1.6;
    g.beginPath();
    g.moveTo(0, y);
    g.bezierCurveTo(85, y + (Math.random() - .5) * 5, 170, y + (Math.random() - .5) * 5, 256, y);
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const box = (w, h, d, mat) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

/* Soft blob laid on the floor under a cabinet. Shadow maps alone leave
   the join looking floaty; this is what sells "standing on the floor". */
let contactTex = null, contactGeo = null;
function contactShadow(w, d) {
  if (!contactTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 4, 64, 64, 62);
    grd.addColorStop(0, 'rgba(0,0,0,0.55)');
    grd.addColorStop(0.55, 'rgba(0,0,0,0.22)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    contactTex = new THREE.CanvasTexture(c);
    contactGeo = new THREE.PlaneGeometry(1, 1);
  }
  const m = new THREE.Mesh(contactGeo, new THREE.MeshBasicMaterial({
    map: contactTex, transparent: true, depthWrite: false, opacity: 0.85,
  }));
  m.scale.set(w * 1.5, d * 2.1, 1);
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = 1;
  return m;
}

/* A real bar pull: a round bar standing off the door on two posts. The
   gap between bar and door is what makes it read as hardware. */
let barGeo = null, postGeo = null;
function barHandle(len, vertical, x, y, zFace, mat) {
  if (!barGeo) {
    barGeo = new THREE.CylinderGeometry(0.0065, 0.0065, 1, 14);
    postGeo = new THREE.CylinderGeometry(0.0042, 0.0042, 1, 10);
  }
  const g = new THREE.Group();
  const stand = 0.026;                       // how far it stands off

  const bar = new THREE.Mesh(barGeo, mat);
  bar.scale.set(1, len, 1);
  if (!vertical) bar.rotation.z = Math.PI / 2;
  bar.position.set(0, 0, stand);
  g.add(bar);

  for (const s of [-1, 1]) {
    const post = new THREE.Mesh(postGeo, mat);
    post.scale.set(1, stand, 1);
    post.rotation.x = Math.PI / 2;
    const off = (len / 2 - 0.014) * s;
    post.position.set(vertical ? 0 : off, vertical ? off : 0, stand / 2);
    g.add(post);
  }
  g.position.set(x, y, zFace);
  return g;
}

/* ------------------------------------------------------------------
   Image-based lighting.

   Without an environment map every surface is lit only by the lamps and
   reads flat. This builds a small emissive room, prefilters it, and
   hands it to the scene so gloss doors reflect something believable and
   matt ones pick up soft directional falloff.
   ------------------------------------------------------------------ */
function buildEnvironment(renderer) {
  const env = new THREE.Scene();
  const panel = (w, h, d, colour, intensity, pos, rot) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(colour).multiplyScalar(intensity) }),
    );
    m.position.set(...pos);
    if (rot) m.rotation.set(...rot);
    env.add(m);
  };

  /* the enclosing room, lit from inside */
  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(14, 8, 14),
    new THREE.MeshBasicMaterial({ color: 0x2b2f34, side: THREE.BackSide }),
  );
  env.add(shell);

  /* A dark surround with a few bright sources. A uniformly bright
     environment just washes every surface to the same milky grey — the
     contrast between the emitters and the dark shell is what makes a
     gloss door read as gloss. */
  panel(9, 0.1, 9, '#ffffff', 2.4, [0, 3.95, 0]);            // ceiling wash
  panel(5.5, 3.4, 0.1, '#dceaff', 3.4, [-3.6, 1.9, -6.9]);   // cool window
  panel(4.0, 2.4, 0.1, '#ffe6c4', 1.5, [4.2, 2.1, 6.9]);     // warm bounce
  panel(14, 0.1, 14, '#8d8579', 0.45, [0, -3.95, 0]);        // floor bounce

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const target = pmrem.fromScene(env, 0.04);
  pmrem.dispose();
  env.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
  return target.texture;
}

/* light oak floorboards, drawn once into a canvas */
let floorMat = null;
function floorMaterial(RW, RD) {
  if (!floorMat) {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const g = c.getContext('2d');
    g.fillStyle = '#EFE6D6';
    g.fillRect(0, 0, 512, 512);
    const plank = 512 / 6;
    for (let i = 0; i < 6; i++) {
      const y = i * plank;
      g.fillStyle = `rgba(0,0,0,${0.015 + Math.random() * 0.03})`;
      g.fillRect(0, y, 512, plank);
      for (let j = 0; j < 26; j++) {
        g.strokeStyle = `rgba(150,110,60,${0.05 + Math.random() * 0.09})`;
        g.lineWidth = 0.5 + Math.random();
        const yy = y + Math.random() * plank;
        g.beginPath(); g.moveTo(0, yy); g.lineTo(512, yy); g.stroke();
      }
      g.strokeStyle = 'rgba(120,88,48,.42)';
      g.lineWidth = 2;
      g.beginPath(); g.moveTo(0, y); g.lineTo(512, y); g.stroke();
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    floorMat = new THREE.MeshStandardMaterial({ map: t, roughness: 0.55, envMapIntensity: 0.35 });
  }
  floorMat.map.repeat.set(Math.max(1, RW / 1.6), Math.max(1, RD / 1.6));
  return floorMat;
}

/* ------------------------------------------------------------------
   one cabinet, local origin: centre of width, floor level, back at z=0
   ------------------------------------------------------------------ */
function buildCabinet(it, mats) {
  /* fillers carry no product id, so resolve the product defensively */
  const p = it.type === 'cab' ? productById(it.pid) : null;
  const c = it.cfg;
  const g = new THREE.Group();

  const W = c.w * M, H = c.h * M, D = ((!p || p.flat) ? 18 : c.d) * M;
  const kick = (c.includeKick ? c.kick : 0) * M;
  const matDef = MATERIALS[c.material] || MATERIALS['mel-white'];
  const finDef = FINISHES[c.finish] || FINISHES['match'];
  /* roughness and grain now come from the palette, so a high-gloss door
     actually reflects and a matt one does not */
  const carcass = mats.get(matDef.swatch, { grain: matDef.grain, rough: matDef.rough ?? 0.78 });
  const front = mats.get(finDef.swatch, {
    grain: !!finDef.grain,
    rough: finDef.rough ?? 0.6,
    metal: 0,
    front: true,
  });
  const dark = mats.get('#26292C', { rough: 0.34, metal: 0.92 });

  if (!p || p.flat || it.type === 'filler') {
    const panel = new THREE.Mesh(panelGeometry(W, H, FRONT_T), front);
    panel.position.set(0, H / 2, FRONT_T / 2);
    g.add(panel);
    g.userData.pickable = [panel];
    return g;
  }

  /* carcass — sits behind the fronts */
  const hasFronts = p.front !== 'none';
  const carcassD = hasFronts ? D - FRONT_T : D;
  const carc = box(W, H, carcassD, carcass);
  carc.position.set(0, kick + H / 2, carcassD / 2);
  g.add(carc);

  /* a darker recess so the box doesn't read as a solid brick */
  if (!hasFronts) {
    const inner = box(W - 0.032, H - 0.032, 0.02, mats.get('#2A2E33', { rough: 0.95 }));
    inner.position.set(0, kick + H / 2, D - 0.012);
    g.add(inner);
    const shelfMat = carcass;
    for (let i = 1; i <= (c.shelves || 0); i++) {
      const y = kick + (H / ((c.shelves || 0) + 1)) * i;
      const sh = box(W - 0.032, 0.016, carcassD - 0.02);
      sh.material = shelfMat;
      sh.position.set(0, y, carcassD / 2);
      g.add(sh);
    }
  }

  /* kickboard, recessed */
  if (kick > 0) {
    const kb = box(W - 0.004, kick, 0.016, mats.get(
      c.kickMatchesFront ? finDef.swatch : matDef.swatch,
      { rough: (c.kickMatchesFront ? finDef.rough : matDef.rough) ?? 0.8 }));
    kb.position.set(0, kick / 2, D - 0.05);
    g.add(kb);
  }

  /* fronts */
  const pick = [carc];
  const gap = SETTINGS.gap * M;
  const zf = D - FRONT_T / 2;

  const fronts = [];
  const addFront = (x, y, w, h, kind, side) => {
    const f = new THREE.Mesh(panelGeometry(w, h, FRONT_T), front);
    f.position.set(x, y, zf);
    g.add(f); pick.push(f); fronts.push(f);
    if (c.handle && c.handle !== 'none') {
      const vertical = kind === 'door';
      const len = vertical ? Math.min(0.16, h * 0.4) : Math.min(0.18, w * 0.45);
      const hx = vertical ? (side === 'left' ? x + w / 2 - 0.055 : x - w / 2 + 0.055) : x;
      const hy = vertical
        ? (p.cat === 'wall' ? y - h / 2 + len / 2 + 0.07 : y + h / 2 - len / 2 - 0.07)
        : y;
      g.add(barHandle(len, vertical, hx, hy, zf + FRONT_T / 2, dark));
    }
  };

  if (p.front === 'drawer') {
    const hs = drawerFrontHeights(c.h, c.drawers, SETTINGS.gap);
    let y = c.h - SETTINGS.gap / 2;
    hs.forEach((fh) => {
      const cy = (y - fh / 2) * M + kick;
      addFront(0, cy, W - gap, fh * M, 'drawer');
      y -= fh + SETTINGS.gap;
    });
  } else if (p.front === 'mixed') {
    const hs = drawerFrontHeights(c.h, c.drawers + 1, SETTINGS.gap);
    let y = c.h - SETTINGS.gap / 2;
    hs.slice(0, c.drawers).forEach((fh) => {
      addFront(0, (y - fh / 2) * M + kick, W - gap, fh * M, 'drawer');
      y -= fh + SETTINGS.gap;
    });
    const doorH = y - SETTINGS.gap / 2;
    const ws = doorWidths(c.w, p.doors, SETTINGS.gap);
    let x = -c.w / 2 + SETTINGS.gap / 2;
    ws.forEach((dw, i) => {
      addFront((x + dw / 2) * M, (doorH / 2) * M + kick, dw * M, doorH * M, 'door', i === 0 ? 'left' : 'right');
      x += dw + SETTINGS.gap;
    });
  } else if (p.front === 'door') {
    if (p.lift) {
      addFront(0, (c.h / 2) * M + kick, W - gap, H - gap, 'drawer');
    } else {
      const usable = p.blind ? c.w - p.blind : c.w;
      const ws = doorWidths(usable, p.doors, SETTINGS.gap);
      let x = -c.w / 2 + (p.blind || 0) + SETTINGS.gap / 2;
      ws.forEach((dw, i) => {
        addFront((x + dw / 2) * M, (c.h / 2) * M + kick, dw * M, H - gap, 'door',
          p.doors === 1 ? 'left' : i === 0 ? 'left' : 'right');
        x += dw + SETTINGS.gap;
      });
    }
  }

  g.userData.pickable = pick;
  g.userData.fronts = fronts;
  return g;
}

function buildAppliance(it, mats) {
  const a = APPLIANCES[it.ak];
  const g = new THREE.Group();
  if (a.empty) return g;
  const W = a.w * M, H = a.h * M, D = a.d * M;
  const m = mats.get(a.colour, { rough: 0.35, metal: 0.55 });
  const b = box(W - 0.01, H, D, m);
  b.position.set(0, H / 2, D / 2);
  g.add(b);
  /* a glass-ish front band so it reads as an appliance, not a cabinet */
  const band = box(W - 0.03, H * 0.28, 0.01, mats.get('#15181B', { rough: 0.15, metal: 0.2 }));
  band.position.set(0, H * 0.62, D + 0.006);
  g.add(band);
  g.userData.pickable = [b];
  return g;
}

/* ---- where an item sits in the room ----
   Derived from the wall segment, so it works for any outline. The group's
   local origin is the cabinet's BACK face, so no depth offset is needed. */
function placeOnWall(room, k, x, w) {
  const s = wallSegment(room, k);
  if (!s) return { pos: [0, 0, 0], rot: 0 };
  const cx = x + w / 2;
  return {
    pos: [(s.p0.x + s.ux * cx) * M, 0, (s.p0.z + s.uz * cx) * M],
    rot: Math.atan2(s.nx, s.nz),
  };
}

/* Given a point on the floor, which wall is it nearest and how far
   along that wall is it? This is what turns a 3D drag into "put this
   cabinet here in the run". */
function nearestWall(room, px, pz) {
  const X = px / M, Z = pz / M;                 // back to millimetres
  let best = null;
  for (const s of wallSegments(room)) {
    const t = Math.max(0, Math.min(s.len, (X - s.p0.x) * s.ux + (Z - s.p0.z) * s.uz));
    const qx = s.p0.x + s.ux * t, qz = s.p0.z + s.uz * t;
    const dist = Math.hypot(X - qx, Z - qz);
    if (!best || dist < best.dist) best = { wall: s.k, mm: t, dist };
  }
  return best || { wall: 'A', mm: 0 };
}

/* ==================================================================
   scene
   ================================================================== */
export function mountScene(el, opts = {}) {
  /* transparent canvas: the pane's own CSS gradient shows through, so
     the 3D follows light/dark theme without being told about it */
  /* preserveDrawingBuffer lets the canvas be read back — needed to snapshot
     the kitchen, and to check the render numerically rather than by eye. */
  const renderer = new THREE.WebGLRenderer({
    antialias: true, alpha: true, preserveDrawingBuffer: true,
  });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  el.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(48, 1, 0.05, 200);
  const mats = makeMatCache();

  /* lighting */
  /* Image-based lighting does most of the work; the lamps only add the
     shadow-casting key and a little shaping. */
  scene.environment = buildEnvironment(renderer);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 0.18));
  const key = new THREE.DirectionalLight(0xfff6e8, 1.95);
  key.position.set(3.2, 5.2, 4.4);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 24;
  key.shadow.camera.left = -6; key.shadow.camera.right = 6;
  key.shadow.camera.top = 6; key.shadow.camera.bottom = -6;
  key.shadow.bias = -0.0009;
  key.shadow.normalBias = 0.012;
  key.shadow.radius = 3;                 // softer contact
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xeef4fb, 0.22);
  fill.position.set(-4, 3, -2.5);
  scene.add(fill);

  const worldRoot = new THREE.Group();
  scene.add(worldRoot);
  let currentRoom = null;

  /* orbit state */
  /* front-right three-quarter, aimed at the back-left corner — that is
     where an L-shaped run reads best */
  const orbit = { theta: 0.72, phi: 1.16, radius: 7.4, target: new THREE.Vector3(1.6, 1.0, 1.2) };
  let dragging = null, moved = 0;

  /* A perspective camera's vertical FOV is fixed, so a portrait viewport
     sees far less horizontally. Pull back proportionally or the room
     gets cropped on phones. */
  let userZoomed = false;
  const fit = (base) => base * (camera.aspect < 1.25 ? 1.25 / Math.max(0.5, camera.aspect) : 1);

  function applyCamera() {
    orbit.phi = Math.max(0.18, Math.min(Math.PI / 2 - 0.02, orbit.phi));
    orbit.radius = Math.max(1.6, Math.min(30, orbit.radius));
    const s = Math.sin(orbit.phi);
    camera.position.set(
      orbit.target.x + orbit.radius * s * Math.sin(orbit.theta),
      orbit.target.y + orbit.radius * Math.cos(orbit.phi),
      orbit.target.z + orbit.radius * s * Math.cos(orbit.theta),
    );
    camera.lookAt(orbit.target);
  }

  /* ---- dragging a cabinet along / between walls ---- */
  let itemDrag = null;
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hitPoint = new THREE.Vector3();

  function floorAt(e) {
    const r = dom.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    return ray.ray.intersectPlane(floorPlane, hitPoint) ? hitPoint : null;
  }

  /* A vertical plane sitting on the face of a wall. Intersecting the
     pointer with it gives both the along-wall offset and the height —
     which is what makes stacking draggable. */
  const facePoint = new THREE.Vector3();
  function wallFaceAt(e, wall, depth) {
    const s = wallSegment(currentRoom, wall);
    if (!s) return null;
    const half = depth / 2;
    const normal = new THREE.Vector3(s.nx, 0, s.nz);
    const onPlane = new THREE.Vector3(
      (s.p0.x + s.nx * half) * M, 0, (s.p0.z + s.nz * half) * M,
    );
    const plane = new THREE.Plane(normal, -normal.dot(onPlane));

    const r = dom.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    if (!ray.ray.intersectPlane(plane, facePoint)) return null;
    const along = (facePoint.x / M - s.p0.x) * s.ux + (facePoint.z / M - s.p0.z) * s.uz;
    return { mm: along, y: facePoint.y / M };
  }

  function itemUnder(e) {
    const r = dom.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    for (const h of ray.intersectObjects(worldRoot.children, true)) {
      let o = h.object;
      while (o && !o.userData.itemUid) o = o.parent;
      if (o?.userData.itemUid) return o;
    }
    return null;
  }

  const dom = renderer.domElement;
  dom.addEventListener('pointerdown', (e) => {
    /* capture can legitimately fail (synthetic events, lost pointers) —
       the drag still works via document-level listeners */
    try { dom.setPointerCapture(e.pointerId); } catch (err) { /* no capture, carry on */ }
    moved = 0;

    /* plain left-press on a cabinet starts a move, not an orbit */
    if (e.button === 0 && !e.shiftKey && currentRoom) {
      const g = itemUnder(e);
      const info = g && opts.getItemWall?.(g.userData.itemUid);
      if (g && info) {
        itemDrag = {
          uid: g.userData.itemUid, g, level: info.level, width: info.width,
          height: info.height || 720, depth: info.depth || 560,
          wall: info.wall, moved: false,
        };
        dom.style.cursor = 'grabbing';
        return;
      }
    }
    dragging = { x: e.clientX, y: e.clientY, pan: e.button === 2 || e.shiftKey };
    dom.style.cursor = 'grabbing';
  });
  dom.addEventListener('pointermove', (e) => {
    if (itemDrag) {
      /* the floor tells us which wall the cursor is nearest, but only
         while it lands inside the room — dragging a cabinet up high
         throws the floor ray miles away, so hold the wall in that case */
      const p = floorAt(e);
      if (p && p.x > 0 && p.z > 0 && p.x < currentRoom.w * M && p.z < currentRoom.d * M) {
        itemDrag.wall = nearestWall(currentRoom, p.x, p.z).wall;
      }
      const face = wallFaceAt(e, itemDrag.wall, itemDrag.depth);
      if (!face) return;
      itemDrag.moved = true;
      itemDrag.mm = face.mm;
      itemDrag.wantY = face.y - itemDrag.height / 2;

      /* follows the cursor, but snaps to neighbours in both axes */
      const want = face.mm - itemDrag.width / 2;
      const snapped = opts.resolveDrag
        ? opts.resolveDrag(itemDrag.uid, itemDrag.wall, want, itemDrag.wantY)
        : { x: want, y: itemDrag.wantY };
      itemDrag.dropY = snapped.y;
      const { pos, rot } = placeOnWall(currentRoom, itemDrag.wall, snapped.x, itemDrag.width, 0);
      itemDrag.g.position.set(pos[0], snapped.y * M, pos[2]);
      itemDrag.g.rotation.y = rot;
      highlight(itemDrag.uid);
      render();
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    dragging.x = e.clientX; dragging.y = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    if (dragging.pan) {
      const right = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 0);
      const up = new THREE.Vector3().setFromMatrixColumn(camera.matrix, 1);
      const k = orbit.radius * 0.0016;
      orbit.target.addScaledVector(right, -dx * k).addScaledVector(up, dy * k);
    } else {
      orbit.theta -= dx * 0.0065;
      orbit.phi -= dy * 0.0065;
    }
    applyCamera(); render();
  });
  const endDrag = (e) => {
    if (itemDrag) {
      const d = itemDrag;
      itemDrag = null;
      dom.style.cursor = 'grab';
      /* a press without movement is a select, not a move */
      if (!d.moved || d.wall == null) opts.onSelect?.(d.uid);
      else opts.onItemDrop?.(d.uid, d.wall, d.mm, d.wantY);
      return;
    }
    if (dragging && moved < 5 && !dragging.pan) pick(e);
    dragging = null;
    dom.style.cursor = 'grab';
  };
  dom.addEventListener('pointerup', endDrag);
  dom.addEventListener('pointercancel', () => { dragging = null; itemDrag = null; dom.style.cursor = 'grab'; });
  dom.addEventListener('contextmenu', (e) => e.preventDefault());
  dom.addEventListener('wheel', (e) => {
    e.preventDefault();
    userZoomed = true;
    orbit.radius *= 1 + Math.sign(e.deltaY) * 0.11;
    applyCamera(); render();
  }, { passive: false });

  /* selection */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function pick(e) {
    const r = dom.getBoundingClientRect();
    ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(worldRoot.children, true);
    for (const h of hits) {
      let o = h.object;
      while (o && !o.userData.itemUid) o = o.parent;
      if (o?.userData.itemUid) { opts.onSelect?.(o.userData.itemUid); return; }
    }
    opts.onSelect?.(null);
  }

  /* ---- build ---- */
  let selectedUid = null;
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)),
    new THREE.LineBasicMaterial({ color: 0x18a0d8, depthTest: false }),
  );
  outline.visible = false;
  outline.renderOrder = 999;
  scene.add(outline);

  /* translucent cyan wash over the selected cabinet, as the reference does */
  const selWash = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x35bdf0, transparent: true, opacity: 0.3, depthWrite: false }),
  );
  selWash.visible = false;
  selWash.renderOrder = 998;
  scene.add(selWash);

  /* screen position of the selection, so the DOM toolbar can sit on it */
  function reportSelectionScreen() {
    if (!opts.onSelectionScreen) return;
    if (!outline.visible) { opts.onSelectionScreen(null); return; }
    const r = dom.getBoundingClientRect();
    const bb = new THREE.Box3().setFromObject(selWash);
    const top = new THREE.Vector3(
      (bb.min.x + bb.max.x) / 2, bb.max.y, (bb.min.z + bb.max.z) / 2,
    ).project(camera);
    opts.onSelectionScreen({
      x: (top.x * 0.5 + 0.5) * r.width,
      y: (-top.y * 0.5 + 0.5) * r.height,
      behind: top.z > 1,
    });
  }

  function clear(g) {
    for (const c of [...g.children]) {
      g.remove(c);
      c.traverse?.((n) => { if (n.geometry) n.geometry.dispose(); });
    }
  }

  function build(room) {
    currentRoom = room;
    clear(worldRoot);

    const RW = room.w * M, RD = room.d * M, RH = room.h * M;

    /* floor — the room's actual outline, so an L reads as an L */
    const poly = roomPolygon(room);
    const fshape = new THREE.Shape(poly.map((pt) => new THREE.Vector2(pt.x * M, -pt.z * M)));
    const floor = new THREE.Mesh(new THREE.ShapeGeometry(fshape), floorMaterial(RW, RD));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    /* ShapeGeometry has no UVs we can use, so drive the planks from XZ */
    const uv = floor.geometry.attributes.position;
    const uvs = new Float32Array(uv.count * 2);
    for (let i = 0; i < uv.count; i++) {
      uvs[i * 2] = uv.getX(i) / 1.6;
      uvs[i * 2 + 1] = uv.getY(i) / 1.6;
    }
    floor.geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    worldRoot.add(floor);

    /* walls — single sided and facing inward, so they cull away when the
       camera swings outside and you can always see the run.
       Near-white keeps the stage quiet, like the reference planner. */
    const wallMat = mats.get('#E9E5DE', { rough: 0.96 });
    wallMat.side = THREE.FrontSide;
    for (const seg of wallSegments(room)) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(seg.len * M, RH), wallMat);
      m.position.set(
        ((seg.p0.x + seg.p1.x) / 2) * M, RH / 2, ((seg.p0.z + seg.p1.z) / 2) * M,
      );
      m.rotation.y = Math.atan2(seg.nx, seg.nz);
      m.receiveShadow = true;
      worldRoot.add(m);
    }

    /* cabinets */
    for (const { k } of roomWalls(room)) {
      for (const level of ['base', 'upper']) {
        for (const { it, x, w } of layout(room, k, level)) {
          let g;
          if (it.type === 'appl') g = buildAppliance(it, mats);
          else g = buildCabinet(it, mats);
          if (!g.children.length) continue;

          const depth = it.type === 'appl' ? APPLIANCES[it.ak].d : (it.cfg.d || 16);
          const { pos, rot } = placeOnWall(room, k, x, w, depth);
          /* every item now carries its own height off the floor, so a
             cabinet can stand on the floor or stack on another */
          g.position.set(pos[0], (it.y || 0) * M, pos[2]);
          g.rotation.y = rot;
          g.userData.itemUid = it.uid;
          g.userData.layer = level;
          g.traverse((n) => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
          if (level === 'upper') g.visible = vis.uppers;
          if (g.userData.fronts && !vis.doors) for (const m of g.userData.fronts) m.visible = false;
          worldRoot.add(g);

          /* anything standing on the floor gets a contact shadow */
          if ((it.y || 0) < 2) {
            const depth = it.type === 'appl' ? APPLIANCES[it.ak].d : (it.cfg?.d || 560);
            const cs = contactShadow(w * M, depth * M);
            cs.position.set(pos[0], 0.002, pos[2]);
            cs.rotation.z = rot;
            cs.userData.layer = level;
            worldRoot.add(cs);
          }
        }
      }
    }

    /* benchtops */
    const btMat = BENCHTOPS[room.bt.material];
    for (const r of benchtopRuns(room)) {
      const t = btMat.thick * M;
      const g = new THREE.Group();
      const isStone = /stone|compact/.test(room.bt.material);
      const btm = mats.get(btMat.swatch, {
        rough: isStone ? 0.22 : 0.5,
        grain: room.bt.material === 'bt-timber',
      });
      if (isStone && !btm.__speck) { btm.map = speckleTexture(btMat.swatch); btm.__speck = 1; }
      /* built face-up then laid flat, so the bevel breaks the front edge:
         X = length, Y = depth, Z = thickness, then rotate onto the run */
      const b = new THREE.Mesh(panelGeometry(r.length * M, r.depth * M, t), btm);
      b.rotation.x = -Math.PI / 2;
      b.position.set(0, t / 2, r.depth * M / 2);
      g.add(b);
      const { pos, rot } = placeOnWall(room, r.wall, r.x, r.length, r.depth);
      g.position.set(pos[0], 0.87, pos[2]);
      g.rotation.y = rot;
      g.traverse((n) => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
      worldRoot.add(g);
    }

    /* dimension annotations on the floor, like the reference's leaders */
    buildDims(room);

    /* frame the camera on the room the first time only */
    if (!build.framed) {
      orbit.target.set(RW * 0.38, 1.0, RD * 0.34);
      orbit.base = Math.max(RW, RD) * 1.32;
      orbit.radius = fit(orbit.base);
      build.framed = true;
    }
    highlight(selectedUid);
    applyCamera(); render();
  }

  /* ---- floor dimension leaders ---- */
  function labelSprite(text) {
    const c = document.createElement('canvas');
    const pad = 8;
    const ctx2 = c.getContext('2d');
    ctx2.font = '600 34px ui-monospace, Consolas, monospace';
    const w = Math.ceil(ctx2.measureText(text).width) + pad * 2;
    c.width = w; c.height = 52;
    const g2 = c.getContext('2d');
    g2.font = '600 34px ui-monospace, Consolas, monospace';
    g2.fillStyle = 'rgba(255,255,255,.88)';
    g2.fillRect(0, 0, w, 52);
    g2.fillStyle = '#3C4248';
    g2.textBaseline = 'middle';
    g2.fillText(text, pad, 28);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true }));
    s.scale.set((w / 52) * 0.19, 0.19, 1);
    return s;
  }

  function buildDims(room) {
    const grp = new THREE.Group();
    grp.userData.layer = 'dims';
    grp.visible = vis.dims;
    const mat = new THREE.LineBasicMaterial({ color: 0x8b949c, depthTest: false });
    const RW = room.w * M, RD = room.d * M;

    /* offset the dimension line just inside the room, per wall */
    const off = 0.14;
    const line = (a, b) => {
      const gm = new THREE.BufferGeometry().setFromPoints([a, b]);
      grp.add(new THREE.Line(gm, mat));
    };

    for (const wseg of wallSegments(room)) {
      const k = wseg.k;
      const run = layout(room, k, 'base');
      if (!run.length) continue;
      const depth = 0.62;
      const seg = (fromMm, toMm, label) => {
        const p = (mm) => new THREE.Vector3(
          (wseg.p0.x + wseg.ux * mm) * M + wseg.nx * (depth + off), 0.004,
          (wseg.p0.z + wseg.uz * mm) * M + wseg.nz * (depth + off),
        );
        const a = p(fromMm), b = p(toMm);
        line(a, b);
        const tick = 0.05;
        line(a.clone().setY(0.004), a.clone().setY(tick));
        line(b.clone().setY(0.004), b.clone().setY(tick));
        const s = labelSprite(label);
        s.position.copy(a.clone().add(b).multiplyScalar(0.5)).setY(0.1);
        grp.add(s);
      };
      for (const o of run) if (o.w >= 200) seg(o.x, o.x + o.w, String(Math.round(o.w)));
    }
    worldRoot.add(grp);
  }

  function highlight(uid) {
    selectedUid = uid;
    const g = uid && worldRoot.children.find((c) => c.userData.itemUid === uid);
    if (!g) {
      outline.visible = false; selWash.visible = false;
      reportSelectionScreen(); render(); return;
    }
    const bb = new THREE.Box3().setFromObject(g);
    const size = bb.getSize(new THREE.Vector3());
    const ctr = bb.getCenter(new THREE.Vector3());
    outline.geometry.dispose();
    outline.geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(size.x * 1.02, size.y * 1.02, size.z * 1.02));
    outline.position.copy(ctr);
    outline.visible = true;
    selWash.geometry.dispose();
    selWash.geometry = new THREE.BoxGeometry(size.x * 1.015, size.y * 1.015, size.z * 1.015);
    selWash.position.copy(ctr);
    selWash.visible = true;
    reportSelectionScreen();
    render();
  }

  function setView(mode, room) {
    const RW = room.w * M, RD = room.d * M;
    userZoomed = false;
    if (mode === 'plan') { orbit.theta = 0; orbit.phi = 0.2; orbit.base = Math.max(RW, RD) * 1.5; orbit.target.set(RW / 2, 0.9, RD / 2); }
    else if (mode === 'iso') { orbit.theta = 0.72; orbit.phi = 1.16; orbit.base = Math.max(RW, RD) * 1.32; orbit.target.set(RW * 0.38, 1.0, RD * 0.34); }
    else if (mode === 'walk') {
      /* stand in the room at eye height and look along it */
      orbit.theta = 0.55; orbit.phi = Math.PI / 2 - 0.06;
      orbit.base = 2.4;
      orbit.target.set(RW * 0.5, 1.55, RD * 0.55);
    }
    else if (mode.startsWith('wall:')) {
      const k = mode.slice(5);
      const ang = { A: 0, B: -Math.PI / 2, C: Math.PI, D: Math.PI / 2 }[k];
      orbit.theta = ang; orbit.phi = Math.PI / 2 - 0.06;
      orbit.base = wallLength(room, k) * M * 1.15 + 1.2;
      const mid = { A: [RW / 2, 0.2], B: [RW - 0.2, RD / 2], C: [RW / 2, RD - 0.2], D: [0.2, RD / 2] }[k];
      orbit.target.set(mid[0], 1.15, mid[1]);
    }
    orbit.radius = fit(orbit.base);
    applyCamera(); render();
  }

  /* ---- render loop: on demand, not rAF-spinning ---- */
  let queued = false;
  function render() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      renderer.render(scene, camera);
      reportSelectionScreen();
    });
  }

  function resize() {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    camera.updateProjectionMatrix();
    /* rotating a phone changes the aspect a lot — refit unless the user
       has taken control of the zoom themselves */
    if (!userZoomed && orbit.base) { orbit.radius = fit(orbit.base); applyCamera(); }
    render();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(el);
  resize();
  applyCamera();

  /* show/hide layers, the way the reference's eye panel does */
  let vis = { uppers: true, dims: true, doors: true };
  function setVisibility(v) {
    vis = { ...vis, ...v };
    for (const g of worldRoot.children) {
      if (g.userData.layer === 'upper') g.visible = vis.uppers;
      if (g.userData.layer === 'dims') g.visible = vis.dims;
      if (g.userData.fronts) for (const m of g.userData.fronts) m.visible = vis.doors;
    }
    render();
  }

  function zoom(dir) {
    userZoomed = true;
    orbit.radius *= 1 + dir * 0.16;
    applyCamera(); render();
  }

  return {
    build, setView, highlight, render, resize, setVisibility, zoom,
    /* exposed for debugging and tests, not used by the app */
    _scene: scene, _root: worldRoot, _camera: camera,
    dispose() {
      ro.disconnect();
      clear(worldRoot);
      mats.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    },
  };
}
