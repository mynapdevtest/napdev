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

  // return fetch(`http://localhost:3000/api/product/${productId}`)
  return fetch(`http://181fb849.ngrok.io/api/product/${productId}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.error) {
        // Product not found / other error. Render error.
        return document.getElementById('product').innerHTML = "Product not found";
      }

      return renderProduct(data.name, data.price, data.designer, data.images, data.badges);
    })
};

getProduct();
