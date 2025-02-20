// Variables de configuración
let currentColor = '#000000'; // Color por defecto
let currentSize = 5; // Grosor por defecto
let currentTool = 'brush'; // Herramienta por defecto

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Variables de control de dibujo
let drawing = false;
let x = 0;
let y = 0;

// Selección de controles
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
const notesArea = document.getElementById('notes');
const clearButton = document.getElementById('clear');
const saveButton = document.getElementById('save');
const brushButton = document.getElementById('brush');
const markerButton = document.getElementById('marker');
const eraserButton = document.getElementById('eraser');

// Configuración inicial del canvas
ctx.strokeStyle = currentColor;
ctx.lineWidth = currentSize;
ctx.lineCap = 'round';

// Event listeners
colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
  ctx.strokeStyle = currentColor;
});

sizePicker.addEventListener('input', (e) => {
  currentSize = e.target.value;
  ctx.lineWidth = currentSize;
});

brushButton.addEventListener('click', () => {
  currentTool = 'brush';
});

markerButton.addEventListener('click', () => {
  currentTool = 'marker';
});

eraserButton.addEventListener('click', () => {
  currentTool = 'eraser';
});

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
  notesArea.value = ''; // Limpiar las notas
});

saveButton.addEventListener('click', saveCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Funciones de dibujo
function startDrawing(e) {
  drawing = true;
  x = e.offsetX;
  y = e.offsetY;
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath(); // Comienza una nueva línea
}

function draw(e) {
  if (!drawing) return;

  if (currentTool === 'brush' || currentTool === 'marker') {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (currentTool === 'eraser') {
    ctx.clearRect(e.offsetX - currentSize / 2, e.offsetY - currentSize / 2, currentSize, currentSize);
  }
}

// Función para guardar el dibujo y las notas
function saveCanvas() {
  const dataUrl = canvas.toDataURL(); // Obtener imagen del canvas
  const notes = notesArea.value; // Obtener las notas
  
  // Crear un archivo de texto para las notas
  const textBlob = new Blob([notes], { type: 'text/plain' });
  const textUrl = URL.createObjectURL(textBlob);

  // Crear un enlace para descargar la imagen y las notas
  const aImage = document.createElement('a');
  aImage.href = dataUrl;
  aImage.download = 'pizarra.png';
  aImage.click();
  
  const aText = document.createElement('a');
  aText.href = textUrl;
  aText.download = 'notas.txt';
  aText.click();
}


