function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function showProductPopup(productId) {
    fetch('data.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);

            if (product) {
                const modalContent = document.getElementById('productModalContent');
                modalContent.innerHTML = `
                    <img class="product-img" src="${product.image}" alt="${product.name}"></img>
                    <h2>${product.name}</h2>
                    <p>${product.price}</p>
                    <p>${product.description}</p>
                `;

                $('#productModal').modal('show');
            }
        });
}

const productId = getQueryParam('productId');
if (productId) {
    showProductPopup(productId);
}
