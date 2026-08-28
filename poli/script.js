const windowEl = document.getElementById('myWindow');
const titleBar = document.getElementById('titleBar');
const minBtn   = document.getElementById('minBtn');
const maxBtn   = document.getElementById('maxBtn');
const closeBtn = document.getElementById('closeBtn');
const taskBtn  = document.getElementById('taskBtn');
const imageWindow = document.getElementById('imageWindow');
const imageTitleBar = document.getElementById('imageTitleBar');
const imgMinBtn = document.getElementById('imgMinBtn');
const imgMaxBtn = document.getElementById('imgMaxBtn');
const imgCloseBtn = document.getElementById('imgCloseBtn');

imageWindow.style.display = 'block';

const windowWidth = imageWindow.offsetWidth;
const windowHeight = imageWindow.offsetHeight;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Vertically center
imageWindow.style.top = `${(screenHeight - windowHeight) / 2}px`;

// Horizontally near the right side, with some margin (say 50px)
imageWindow.style.left = `${screenWidth - windowWidth - 50}px`;


// === Dragging Logic ===
let isDragging = false;
let offsetX = 0, offsetY = 0;

titleBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - windowEl.offsetLeft;
  offsetY = e.clientY - windowEl.offsetTop;
  windowEl.style.position = 'absolute';
  windowEl.style.zIndex = 1000;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging && !windowEl.classList.contains('maximized')) {
    windowEl.style.left = `${e.clientX - offsetX}px`;
    windowEl.style.top  = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// === Minimize ===
minBtn.addEventListener('click', () => {
  windowEl.classList.add('minimized');
});

// === Maximize / Restore ===
maxBtn.addEventListener('click', () => {
  if (!windowEl.classList.contains('maximized')) {
    // Save previous position
    windowEl.dataset.prevStyles = JSON.stringify({
      left: windowEl.style.left,
      top: windowEl.style.top,
      width: windowEl.style.width,
      height: windowEl.style.height,
      position: windowEl.style.position,
      margin: windowEl.style.margin,
      boxShadow: windowEl.style.boxShadow
    });
    windowEl.classList.remove('minimized');
    taskBtn.style.display = 'none';
    windowEl.classList.add('maximized');
  } else {
    const prev = JSON.parse(windowEl.dataset.prevStyles || '{}');
    Object.assign(windowEl.style, prev);
    windowEl.classList.remove('maximized');
  }
});

// === Close ===
closeBtn.addEventListener('click', () => {
  windowEl.style.display = 'none';
});

// === Restore from Taskbar ===
taskBtn.addEventListener('click', () => {
  if (windowEl.classList.contains('minimized')) {
      windowEl.classList.remove('minimized');
      windowEl.style.display = 'block';
  } else {
      windowEl.classlist.add('minimized');
  }
  
});



function updateClock() {
  const now = new Date();
  const hrs = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('taskbarClock').textContent = `${hrs}:${mins}`;
}

setInterval(updateClock, 1000);
updateClock();

const desktopIcon = document.getElementById('desktopIcon');

desktopIcon.addEventListener('dblclick', () => {
  windowEl.style.display = 'block';
  windowEl.classList.remove('minimized');
  windowEl.classList.remove('maximized');

    // Also show image window
  imageWindow.classList.remove('minimized');
  imageWindow.classList.remove('maximized');
});


// Dragging logic for imageWindow
let isDraggingImg = false;
let offsetXImg = 0, offsetYImg = 0;


imageTitleBar.addEventListener('mousedown', (e) => {
  isDraggingImg = true;
  offsetXImg = e.clientX - imageWindow.offsetLeft;
  offsetYImg = e.clientY - imageWindow.offsetTop;
  imageWindow.style.position = 'absolute';
  imageWindow.style.zIndex = 1001;
});

document.addEventListener('mousemove', (e) => {
  if (isDraggingImg && !imageWindow.classList.contains('maximized')) {
    imageWindow.style.left = `${e.clientX - offsetXImg}px`;
    imageWindow.style.top = `${e.clientY - offsetYImg}px`;
  }
});

document.addEventListener('mouseup', () => {
  isDraggingImg = false;
});

// Minimize
imgMinBtn.addEventListener('click', () => {
  imageWindow.classList.add('minimized');
});

// Maximize / Restore
imgMaxBtn.addEventListener('click', () => {
  if (!imageWindow.classList.contains('maximized')) {
    imageWindow.dataset.prevStyles = JSON.stringify({
      left: imageWindow.style.left,
      top: imageWindow.style.top,
      width: imageWindow.style.width,
      height: imageWindow.style.height,
      position: imageWindow.style.position,
      margin: imageWindow.style.margin,
      boxShadow: imageWindow.style.boxShadow
    });
    imageWindow.classList.remove('minimized');
    imageWindow.classList.add('maximized');
  } else {
    const prev = JSON.parse(imageWindow.dataset.prevStyles || '{}');
    Object.assign(imageWindow.style, prev);
    imageWindow.classList.remove('maximized');
  }
});

// Close
imgCloseBtn.addEventListener('click', () => {
  imageWindow.style.display = 'none';
});

const imageWindowBtn = document.getElementById('imageWindowBtn');

imageWindowBtn.addEventListener('click', () => {
    if (imageWindow.classList.contains('minimized')) {
        imageWindow.classList.remove('minimized');
        imageWindow.style.display = 'block';
    } else {
        imageWindow.classList.add('minimized');
        
    }
});
