// =============================
// Color Tools Class (From Your Code)
// =============================
class ColorTools {
    constructor() {
        this.colorHistory = [];
        this.maxHistorySize = 50;
        this.predefinedPalettes = this.initializePalettes();
    }

    initializePalettes() {
        return {
            material: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
                '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
                '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
                '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000'],
            flat: ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
                '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
                '#f1c40f', '#e67e22', '#e74c3c', '#95a5a6', '#f39c12',
                '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d', '#ffffff']
        };
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    getComplementaryColor(hex) {
        const rgb = this.hexToRgb(hex);
        if (!rgb) return "#000000";
        return this.rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b);
    }
}

// Initialize Color Tools
document.addEventListener("DOMContentLoaded", () => {
    window.colorTools = new ColorTools();
});

// =============================
// Background Remover (remove.bg API)
// =============================
async function removeBackground(file) {
    const apiKey = "REMOVE_BG_API_KEY"; // <--- yahan apna API key daalna

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: { "X-Api-Key": apiKey },
            body: formData
        });

        if (!response.ok) throw new Error("API request failed");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        document.querySelector("#bg-preview").src = url;
    } catch (err) {
        alert("BG Remove Error: " + err.message);
    }
}

// =============================
// Image Tools
// =============================

// Resize Image
function resizeImage(file, width, height, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(callback, "image/png");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Compress Image
function compressImage(file, quality = 0.7, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(callback, "image/jpeg", quality);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// Convert Image (to PNG)
function convertToPng(file, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(callback, "image/png");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}

// =============================
// PDF Tools (pdf-lib required)
// =============================

// Merge PDFs
async function mergePDFs(files) {
    const { PDFDocument } = window.pdfLib;
    const mergedPdf = await PDFDocument.create();

    for (let file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();
    const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url);
}

// =============================
// Expose Functions
// =============================
window.removeBackground = removeBackground;
window.resizeImage = resizeImage;
window.compressImage = compressImage;
window.convertToPng = convertToPng;
window.mergePDFs = mergePDFs;
