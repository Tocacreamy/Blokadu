window.addEventListener("scroll", () => {
  const navigate = document.querySelector("#header").classList;

  let scrollPosisi = window.scrollY;
  if (scrollPosisi >= 50){
    navigate.add("blur")
  }else {
    navigate.remove("blur")
  }
});


// ================================================================

const blocks = document.querySelectorAll('.block'); 
let isDragging = false;
let currentblock = null; 
let offsetX, offsetY;
let velocityX = 0, velocityY = 0;
let lastMouseX, lastMouseY;
let friction = 0.95;

blocks.forEach(block => { 
  block.addEventListener('mousedown', startDrag);
});

document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);

function startDrag(e) {
  isDragging = true;
  currentblock = e.target; // Perbaikan: Gunakan e.target
  currentblock.classList.add('dragging');
  offsetX = e.clientX - currentblock.offsetLeft;
  offsetY = e.clientY - currentblock.offsetTop;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

function drag(e) {
  if (!isDragging) return;
  currentblock.style.left = e.clientX - offsetX + 'px';
  currentblock.style.top = e.clientY - offsetY + 'px';
  velocityX = e.clientX - lastMouseX;
  velocityY = e.clientY - lastMouseY;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

function endDrag() {
  if (!isDragging) return; // Tambahkan kondisi ini
  isDragging = false;
  currentblock.classList.remove('dragging');
  animate();
}

function animate() {
  if (!currentblock) return; // Tambahkan kondisi ini
  if (Math.abs(velocityX) < 0.1 && Math.abs(velocityY) < 0.1) return;

  currentblock.style.left = currentblock.offsetLeft + velocityX + 'px';
  currentblock.style.top = currentblock.offsetTop + velocityY + 'px';

  velocityX *= friction;
  velocityY *= friction;

  requestAnimationFrame(animate);
}

