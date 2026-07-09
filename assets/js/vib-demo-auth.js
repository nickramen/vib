(function () {
  "use strict";

  const ALLOWED_EMAIL = "nicole@nickramen.com";
  const AUTH_KEY = "vib_demo_authorized";
  const EMAIL_KEY = "vib_user_email";
  const NAME_KEY = "vib_user_name";
  const LOGIN_PAGES = new Set(["", "index.html", "admin-login.html", "student-login.html"]);
  const page = (window.location.pathname.split("/").pop() || "").toLowerCase();

  function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
  }

  function isAuthorized() {
    return localStorage.getItem(AUTH_KEY) === "true" && normalizeEmail(localStorage.getItem(EMAIL_KEY)) === ALLOWED_EMAIL;
  }

  function login(email, password) {
    if (normalizeEmail(email) !== ALLOWED_EMAIL || !String(password || "").trim()) {
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(EMAIL_KEY);
      return false;
    }

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(EMAIL_KEY, ALLOWED_EMAIL);
    localStorage.setItem(NAME_KEY, "Nicole Ramos");
    return true;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(NAME_KEY);
    window.location.href = "index.html";
  }

  window.VIB_DEMO_AUTH = {
    allowedEmail: ALLOWED_EMAIL,
    isAuthorized,
    login,
    logout,
  };

  if (!LOGIN_PAGES.has(page) && !isAuthorized()) {
    window.location.replace("index.html?demoAccess=restricted");
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("#logoutBtn, .fac-profile-dropdown-logout").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        logout();
      });
    });
  });
})();
