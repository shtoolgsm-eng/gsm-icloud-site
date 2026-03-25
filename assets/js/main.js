// main.js

// Product management functions
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const products = [];

function addProduct(id, name, price) {
    const newProduct = new Product(id, name, price);
    products.push(newProduct);
}

function removeProduct(id) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }
}

function updateProduct(id, name, price) {
    const product = products.find(p => p.id === id);
    if (product) {
        product.name = name;
        product.price = price;
    }
}

// Order management functions
class Order {
    constructor(orderId, products) {
        this.orderId = orderId;
        this.products = products;
        this.date = new Date();
    }
}

const orders = [];

function createOrder(orderId, productIds) {
    const orderedProducts = productIds.map(id => products.find(p => p.id === id)).filter(Boolean);
    const newOrder = new Order(orderId, orderedProducts);
    orders.push(newOrder);
}

function viewOrders() {
    return orders;
}

// User interaction functions
let currentUser = null;

function login(username) {
    currentUser = username;
}

function logout() {
    currentUser = null;
}

function isLoggedIn() {
    return currentUser !== null;
}

// Usage example
addProduct(1, 'iPhone', 999);
addProduct(2, 'MacBook', 1999);
createOrder(1, [1, 2]);
login('user1');
