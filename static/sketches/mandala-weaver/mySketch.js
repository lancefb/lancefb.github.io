// MandalaWeaver — rugWeaver (deformed tangram grid) + dynoMandala (radial organic curves)
//
// Controls:
//   Space       → play / stop music + beat sync
//   Click       → regenerate rug (manual, when not playing)
//   Mouse move  → shape mandala (when not playing)
//   S           → save frame as PNG

// ========== PALETTES ==========
const palettes = [
  ["#f94144","#f3722c","#f8961e","#f9c74f","#90be6d","#43aa8b","#577590"],
  ["#797d62","#9b9b7a","#d9ae94","#f1dca7","#ffcb69","#d08c60","#997b66"],
  ["#264653","#287271","#2a9d8f","#8ab17d","#e9c46a","#f4a261","#e76f51"],
  ["#588b8b","#ffffff","#ffd5c2","#f28f3b","#c8553d","#2d3047","#93b7be"],
  ["#88352b","#d0755c","#ebceb1","#eee9de","#929489","#798187","#576169"],
  ["#ff1b6b","#e03884","#c1559c","#a273b5","#8390ce","#64ade6","#45caff"],
  ["#003e7f","#0068af","#5495e1","#dddddd","#44a75e","#008239","#00540e"],
  ["#ff6d00","#ff8500","#ff9e00","#240046","#5a189a","#9d4edd","#18af9d"],
  ["#03045e","#023e8a","#0077b6","#0096c7","#00b4d8","#48cae4","#90e0ef"],
  ["#ff9900","#ffc800","#ffe000","#fff700","#b8f500","#95e214","#72ce27"],
  ["#f3f520","#d9ef1b","#c0e916","#a6e311","#8cdd0c","#73d707","#59d102"],
  ["#e9d022","#e9af1e","#e88e1a","#e86e16","#e74d11","#e72c0d","#e60b09"],
  ["#ff1b6b","#e03884","#c1559c","#a273b5","#8390ce","#64ade6","#45caff"],
]

// ========== FORMAT ==========
// ?square  → 1:1 canvas for Instagram
// ?render  → headless frame-by-frame render mode (no audio, fixed seed, noLoop)
// no param → full window for blog / screen
const SQUARE = new URLSearchParams(window.location.search).has('square')
const RENDER = new URLSearchParams(window.location.search).has('render')
const RENDER_FPS = 30

// ========== COMPOSITION TIMING (render mode) ==========
const COMP_TITLE_FRAMES = 105  // 3.5s title card
const COMP_XFADE_FRAMES = 45   // 1.5s crossfade overlap
const COMP_GRID_START   = COMP_TITLE_FRAMES - COMP_XFADE_FRAMES // 60 = 2s
const COMP_ANIM_FRAMES  = 1290 // 43s × 30fps
const COMP_TOTAL        = COMP_GRID_START + COMP_ANIM_FRAMES    // 1350 = 45s

// ========== BEAT DATA ==========
const BEATS = [0.743,1.463,2.136,2.879,3.553,4.296,4.969,5.689,6.385,7.105,7.802,8.522,9.218,9.915,10.612,11.331,12.028,12.748,13.444,14.164,14.861,15.581,16.277,16.997,17.67,18.39,19.087,19.807,20.503,21.223,21.92,22.639,23.336,24.056,24.729,25.449,26.146,26.865,27.562,28.282,28.979,29.698,30.372,31.092,31.788,32.508,33.205,33.924,34.621,35.341,36.037,36.757,37.454,38.174,38.847,39.567,40.263,40.983,41.68]
const TEMPO_BPM = 86.1

// ========== AUDIO + PLAYBACK STATE ==========
let song
let playing = false
let beatIndex = 0
let playStartTime = 0
let beatFlash = 0 // decays each frame, used for cursor pulse on beat
let fadeStarted = false
let playingStopped = false

// ========== SHARED STATE ==========
let colorPalette = []
let bgColor
let rugSnapshot // p5.Image — captured after rug render, stamped every frame

// ========== RUG STATE ==========
let cols, rows
let deformationScaleX = 50, deformationScaleY = -50
let randomValues = [], deformationAngles = [], deformationModes = []
let variation, sw, drawOutline

