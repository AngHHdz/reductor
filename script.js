let quality = 0.8;

function updateQuality() {
    const slider = document.getElementById('qualitySlider');
    quality = slider.value / 100;
    document.getElementById('qualityValue').innerText = slider.value;
}

function processImages() {
    const input = document.getElementById('fileInput');
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (input.files.length === 0) {
        alert('Por favor, selecciona al menos una imagen.');
        return;
    }

    Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                compressImage(img, file.name, quality);
            };
        };
        reader.readAsDataURL(file);
    });
}

function compressImage(img, fileName, quality) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
    displayCompressedImage(compressedDataUrl, fileName);
}

function displayCompressedImage(dataUrl, fileName) {
    const output = document.getElementById('output');

    // Mostrar imagen comprimida
    const compressedImg = document.createElement('img');
    compressedImg.src = dataUrl;
    compressedImg.className = 'image-preview';
    output.appendChild(compressedImg);

    // Crear enlace de descarga
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'compressed_' + fileName;
    link.innerText = 'Descargar ' + fileName;
    link.className = 'download-link';
    output.appendChild(link);
}
