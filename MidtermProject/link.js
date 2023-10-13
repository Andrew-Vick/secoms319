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
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                `;
                
                $('#productModal').modal('show'); // Assumes you are using Bootstrap
            }
        });
}

const productId = getQueryParam('productId');
if (productId) {
    showProductPopup(productId);
}