// ========== MANDALA STATE ==========
let num = 24, tnum = 24
let mult = 1, start = 0, stretch = 6
let lm // lerped mouse position

// ========== PRELOAD ==========
function preload() {
  if (!RENDER) song = loadSound('MandalaWeaver1_43s.mp3')
}

// ========== SETUP ==========
function setup() {
  let dim = min(windowWidth, windowHeight)
  createCanvas(SQUARE ? dim : windowWidth, SQUARE ? dim : windowHeight)
  colorMode(HSL, 360, 100, 100, 100)
  strokeJoin(BEVEL)
  lm = createVector(width / 2, height / 2)
  noCursor()
  if (RENDER) {
    randomSeed(42)
    noLoop()
    window.__renderFrame = 0
    window.__advanceFrame = () => { window.__renderFrame++; redraw() }
  }
  generateRug()
}

// ========== MAIN LOOP ==========
function draw() {
  // Stamp rug snapshot as background every frame
  image(rugSnapshot, 0, 0)
  // Dim rug so mandala reads over it — tune 0–100
  noStroke()
  fill(0, 0, 5, 42)
  rect(0, 0, width, height)

  // Activate animation when title card ends (render mode)
  if (RENDER && !playing && !playingStopped && window.__renderFrame >= COMP_GRID_START) {
    playing = true
    beatIndex = 0
  }

  if (playing) {
    // ---- PLAYBACK MODE: auto-oscillate, fire beats ----
    let elapsed = RENDER
      ? max(0, window.__renderFrame - COMP_GRID_START) / RENDER_FPS
      : (millis() - playStartTime) / 1000

    // Fire beat hooks
    while (beatIndex < BEATS.length && BEATS[beatIndex] <= elapsed) {
      onBeat(beatIndex)
      beatIndex++
    }

    // Fade out over last 4 seconds (live mode only)
    if (!RENDER && !fadeStarted && elapsed >= 39.0) {
      song.setVolume(0, 4.0)
      fadeStarted = true
    }

    // Stop animation when song ends
    if (elapsed >= 43.5) {
      playing = false
      playingStopped = true
      fadeStarted = false
      if (!RENDER) { song.stop(); song.setVolume(1) }
    }

    // Auto-oscillate mandala params (slow, dreamy)
    let t = elapsed
    mult  = lerp(mult,  map(sin(t * 0.29), -1, 1, 1.2, 3.8),  0.04)
    start = lerp(start, map(sin(t * 0.17), -1, 1, -8, 8),      0.04)
    stretch = lerp(stretch, map(sin(t * 0.23), -1, 1, 1.5, 5), 0.04)
    num = lerp(num, tnum, 0.05)

    // Cursor dot pulses on beat
    lm.set(width / 2, height / 2)
    beatFlash = max(0, beatFlash - 3)

  } else {
    // ---- MOUSE MODE ----
    lm.lerp(createVector(mouseX, mouseY), 0.1)
    stretch = lerp(stretch, map(mouseY, 0, height, 0.2, 6, true), 0.1)
    num = lerp(num, tnum, 0.1)
    mult = lerp(mult, map(mouseX, 0, width, 1, 4, true), 0.1)
    start = lerp(start, map(mouseY, 0, height, -12, 12, true), 0.1)
    beatFlash = 0
  }

  // Cursor dot — pulses on beat during playback
  let c0 = colorPalette[0]
  fill(hue(c0), saturation(c0), min(lightness(c0) + 30, 95))
  noStroke()
  ellipse(lm.x, lm.y, 20 + beatFlash, 20 + beatFlash)

  // Draw mandala over rug
  push()
  translate(width / 2, height / 2)
  scale(0.95)
  noFill()
  strokeWeight(2.0 * height / 628)

  for (let i = 0; i < num; i++) {
    let c = colorPalette[i % colorPalette.length]
    // Lighten palette colors so they read over dark rug backgrounds
    stroke(hue(c), saturation(c), min(lightness(c) + 40, 92), 88)

    let a = PI + (i * TAU) / num

    // Original arm pair
    push()
    rotate(a)
    curve(-start * height / 6, -height * stretch, 0, height / 48, 0, height / 2, start * 3 * height / 9, 3 * height / 2)
    scale(-1, 1)
    curve(-start * height / 6, -height * stretch, 0, height / 48, 0, height / 2, start * 3 * height / 9, 3 * height / 2)
    pop()

    // Scaled arm pair (mult-driven spread)
    push()
    rotate(a)
    push()
    scale(mult, 1)
    curve(-start * height / 6, -height * stretch, 0, height / 48, 0, height / 2, start * 3 * height / 9, 3 * height / 2)
    pop()
    push()
    scale(-mult, 1)
    curve(-start * height / 6, -height * stretch, 0, height / 48, 0, height / 2, start * 3 * height / 9, 3 * height / 2)
    pop()
    pop()
  }
  pop()

  // === RENDER-ONLY: title card + fade to black + loop stop ===
  if (RENDER) {
    let compFrame = window.__renderFrame

    // Title card overlay
    let titleOp = getTitleOpacity(compFrame)
    if (titleOp > 0) drawTitleCard(titleOp)

    // Fade to black over last 60 frames (comp frames 1290–1350)
    if (compFrame >= 1290) {
      let fadeOp = constrain(map(compFrame, 1290, COMP_TOTAL, 0, 1), 0, 1)
      push()
      colorMode(RGB, 255)
      noStroke()
      fill(0, 0, 0, round(fadeOp * 255))
      rect(0, 0, width, height)
      pop()
    }

    if (compFrame >= COMP_TOTAL) noLoop()
  }
}

