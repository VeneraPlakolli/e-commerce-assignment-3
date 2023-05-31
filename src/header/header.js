import React, { useState } from "react"
import Hamburger from './hamburger-list'
import RightItems from "./right-items";
import namelogoblue from "../images/namelogoblue_170x.webp"; 
import '../style/style.css'



const Header = (props) => {

const [classPropertie, setClassPropertie] = useState('');
const [isEnteredHamburgerList, setIsEnteredHamburgerList] = useState('');

function onSetClassHandler() {
    setClassPropertie('shop-list-visible');
}
function onRemoveClassHandler() {
    setClassPropertie('');
}
function onSetEnteredHamburgerHandler() {
    setIsEnteredHamburgerList('shop-list-visible');
}
function onRemoveHamburgerListHandler() {
    setIsEnteredHamburgerList('');
}

  return (
    <div className="header-container">
        <nav>
            <div className="header-item">
                <Hamburger onSetClassEvent={onSetClassHandler} 
                           onRemoveClassEvent={onRemoveClassHandler} 
                           onSetEnteredHamburgerEvent={onSetEnteredHamburgerHandler}>
                </Hamburger>
                <div className="header-item--logo" onClick={onRemoveHamburgerListHandler}>
                    <a className="site-header__logo-link">
                    <img src={namelogoblue} alt=""/>
                    </a>
                </div>
                <RightItems onOpenedCartEvent={props.onSetOpenCartEvent}></RightItems>
            </div>
        </nav>
        <div className={`shop-list ${classPropertie}`} >
            <ul>
                <li>Cleaning</li>
                <li>Treats</li>
                <li>Training</li>
                <li>Health & Wellness</li>
                <li>Grooming</li>
                <li>Dog Toys</li>
            </ul>
        </div>
        <div className={`shop-list shop-list1 ${isEnteredHamburgerList}`} >
            <ul>
                <li><a href="/products" className="item-shop">Shop</a></li>
                <li><a href="https://roccoandroxie.com/pages/about-us">About Us</a></li>
                <li><a href="https://roccoandroxie.com/pages/rrstore-locator">Store Locator</a></li>
                <li><a href="https://roccoandroxie.com/pages/faq">FAQ</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Header
