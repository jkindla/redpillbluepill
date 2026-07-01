const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const carousel = document.querySelector("[data-carousel]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (header && menuToggle && nav) {
  const setMenuOpen = (isOpen) => {
    header.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!header.classList.contains("is-menu-open"));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 701px)").matches) {
      setMenuOpen(false);
    }
  });
}

if (carousel) {
  const track = carousel.querySelector("[data-carousel-track]");
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const slides = Array.from(track.children);
  let index = 0;

  const visibleSlides = () => (window.matchMedia("(min-width: 780px)").matches ? 2 : 1);
  const maxIndex = () => Math.max(0, slides.length - visibleSlides());

  const updateCarousel = () => {
    index = Math.min(index, maxIndex());
    const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  };

  prev.addEventListener("click", () => {
    index = index <= 0 ? maxIndex() : index - 1;
    updateCarousel();
  });

  next.addEventListener("click", () => {
    index = index >= maxIndex() ? 0 : index + 1;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);
  updateCarousel();
}