// ========== RENDER OVERLAYS ==========
function getTitleOpacity(compFrame) {
  if (compFrame < 20)  return map(compFrame, 0, 20, 0, 1)
  if (compFrame < 85)  return 1
  if (compFrame < COMP_TITLE_FRAMES) return map(compFrame, 85, COMP_TITLE_FRAMES, 1, 0)
  return 0
}

function drawTitleCard(opacity) {
  push()
  // Black background at opacity
  colorMode(RGB, 255)
  noStroke()
  fill(0, 0, 0, round(opacity * 255))
  rect(0, 0, width, height)

  let a = round(opacity * 255)
  let cy = height * 0.46

  textAlign(CENTER, CENTER)
  textStyle(NORMAL)

  // Title — "MANDALA WEAVER" with layered gold glow
  textFont("'Palatino Linotype', 'Book Antiqua', Palatino, serif")
  textSize(width * 0.072)
  let glowPasses = [
    [90, 200, 120, 20,  0.15],
    [45, 255, 200, 100, 0.55],
    [20, 255, 215, 0,   0.80],
    [8,  255, 215, 0,   1.00],
  ]
  for (let [blur, r, g, b, ga] of glowPasses) {
    drawingContext.shadowBlur = blur
    drawingContext.shadowColor = `rgba(${r},${g},${b},${ga * opacity})`
    fill(255, 248, 220, a)
    text('MANDALA WEAVER', width / 2, cy)
  }

  // Subtitle
  drawingContext.shadowBlur = 15
  drawingContext.shadowColor = `rgba(255,200,50,${0.4 * opacity})`
  textSize(width * 0.0185)
  fill(255, 220, 100, round(0.6 * a))
  text('A GENERATIVE COMPOSITION', width / 2, cy + height * 0.068)

  // Credit
  drawingContext.shadowBlur = 0
  drawingContext.shadowColor = 'transparent'
  textSize(width * 0.0204)
  fill(255, 220, 100, round(0.4 * a))
  text('L.F.Barker  2026', width / 2, cy + height * 0.115)

  pop()
}

// ========== INPUT ==========
function mousePressed() {
  if (!playing) generateRug()
}

function keyPressed() {
  if (key === ' ' && !RENDER) {
    if (playing) {
      song.stop()
      song.setVolume(1)
      playing = false
      beatIndex = 0
      fadeStarted = false
    } else {
      song.play()
      playing = true
      playStartTime = millis()
      beatIndex = 0
    }
  }
  if (key === 's' || key === 'S') saveCanvas('mandalaWeaver', 'png')
}

// ========== BEAT HANDLER ==========
function onBeat(i) {
  // Every beat: small stretch pulse
  let isDownbeat = i % 4 === 0
  pulseStretch(isDownbeat ? 2.0 : 0.8)

  // Every 4th beat: nudge arm count
  if (isDownbeat) pulseTnum(floor(random(-2, 3)))

  // Every 12th beat: new rug (≈ every 8.4s → ~4 changes across 43s)
  if (i % 12 === 0 && i > 0) triggerNewRug()
}

