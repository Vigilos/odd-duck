'use strict';

document.querySelector('aside').classList.add('hidden');
document.getElementById('view-results').classList.add('hidden');

let pickImagesEl = document.getElementById('pick-images');
let products = [];
let numVotes = 0;
let votingRounds = 25;
let numProductsDisplayed = 3;
let clickedElement;
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
  this.currentlyConsidered = productImages;
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

function selectProducts() {
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

  //Display current chosen products to the DOM
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
  //   let pickImagesEl = document.getElementById('pick-images');
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
}

// Process clicked item
function handleProductSelected(event) {
  clickedElement = event.target.alt;
  console.log(clickedElement);
  if (typeof clickedElement == 'string') {
    updateSelectedProducts(clickedElement);
  }

  // Check if reached end pof voting rounds
  if (numVotes === votingRounds) {
    document
      .querySelector('#pick-images')
      .removeEventListener('click', handleProductSelected);
    document.getElementById('view-results').classList.remove('hidden');
    document
      .getElementById('view-results')
      .addEventListener('click', displayResults);
  } else {
    pickImagesEl.innerHTML = '';
    selectProducts();
  }
}

// Update timesSelected property for product objects that have been selected by user
function updateSelectedProducts(selectedProduct) {
  for (let i = 0; i < products.length; i++) {
    if (selectedProduct === products[i].prodName) {
      products[i].timesSelected++;
      numVotes++; //Increment the number of votes toward max votingRounds
      break;
    }
  }
}

function displayResults() {
  for (let result of products) {
    let tableEl = document.getElementById('results-list');
    let rowEl = tableEl.appendChild(document.createElement('tr'));
    let cellEl = document.createElement('th');
    cellEl.textContent = `${result.prodName}`;
    rowEl.appendChild(cellEl);
    cellEl = document.createElement('td');
    cellEl.textContent = `${result.timesShown}`;
    rowEl.appendChild(cellEl);
    cellEl = document.createElement('td');
    cellEl.textContent = `${result.timesSelected}`;
    rowEl.appendChild(cellEl);

    document.querySelector('aside').classList.remove('hidden');
    document.getElementById('view-results').classList.add('hidden');
  }
}

selectProducts();

// Get selections from user and denote in product object
document
  .querySelector('#pick-images')
  .addEventListener('click', handleProductSelected);
