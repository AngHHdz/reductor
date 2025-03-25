
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
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview';
            output.appendChild(img);
            compressImage(img, quality);
        };
        reader.readAsDataURL(file);
    });
}

function compressImage(img, quality) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        const compressedImg = document.createElement('img');
        compressedImg.src = compressedDataUrl;
        compressedImg.className = 'image-preview';
        document.getElementById('output').appendChild(compressedImg);
    };
}
