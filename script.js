console.clear();

$(".search_btn").click(function () {
  $(".search_box, .search_btn, header, .top_bar_logo").toggleClass("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const progressItems = document.querySelectorAll(".progress-item");
  const progressFills = document.querySelectorAll(".progress-fill");

  if (!slides.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 8000;
  const animationDuration = 700;
  let autoTimer = null;
  let isAnimating = false;

  function setInitialSlide() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "out");

      if (index === currentIndex) {
        slide.classList.add("active");
      }
    });
  }

  function updateProgress() {
    progressFills.forEach((fill) => {
      fill.style.transition = "none";
      fill.style.width = "0%";
    });

    const activeFill = progressFills[currentIndex];
    if (!activeFill) return;

    activeFill.offsetWidth;
    activeFill.style.transition = `width ${slideDuration}ms linear`;
    activeFill.style.width = "100%";
  }

  function restartAutoSlide() {
    clearTimeout(autoTimer);

    autoTimer = setTimeout(() => {
      goToSlide((currentIndex + 1) % totalSlides);
    }, slideDuration);
  }

  function goToSlide(nextIndex) {
    if (isAnimating || nextIndex === currentIndex) return;

    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];

    currentSlide.classList.remove("active");
    currentSlide.classList.add("out");

    nextSlide.classList.add("active");

    currentIndex = nextIndex;
    updateProgress();
    restartAutoSlide();

    setTimeout(() => {
      slides.forEach((slide, index) => {
        if (index !== currentIndex) {
          slide.classList.remove("active", "out");
        }
      });

      isAnimating = false;
    }, animationDuration);
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  progressItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      goToSlide(index);
    });
  });

  setInitialSlide();
  updateProgress();
  restartAutoSlide();
});
