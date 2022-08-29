'use strict';

document.querySelector('aside').classList.add('hidden');

let products = [];
let votingRounds = 25;
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
