import * as React from "react"
import { Router } from '@reach/router';
import ProductList from "../components/products";
import Product from "../components/product";
import CartPage from "../components/CartPage";
import '../style/style.css' 



const ProductsPage = () => {
    return <div>
        <Router>
            <ProductList path="/products" />
            <Product path="/products/:productId" />
            <CartPage path="/products/cart" />
        </Router>
    </div>
}
 
export default ProductsPage;