// ========== BEAT SYNC HOOKS ==========
function pulseStretch(amt) {
  stretch += amt
  beatFlash = 30 // trigger cursor pulse
}
function pulseTnum(n) {
  tnum = constrain(tnum + n, 6, 36)
}
function triggerNewRug() {
  generateRug()
}

// ========== RUG GENERATION ==========
function generateRug() {
  initializeParameters()
  colorPalette = random(palettes).map(c => color(c))

  let _bg = random(colorPalette)
  bgColor = color(hue(_bg), saturation(_bg), lightness(_bg) * random(0.1, 0.25))
  background(bgColor)

  drawDeformedGridWithTangrams()
  rugSnapshot = get() // capture rug as stamped image
  tnum = floor(random(6, 36)) // new arm count with each rug
}

function initializeParameters() {
  deformationScaleX = int(random(-500, 500)) + 100
  deformationScaleY = int(random(-500, 500)) + 100

  let cellSize = random(100, 200)
  cols = round(width / cellSize)
  rows = round(height / cellSize)

  randomValues = new Array(6).fill(0).map(() => random())

  deformationAngles = []
  for (let i = 0; i < 4; i++) deformationAngles.push(random([PI, TAU]))

  deformationModes = [floor(random(3)), floor(random(3))]
  variation = 6 * random() ** 2
  drawOutline = random() < 0.5
  sw = 8 * random() ** 2
}

// ========== RUG: GRID + TANGRAMS ==========
function drawDeformedGridWithTangrams() {
  let pts = calculateDeformedPoints()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let corners = [pts[i][j], pts[i+1][j], pts[i+1][j+1], pts[i][j+1]]
      let rot = floor(random(4))
      let rc = rotateCorners(corners, rot)
      drawTangramInCell(rc[0], rc[1], rc[2], rc[3])
    }
  }
}

function calculateDeformedPoints() {
  let points = []
  let mx = width * 0.25, my = height * 0.25
  for (let i = 0; i <= cols; i++) {
    points[i] = []
    for (let j = 0; j <= rows; j++) {
      let n = noise(i * 0.01, j * 0.01)
      let x = map(i, 0, cols, -mx, width + mx)
      let y = map(j, 0, rows, -my, height + my)
      let ii = n < 0.5 ? i : j
      let jj = n < 0.5 ? i : j
      points[i][j] = createVector(
        x + calculateXDeformation(i, j, ii, jj, n),
        y + calculateYDeformation(i, j, ii, jj, n)
      )
    }
  }
  return points
}

function calculateXDeformation(i, j, ii, jj, nv) {
  if (i === 0 || i === cols) return 0
  let i1, j1
  if (randomValues[0] < 0.5) {
    i1 = nv < 0.5 ? i : ii; j1 = nv < 0.5 ? j : jj
  } else {
    i1 = randomValues[2] < 0.5 ? i : ii; j1 = randomValues[3] < 0.5 ? j : jj
  }
  switch (deformationModes[0]) {
    case 0: return deformationScaleX * pow(nv, 0.001) * (sin((deformationAngles[0] * j1) / rows) * cos(((deformationAngles[1] * i1) / cols) * sin(nv)))
    case 1: return deformationScaleX * (sin((deformationAngles[0] * j1) / rows) * cos((deformationAngles[1] * i1) / cols))
    case 2: return deformationScaleX * sin((TWO_PI * j1) / rows) * cos((TWO_PI * i1) / cols) * sin(1)
  }
  return 0
}

function calculateYDeformation(i, j, ii, jj, nv) {
  if (j === 0 || j === rows) return 0
  let i1, j1
  if (randomValues[1] < 0.5) {
    i1 = nv < 0.5 ? i : ii; j1 = nv < 0.5 ? j : jj
  } else {
    i1 = randomValues[4] < 0.5 ? i : ii; j1 = randomValues[5] < 0.5 ? j : jj
  }
  switch (deformationModes[1]) {
    case 0: return deformationScaleY * pow(1 - nv, 0.001) * (cos((deformationAngles[2] * j1) / rows) * sin((deformationAngles[3] * i1) / cols))
    case 1: return deformationScaleY * (cos((deformationAngles[2] * j1) / rows) * sin((deformationAngles[3] * i1) / cols))
    case 2: return deformationScaleY * cos((TWO_PI * j1) / rows) * sin((TWO_PI * i1) / cols) * cos(1)
  }
  return 0
}

