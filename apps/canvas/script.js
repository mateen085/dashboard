const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const toolSelect = document.getElementById("tool");
const colorPicker = document.getElementById("color");
const sizeInput = document.getElementById("size");
const brushStyle = document.getElementById("brushStyle");
const fontFamilySelect = document.getElementById("fontFamily");
const boldCheckbox = document.getElementById("bold");
const italicCheckbox = document.getElementById("italic");

const clearBtn = document.getElementById("clear");
const saveBtn = document.getElementById("save");
const shareBtn = document.getElementById("share");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");

/* ---------------------------
   Offscreen "scene" canvas
---------------------------- */
const scene = document.createElement("canvas");
const sctx = scene.getContext("2d"); // all drawing is on sctx

/* ---------------------------
   State
---------------------------- */
let tool = "brush";
let drawing = false;
let startX = 0, startY = 0;
let previewingShape = false;

// Zoom & Pan (applied when rendering scene -> visible canvas)
let scale = 1;
let translateX = 0;
let translateY = 0;
const minScale = 0.5;
const maxScale = 5;

let lastPinchDist = null;
let lastTapTime = 0;

// Text
let textObjects = []; // retained & movable
let isDraggingText = false;
let activeText = null;

// Undo/Redo (capture scene pixels + text objects)
let undoStack = [];
let redoStack = [];
const MAX_UNDOS = 50;

/* ---------------------------
   Resize
---------------------------- */
function resizeBoth() {
  // match visible canvas css size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // keep scene same pixel size as visible canvas for simplicity
  // If you want higher fidelity, you can scale by devicePixelRatio too.
  const prevScene = sctx.getImageData(0, 0, scene.width || 1, scene.height || 1);

  scene.width = canvas.width;
  scene.height = canvas.height;

  // restore previous scene content if any
  if (prevScene.width && prevScene.height) {
    sctx.putImageData(prevScene, 0, 0);
  }

  render(); // draw scene -> visible
}

window.addEventListener("resize", resizeBoth);
resizeBoth();

/* ---------------------------
   Utilities
---------------------------- */
function saveState() {
  const img = sctx.getImageData(0, 0, scene.width, scene.height);
  undoStack.push({
    image: img,
    texts: JSON.parse(JSON.stringify(textObjects))
  });
  if (undoStack.length > MAX_UNDOS) undoStack.shift();
  redoStack = [];
}

function restoreState(from, to) {
  if (!from.length) return;
  // push current to "to"
  const current = sctx.getImageData(0, 0, scene.width, scene.height);
  to.push({ image: current, texts: JSON.parse(JSON.stringify(textObjects)) });

  const prev = from.pop();
  sctx.putImageData(prev.image, 0, 0);
  textObjects = prev.texts;
  render();
}

undoBtn.onclick = () => restoreState(undoStack, redoStack);
redoBtn.onclick = () => restoreState(redoStack, undoStack);

toolSelect.addEventListener("change", () => (tool = toolSelect.value));
brushStyle.addEventListener("change", () => setBrushStyle(brushStyle.value));

function setBrushStyle(style) {
  switch (style) {
    case "dotted":
      sctx.setLineDash([1, 10]);
      break;
    case "dashed":
      sctx.setLineDash([10, 10]);
      break;
    case "airbrush":
      sctx.setLineDash([]);
      break;
    default:
      sctx.setLineDash([]);
  }
}

function getFontString() {
  const bold = boldCheckbox.checked ? "bold" : "";
  const italic = italicCheckbox.checked ? "italic" : "";
  const size = sizeInput.value * 3;
  const family = fontFamilySelect.value;
  return `${italic} ${bold} ${size}px ${family}`.trim();
}

/* Screen -> world coords (inverse of render transform) */
function toWorld(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = (clientX - rect.left - translateX) / scale;
  const y = (clientY - rect.top - translateY) / scale;
  return { x, y };
}

/* Pinch helpers (screen space) */
function distTouches(t0, t1) {
  const dx = t0.clientX - t1.clientX;
  const dy = t0.clientY - t1.clientY;
  return Math.hypot(dx, dy);
}
function midTouches(t0, t1) {
  return { x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 };
}

