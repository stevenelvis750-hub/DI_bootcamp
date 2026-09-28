const products = require("./products");

function findProduct(productName) {
  return products.find(
    (product) => product.name.toLowerCase() === productName.toLowerCase(),
  );
}

for (const productName of ["Notebook", "Desk lamp", "Unknown item"]) {
  const product = findProduct(productName);
  console.log(product ? product : `Product not found: ${productName}`);
}