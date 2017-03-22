const urlParams = new URLSearchParams(window.location.search);
const pageNumberQueryParam = Number(urlParams.get('page'));

const state = {
  page: pageNumberQueryParam >= 1 ? pageNumberQueryParam : 1,
  itemsPerPage: 9
};

const getProducts = () => {
  const offset = (state.page - 1) * state.itemsPerPage;
  const limit = state.itemsPerPage;
  return fetch(`http://localhost:3000/api/products?offset=${offset}&limit=${limit}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    });
};

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

  const linkToProductElement = document.createElement('a');
  linkToProductElement.href = `product.html?productId=${id}&returnToPage=${state.page}`;
  linkToProductElement.appendChild(productImageElement);

  productDomElement.appendChild(productNameElement);
  productDomElement.appendChild(priceElement);
  productDomElement.appendChild(linkToProductElement);

  return productDomElement;
};

const clearProducts = () => {
  document.getElementById('products').innerHTML = '';
};

const updatePageNumber = () => {
  document.getElementById('page-number').innerHTML = state.page;
};

const displayProducts = () => {
  getProducts().then(response => {
    clearProducts();
    updatePageNumber();
    const products = response.data || [];
    products.forEach(product => {
      const productsListDomElement = document.getElementById('products');
      const productPod = createProductPod(product.id, product.name, product.image.outfit, product.price);
      productsListDomElement.appendChild(productPod);
    });
    scroll(0,0);
  });
};

const updateUrlPageNumber = () => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?page=${state.page}`;
  window.history.pushState({path:newUrl},'',newUrl);
};

const nextPage = () => {
  state.page = state.page + 1;
  updateUrlPageNumber();
  displayProducts();
};

const previousPage = () => {
  if (state.page === 1) {
    return;
  } else {
    state.page = state.page - 1;
    updateUrlPageNumber();
    displayProducts();
  }
};

displayProducts();
