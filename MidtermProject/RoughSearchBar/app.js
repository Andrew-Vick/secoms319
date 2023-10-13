function searchProduct() {
    const keyword = document.getElementById('searchBar').value.toLowerCase();

    if (keyword.length >= 3) { // Only search when keyword is 3 or more characters
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product => {
                    return product.name.toLowerCase().includes(keyword) ||
                           product.keywords.some(k => k.toLowerCase().includes(keyword));
                });

                // Clear previous results
                const productList = document.getElementById('productList');
                productList.innerHTML = '';
                productList.classList.remove('show'); // Hide dropdown initially

                // Display filtered products in the dropdown
                if (filteredProducts.length) {
                    filteredProducts.forEach(product => {
                        const div = document.createElement('div');
                        div.className = 'dropdown-item';
                        
                        // Including a small image next to each product name
                        div.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;" />
                            <span>${product.name}</span>
                        `;
                        
                        productList.appendChild(div);
                    });

                    productList.classList.add('show'); // Show dropdown if products are found
                }
            });
    }
}
