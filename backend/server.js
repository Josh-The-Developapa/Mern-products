const express = require('express');
const uuid = require('uuid/v4');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const app = express();

const DUMMY_PRODUCTS = [];

app.use(express.json());
app.use(cors());

app.get('/products', (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post('/product', (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: 'Invalid input, please enter a valid title and price.',
    });
  }

  const createdProduct = {
    id: uuid(),
    title,
    price,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res
    .status(201)
    .json({ message: 'Created new product.', product: createdProduct });
});

app.listen(8000, () => {
  console.log('Server running on port 8000');
}); // start Node + Express server on port 8000

