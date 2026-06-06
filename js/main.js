/**
 * EM Montage & Dienstleistungen – Hauptlogik
 * ------------------------------------------
 * - Sprachumschaltung DE/EN (ohne Neuladen) via data-i18n
 * - Speicherung der Sprache & Cookie-Auswahl im localStorage
 * - Cookie-Banner (Akzeptieren / Ablehnen)
 * - Mobiles Menü, Sticky-Navbar, sanftes Scrollen
 * - Kontaktformular (mailto, reines Frontend)
 *
 * Benötigt: js/translations.js (window.TRANSLATIONS) vor dieser Datei laden.
 */
(function () {
  "use strict";

  var STORAGE_LANG = "em_lang";
  var STORAGE_COOKIE = "em_cookie_consent";
  var DEFAULT_LANG = "de";
  var CONTACT_EMAIL = "montage.service.em@gmail.com";

  var T = window.TRANSLATIONS || {};

  /* -------- Hilfsfunktionen für localStorage (mit Fallback) -------- */
  function storageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* z.B. Privater Modus – still ignorieren */
    }
  }

  /* -------- Sprache ermitteln -------- */
  function getInitialLang() {
    var saved = storageGet(STORAGE_LANG);
    if (saved === "de" || saved === "en") return saved;
    return DEFAULT_LANG;
  }

  /* -------- Übersetzung anwenden -------- */
  function applyLanguage(lang) {
    var dict = T[lang] || T[DEFAULT_LANG] || {};

    // Textinhalte
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!dict[key]) return;
      // Mehrzeilige Texte (\n) als <br> rendern, sonst reiner Text
      if (dict[key].indexOf("\n") !== -1) {
        el.innerHTML = dict[key]
          .split("\n")
          .map(escapeHtml)
          .join("<br>");
      } else {
        el.textContent = dict[key];
      }
    });

    // Attribute (placeholder, aria-label, content, ...)
    // Format:  data-i18n-attr="placeholder:contact.form.name; aria-label:nav.menu"
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var spec = el.getAttribute("data-i18n-attr");
      spec.split(";").forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (dict[key]) el.setAttribute(attr, dict[key]);
      });
    });

    // <html lang="">
    document.documentElement.setAttribute("lang", lang);

    // Toggle-Status aktualisieren
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var active = btn.getAttribute("data-lang-btn") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    storageSet(STORAGE_LANG, lang);
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* -------- Sprach-Toggle verdrahten -------- */
  function initLangToggle() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang-btn"));
      });
    });
  }

  /* -------- Cookie-Banner -------- */
  function initCookieBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;

    var consent = storageGet(STORAGE_COOKIE);
    if (consent === "accepted" || consent === "declined") {
      banner.hidden = true;
      return;
    }
    // Anzeigen (mit kleiner Verzögerung für sanftes Einblenden)
    banner.hidden = false;
    window.requestAnimationFrame(function () {
      banner.classList.add("is-visible");
    });

    function close(decision) {
      storageSet(STORAGE_COOKIE, decision);
      banner.classList.remove("is-visible");
      window.setTimeout(function () {
        banner.hidden = true;
      }, 300);
    }

    var acceptBtn = banner.querySelector("[data-cookie-accept]");
    var declineBtn = banner.querySelector("[data-cookie-decline]");
    if (acceptBtn) acceptBtn.addEventListener("click", function () { close("accepted"); });
    if (declineBtn) declineBtn.addEventListener("click", function () { close("declined"); });
  }

  /* -------- Mobiles Menü -------- */
  function initMobileMenu() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var menu = document.getElementById("primary-nav");
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(!menu.classList.contains("is-open"));
    });

    // Bei Klick auf einen Link schließen
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
  }

  /* -------- Sticky-Navbar Schatten bei Scroll -------- */
  function initNavbarScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -------- Scroll-Reveal-Animationen -------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(function (el) { obs.observe(el); });
  }

  /* -------- Kontaktformular (mailto, reines Frontend) -------- */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var lang = getInitialLang();
      var dict = T[lang] || {};

      var name = (form.querySelector("#cf-name") || {}).value || "";
      var email = (form.querySelector("#cf-email") || {}).value || "";
      var phone = (form.querySelector("#cf-phone") || {}).value || "";
      var service = (form.querySelector("#cf-service") || {}).value || "";
      var message = (form.querySelector("#cf-message") || {}).value || "";

      // Pflichtfelder prüfen
      if (!name.trim() || !email.trim() || !message.trim()) {
        var note = form.querySelector(".form-error");
        if (note) {
          note.textContent = dict["contact.form.required"] || "";
          note.hidden = false;
        }
        return;
      }

      var subjectPrefix =
        lang === "en"
          ? "Request via website – EM Montage"
          : "Anfrage über Website – EM Montage";

      var bodyLines =
        lang === "en"
          ? [
              "Name: " + name,
              "E-mail: " + email,
              "Phone: " + phone,
              "Service: " + service,
              "",
              "Message:",
              message,
            ]
          : [
              "Name: " + name,
              "E-Mail: " + email,
              "Telefon: " + phone,
              "Leistung: " + service,
              "",
              "Nachricht:",
              message,
            ];

      var mailto =
        "mailto:" +
        CONTACT_EMAIL +
        "?subject=" +
        encodeURIComponent(subjectPrefix) +
        "&body=" +
        encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
    });
  }

  /* -------- Aktuelles Jahr im Footer -------- */
  function initYear() {
    var el = document.getElementById("current-year");
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  /* -------- Initialisierung -------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getInitialLang());
    initLangToggle();
    initCookieBanner();
    initMobileMenu();
    initNavbarScroll();
    initReveal();
    initContactForm();
    initYear();
  });
})();
