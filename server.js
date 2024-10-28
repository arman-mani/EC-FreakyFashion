const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Loggar för att se alla inkommande requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// API endpoints
const products = [
    { name: 'Svart T-Shirt', sku: 'AAA111', price: 199 },
    { name: 'Vit T-Shirt', sku: 'BBB111', price: 199 }
];

// GET /api/products
app.get('/api/products', (req, res) => {
    console.log('API anrop mottaget för /api/products');
    res.json(products);
});

// POST /api/products
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Admin routes
app.get('/admin/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/products/index.html'));
});

app.get('/admin/products/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin/products/new.html'));
});

// Route för att servera HTML-filen
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'Freaky-Fashion.html'));
});

// Route för att generera dynamiska produktkort
app.get('/products', (_req, res) => {
    const products = [
        { id: 1, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-1.png', publishDate: '2024-10-01', slug: 'svart-tshirt' },
        { id: 2, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-2.jpg', publishDate: '2024-10-02', slug: 'svart-tshirt-2' },
        { id: 3, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-3.jpg', publishDate: '2024-10-03', slug: 'svart-tshirt-3' },
        { id: 4, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-4.jpg', publishDate: '2024-10-04', slug: 'svart-tshirt-4' },
        { id: 5, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-1.jpg', publishDate: '2024-10-05', slug: 'vit-tshirt' },
        { id: 6, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-2.jpg', publishDate: '2024-10-06', slug: 'vit-tshirt-2' },
        { id: 7, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-3.jpg', publishDate: '2024-10-07', slug: 'vit-tshirt-3' },
        { id: 8, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-4.jpg', publishDate: '2024-10-08', slug: 'vit-tshirt-4' }
    ];

    const today = new Date().toISOString().split('T')[0]; // dagens datum i formatet 'YYYY-MM-DD'
    const filteredProducts = products.filter(product => product.publishDate <= today).slice(0, 4); // Filtrera och begränsa till 4 produkter

    res.json(filteredProducts);
});

// Funktion för att slumpa produkter
function getRandomProducts(products, count) {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Route för att hantera dynamiska produktdetaljsidor
app.get('/products/:slug', (req, res) => {
    const products = [
        { id: 1, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-1.png', publishDate: '2024-10-01', slug: 'svart-tshirt' },
        { id: 2, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-2.jpg', publishDate: '2024-10-02', slug: 'svart-tshirt-2' },
        { id: 3, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-3.jpg', publishDate: '2024-10-03', slug: 'svart-tshirt-3' },
        { id: 4, name: 'Svart T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/svart-tshirt-4.jpg', publishDate: '2024-10-04', slug: 'svart-tshirt-4' },
        { id: 5, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-1.jpg', publishDate: '2024-10-05', slug: 'vit-tshirt' },
        { id: 6, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-2.jpg', publishDate: '2024-10-06', slug: 'vit-tshirt-2' },
        { id: 7, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-3.jpg', publishDate: '2024-10-07', slug: 'vit-tshirt-3' },
        { id: 8, name: 'Vit T-Shirt', brand: 'Levis', price: '199 SEK', image: 'images/Vit-tshirt-4.jpg', publishDate: '2024-10-08', slug: 'vit-tshirt-4' }
    ];

    const product = products.find(p => p.slug === req.params.slug);

    if (product) {
        const similarProducts = getRandomProducts(products.filter(p => p.slug !== product.slug), 3); // Hämta 3 slumpvis valda liknande produkter

        res.send(`
            <!DOCTYPE html>
            <html lang="sv">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${product.name}</title>
                <link rel="stylesheet" href="/style.css">
            </head>
            <body>
                <header>
                    <div class="container">
                        <div class="logo">
                            <a href="/">Freaky Fashion</a>
                        </div>
                        <div class="search-and-icons">
                            <div class="search">
                                <input type="text" placeholder="Sök produkt">
                            </div>
                            <div class="icons">
                                <a href="#" class="icon heart"><img src="/Icons/heart.png" alt="Favoriter"></a>
                                <a href="#" class="icon cart"><img src="/Icons/2169826.png" alt="Varukorg"></a>
                            </div>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="#">Nyheter</a></li>
                                <li><a href="#">Kategorier</a></li>
                                <li><a href="#">Topplistan</a></li>
                                <li><a href="#">Rea</a></li>
                                <li><a href="#">Kampanjer</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>

                <main>
                    <section class="product-details">
                        <div class="product-image">
                            <img src="/${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info-details">
                            <h1>${product.name}</h1>
                            <p class="brand">${product.brand}</p>
                            <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <p class="product-price">${product.price}</p> 
                            <button class="add-to-cart">Lägg i varukorg</button>
                        </div>
                    </section>

                    <section class="similar-products-details">
                        <h2>Liknande produkter</h2>
                        <div class="slideshow-container-details">
                            <button class="prev-details">&lt;</button>
                            <div class="product-slider-details">
                                ${similarProducts.map(similarProduct => `
                                    <div class="product-card-details">
                                        <a href="/products/${similarProduct.slug}">
                                            <img src="/${similarProduct.image}" alt="${similarProduct.name}">
                                        </a>
                                        <h3>${similarProduct.name}</h3>
                                        <span class="brand">${similarProduct.brand}</span>
                                        <span class="price">${similarProduct.price}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <button class="next-details">&gt;</button>
                        </div>
                    </section>

                    <section class="features">
                        <div class="feature">
                            <img src="/Icons/planeticon.png" alt="Free shipping and returns">
                            <span>Gratis frakt och returer</span>
                        </div>
                        <div class="feature">
                            <img src="/Icons/planeicon.png" alt="Express shipping">
                            <span>Expressfrakt</span>
                        </div>
                        <div class="feature">
                            <img src="/Icons/protectionIcon.png" alt="Secure payments">
                            <span>Säkra betalningar</span>
                        </div>
                        <div class="feature">
                            <img src="/Icons/smileyIcon.png" alt="Daily news">
                            <span>Nyheter varje dag</span>
                        </div>
                    </section>
                </main>

                <footer>
                    <div class="footer-content">
                        <!-- Accordion mobile -->
                        <div class="accordion accordion-mobile" id="accordionFooter">
                            <!-- First Column -->
                            <div class="accordion-item">
                                <input type="checkbox" id="footer-accordion-1" class="accordion-toggle">
                                <label for="footer-accordion-1" class="accordion-header">Shopping</label>
                                <div class="accordion-body">
                                    <ul>
                                        <li>Vinterjackor</li>
                                        <li>Pufferjackor</li>
                                        <li>Kappa</li>
                                        <li>Trenchcoats</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Second Column -->
                            <div class="accordion-item">
                                <input type="checkbox" id="footer-accordion-2" class="accordion-toggle">
                                <label for="footer-accordion-2" class="accordion-header">Mina Sidor</label>
                                <div class="accordion-body">
                                    <ul>
                                        <li>Mina Ordrar</li>
                                        <li>Mitt Konto</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Third Column -->
                            <div class="accordion-item">
                                <input type="checkbox" id="footer-accordion-3" class="accordion-toggle">
                                <label for="footer-accordion-3" class="accordion-header">Kundtjänst</label>
                                <div class="accordion-body">
                                    <ul>
                                        <li>Returnpolicy</li>
                                        <li>Integritetspolicy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- footer content large device -->
                        <div class="footer-content-desktop">
                            <div class="footer-column">
                                <h4>Shopping</h4>
                                <ul>
                                    <li>Vinterjackor</li>
                                    <li>Pufferjackor</li>
                                    <li>Kappa</li>
                                    <li>Trenchcoats</li>
                                </ul>
                            </div>
                            <div class="footer-column">
                                <h4>Mina Sidor</h4>
                                <ul>
                                    <li>Mina Ordrar</li>
                                    <li>Mitt Konto</li>
                                </ul>
                            </div>
                            <div class="footer-column">
                                <h4>Kundtjänst</h4>
                                <ul>
                                    <li>Returnpolicy</li>
                                    <li>Integritetspolicy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="copyright">
                        © Freaky Fashion
                    </div>
                </footer>
            </body>
            </html>
        `);
    } else {
        res.status(404).send('Produkt ej hittad');
    }
});

// Error handling
app.use((req, res) => {
    console.log('404 - Route not found:', req.url);
    res.status(404).send('404 - Sidan hittades inte');
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Något gick fel på servern');
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på http://localhost:${PORT}`);
});