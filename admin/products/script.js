// Funktion för att ladda produkter till administrationssidan
async function loadProducts() {
    try {
        console.log('Försöker hämta produkter...');
        const response = await fetch('http://localhost:3000/api/products');  // Uppdaterad URL med full sökväg

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        console.log('Hämtade produkter:', products);
        displayProducts(products);
    } catch (error) {
        console.error('Fel vid hämtning av produkter:', error);
        alert('Kunde inte ladda produkter: ' + error.message);
    }
}

function displayProducts(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.sku}</td>
            <td>${product.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Lägg till event listener när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    const loadProductsButton = document.getElementById('loadProducts');  // undvika 'loadButton' error
    if (loadProductsButton) {
        loadProductsButton.addEventListener('click', loadProducts);
    }

    const newProductForm = document.getElementById('newProductForm');
    if (newProductForm) {
        newProductForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(newProductForm);
            const product = {
                name: formData.get('name'),
                description: formData.get('description'),
                image: formData.get('image'),
                sku: formData.get('sku'),
                price: formData.get('price'),
                categories: formData.getAll('category')
            };

            try {
                const response = await fetch('http://localhost:3000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Produkt tillagd:', result);
                window.location.href = '/admin/products/index.html';
            } catch (error) {
                console.error('Fel vid tillägg av produkt:', error);
                alert('Kunde inte lägga till produkt: ' + error.message);
            }
        });
    }
});