function searchProduct() {
    const keyword = document.getElementById('searchBar').value.toLowerCase();
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear previous results

    if (keyword.length >= 3) {

        if (keyword.toLowerCase() === 'home') {
            createLink('./index.html', 'Go to Homepage');
            return;
        } else if (keyword.toLowerCase() === 'ram') {
            createLink('./RAM.html', 'Go to RAM Page');
        } else if (keyword.toLowerCase() === 'gpu') {
            createLink('./gpu.html', 'Go to GPU Page');
        } else if (keyword.toLowerCase() === 'cpu') {
            createLink('./cpu.html', 'Go to CPU Page');
        } else if (keyword.toLowerCase() ==='accessory' || keyword.toLowerCase() === 'accessories' || keyword.toLowerCase() === 'computer') {
            createLink('./Accessory.html', 'Go to Computer Accessories');
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
                        link.href = `./product-details.html?productId=${product.id}`;
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

//Populates each indiviual category webpage with the corresping products
function populateProductCards(category) {
    fetch('data.json')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                if (product.category === category || product.keywords.includes(category.toLowerCase())) {
                    const container = document.getElementById(`product${product.id}`);

                    if (container) {
                        const cardDiv = document.createElement('div');
                        cardDiv.className = 'card shadow-sm';

                        const img = document.createElement('img');
                        img.src = product.image;
                        img.alt = product.name;

                        const cardBodyDiv = document.createElement('div');
                        cardBodyDiv.className = 'card-body';

                        const cardTitle = document.createElement('p');
                        cardTitle.className = 'card-text';
                        cardTitle.textContent = product.name;

                        const cardCompany = document.createElement('p');
                        cardCompany.className = 'card-text';
                        cardCompany.textContent = `By: ${product.company}`;

                        const cardPrice = document.createElement('p');
                        cardPrice.className = 'card-text';
                        cardPrice.textContent = `Price: ${product.price}`;


                        const link = document.createElement('a');
                        link.href = `product-details.html?productId=${product.id}`;
                        link.textContent = 'View Details';

                        // Appending elements to create the structure
                        cardBodyDiv.appendChild(cardTitle);
                        cardBodyDiv.appendChild(cardCompany);
                        cardBodyDiv.appendChild(cardPrice);
                        cardBodyDiv.appendChild(link);
                        cardDiv.appendChild(img);
                        cardDiv.appendChild(cardBodyDiv);
                        container.appendChild(cardDiv);
                    }
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Calls the populateProductCards function to populate each individual category webpage with the corresping products:
populateProductCards('CPU');
populateProductCards('GPU');
populateProductCards('RAM');
populateProductCards('Accessories');

