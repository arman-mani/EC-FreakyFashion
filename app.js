const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // Använd samma port som huvudservern

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));


// Logger för att se alla inkommande requests (hjälper vid felsökning)
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
    res.status(200).send("Test - API fungerar");
});

// POST /api/products
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Admin routes
app.get('/admin/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin/products/new', (req, res) => {
    res.sendFile(path.join(__dirname, 'new.html'));
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
    console.log(`Admin servern körs på http://localhost:${PORT}/admin/products`);
    console.log(`API endpoint available at http://localhost:${PORT}/api/products`);
});
