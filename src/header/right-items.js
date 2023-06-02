import React from "react";
import loginImg from '../images/login.png';
import searchImg from '../images/search-icon.png';
import cartImg from '../images/cart-bag.png';
import '../style/style.css'

const RightItems = (props) => {
    return (
        <div className="right-icons">
        <div className="shop-cart-responsive">
            <a href="/products/cart" className="icons cart-icon-responsive">
                <img src={cartImg} alt="" />
            </a>
        </div>
        <div className="header-item--right">
            <a href="https://roccoandroxie.com/account/login?return_url=%2Faccount" className="icons login-icon">
                <img src={loginImg} alt="" />
            </a>
            <a href="https://roccoandroxie.com/search" className="icons search-icon">
                <img src={searchImg} alt="" />
            </a>
            <a href="/products/cart" className="icons cart-icon">
                <img src={cartImg} alt="" />
            </a>
        </div>
        
        </div>
    )
}

export default RightItems;