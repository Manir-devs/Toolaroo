// Toggle Side Drawer (if using a sidebar/drawer)
function toggleDrawer() {
    const drawer = document.getElementById("drawer");
    drawer.classList.toggle("open");
}
/*
// Toggle Light/Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Change icon based on mode
    const icon = document.querySelector(".icon-btn");
    if (document.body.classList.contains("dark-mode")) {
        icon.innerText = "☀️";  // Light mode icon
    } else {
        icon.innerText = "🌙";  // Dark mode icon
    }
}
*/

  // Check saved theme on load
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const icon = document.getElementById("themeToggleBtn");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      icon.innerText = "☀️";
    } else {
      document.body.classList.remove("dark-mode");
      icon.innerText = "🌙";
    }
  });

  function toggleDarkMode() {
    const icon = document.getElementById("themeToggleBtn");
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      icon.innerText = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      icon.innerText = "🌙";
      localStorage.setItem("theme", "light");
    }
  }

/*_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________*/

// Open Instagram Contact Link
function openContact() {
    window.open("https://instagram.com/artistry_with_manir___", "_blank");
}

// Share Current Page using Web Share API
function shareCurrentPage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: "Check this out!",
            url: window.location.href
        }).catch((error) => console.log('Sharing failed:', error));
    } else {
        alert("Web Share API is not supported in this browser.");
    }
}


// Close drawer on outside click, but prevent click from propagating
document.addEventListener("click", function(event) {
    const drawer = document.getElementById("drawer");
    const menuButton = document.querySelector(".menu-icon");

    // If drawer is open
    if (drawer.classList.contains("open")) {
        // If clicked outside the drawer and not the menu button
        if (!drawer.contains(event.target) && !menuButton.contains(event.target)) {
            event.stopPropagation(); // Stop the click from affecting other elements
            event.preventDefault();  // Prevent default behavior
            drawer.classList.remove("open");
        }
    }
}, true); // Capture phase to catch it before reaching target

//loading screen

  window.addEventListener('load', function () {
    const toolarooLoader = document.getElementById('toolaroo-preloader');
    toolarooLoader.style.opacity = '0';
    setTimeout(() => toolarooLoader.style.display = 'none', 500);
  });


//reloadpage
function reloadPage() {
    location.reload(); 
  }
  

/*<!--__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________-->    */

