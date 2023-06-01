import React from 'react';
import Header from '../header/header';
import { Link } from 'gatsby';
import '../style/style.css'


const Index = () => {


  return (
    <>
    <header>
    <div className='container'>
      <Header></Header>
    </div>
    </header>
    <div className='container'>
      <Link to="/products"><h1>Products</h1></Link>
    </div>
    </>
  );
};

export default Index;
