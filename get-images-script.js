// Simulating the folder structure and image file names
const folders = {
  images_1: [
    "käfer_1", "käfer_2", "käfer_3", "karussell_1", "karussell_2", "karussell_3", "karussell_4",
    "käse_1", "käse_2", "käse_4", "katze_1", "katze_2", "katze_3", "katze_4", "katze_10",
    "kerze_1", "kerze_2", "kerze_7", "kirche_1", "kirche_2", "kirche_3", "kirche_10", "kirsche_1",
    "kirsche_2", "kopf_1", "kopf_2", "kopf_3", "kopf_4", "kopf_5", "kuh_1", "kuh_2", "kuh_5",
    "kuscheltier_1", "kuscheltier_2"
  ],
  images_2: [
    "käfer_1", "käfer_2", "käfer_3", "käfer_4", "käfer_5", "käfer_7", "käfer_9", "käfer_10",
    "karussell_1", "karussell_3", "karussell_4", "karussell_5", "karussell_6", "karussell_7",
    "karussell_8", "karussell_10", "käse_1", "käse_3", "käse_4", "käse_5", "käse_6", "käse_7",
    "käse_8", "käse_9", "katze_1", "katze_2", "katze_3", "katze_4", "katze_5", "katze_6", "katze_7",
    "kerze_1", "kerze_2", "kerze_3", "kerze_4", "kerze_5", "kerze_6", "kerze_7", "kerze_9",
    "kirche_1", "kirche_2", "kirche_3", "kirche_5", "kirche_6", "kirche_7", "kirche_8", "kirche_9",
    "kirsche_1", "kirsche_3", "kirsche_4", "kirsche_6", "kirsche_7", "kirsche_8", "kirsche_9",
    "kirsche_10", "kopf_1", "kopf_3", "kopf_4", "kopf_5", "kopf_6", "kopf_7", "kopf_10", "kuh_1",
    "kuh_2", "kuh_3", "kuh_4", "kuh_5", "kuh_7", "kuh_8", "kuh_10", "kuscheltier_2", "kuscheltier_3",
    "kuscheltier_5", "kuscheltier_6", "kuscheltier_7", "kuscheltier_8", "kuscheltier_9", "kuscheltier_10"
  ]
};

const textOptions = [
  "käfer", "karussell", "käse", "katze", "kerze", "kirche", "kirsche", "kopf", "kuh", "kuscheltier"
];

// Array to store the collected image URLs
let imageLinks = [];

// Function to pick 2 random images from each folder
function collectImages() {
  // Get the list of images in the current folder
  const images = folders.images_1;
  const images2 = folders.images_2;

  // Randomly select 2 images from this folder
  const selectedImages = getRandomImages(images, 8);
  const selectedImages1 = getRandomImages(images2, 12);

  // Add the full URL (you can adjust the base URL) to the imageLinks array
  selectedImages.forEach(image => {
    imageLinks.push(image);
  });

  selectedImages1.forEach(image => {
    imageLinks.push(image);
  });

  // Once images are collected, display them in the carousel
  displayCarouselImages();
}

// Function to get random images from an array
function getRandomImages(images, num) {
  const shuffled = images.sort(() => 0.5 - Math.random());  // Shuffle the array
  return shuffled.slice(0, num);  // Pick the first 'num' images
}

function getRandomText(exclude) {
  const filteredOptions = textOptions.filter(text => text !== exclude);
  const randomIndex = Math.floor(Math.random() * filteredOptions.length);
  return filteredOptions[randomIndex];
}