function rotateCorners(corners, rotation) {
  return [0, 1, 2, 3].map(i => corners[(i + rotation) % 4])
}

function drawTangramInCell(A, B, C, D) {
  const { pieces } = tangramFromQuad(A, B, C, D)
  let order = [pieces.big1, pieces.big2, pieces.medium, pieces.triA, pieces.triC, pieces.square, pieces.para]
  shuffle(order, true)
  for (let i = 0; i < order.length; i++) {
    stroke(colorPalette[i])
    hatchPoly(order[i], random(2, 10), random(-PI, PI), random(0.5, 2))
    if (random() < 0.5) hatchPoly(order[i], random(2, 10), random(-PI, PI), random(0.5, 2))
  }
}

function hatchPoly(poly, spacing, angle, weight) {
  if (spacing <= 0 || poly.length < 3) return

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const p of poly) {
    minX = min(minX, p.x); minY = min(minY, p.y)
    maxX = max(maxX, p.x); maxY = max(maxY, p.y)
  }
  const w = maxX - minX, h = maxY - minY
  const cx = minX + w / 2, cy = minY + h / 2

  push()
  beginClip()
  beginShape()
  for (const p of poly) vertex(p.x, p.y)
  endShape(CLOSE)
  endClip()

  translate(cx, cy)
  rotate(angle)

  const L = Math.hypot(w, h) * 1.1
  const half = L / 2
  strokeWeight(weight || 1)

  let sp = spacing * random(0.8, 1.2)
  for (let t = -half; t <= half + sp; t += sp) {
    line(-half, t + random(-variation, variation), half, t + random(-variation, variation))
    sp = spacing * random(0.8, 1.2)
  }
  pop()

  if (drawOutline) {
    push()
    stroke(bgColor)
    strokeWeight(sw)
    noFill()
    beginShape()
    for (const p of poly) vertex(p.x, p.y)
    endShape(CLOSE)
    pop()
  }
}

// ========== TANGRAM GEOMETRY ==========
const V = (x, y) => ({ x, y })
const add = (a, b) => V(a.x + b.x, a.y + b.y)
const sub = (a, b) => V(a.x - b.x, a.y - b.y)
const mul = (a, s) => V(a.x * s, a.y * s)
const vlen = a => Math.hypot(a.x, a.y)

function midpoint(P, Q) { return V((P.x + Q.x) / 2, (P.y + Q.y) / 2) }

function onSegmentAtDistance(P0, P1, d) {
  const u = sub(P1, P0), L = vlen(u)
  if (L < 1e-9) return V(P0.x, P0.y)
  return add(P0, mul(u, Math.min(1, Math.max(0, d / L))))
}

function lineIntersection(P1, P2, P3, P4) {
  const x1=P1.x, y1=P1.y, x2=P2.x, y2=P2.y
  const x3=P3.x, y3=P3.y, x4=P4.x, y4=P4.y
  const den = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4)
  if (Math.abs(den) < 1e-9) return midpoint(P1, P2)
  return V(
    ((x1*y2-y1*x2)*(x3-x4) - (x1-x2)*(x3*y4-y3*x4)) / den,
    ((x1*y2-y1*x2)*(y3-y4) - (y1-y2)*(x3*y4-y3*x4)) / den
  )
}

function tangramFromQuad(A, B, C, D) {
  const M  = lineIntersection(A, C, B, D)
  const X  = midpoint(C, D), Y = midpoint(D, A), Z = midpoint(X, Y)
  const h  = vlen(sub(X, Y)) / 2
  const A2 = onSegmentAtDistance(A, M, h)
  const C2 = onSegmentAtDistance(C, M, h)
  return {
    pieces: {
      big1:   [A, B, M],
      big2:   [B, C, M],
      medium: [X, D, Y],
      triA:   [A, Y, A2],
      triC:   [M, Z, C2],
      square: [A2, M, Z, Y],
      para:   [Z, C2, C, X],
    }
  }
}
