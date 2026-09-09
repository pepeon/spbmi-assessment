document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const offcanvasMenu = document.getElementById("offcanvasMenu");
  const offcanvasOverlay = document.getElementById("offcanvasOverlay");
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
    offcanvasOverlay.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function closeMenu() {
    if (!isOpen) return;
    isOpen = false;
    hamburgerBtn.classList.remove("active");
    offcanvasMenu.classList.remove("open");
    offcanvasOverlay.classList.remove("open");
    mobileHeader.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", toggleMenu);
  offcanvasOverlay.addEventListener("click", closeMenu);

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

      // Переключаем подменю
      submenu.classList.toggle("open", !isOpen);
    });
  });

  // Закрытие при клике по ссылке
  document.querySelectorAll(".offcanvas-link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
  // ===== ТАБЫ =====
  const tabItems = document.querySelectorAll(".tab-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabItems.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Убираем active со всех табов и контента
      tabItems.forEach(function (t) {
        t.classList.remove("active");
      });
      tabPanes.forEach(function (pane) {
        pane.classList.remove("active");
      });

      // Добавляем active текущему табу и контенту
      this.classList.add("active");
      const targetPane = document.getElementById("tab-" + targetTab);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // ===== АККОРДЕОН (ОРГКОМИТЕТ) =====
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Закрываем все аккордеоны (опционально, если нужно только один открытый)
      // accordionItems.forEach(function (i) {
      //   i.classList.remove('active');
      // });

      // Переключаем текущий
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
      // Устанавливаем общее количество слайдов
      totalSpan.textContent = s.slides.length;
      updateButtons(s);
    },
    slideChanged(s) {
      // Обновляем счётчик
      currentSpan.textContent = s.track.details.rel + 1;
      updateButtons(s);
    },
  });

  // Навигация
  prevBtn.addEventListener("click", function () {
    slider.prev();
  });

  nextBtn.addEventListener("click", function () {
    slider.next();
  });

  // Обновление состояния кнопок
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

  // Вызываем сразу при загрузке
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

        // Генерируем точки во всех слайдах
        const allSlideDotsContainers =
          document.querySelectorAll(".review-dots");
        allSlideDotsContainers.forEach(function (container) {
          createDots(container, totalSlides);
        });

        // Обновляем активную точку на первом слайде
        updateActiveDots(s.track.details.rel);
      },
      slideChanged(s) {
        // Обновляем активную точку при смене слайда
        updateActiveDots(s.track.details.rel);
      },
    });

    // Функция создания точек в контейнере
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

    // Функция обновления активной точки во всех контейнерах
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
