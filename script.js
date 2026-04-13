console.clear();

$(".search_btn").click(function () {
  $(".search_box, .search_btn, header, .top_bar_logo").toggleClass("active");
});

const slider = document.querySelector(".slider");
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
const totalSlides = slides.length;
let autoSlide;

function updateSlider() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  currentIndex++;

  if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  updateSlider();
}

function prevSlide() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  }

  updateSlider();
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

startAutoSlide();
