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

  function clearSession() {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(NAME_KEY);
  }

  function isAuthorized() {
    return sessionStorage.getItem(AUTH_KEY) === "true" &&
      normalizeEmail(sessionStorage.getItem(EMAIL_KEY)) === ALLOWED_EMAIL;
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(String(value));
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async function getPasswordHash() {
    const response = await fetch("assets/config/auth-config.json", {
      cache: "no-store",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error("Auth configuration is missing.");
    }

    const config = await response.json();
    if (!/^[a-f0-9]{64}$/i.test(String(config.passwordHash || ""))) {
      throw new Error("Auth configuration is invalid.");
    }

    return String(config.passwordHash).toLowerCase();
  }

  async function login(email, password) {
    clearSession();

    if (normalizeEmail(email) !== ALLOWED_EMAIL || !String(password || "")) {
      return false;
    }

    try {
      const [enteredHash, allowedHash] = await Promise.all([
        sha256(password),
        getPasswordHash(),
      ]);

      if (enteredHash !== allowedHash) {
        return false;
      }
    } catch (error) {
      console.error("VIB demo authentication error:", error);
      return false;
    }

    sessionStorage.setItem(AUTH_KEY, "true");
    sessionStorage.setItem(EMAIL_KEY, ALLOWED_EMAIL);
    sessionStorage.setItem(NAME_KEY, "Nicole Ramos");
    return true;
  }

  function logout() {
    clearSession();
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
