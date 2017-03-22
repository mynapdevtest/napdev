const urlParams = new URLSearchParams(window.location.search);

const renderProduct = (name, price, designer, images, badges) => {
  document.getElementById('product-name').innerHTML = name;
  document.getElementById('product-price').innerHTML = price;
  document.getElementById('product-designer').innerHTML = designer;
  document.getElementById('product-image-small').src = images.small;
  document.getElementById('product-image-outfit').src = images.outfit;
  document.getElementById('product-image-large').src = images.large;
}

const getProduct = () => {
  const productId = urlParams.get('productId');
  if (!productId) {
    return; // No product specified. Could render error.
  }

  return fetch(`http://localhost:3000/api/product/${productId}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        // Product not found / other error. Render error.
        return document.getElementById('product').innerHTML = "<h3>Product not found</h3><a href=\"index.html\">&#60; Return to product catalogue</a>";
      }
      return renderProduct(data.name, data.price, data.designer, data.images, data.badges);
    })
};

const showImage = (imageId) => {
  const productImages = document.getElementsByClassName('product__images__image');

  Array.prototype.forEach.call(productImages, image => {
    image.classList.remove('product__images__image--active');
  });

  document.getElementById(imageId).classList.add('product__images__image--active');
}

const setBackButtonPage = () => {
  const page = urlParams.get('returnToPage');
  if (page) {
    document.getElementById('back-button').href = `index.html?page=${page}`;
  }
};

getProduct();
setBackButtonPage();
