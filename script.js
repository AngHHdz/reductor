let quality = 0.8;
let compressedImages = [];

function updateQuality() {
    const slider = document.getElementById('qualitySlider');
    quality = slider.value / 100;
    document.getElementById('qualityValue').innerText = slider.value;
}

function processImages() {
    const input = document.getElementById('fileInput');
    const output = document.getElementById('output');
    output.innerHTML = '';
    compressedImages = [];

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

    // Crear botón para descargar todo
    const downloadAllBtn = document.createElement('button');
    downloadAllBtn.innerText = 'Descargar Todo';
    downloadAllBtn.onclick = downloadAllImages;
    downloadAllBtn.className = 'download-all-btn';
    output.appendChild(downloadAllBtn);
}

function compressImage(img, fileName, quality) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
    displayCompressedImage(compressedDataUrl, fileName);
    compressedImages.push({ name: 'compressed_' + fileName, dataUrl: compressedDataUrl });
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

function downloadAllImages() {
    if (compressedImages.length === 0) {
        alert('No hay imágenes para descargar.');
        return;
    }

    const zip = new JSZip();

    compressedImages.forEach(img => {
        const data = img.dataUrl.split(',')[1];
        zip.file(img.name, data, { base64: true });
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'compressed_images.zip';
        link.click();
    });
}