const allowedKeys = ['theme', 'fontSize', 'lang'];

  function openStoragePopup() {
    document.getElementById("storagePopup").style.display = "block";
    refreshStorageList();
  }

  function closeStoragePopup() {
    document.getElementById("storagePopup").style.display = "none";
  }

  function refreshStorageList() {
    const list = document.getElementById("storageList");
    list.innerHTML = "";

    if (localStorage.length === 0) {
      list.textContent = "No items in localStorage.";
      return;
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      const item = document.createElement("li");
      item.style.marginBottom = "10px";

      const keyEl = document.createElement("strong");
      keyEl.textContent = key;

      const valueEl = document.createElement("span");
      valueEl.textContent = ": " + value;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.id = "delet-item-btn";
      delBtn.onclick = function () {
        deleteStorageItem(key);
      };

      item.appendChild(keyEl);
      item.appendChild(valueEl);
      item.appendChild(delBtn);

      list.appendChild(item);
    }
  }

  function deleteStorageItem(key) {
    localStorage.removeItem(key);
    refreshStorageList();
  }

  function addStorageItem() {
    const key = document.getElementById("newKey").value;
    const value = document.getElementById("newValue").value.trim();

    if (!allowedKeys.includes(key)) {
      alert("Invalid key.");
      return;
    }

    if (value === "") {
      alert("Value cannot be empty.");
      return;
    }

    localStorage.setItem(key, value);
    document.getElementById("newValue").value = "";
    refreshStorageList();
  }
  const btn = document.getElementById('gridToggleBtn');
  let borderVisible = true;

  btn.onclick = () => {
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelectorAll('.cell').forEach(cell => {
      if (borderVisible) {
        // Hide border
        cell.style.border = '0.001px solid #0000';
      } else {
        // Show based on theme
        cell.style.border = isDark ? '0.001px solid #fff' : '0.001px solid #000';
      }
    });
    borderVisible = !borderVisible;
  };
  
  const gridCols = 20;  
  const gridRows = 40;  
  const grid = document.getElementById('grid');  
  const brushSelect = document.getElementById('brushSize');  
  const toolIcon = document.getElementById('toolIcon');  
  const charSelectorContainer = document.getElementById('charSelectorContainer');  
  
  const cellData = {};  
  let currentChar = '!';  
  let isDrawing = false;  
  let drawMode = true;  
  const allCells = [];  

  const undoStack = [];
  const redoStack = [];

  function saveState() {
    undoStack.push(allCells.map(cell => cell.classList.contains('active')));
    redoStack.length = 0;
  }

  function restoreState(state) {
    allCells.forEach((cell, i) => {
      cell.classList.toggle('active', state[i]);
    });
  }

  function undo() {
    if (undoStack.length) {
      const current = allCells.map(cell => cell.classList.contains('active'));
      redoStack.push(current);
      const prev = undoStack.pop();
      restoreState(prev);
    }
  }

  function redo() {
    if (redoStack.length) {
      const current = allCells.map(cell => cell.classList.contains('active'));
      undoStack.push(current);
      const next = redoStack.pop();
      restoreState(next);
    }
  }

  function toggleTool() {  
    drawMode = !drawMode;  
    toolIcon.src = drawMode ? 'pencil.png' : 'erasor.png';  
  }  

  for (let i = 32; i <= 126; i++) {  
    const char = String.fromCharCode(i);  
    const span = document.createElement('span');  
    span.className = 'charOption';  
    span.textContent = char;  
    span.dataset.char = char;  
    if (char === currentChar) span.classList.add('selected');  
    span.addEventListener('click', () => {  
      saveCurrentChar();  
      document.querySelectorAll('.charOption').forEach(el => el.classList.remove('selected'));  
      span.classList.add('selected');  
      currentChar = char;  
      loadChar(currentChar);  
    });  
    charSelectorContainer.appendChild(span);  
  }  

  function scrollCharSelector(dir) {  
    charSelectorContainer.scrollLeft += dir * 100;  
  }  

  for (let i = 0; i < gridCols * gridRows; i++) {  
    const cell = document.createElement('div');  
    cell.className = 'cell';  
    cell.dataset.index = i;  
    allCells.push(cell);  
    grid.appendChild(cell);  
  }  

  function draw(cell) {
    saveState();
    const index = parseInt(cell.dataset.index);  
    const x = index % gridCols;  
    const y = Math.floor(index / gridCols);  
    const brush = parseInt(brushSelect.value);  
  
    for (let dy = 0; dy < brush; dy++) {  
      for (let dx = 0; dx < brush; dx++) {  
        const cx = x + dx;  
        const cy = y + dy;  
        if (cx < gridCols && cy < gridRows) {  
          const targetIndex = cy * gridCols + cx;  
          const targetCell = allCells[targetIndex];  
          if (drawMode) {  
            targetCell.classList.add('active');  
          } else {  
            targetCell.classList.remove('active');  
          }  
        }  
      }  
    }  
  }

  allCells.forEach(cell => {  
    cell.addEventListener('mousedown', () => {  
      isDrawing = true;  
      draw(cell);  
    });  
    cell.addEventListener('mouseover', () => {  
      if (isDrawing) draw(cell);  
    });  
    cell.addEventListener('touchstart', e => {  
      e.preventDefault();  
      isDrawing = true;  
      draw(cell);  
    }, { passive: false });  
    cell.addEventListener('touchmove', e => {  
      e.preventDefault();  
      const touch = e.touches[0];  
      const gridRect = grid.getBoundingClientRect();  
      if (  
        touch.clientX >= gridRect.left &&  
        touch.clientX <= gridRect.right &&  
        touch.clientY >= gridRect.top &&  
        touch.clientY <= gridRect.bottom  
      ) {  
        const element = document.elementFromPoint(touch.clientX, touch.clientY);  
        if (element && element.classList.contains('cell') && grid.contains(element)) {  
          draw(element);  
        }  
      }  
    }, { passive: false });  
  });  

  document.addEventListener('mouseup', () => isDrawing = false);  
  document.addEventListener('touchend', () => isDrawing = false);  

  function clearGrid() {
    saveState();  
    allCells.forEach(cell => cell.classList.remove('active'));  
  }  

  function saveCurrentChar() {  
    const data = [];  
    allCells.forEach((cell, i) => {  
      data[i] = cell.classList.contains('active') ? 1 : 0;  
    });  
    cellData[currentChar] = data;  
  }  

  function loadChar(char) {  
    clearGrid();  
    const data = cellData[char];  
    if (data) {  
      allCells.forEach((cell, i) => {  
        if (data[i]) cell.classList.add('active');  
      });  
    }  
  }  

  function getTightCropBounds(data) {  
    let minX = gridCols, maxX = -1, minY = gridRows, maxY = -1;  
    for (let y = 0; y < gridRows; y++) {  
      for (let x = 0; x < gridCols; x++) {  
        const i = y * gridCols + x;  
        if (data[i]) {  
          if (x < minX) minX = x;  
          if (x > maxX) maxX = x;  
          if (y < minY) minY = y;  
          if (y > maxY) maxY = y;  
        }  
      }  
    }  
    if (maxX === -1) return null;  
    return { minX, maxX, minY, maxY };  
  }  

  function exportFont() {  
    saveCurrentChar();  
    const glyphs = [];  
    const unitsPerEm = 2048;  
    const blockSize = unitsPerEm / gridRows;  
  
    const notdefPath = new opentype.Path();  
    glyphs.push(new opentype.Glyph({  
      name: '.notdef',  
      unicode: 0,  
      advanceWidth: unitsPerEm,  
      path: notdefPath  
    }));  
  
    for (const char in cellData) {  
      const data = cellData[char] || [];  
      const bounds = getTightCropBounds(data);  
      const path = new opentype.Path();  
  
      if (bounds) {  
        const { minX, maxX, minY, maxY } = bounds;  
        const glyphWidth = (maxX - minX + 1) * blockSize;  
  
        for (let y = minY; y <= maxY; y++) {  
          for (let x = minX; x <= maxX; x++) {  
            const index = y * gridCols + x;  
            if (data[index]) {  
              const px = (x - minX) * blockSize;  
              const py = (gridRows - 1 - y) * blockSize;  
  
              path.moveTo(px, py);  
              path.lineTo(px + blockSize, py);  
              path.lineTo(px + blockSize, py + blockSize);  
              path.lineTo(px, py + blockSize);  
              path.close();  
            }  
          }  
        }  
  
        glyphs.push(new opentype.Glyph({  
          name: char,  
          unicode: char.charCodeAt(0),  
          advanceWidth: glyphWidth,  
          path: path  
        }));  
      } else {  
        glyphs.push(new opentype.Glyph({  
          name: char,  
          unicode: char.charCodeAt(0),  
          advanceWidth: unitsPerEm,  
          path: new opentype.Path()  
        }));  
      }  
    }  
  
    const font = new opentype.Font({  
      familyName: 'MyGridFont',  
      styleName: 'Regular',  
      unitsPerEm: unitsPerEm,  
      ascender: unitsPerEm * 0.85,  
      descender: -unitsPerEm * 0.15,  
      glyphs: glyphs  
    });  
  
    const buffer = font.toArrayBuffer();  
    const blob = new Blob([buffer], { type: 'font/ttf' });  
    const link = document.createElement('a');  
    link.href = URL.createObjectURL(blob);  
    link.download = 'MyGridFont.ttf';  
    link.click();  
  }  

  loadChar(currentChar);  

  window.addEventListener('beforeunload', function (e) {  
    e.preventDefault();  
    e.returnValue = 'Are you sure you want to reload? All unsaved work will be lost.';  
  });  