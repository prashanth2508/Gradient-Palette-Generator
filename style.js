const preview = document.getElementById('preview');
const cssCode = document.getElementById('cssCode');
const copyBtn = document.getElementById('copyCss');
const randomBtn = document.getElementById('randomBtn');
const stopsContainer = document.getElementById('stops');
const directionSelect = document.getElementById('direction');
const angleInput = document.getElementById('angle');
const addStopBtn = document.getElementById('addStop');

let colorStops = ['#ff6f61', '#6a5acd']; 
let direction = 'to right';

function updateGradient() {
  const angle = direction === 'random' ? `${Math.floor(Math.random() * 360)}deg` : direction;
  const gradient = `linear-gradient(${angle}, ${colorStops.join(', ')})`;
  preview.style.background = gradient;
  cssCode.textContent = `background: ${gradient};`;
  document.getElementById('previewCss').textContent = gradient;
  renderColorCodes();
}

function renderStops() {
  stopsContainer.innerHTML = '';
  colorStops.forEach((color, index) => {
    const div = document.createElement('div');
    div.classList.add('stop');

    const input = document.createElement('input');
    input.type = 'color';
    input.value = color;
    input.addEventListener('input', (e) => {
      colorStops[index] = e.target.value;
      updateGradient();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.className = 'btn small secondary';
    removeBtn.onclick = () => {
      if (colorStops.length > 2) {
        colorStops.splice(index, 1);
        renderStops();
        updateGradient();
      }
    };

    div.appendChild(input);
    if (colorStops.length > 2) div.appendChild(removeBtn);
    stopsContainer.appendChild(div);
  });
}

function renderColorCodes() {
  const codesDiv = document.getElementById('colorCodes');
  codesDiv.innerHTML = '';
  colorStops.forEach((color) => {
    const p = document.createElement('p');
    p.textContent = color;
    codesDiv.appendChild(p);
  });
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(cssCode.textContent)
    .then(() => alert('CSS Copied!'));
});

randomBtn.addEventListener('click', () => {
  colorStops = colorStops.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  if (direction === 'random') {
    angleInput.value = Math.floor(Math.random() * 360);
  }
  updateGradient();
  renderStops();
});

directionSelect.addEventListener('change', (e) => {
  direction = e.target.value;
  if (direction === 'random') {
    angleInput.style.display = 'block';
  } else {
    angleInput.style.display = 'none';
  }
  updateGradient();
});

angleInput.addEventListener('input', () => {
  if (direction === 'random') {
    direction = `${angleInput.value}deg`;
    updateGradient();
  }
});

addStopBtn.addEventListener('click', () => {
  if (colorStops.length < 6) {
    colorStops.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    renderStops();
    updateGradient();
  }
});

renderStops();
updateGradient();
