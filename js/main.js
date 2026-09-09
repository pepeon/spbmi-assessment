document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const offcanvasMenu = document.getElementById("offcanvasMenu");
  const mobileHeader = document.querySelector(".mobile-header");
  const sliderElement = document.getElementById("organizerSlider");
  const prevBtn = document.getElementById("sliderPrev");
  const nextBtn = document.getElementById("sliderNext");
  const currentSpan = document.getElementById("sliderCurrent");
  const totalSpan = document.getElementById("sliderTotal");
  const sliderNavHeader = document.getElementById("orgSliderNav");
  const sliderNavBottom = document.getElementById("sliderNavBottom");
  const reviewsSliderElement = document.getElementById("reviewsSlider");
  const dotsContainer = document.getElementById("reviewDots");
  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    hamburgerBtn.classList.toggle("active", isOpen);
    offcanvasMenu.classList.toggle("open", isOpen);
    mobileHeader.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    hamburgerBtn.classList.remove("active");
    offcanvasMenu.classList.remove("open");
    mobileHeader.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  const submenuToggles = document.querySelectorAll(".submenu-toggle");
  submenuToggles.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const submenu =
        this.closest(".offcanvas-item").querySelector(".offcanvas-submenu");
      const isOpen = submenu.classList.contains("open");

      this.classList.toggle("collapsed", isOpen);

      submenu.classList.toggle("open", !isOpen);
    });
  });

  document.querySelectorAll(".offcanvas-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  const tabItems = document.querySelectorAll(".tab-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabItems.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      tabItems.forEach(function (t) {
        t.classList.remove("active");
      });
      tabPanes.forEach(function (pane) {
        pane.classList.remove("active");
      });

      this.classList.add("active");
      const targetPane = document.getElementById("tab-" + targetTab);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      item.classList.toggle("active", !isActive);
    });
  });
  const slider = new KeenSlider(sliderElement, {
    loop: false,
    slides: {
      perView: 1,
      spacing: 20,
    },

    created(s) {
      totalSpan.textContent = s.slides.length;
      updateButtons(s);
    },
    slideChanged(s) {
      currentSpan.textContent = s.track.details.rel + 1;
      updateButtons(s);
    },
  });

  prevBtn.addEventListener("click", function () {
    slider.prev();
  });

  nextBtn.addEventListener("click", function () {
    slider.next();
  });

  function updateButtons(s) {
    const idx = s.track.details.rel;
    const maxIdx = s.slides.length - 1;

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === maxIdx;
  }

  const mediaQuery = window.matchMedia("(max-width: 576px)");

  function handleScreenChange(e) {
    if (e.matches) {
      sliderNavBottom.appendChild(prevBtn);
      sliderNavBottom.appendChild(currentSpan.parentElement);
      sliderNavBottom.appendChild(nextBtn);
    } else {
      sliderNavHeader.appendChild(prevBtn);
      sliderNavHeader.appendChild(currentSpan.parentElement);
      sliderNavHeader.appendChild(nextBtn);
    }
  }

  mediaQuery.addEventListener("change", handleScreenChange);

  handleScreenChange(mediaQuery);

  if (reviewsSliderElement) {
    const reviewsSlider = new KeenSlider(reviewsSliderElement, {
      loop: true,
      slides: {
        perView: 1,
        spacing: 0,
      },
      created(s) {
        const totalSlides = s.slides.length;

        const allSlideDotsContainers =
          document.querySelectorAll(".review-dots");
        allSlideDotsContainers.forEach(function (container) {
          createDots(container, totalSlides);
        });

        updateActiveDots(s.track.details.rel);
      },
      slideChanged(s) {
        updateActiveDots(s.track.details.rel);
      },
    });

    function createDots(container, totalSlides) {
      container.innerHTML = "";

      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.classList.add("review-dot");
        dot.setAttribute("data-index", i);
        dot.setAttribute("aria-label", `Слайд ${i + 1}`);

        dot.addEventListener("click", function () {
          const index = parseInt(this.getAttribute("data-index"));
          reviewsSlider.moveToIdx(index);
        });

        container.appendChild(dot);
      }
    }

    function updateActiveDots(activeIndex) {
      const allDots = document.querySelectorAll(".review-dot");
      allDots.forEach(function (dot) {
        const dotIndex = parseInt(dot.getAttribute("data-index"));
        if (dotIndex === activeIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }
  }
});
