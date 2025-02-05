const carousel = document.getElementById('carousel');
const carouselContainer = document.getElementById('carousel-container');
const slider = document.getElementById('carouselSlider');
const prevIcon = document.getElementById('prev');
const nextIcon = document.getElementById('next');

// Set the maximum value of the slider based on the width of the entire carousel and the container width
slider.max = 100;

// Function to update the carousel scroll based on the slider value
function updateCarouselScroll(scrollValue) {
  const scrollAmount = (carousel.scrollWidth - carousel.clientWidth) * (scrollValue / 100);
  carousel.scrollLeft = scrollAmount;
}

// Listen for changes in the slider to update the carousel scroll
slider.addEventListener('input', (e) => {
  const scrollValue = e.target.value;
  updateCarouselScroll(scrollValue);
});

// Listen for left icon click to decrease the slider value
prevIcon.addEventListener('click', () => {
  let currentSliderValue = parseInt(slider.value);
  currentSliderValue = Math.max(0, currentSliderValue - 5); // Decrease value by 5 but not below 0
  slider.value = currentSliderValue;
  updateCarouselScroll(currentSliderValue);
});

// Listen for right icon click to increase the slider value
nextIcon.addEventListener('click', () => {
  let currentSliderValue = parseInt(slider.value);
  currentSliderValue = Math.min(100, currentSliderValue + 5); // Increase value by 5 but not above 100
  slider.value = currentSliderValue;
  updateCarouselScroll(currentSliderValue);
});


// Prevent mouse scroll from affecting the carousel
carouselContainer.addEventListener('wheel', (event) => {
  event.preventDefault(); // Prevent the default scrolling behavior
});
