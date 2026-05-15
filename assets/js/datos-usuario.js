const userName = localStorage.getItem("vib_user_name") || "Usuario";
const userEmail = localStorage.getItem("vib_user_email") || "";
const firstName = userName.split(" ")[0];
const initials = userName
  .split(" ")
  .map((w) => w[0])
  .join("")
  .substring(0, 2)
  .toUpperCase();

// Navbar
const el = (id) => document.getElementById(id);
if (el("navUserName")) el("navUserName").textContent = userName;
if (el("navUserInitials")) el("navUserInitials").textContent = initials;
if (el("dropdownName")) el("dropdownName").textContent = userName;
if (el("dropdownInitials")) el("dropdownInitials").textContent = initials;

// Foto: si no existe el archivo, el onerror del <img> muestra las iniciales automáticamente
// Si quisieras forzar un src dinámico basado en el nombre guardado, descomenta:
// if (el('navUserPhoto')) el('navUserPhoto').src = localStorage.getItem('vib_user_photo') || '';

// Logout
if (el("logoutBtn")) {
  el("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("vib_user_name");
    localStorage.removeItem("vib_user_email");
    window.location.href = "index.html";
  });
}
