function searchProduct() {
    const keyword = document.getElementById('searchBar').value.toLowerCase();
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear previous results

    if (keyword.length >= 3) { 

        if (keyword === 'home') {
            createLink('./index.html', 'Go to Homepage');
            return;
        } else if (keyword === 'ram') {
            createLink('./RAM.html', 'Go to RAM Category');
        } else if (keyword === 'gpu') {
            createLink('./gpu.html', 'Go to GPU Category');
        }

        // Function to create and append links
        function createLink(href, text) {
            const link = document.createElement('a');
            link.href = href;
            link.innerText = text;
            link.className = 'dropdown-item'; // Giving it a class for styling

            productList.appendChild(link);
            productList.classList.add('show'); // Show dropdown with the link
        }


        fetch('data.json')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product => {
                    return product.name.toLowerCase().includes(keyword) ||
                           product.keywords.some(k => k.toLowerCase().includes(keyword));
                });

                if (filteredProducts.length) {
                    filteredProducts.forEach(product => {
                        const div = document.createElement('div');
                        div.className = 'dropdown-item';
                        
                        const link = document.createElement('a');
                        link.href = `./SingleProductDisplay.html?productId=${product.id}`;
                        link.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;" />
                            <span>${product.name}</span>
                        `;
                        
                        div.appendChild(link);
                        productList.appendChild(div);
                    });

                    productList.classList.add('show'); 
                }
            });
    } else {
        productList.classList.remove('show'); 
    }
}

document.getElementById('searchBar').addEventListener('input', searchProduct);
