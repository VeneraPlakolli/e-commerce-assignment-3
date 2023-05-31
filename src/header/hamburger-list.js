import React from "react";
import '../style/style.css'

const Hamburger = (props) => {

    return (
        <div className="header-items-hamburger">
                <a className="hamburger-link" href="#" onMouseEnter={props.onSetEnteredHamburgerEvent}>
                    <div className="hamburger">
                      <span className="hamburger-span ham-span1"></span>
                      <span className="hamburger-span"></span>
                      <span className="hamburger-span"></span>
                    </div>
                </a>
                
                <div className="header-item--left">
                      <a href="/products" className="item-shop" onMouseEnter={props.onSetClassEvent} onMouseLeave={props.onRemoveClassEvent}>Shop</a>
                      <a href="https://roccoandroxie.com/pages/about-us">About Us</a>
                      <a href="https://roccoandroxie.com/pages/rrstore-locator">Store Locator</a>
                      <a href="https://roccoandroxie.com/pages/faq">FAQ</a>
                </div>
        </div>
    )
}


export default Hamburger;

