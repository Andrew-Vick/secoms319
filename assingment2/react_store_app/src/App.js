import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [view, setView] = useState('browse');

  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      {view === 'browse' && <BrowseView changeView={changeView} />}
      {view === 'cart' && <CartView changeView={changeView} />}
      {view === 'checkout' && <CheckoutForm changeView={changeView} />}
      {view === 'confirmation' && <ConfirmationView changeView={changeView} />}
    </div>
  );
}

export default App;

function BrowseView({ changeView }) {
  // You can define products and a function to handle adding items to the cart here
  
  return (
    <div className="container">
      <div className="row">
        {/* Map over your products and render each one with a Product component */}
        {/* Example of a single product */}
        <Product title="Airfryer" description="Description here" price={100} />
        <Product title="Toaster" description="Description here" price={20} />
        <Product title="Cereal Dispenser" description="Description here" price={15} />
        <Product title="Blender" description="Description here" price={115} />
        <Product title="Armchair And Ottoman" description="Description here" price={100} />
        <Product title="Llama Cat Bed" description="Description here" price={50} />
      </div>
    </div>
  );
}

function Product({ title, description, price }) {
  // This component represents a single product
  
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src="path_to_your_image" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">${price}</p>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

function CartView({ changeView }) {
}

function CheckoutForm({ changeView }) {
}

function ConfirmationView({ changeView }) {
}