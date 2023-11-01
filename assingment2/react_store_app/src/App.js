import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [view, setView] = useState('browse');
  const [cart, setCart] = useState([]);

  const changeView = (newView) => {
    setView(newView);
  };

  const addToCart = (Product) => {
    setCart(prevCart => [...prevCart, Product])
  }

  return (
    <div className="App">
      {view === 'browse' && <BrowseView addToCart={addToCart} changeView={changeView} cartLength={cart.length} />}
      {view === 'cart' && <CartView cart={cart} changeView={changeView} />}
      {view === 'checkout' && <CheckoutForm changeView={changeView} />}
      {view === 'confirmation' && <ConfirmationView changeView={changeView} />}
    </div>
  );
}

export default App;

function BrowseView({ addToCart, changeView, cartLength }) {
  // You can define products and a function to handle adding items to the cart here
  
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Browse Products</h1>
        <div>
          <button className="btn btn-primary mr-2" onClick={() => changeView('cart')}>
            Go to Cart {cartLength > 0 && <span className="badge badge-light">{cartLength}</span>}
          </button>
        </div>
      </div>
      <div className="row">
        {/* Map over your products and render each one with a Product component */}
        {/* Example of a single product */}
        <Product title="Airfryer" description="Description here" price={100} addToCart={addToCart} imagePath={"./images/Airfryer.jpeg"}/>
        <Product title="Toaster" description="Description here" price={20} addToCart={addToCart} imagePath={"./images/toaster.jpeg"}/>
        <Product title="Cereal Dispenser" description="Description here" price={15} addToCart={addToCart} imagePath={"./images/cereal.jpeg"}/>
        <Product title="Blender" description="Description here" price={115} addToCart={addToCart} imagePath={"./images/blender.png"}/>
        <Product title="Armchair And Ottoman" description="Description here" price={100} addToCart={addToCart} imagePath={"./images/Armchair.jpeg"}/>
        <Product title="Llama Cat Bed" description="Description here" price={50} addToCart={addToCart} imagePath={"./images/llama.jpeg"}/>
      </div>
    </div>
  );
}

function Product({ title, description, price, addToCart, imagePath }) {
  const handleAddToCart = () => {
    addToCart({ title, price });
  };
  
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src={imagePath} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

function CartView({ cart, changeView }) {
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <button className="btn btn-secondary mb-3" onClick={() => changeView('browse')}>Back to Browse</button>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>{product.title} - ${product.price}</li>
        ))}
      </ul>
      <p>Total: ${totalPrice}</p>
      <button className="btn btn-primary" onClick={() => changeView('checkout')}>Proceed to Checkout</button>
    </div>
  );
}

function CheckoutForm({ changeView }) {
}

function ConfirmationView({ changeView }) {
}