// ======================
// Category Switching
// ======================
document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const toolSections = document.querySelectorAll(".tool-section");

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class
            categoryButtons.forEach(b => b.classList.remove("active"));
            toolSections.forEach(sec => sec.classList.add("hidden"));

            // Add active to clicked
            btn.classList.add("active");
            const target = btn.getAttribute("data-target");
            const targetSection = document.getElementById(target);
            if (targetSection) targetSection.classList.remove("hidden");
        });
    });
});

// ======================
// Example Tool Actions
// ======================
function mergePDF() {
    alert("Merge PDF tool clicked! (Yahan API connect karna baaki hai)");
}

function splitPDF() {
    alert("Split PDF tool clicked!");
}

function compressPDF() {
    alert("Compress PDF tool clicked!");
}

function removeBG() {
    // Example background remover
    window.open("https://www.remove.bg/", "_blank");
}

function imageResize() {
    alert("Image Resize tool clicked!");
}

function colorPicker() {
    alert("Color Picker tool clicked!");
}

// ======================
// Safe check (no crash)
// ======================
console.log("✅ Script.js loaded successfully");
