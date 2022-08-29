'use strict';

document.querySelector('aside').classList.add('hidden');

let products = [];
let votingRounds = 1;
let numProductsDisplayed = 3;
let productImages = [
  'bag.jpg',
  'boots.jpg',
  'chair.jpg',
  'dragon.jpg',
  'scissors.jpg',
  'tauntaun.jpg',
  'wine-glass.jpg',
  'banana.jpg',
  'breakfast.jpg',
  'cthulhu.jpg',
  'pen.jpg',
  'shark.jpg',
  'unicorn.jpg',
  'bathroom.jpg',
  'bubblegum.jpg',
  'dog-duck.jpg',
  'pet-sweep.jpg',
  'sweep.png',
  'water-can.jpg',
];

// Create image product constructor
function Product(prodName, prodImgPath) {
  this.prodName = prodName;
  this.prodImgPath = prodImgPath;
  this.timesShown = 0;
  this.timesSelected = 0;
  this.currentlyConsidered = false;
}

// Declare function to create an object from an array of data and append it from an array
function addProduct(data) {
  products.push(new Product(data.prodName, data.prodImgPath));
}

// Populate the products array from an array containing the list of images from directory, using the file name (less extension) as the prodName
for (let product of productImages) {
  addProduct({
    prodName: product.split('.')[0],
    prodImgPath: `./img/${product}`,
  });
}

// Loop to the maximum of voting times allowed by votingRounds
for (let i = 0; i < votingRounds; i++) {
  let uniqueProducts = [];

  // Loop until the numProductsDisplayed number of unique items are chosen for display
  while (uniqueProducts.length < numProductsDisplayed) {
    let product = getRandomProducts(products);

    // Add product to uniqueProducts array if not already chosen
    if (!uniqueProducts.includes(product)) {
      uniqueProducts.push(product);
      product.timesShown++;
    }
  }
  displayProducts(uniqueProducts);
}

// Select a product randomly from an array of products
function getRandomProducts(productsArray) {
  let randomNumber = Math.floor(Math.random() * productsArray.length);
  let productChosen = productsArray[randomNumber];
  return productChosen;
}

// Displays product images and names to the DOM
function displayProducts(arrayToDisplay) {
  let pickImagesEl = document.getElementById('pick-images');
  let imageNumber = 0;

  for (let product of arrayToDisplay) {
    let sectionEl = document.createElement('section');
    sectionEl.classList.add(`image-section-${imageNumber}`);
    pickImagesEl.appendChild(sectionEl);
    let imgEl = document.createElement('img');
    imgEl.alt = product.prodName;
    imgEl.classList.add(`image-${imageNumber}`);
    imgEl.src = product.prodImgPath;
    sectionEl.appendChild(imgEl);
    let pEl = document.createElement('p');
    pEl.textContent = product.prodName;
    sectionEl.appendChild(pEl);
    imageNumber++; // Increment variable to create successive class names
  }

  // Get selections from user and denote in product object
  let clickedElement;
  document
    .querySelector('#pick-images')
    .addEventListener('click', function (event) {
      clickedElement = event.target.alt;
      if (typeof clickedElement == 'string') {
        // ***** Process clicked item
        updateSelectedProducts(clickedElement);
        console.log(products);
      }
    });
}

function updateSelectedProducts(selectedProduct) {
  for (let i = 0; i < products.length; i++) {
    if (selectedProduct === products[i].prodName) {
      products[i].timesSelected++;
      break;
    }
  }
}

console.log(products);
