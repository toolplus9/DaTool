// ========== CATEGORY SWITCHING ==========
document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    // sabse pehle sab buttons aur panels se active class hatao
    document.querySelectorAll(".category-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tool-panel").forEach(panel => panel.classList.remove("active"));

    // jo button dabaya usko active karo aur uska panel show karo
    button.classList.add("active");
    const category = button.getAttribute("data-category");
    const panel = document.getElementById(category + "-panel");
    if (panel) panel.classList.add("active");
  });
});

// ========== TOOL BUTTON HANDLING ==========
document.querySelectorAll(".tool-card .tool-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const tool = btn.closest(".tool-card").getAttribute("data-tool");
    if (tool) {
      // related page open karega (toolname.html)
      window.location.href = tool + ".html";
    }
  });
});

// ========== FEATHER ICONS INIT ==========
if (window.feather) {
  feather.replace();
}
