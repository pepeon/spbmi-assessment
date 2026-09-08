document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const offcanvasMenu = document.getElementById("offcanvasMenu");
  const offcanvasOverlay = document.getElementById("offcanvasOverlay");
  const mobileHeader = document.querySelector(".mobile-header");
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
