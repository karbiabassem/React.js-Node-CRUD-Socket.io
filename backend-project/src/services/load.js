import fs from 'fs';
import Product from '../components/product/product';

let products = fs.readFileSync(__dirname+ '/Products.json');
products = JSON.parse(products);
Product.insertMany(products);