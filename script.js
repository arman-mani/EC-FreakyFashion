// Hämta produkter från servern och lägg till dem i produktsektionen
fetch('/products')
    .then(response => response.json())
    .then(products => {
        const productGrid = document.getElementById('product-grid');
        products.forEach(product => {
            const productCard = document.createElement('a');
            productCard.className = 'product-card';
            productCard.href = `/products/${product.slug}`;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price}</span>
                </div>
                <span class="brand">${product.brand}</span>
                <img src="Icons/emptyheart.jpg" alt="Favorite" class="heart-icon">
            `;
            productGrid.appendChild(productCard);
        });
    });

    