/* Render: draw scene pixels + text objects to visible canvas with pan/zoom */
function render(drawPreview) {
  // reset, then apply transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.setTransform(scale, 0, 0, scale, translateX, translateY);
  ctx.imageSmoothingEnabled = false;

  // draw base scene
  ctx.drawImage(scene, 0, 0);

  // draw retained text overlays
  for (const obj of textObjects) {
    ctx.fillStyle = obj.color;
    ctx.font = obj.font;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(obj.text, obj.x, obj.y);
  }

  // optional drawPreview callback for temporary shapes
  if (drawPreview) drawPreview(ctx);
}

/* ---------------------------
   Drawing (on the scene)
---------------------------- */
function startDrawAt(x, y) {
  // Text tool: either drag an existing text, or insert new one
  if (tool === "text") {
    const hit = textObjects.find(t =>
      x >= t.x && x <= t.x + t.width &&
      y <= t.y && y >= t.y - t.height
    );
    if (hit) {
      activeText = hit;
      isDraggingText = true;
      return;
    }
    const text = prompt("Enter text:");
    if (text) {
      sctx.font = getFontString();
      const width = sctx.measureText(text).width;
      const height = parseInt(getFontString().match(/(\d+)px/)[1], 10);

      const obj = {
        text,
        x, y, width, height,
        color: colorPicker.value,
        font: getFontString()
      };
      textObjects.push(obj);
      saveState();
      render();
    }
    return;
  }

  drawing = true;
  sctx.strokeStyle = colorPicker.value;
  sctx.fillStyle = colorPicker.value;
  sctx.lineWidth = sizeInput.value;
  sctx.lineCap = "round";
  setBrushStyle(brushStyle.value);

  startX = x; startY = y;

  if (tool === "brush") {
    sctx.beginPath();
    sctx.moveTo(x, y);
  } else if (tool === "line") {
    previewingShape = true;
  } else if (tool === "fill") {
    floodFillOnScene(x, y, hexToRgba(colorPicker.value));
    saveState();
    render();
    drawing = false;
  } else {
    // other shapes
    previewingShape = true;
  }
}

function moveDrawTo(x, y) {
  if (isDraggingText && activeText) {
    activeText.x = x;
    activeText.y = y;
    // Update measured width/height (in case font size changed meanwhile)
    sctx.font = activeText.font;
    activeText.width = sctx.measureText(activeText.text).width;
    activeText.height = parseInt(activeText.font.match(/(\d+)px/)[1], 10);
    render();
    return;
  }

  if (!drawing) return;

  if (tool === "brush") {
    if (brushStyle.value === "airbrush") {
      for (let i = 0; i < 5; i++) {
        const ox = Math.random() * 20 - 10;
        const oy = Math.random() * 20 - 10;
        sctx.fillRect(x + ox, y + oy, 1, 1);
      }
      render(); // show airbrush dots live
    } else {
      sctx.lineTo(x, y);
      sctx.stroke();
      render();
    }
  } else if (tool === "line" || tool === "rectangle" || tool === "circle" ||
             tool === "ellipse" || tool === "triangle" || tool === "star" ||
             tool === "polygon") {
    const drawPreview = (pctx) => {
      pctx.beginPath();
      drawShapeOnContext(pctx, tool, startX, startY, x, y);
      pctx.strokeStyle = colorPicker.value;
      pctx.lineWidth = sizeInput.value;
      pctx.setLineDash(sctx.getLineDash());
      pctx.lineCap = "round";
      pctx.stroke();
    };
    render(drawPreview);
  }
}

