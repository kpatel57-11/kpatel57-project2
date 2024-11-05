// Select the elements
const productInput = document.getElementById('product');
const priceInput = document.getElementById('price');
const addButton = document.getElementById('add-button');
const searchInput = document.getElementById('search-text');
const searchButton = document.getElementById('search-button');
const tableBody = document.querySelector('tbody');

// Array to store the products
let products = [];

// Function to add a product to the table and the array
function addProduct() {
    const productName = productInput.value.trim().toLowerCase();
    const productPrice = parseInt(priceInput.value);

    // Validation: for all input
     if (isNaN(productPrice) && productPrice <= 0 && productName.length < 2) {
        alert('at least 2 characters required for product. Price must be > 0.');
        return;
    }

    // Validation: Product name must be at least 2 characters
    if (productName.length < 2) {
        alert('at least 2 characters required for product.');
        return;
    }

    // Validation: Price must be a positive number
    if (isNaN(productPrice) || productPrice <= 0) {
        alert('Price must be > 0.');
        return;
    }

    const product = { name: productName, price: productPrice };
    products.push(product);

    renderTable(products);

    // Clear input fields
    productInput.value = '';
    priceInput.value = '';
}

// Function to render the table based on the product array
function renderTable(productList) {
    tableBody.innerHTML = ''; // Clear the table body

    productList.forEach((product, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to delete a product from the array and update the table
function deleteProduct(index) {
    products.splice(index, 1);
    renderTable(products);
}

// Function to search for products and display the matching ones
// Function to search for matching products or prices and display them in an alert
function searchProduct() {
    const searchText = searchInput.value.toLowerCase();
    let results = '';

    if (searchText === '') {
        alert('No search key provided.');
        return; // Exit the function if no search key
    }

    products.forEach(product => {
        // Check if the product name or price matches the search text
        if (
            product.name.includes(searchText) || 
            product.price.toString().includes(searchText)
        ) {
            results += `Product: ${product.name}, Price: ${product.price}\n`;
        }
    });

    if (results) {
        alert(`Matching Products:\n${results}`);
    } else {
         alert(`${searchText} not found in products and price .`);
    }
}

// Event listeners
addButton.addEventListener('click', addProduct);
searchButton.addEventListener('click', searchProduct);
