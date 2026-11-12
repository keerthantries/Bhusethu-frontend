/* Bhusethu — site interactions (vanilla JS, no dependencies) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------ */
  /* Header scroll state                                                */
  /* ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var setHeader = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    setHeader();
    window.addEventListener("scroll", setHeader, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Mobile navigation                                                  */
  /* ------------------------------------------------------------------ */
  var nav = document.getElementById("mobileNav");
  var navBackdrop = document.querySelector(".nav-backdrop");
  var menuToggle = document.querySelector(".menu-toggle");
  var menuClose = document.querySelector(".mobile-close");
  var lastFocused = null;

  function openNav() {
    if (!nav) return;
    lastFocused = document.activeElement;
    nav.hidden = false;
    if (navBackdrop) navBackdrop.hidden = false;
    // allow the browser to paint the starting position before transitioning
    requestAnimationFrame(function () {
      nav.classList.add("is-open");
      if (navBackdrop) navBackdrop.classList.add("is-open");
    });
    document.body.classList.add("nav-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
    var first = nav.querySelector("a, button");
    if (first) setTimeout(function () { first.focus(); }, 60);
  }

  function closeNav(returnFocus) {
    if (!nav) return;
    nav.classList.remove("is-open");
    if (navBackdrop) navBackdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    setTimeout(function () {
      nav.hidden = true;
      if (navBackdrop) navBackdrop.hidden = true;
    }, reduceMotion ? 0 : 320);
    if (returnFocus && lastFocused) lastFocused.focus();
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      if (nav.hidden) openNav();
      else closeNav(true);
    });
  }
  if (menuClose) menuClose.addEventListener("click", function () { closeNav(true); });
  if (navBackdrop) navBackdrop.addEventListener("click", function () { closeNav(true); });
  if (nav) {
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeNav(false); });
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav && !nav.hidden) closeNav(true);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1080 && nav && !nav.hidden) closeNav(false);
  });

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll (subtle, progressive)                             */
  /* ------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      revealItems.forEach(function (el) { observer.observe(el); });
    }
  }


  /* ------------------------------------------------------------------ */
  /* Service preselect (contact.html?service=due_diligence)             */
  /* ------------------------------------------------------------------ */
  var params = new URLSearchParams(window.location.search);
  var requestedService = params.get("service");
  if (requestedService) {
    document.querySelectorAll("[data-service-select]").forEach(function (select) {
      var option = select.querySelector('option[value="' + requestedService + '"]');
      if (option) select.value = requestedService;
    });
  }
  if (params.get("property")) {
    document.querySelectorAll("[data-property-field]").forEach(function (input) {
      if (input.value === "") input.value = params.get("property");
    });
  }

  /* ------------------------------------------------------------------ */
  /* Enquiry forms                                                      */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-enquiry-form]").forEach(function (form) {
    var alertBox = form.querySelector("[data-form-alert]");
    var submit = form.querySelector('button[type="submit"]');
    var originalSubmit = submit ? submit.innerHTML : "Submit enquiry";
    var card = form.closest(".form-card, .contact-form-card, .aside-card");
    var success = card ? card.querySelector("[data-form-success]") : null;
    var again = success ? success.querySelector("[data-form-again]") : null;

    function showError(message) {
      if (!alertBox) return;
      alertBox.textContent = message;
      alertBox.hidden = false;
    }

    function clearError() {
      if (!alertBox) return;
      alertBox.hidden = true;
      alertBox.textContent = "";
    }

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      clearError();

      if (!form.checkValidity()) {
        form.reportValidity();
        showError("Please complete the highlighted fields with valid details.");
        var invalid = form.querySelector(":invalid");
        if (invalid) invalid.focus();
        return;
      }

      var phone = form.querySelector("[data-phone-input]");
      if (phone) {
        var digits = phone.value.replace(/\D/g, "");
        var expected = parseInt(phone.getAttribute("maxlength"), 10) || 10;
        if (digits.length !== expected) {
          showError("Please enter a valid phone number so we can reach you.");
          phone.focus();
          return;
        }
      }

      var email = form.querySelector('input[type="email"]');
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        showError("Please enter a valid email address.");
        email.focus();
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = "Sending…";
      }

      var body = new FormData();
      new FormData(form).forEach(function (value, key) {
        body.append(key, value);
      });

      try {
        await (window.bhusethuApi
          ? window.bhusethuApi.post(form.action, body, { timeout: 120000 })
          : Promise.reject(new Error("HTTP client unavailable")));

        form.reset();
        if (window.turnstile && typeof window.turnstile.reset === "function") {
          window.turnstile.reset();
        }
        if (success) {
          form.hidden = true;
          success.hidden = false;
          success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          var heading = success.querySelector("h4, h3");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus({ preventScroll: true });
          }
        } else {
          showError(
            "Thank you — your enquiry was sent. Our team will contact you shortly."
          );
          alertBox.classList.add("form-alert--success");
          form.reset();
        }
      } catch (error) {
        console.error("Enquiry submission error:", error);
        if (error && error.response && error.response.status >= 200 && error.response.status < 300) {
          form.reset();
          if (window.turnstile && typeof window.turnstile.reset === "function") {
            window.turnstile.reset();
          }
          if (success) {
            form.hidden = true;
            success.hidden = false;
            success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
            var heading = success.querySelector("h4, h3");
            if (heading) {
              heading.setAttribute("tabindex", "-1");
              heading.focus({ preventScroll: true });
            }
          } else {
            showError(
              "Thank you — your enquiry was sent. Our team will contact you shortly."
            );
            alertBox.classList.add("form-alert--success");
            form.reset();
          }
        } else {
          showError(
            error && error.status
              ? error.message
              : "We could not send your enquiry. Please check your connection and try again, or call +91 81252 91166."
          );
        }
      } finally {
        if (submit) {
          submit.disabled = false;
          submit.innerHTML = originalSubmit;
        }
      }
    });

    if (again) {
      again.addEventListener("click", function () {
        success.hidden = true;
        form.hidden = false;
        clearError();
        var first = form.querySelector("input, select, textarea");
        if (first) first.focus();
      });
    }
  });

  /* ------------------------------------------------------------------ */
  /* Property gallery + lightbox                                        */
  /* ------------------------------------------------------------------ */
  var galleryMain = document.querySelector("[data-gallery-main]");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll("[data-gallery-thumb]"));
  if (galleryMain && thumbs.length) {
    var galleryImages = thumbs.map(function (thumb) {
      return { src: thumb.dataset.src, alt: thumb.dataset.alt || "" };
    });
    var current = 0;

    thumbs.forEach(function (thumb, index) {
      thumb.addEventListener("click", function () {
        galleryMain.src = thumb.dataset.src;
        galleryMain.alt = thumb.dataset.alt || "";
        current = index;
        thumbs.forEach(function (item) { item.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });

    var lightbox = document.getElementById("lightbox");
    if (lightbox) {
      var lightboxImg = lightbox.querySelector("img");
      var closeBtn = lightbox.querySelector(".lightbox__close");
      var prevBtn = lightbox.querySelector(".lightbox__nav--prev");
      var nextBtn = lightbox.querySelector(".lightbox__nav--next");

      function renderLightbox() {
        lightboxImg.src = galleryImages[current].src;
        lightboxImg.alt = galleryImages[current].alt;
      }

      function openLightbox() {
        renderLightbox();
        lightbox.classList.add("is-open");
        document.body.classList.add("nav-open");
        if (closeBtn) closeBtn.focus();
      }

      function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("nav-open");
      }

      galleryMain.addEventListener("click", openLightbox);
      galleryMain.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox();
        }
      });
      if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          current = (current - 1 + galleryImages.length) % galleryImages.length;
          renderLightbox();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          current = (current + 1) % galleryImages.length;
          renderLightbox();
        });
      }
      lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
      });
      document.addEventListener("keydown", function (event) {
        if (!lightbox.classList.contains("is-open")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowLeft" && prevBtn) prevBtn.click();
        if (event.key === "ArrowRight" && nextBtn) nextBtn.click();
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Horizontal rails (property / service carousels)                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-rail]").forEach(function (rail) {
    var scope = rail.closest("section") || document;
    var prev = scope.querySelector("[data-rail-prev]");
    var next = scope.querySelector("[data-rail-next]");
    var dotsWrap = scope.querySelector("[data-rail-dots]");
    var cards = Array.prototype.slice.call(rail.children);
    var dots = [];

    if (dotsWrap && cards.length) {
      cards.forEach(function (_, index) {
        var dot = document.createElement("span");
        dot.className = "rail-dot" + (index === 0 ? " is-active" : "");
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function step() {
      if (!cards.length) return rail.clientWidth * 0.8;
      var gap = parseFloat(getComputedStyle(rail).columnGap || "16") || 16;
      return cards[0].getBoundingClientRect().width + gap;
    }

    function update() {
      var max = rail.scrollWidth - rail.clientWidth - 2;
      var arrows = scope.querySelector(".rail-arrows");
      if (arrows) {
        arrows.style.visibility = max > 2 ? "" : "hidden";
      }
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft >= max;
      if (dots.length) {
        var index = Math.min(dots.length - 1, Math.round(rail.scrollLeft / step()));
        dots.forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === index);
        });
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        rail.scrollBy({ left: -step(), behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        rail.scrollBy({ left: step(), behavior: reduceMotion ? "auto" : "smooth" });
      });
    }

    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* ------------------------------------------------------------------ */
  /* Footer year                                                        */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });
})();