function endDraw() {
  if (isDraggingText) {
    isDraggingText = false;
    activeText = null;
    saveState();
    render();
    return;
  }

  if (!drawing) return;

  if (previewingShape) {
    // finalize the previewed shape onto the scene
    // We re-draw the final shape directly to sctx
    const finalize = (x2, y2) => {
      sctx.beginPath();
      drawShapeOnContext(sctx, tool, startX, startY, x2, y2);
      sctx.strokeStyle = colorPicker.value;
      sctx.lineWidth = sizeInput.value;
      sctx.setLineDash(sctx.getLineDash());
      sctx.lineCap = "round";
      sctx.stroke();
    };

    // We don't have the last x/y here, so we rely on the last render step having drawn preview at current pointer.
    // That's okay; shapes get finalized on next pointerup with stored last pointer (tracked below).
    if (lastPointer) {
      finalize(lastPointer.x, lastPointer.y);
    }
    previewingShape = false;
  }

  saveState();
  drawing = false;
  render();
}

/* Track last pointer for shape finalize */
let lastPointer = null;

/* ---------------------------
   Shape & Fill helpers
---------------------------- */
function drawShapeOnContext(c, type, x1, y1, x2, y2) {
  switch (type) {
    case "rectangle":
      c.rect(x1, y1, x2 - x1, y2 - y1);
      break;
    case "circle": {
      const r = Math.hypot(x2 - x1, y2 - y1);
      c.arc(x1, y1, r, 0, 2 * Math.PI);
      break;
    }
    case "ellipse":
      c.ellipse(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1), 0, 0, 2 * Math.PI);
      break;
    case "triangle":
      c.moveTo(x1, y2);
      c.lineTo((x1 + x2) / 2, y1);
      c.lineTo(x2, y2);
      c.closePath();
      break;
    case "star":
      drawStar(c, (x1 + x2) / 2, (y1 + y2) / 2, 5, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 4);
      break;
    case "polygon":
      drawPolygon(c, (x1 + x2) / 2, (y1 + y2) / 2, 6, Math.abs(x2 - x1) / 2);
      break;
    case "line":
      c.moveTo(x1, y1);
      c.lineTo(x2, y2);
      break;
  }
}

function drawStar(c, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  const step = Math.PI / spikes;
  c.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    c.lineTo(cx + Math.cos(rot) * outerRadius, cy + Math.sin(rot) * outerRadius);
    rot += step;
    c.lineTo(cx + Math.cos(rot) * innerRadius, cy + Math.sin(rot) * innerRadius);
    rot += step;
  }
  c.lineTo(cx, cy - outerRadius);
  c.closePath();
}

function drawPolygon(c, cx, cy, sides, radius) {
  const angle = (2 * Math.PI) / sides;
  c.moveTo(cx + radius * Math.cos(0), cy + radius * Math.sin(0));
  for (let i = 1; i <= sides; i++) {
    c.lineTo(cx + radius * Math.cos(i * angle), cy + radius * Math.sin(i * angle));
  }
  c.closePath();
}

function hexToRgba(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, 255];
}

function floodFillOnScene(x, y, fillColor) {
  const imageData = sctx.getImageData(0, 0, scene.width, scene.height);
  const data = imageData.data;

  const width = scene.width;
  const height = scene.height;

  function idx(px, py) {
    return (py * width + px) * 4;
  }
  function colorAt(px, py) {
    const i = idx(px, py);
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  }
  function same(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  function setColor(px, py, col) {
    const i = idx(px, py);
    data[i] = col[0]; data[i + 1] = col[1]; data[i + 2] = col[2]; data[i + 3] = col[3];
  }

  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || y < 0 || x >= width || y >= height) return;

  const target = colorAt(x, y);
  if (same(target, fillColor)) return;

  const stack = [[x, y]];
  while (stack.length) {
    const [cx, cy] = stack.pop();
    if (cx < 0 || cy < 0 || cx >= width || cy >= height) continue;
    if (!same(colorAt(cx, cy), target)) continue;

    setColor(cx, cy, fillColor);

    stack.push([cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]);
  }

  sctx.putImageData(imageData, 0, 0);
}

/* ---------------------------
   Pan/Zoom (pinch + double tap)
---------------------------- */
function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

