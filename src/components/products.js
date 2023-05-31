import React, { useState, useEffect } from 'react';
import Header from '../header/header';
import { Link } from 'gatsby';
import '../style/style.css';
import { fetchProducts } from './GROQ_queries';
import noImage from '../images/no-image.png'

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    fetchProductsData();
  }, []);
  return (
    <>
    <header>
        <div className='container'>
            <Header></Header>
        </div>
    </header>
   
    <div className="container">
        <div className="products"> 
           {products.map((product) => {
            return (
                   <div key={product._id} className="products_product">
                    {product.store.previewImageUrl && product.store.previewImageUrl.length > 0 ? (
                    <div className='product_content'><Link to={`/products/${product._id}`}><img src={product.store.previewImageUrl}></img></Link></div>) : 
                    (<div className='product_content product_content2'><Link to={`/products/${product._id}`}><img src={noImage}></img></Link></div>)}
                    <div className='product_title'><p>{product.store.title.length > 0 ? product.store.title : ''}</p></div>
                    <div className='product_price'><p>${product.store.priceRange.maxVariantPrice}</p></div>
                    <button>ADD TO CART</button>
                    </div>
                    )
            })}
           
    </div>
    </div>
    </>
  );
};

export default ProductList;
