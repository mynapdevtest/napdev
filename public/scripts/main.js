let page = 0;

const getProducts = (page, numberOfProducts) => {
  const offset = (page || 0) * numberOfProducts;
  const limit = numberOfProducts;
  return fetch('http://3e279a57.ngrok.io/api/products?offset=' + offset + '&limit=' + limit).then(
  // return fetch('http://localhost:3000/api/products?offset=' + offset + '&limit=' + limit).then(
    (response) => {
      return response.json();
    }).then((data) => {
      return data;
    });
}

const displayProducts = () => {
  getProducts(page, 9).then((response) => {
    clearProducts();
    const products = response.data || [];
    products.forEach((product) => {
      const productsListDomElement = document.getElementById('products');
      const productPod = createProductPod(product.id, product.name, product.image.outfit, product.price);
      productsListDomElement.appendChild(productPod);
    });
  });
}

const createProductPod = (id, name, imageUrl, price) => {
  const productDomElement = document.createElement('article');
  productDomElement.className = 'products__product';

  const productName = document.createTextNode(name || '{product name not found}');
  const productNameElement = document.createElement('h3');
  productNameElement.className = 'products__product__name';
  productNameElement.appendChild(productName);

  const priceText = document.createTextNode(price);
  const priceElement = document.createElement('p');
  priceElement.className = 'products__product__price';
  priceElement.appendChild(priceText);

  const productImageElement = document.createElement('img');
  productImageElement.className = 'products__product__preview-image';
  productImageElement.src = imageUrl;

  productDomElement.appendChild(productNameElement);
  productDomElement.appendChild(priceElement);
  productDomElement.appendChild(productImageElement);

  return productDomElement;
}

const clearProducts = () => {
  document.getElementById('products').innerHTML = ''; // better way to do this?
}

const nextPage = () => {
  page = page + 1;
  displayProducts();
}

const previousPage = () => {
  if (page === 0) {
    return;
  } else {
    page = page - 1;
    displayProducts();
  }
}

displayProducts();