function zoomAboutScreenPoint(newScale, screenX, screenY) {
  newScale = clamp(newScale, minScale, maxScale);

  // world point under the screen point before zoom
  const worldX = (screenX - translateX) / scale;
  const worldY = (screenY - translateY) / scale;

  // adjust translate so that world point stays under the same screen point
  translateX = screenX - worldX * newScale;
  translateY = screenY - worldY * newScale;
  scale = newScale;

  render();
}

function resetView() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  render();
}

/* ---------------------------
   Mouse Events
---------------------------- */
canvas.addEventListener("mousedown", (e) => {
  const { x, y } = toWorld(e.clientX, e.clientY);
  startDrawAt(x, y);
});

canvas.addEventListener("mousemove", (e) => {
  const { x, y } = toWorld(e.clientX, e.clientY);
  lastPointer = { x, y };
  moveDrawTo(x, y);
});

canvas.addEventListener("mouseup", () => {
  endDraw();
});

canvas.addEventListener("dblclick", resetView);

/* ---------------------------
   Touch Events (passive:false)
---------------------------- */
canvas.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    e.preventDefault();
    const { x, y } = toWorld(e.touches[0].clientX, e.touches[0].clientY);
    startDrawAt(x, y);
  } else if (e.touches.length === 2) {
    e.preventDefault();
    drawing = false; // disable drawing during pinch
    lastPinchDist = distTouches(e.touches[0], e.touches[1]);
  }
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  if (e.touches.length === 1 && lastPinchDist === null) {
    e.preventDefault();
    const { x, y } = toWorld(e.touches[0].clientX, e.touches[0].clientY);
    lastPointer = { x, y };
    moveDrawTo(x, y);
  } else if (e.touches.length === 2) {
    e.preventDefault();
    const d = distTouches(e.touches[0], e.touches[1]);
    const mid = midTouches(e.touches[0], e.touches[1]);
    const newScale = scale * (d / lastPinchDist);
    zoomAboutScreenPoint(newScale, mid.x - canvas.getBoundingClientRect().left, mid.y - canvas.getBoundingClientRect().top);
    lastPinchDist = d;
  }
}, { passive: false });

canvas.addEventListener("touchend", (e) => {
  // double-tap to reset
  const now = Date.now();
  if (now - lastTapTime < 300 && e.touches.length === 0) {
    resetView();
  }
  lastTapTime = now;

  if (e.touches.length === 0) {
    endDraw();
    lastPinchDist = null;
  }
}, { passive: false });

/* ---------------------------
   Buttons
---------------------------- */
clearBtn.onclick = () => {
  sctx.clearRect(0, 0, scene.width, scene.height);
  textObjects = [];
  saveState();
  render();
};

saveBtn.onclick = () => {
  // Compose scene + text into a temporary canvas for export
  const out = document.createElement("canvas");
  out.width = scene.width;
  out.height = scene.height;
  const octx = out.getContext("2d");
  octx.drawImage(scene, 0, 0);
  for (const obj of textObjects) {
    octx.fillStyle = obj.color;
    octx.font = obj.font;
    octx.textBaseline = "alphabetic";
    octx.fillText(obj.text, obj.x, obj.y);
  }
  const dataURL = out.toDataURL("image/png");
  const a = document.createElement("a");
  a.download = "artwork.png";
  a.href = dataURL;
  a.click();
};

shareBtn.onclick = async () => {
  // Compose scene + text for sharing
  const out = document.createElement("canvas");
  out.width = scene.width;
  out.height = scene.height;
  const octx = out.getContext("2d");
  octx.drawImage(scene, 0, 0);
  for (const obj of textObjects) {
    octx.fillStyle = obj.color;
    octx.font = obj.font;
    octx.textBaseline = "alphabetic";
    octx.fillText(obj.text, obj.x, obj.y);
  }
  const dataURL = out.toDataURL("image/png");
  const blob = await (await fetch(dataURL)).blob();
  const file = new File([blob], "artwork.png", { type: blob.type });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ title: "My Artwork", files: [file] });
    } catch (_) { /* canceled */ }
  } else {
    const tempURL = URL.createObjectURL(blob);
    window.open(tempURL, "_blank");
  }
};

/* ---------------------------
   Initial state
---------------------------- */
saveState();
render();