function displayCarouselImages() {
  const carouselContainer = document.getElementById('carousel');
  carouselContainer.innerHTML = '';  // Clear the container before adding new items

  // Create carousel items for each image
  imageLinks.forEach((imageLink, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    
    const rightButtonText = imageLink.split('_')[0]
    const rightBtn = document.createElement('button');
    rightBtn.classList.add('carousel-btn', 'prev-btn');
    rightBtn.innerHTML = `<span>${rightButtonText.toUpperCase()}</span>`;
    
    const wrongButtonText = getRandomText(rightButtonText).toUpperCase();
    const wrongBtn = document.createElement('button');
    wrongBtn.classList.add('carousel-btn', 'next-btn');
    wrongBtn.innerHTML = `<span>${wrongButtonText}</span>`;
    
    // Create a wrapper for the buttons with flex row style
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.classList.add('buttons-wrapper');
    buttonsWrapper.style.display = 'flex';  // Flexbox row layout
    buttonsWrapper.style.gap = '10px';  // Optional gap between buttons

    const randomOrder = Math.random() < 0.5 ? 'swap' : 'default';
    if (randomOrder === 'swap') {
      // Swap button order
      buttonsWrapper.appendChild(wrongBtn);
      buttonsWrapper.appendChild(rightBtn);
    } else {
      // Default order (rightBtn first, wrongBtn second)
      buttonsWrapper.appendChild(rightBtn);
      buttonsWrapper.appendChild(wrongBtn);
    }

    // Create two image containers to stack images vertically
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    // Create and add the first image (stacked above the second)
    const imagesFolder = index + 1 > 8 ? "images_2" : "images_1";
    const objectsFolder = index + 1 > 8 ? "objects_2" : "objects_1";

    const img1 = document.createElement('img');
    img1.classList.add('carousel-image');
    img1.src = `./Images/${imagesFolder}/${imageLink}.png`;
    img1.alt = `Random Image ${index + 1} - 1`;

    const img2 = document.createElement('img');
    img2.classList.add('carousel-image');
    img2.src = `./Images/${objectsFolder}/${imageLink}_object.png`;
    img2.alt = `Random Image ${index + 1} - 2`;

    // Create and add the second image (stacked below the first)
    const img3 = document.createElement('img');
    img3.classList.add('carousel-image');
    img3.src = `./Images/pixels/pixel_${index + 1}.png`;
    img3.alt = `Random Image ${index + 1} - 3`;

    // Append both images into the image container
    imageContainer.appendChild(img1);
    imageContainer.appendChild(img2);
    imageContainer.appendChild(img3);

    rightBtn.addEventListener('click', () => {
      // Fade out image 3 with a 0.3s transition delay (after 2s)
      img1.style.transition = 'opacity 2s ease';  // Smooth transition for fading out
      img1.style.opacity = 0;  // Make image 3 invisible (fade out)
  
      // Move image 2 to the front
      img2.style.transition = 'z-index 2s ease';  // Instant change in z-index
      img2.style.zIndex = '10';  // Bring image 2 to the front
  
      // Move image 3 behind image 2
      img3.style.transition = 'z-index 2s ease';  // Instant change in z-index
      img3.style.zIndex = '-1';  // Move image 3 behind image 2
      rightBtn.style.transition = 'background-color 2s ease';
      rightBtn.style.backgroundColor = "#28a745";
      wrongBtn.style.transition = "background-color 2s ease";
      wrongBtn.style.backgroundColor = "#a0454500";
    });

    wrongBtn.addEventListener('click', () => {
      // Fade out image 3 with a 0.3s transition delay (after 2s)
      img1.style.transition = 'opacity 2s ease';  // Smooth transition for fading out
      img1.style.opacity = 0;  // Make image 3 invisible (fade out)
  
      // Move image 2 to the front
      img2.style.transition = 'z-index 2s ease';  // Instant change in z-index
      img2.style.zIndex = '10';  // Bring image 2 to the front
  
      // Move image 3 behind image 2
      img3.style.transition = 'z-index 2s ease';  // Instant change in z-index
      img3.style.zIndex = '-1';  // Move image 3 behind image 2
      wrongBtn.style.transition = 'background-color 2s ease';
      wrongBtn.style.backgroundColor = "#dc3545";
      rightBtn.style.transition = "background-color 2s ease";
      rightBtn.style.backgroundColor = "#a0454500";
    });

    // Append all elements to the carousel item
    carouselItem.appendChild(imageContainer);
    carouselItem.appendChild(buttonsWrapper);
    carouselContainer.appendChild(carouselItem);
  });
}

// Initialize and collect images
collectImages();
