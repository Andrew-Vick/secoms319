import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [view, setView] = useState("browse");
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState(null);

  const changeView = (newView) => {
    setView(newView);
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToCart = (Product) => {
    setCart((prevCart) => [...prevCart, Product]);
  };

  const removeFromCart = (Product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.title === Product.title);
      if (index !== -1) {
        return [...prevCart.slice(0, index), ...prevCart.slice(index + 1)];
      }
      return prevCart;
    });
  };

  const updateFormData = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      {view === "browse" && (
        <BrowseView
          addToCart={addToCart}
          changeView={changeView}
          cartLength={cart.length}
          removeFromCart={removeFromCart}
        />
      )}
      {view === "checkout" && (
        <CheckoutForm
          cart={cart}
          changeView={changeView}
          updateFormData={updateFormData}
        />
      )}
      {view === "confirmation" && (
        <ConfirmationView
          cart={cart}
          orderData={formData}
          changeView={changeView}
          clearCart={clearCart}
        />
      )}
    </div>
  );
}

export default App;

function BrowseView({ addToCart, changeView, cartLength, removeFromCart }) {
  const [searchTerm, setSearchTerm] = useState("");

  const allProducts = [
    <Product
      title="Airfryer"
      description="An airfryer is the perfect addition to anyone's kitchen. Tired of having soggy chicken nuggets or waiting days for the oven to preheat? An airfryer solves all of those problems by cooking fast and cooking those chicken nuggetss to perfection with a nice crunch."
      price={100}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/Airfryer.jpeg"}
    />,
    <Product
      title="Toaster"
      description="This toaster is sure to make your morning brighter by perfectly toasting your bread, bagels and even frozen items to a perfect golden brown. With this toaster in your kitchen arsenal you'll longer have to settle for a bacon and egg sandwhich on cold normal bread."
      price={20}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/toaster.jpeg"}
    />,
    <Product
      title="Cereal Dispenser"
      description="Do you hate the jet enginer level of noise a cereal bag or box makes in the morning? If so this dispenser was made for you. Allowing you to peacefully pour your bowl of cereal in the morning without putting your hearing at risk. (Cereal not included)"
      price={15}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/cereal.jpeg"}
    />,
    <Product
      title="Blender"
      description="The blades are as sharp as a dull knife and as loud as a jackhammer, perfect for waking up your roomates."
      price={115}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/blender.png"}
    />,
    <Product
      title="Armchair And Ottoman"
      description="This single seat armchair is perfect for relaxing especially when you want a space
    all to yourself it even comes with the ottoman. If you're looking for a nice place to kick up your
    feet and let the stress of the day melt away this chair is made for you."
      price={100}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/Armchair.jpeg"}
    />,
    <Product
      title="Llama Cat Bed"
      description="For all you cat lovers out there we have the perfect bed for them. Not only does
    this give them an enclosed space they can hide out in, the style of it is a great converstaion
    starter. Who wouldn't want a llama cat bed in their living room I know you wouldn't!"
      price={50}
      addToCart={addToCart}
      removeFromCart={removeFromCart}
      imagePath={"./images/llama.jpeg"}
    />,
  ];

  const filteredProducts = searchTerm
    ? allProducts.filter((product) =>
        product.props.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allProducts;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Browse Products</h1>
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => changeView("checkout")}
          >
            Checkout{" "}
            {cartLength > 0 && (
              <span className="badge badge-light">{cartLength} Items</span>
            )}
          </button>
        </div>
        <div className="container">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="row">{filteredProducts}</div>
    </div>
  );
}

function Product({
  title,
  description,
  price,
  addToCart,
  imagePath,
  removeFromCart,
}) {
  const handleAddToCart = () => {
    addToCart({ title, price, imagePath });
  };

  const handleRemoveFromCart = () => {
    removeFromCart({ title, price, imagePath });
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src={imagePath} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">${price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            +
          </button>
          <button className="btn btn-primary" onClick={handleRemoveFromCart}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutForm({ changeView, cart, updateFormData }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    card: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const calculateQuantities = () => {
    const quantities = {};

    for (const item of cart) {
      const title = item.title;
      if (quantities[title]) {
        quantities[title] += 1;
      } else {
        quantities[title] = 1;
      }
    }

    return quantities;
  };

  const quantities = calculateQuantities();

  const calculateTotalPrice = () => {
    return Object.keys(quantities).reduce((total, title) => {
      const item = cart.find((item) => item.title === title);
      return total + item.price * quantities[title];
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "card") {
      let cardNumber = value.replace(/\D/g, "");

      cardNumber = cardNumber.substring(0, 16).replace(/(\d{4})(?=\d)/g, "$1-");

      setFormData((prev) => ({
        ...prev,
        [id]: cardNumber,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    for (const key in formData) {
      if (!formData[key]) newError[key] = "This field is required.";
    }
    setError(newError);

    if (Object.keys(newError).length === 0) {
      updateFormData(formData);
      changeView("confirmation");
    }
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <button
          className="btn btn-secondary mb-3"
          onClick={() => changeView("browse")}
        >
          Return
        </button>
      </div>
      <div className="row">
        <div className="col-md-5">
          <h4>Item(s)</h4>
        </div>
        <div className="col-md-3">
          <h4>Quantity</h4>
        </div>
        <div className="col-md-4">
          <h4>Price</h4>
        </div>
        <hr />
      </div>
      {Object.keys(quantities).map((title, index) => (
        <div className="row" key={index}>
          <div className="col-md-5 d-flex align-items-center">
            <img
              style={{ height: 50, marginRight: 10, marginBottom: 10 }}
              src={cart.find((item) => item.title === title).imagePath}
              alt={title}
            />
            <span>{title}</span>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <span>{quantities[title] + "  x"}</span>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <span>
              ${cart.find((item) => item.title === title).price.toFixed(2)}
            </span>
          </div>
          <hr />
        </div>
      ))}

      <div className="row mb-3">
        <h4> Total Price: ${totalPrice.toFixed(2)}</h4>
      </div>
      <hr />

      <div className="row mb-3">
        <h4>Payment information</h4>
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className={`form-control ${error.fullName ? "is-invalid" : ""}`}
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{error.fullName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">{error.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="card" className="form-label">
              Card
            </label>
            <input
              type="text"
              className={`form-control ${error.card ? "is-invalid" : ""}`}
              id="card"
              value={formData.card}
              onChange={handleChange}
              required
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
            <div className="invalid-feedback">{error.card}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="address1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className={`form-control ${error.address1 ? "is-invalid" : ""}`}
              id="address1"
              value={formData.address1}
              onChange={handleChange}
              required
              placeholder="1234 Main St"
            />
            <div className="invalid-feedback">{error.address1}</div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${error.address2 ? "is-invalid" : ""}`}
              id="address2"
              value={formData.address2}
              onChange={handleChange}
              required
              placeholder="Apartment, studio, or floor"
            />
            <div className="invalid-feedback">{error.address2}</div>
          </div>
          <div className="row">
            <div className="col-md-5 mb-3">
              <input
                type="text"
                className={`form-control`}
                id="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>
            <div className="col-md-4 mb-3">
              <select
                className="form-select"
                id="state"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option>Iowa</option>
                <option>Missouri</option>
                <option>Colorado</option>
                <option>47 worse states</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <input
                type="text"
                className={`form-control ${error.zip ? "is-invalid" : ""}`}
                id="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                placeholder="Zip"
              />
              <div className="invalid-feedback">{error.zip}</div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Order
          </button>
        </form>
      </div>
    </div>
  );
}

function ConfirmationView({ cart, orderData, changeView, clearCart }) {
  const calculateQuantities = () => {
    const quantities = {};

    for (const item of cart) {
      const title = item.title;
      if (quantities[title]) {
        quantities[title] += 1;
      } else {
        quantities[title] = 1;
      }
    }

    return quantities;
  };

  const quantities = calculateQuantities();

  const calculateTotalPrice = () => {
    return Object.keys(quantities).reduce((total, title) => {
      const item = cart.find((item) => item.title === title);
      return total + item.price * quantities[title];
    }, 0);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="container">
      <div className="row">
        <h1>You have made an order!</h1>
        <h2>Order summary</h2>
        <hr />

        <div className="col-md-5">
          <h4>Item(s)</h4>
        </div>
        <div className="col-md-3">
          <h4>Quantity</h4>
        </div>
        <div className="col-md-4">
          <h4>Price</h4>
        </div>
      </div>
      <hr />
      {Object.keys(quantities).map((title, index) => (
        <div className="row" key={index}>
          <div className="col-md-5 d-flex align-items-center">
            <img
              style={{ height: 50, marginRight: 10, marginBottom: 10 }}
              src={cart.find((item) => item.title === title).imagePath}
              alt={title}
            />
            <span>{title}</span>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <span>{quantities[title] + "  x"}</span>
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <span>
              ${cart.find((item) => item.title === title).price.toFixed(2)}
            </span>
          </div>
          <hr />
        </div>
      ))}

      <div className="row mb-3">
        <h4> Total Price: ${totalPrice.toFixed(2)}</h4>
      </div>
      <hr />

      {orderData && (
        <div>
          <p>
            <strong>Contact Information:</strong>{" "}
          </p>
          <p>
            <strong>Name:</strong> {orderData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {orderData.email}
          </p>
          <br></br>
          <p>
            <strong>Billing Information:</strong>{" "}
          </p>
          <p>
            <strong>Card:</strong> ****-****-****-{orderData.card.slice(-4)}
          </p>
          <br></br>
          <p>
            <strong>Shipping Information:</strong>{" "}
          </p>
          <p>{orderData.address1}</p>
          <p>{orderData.address2} </p>
          <p>
            {orderData.city}, {orderData.state} {orderData.zip}
          </p>
        </div>
      )}

      <button
        className="btn btn-success"
        onClick={() => {
          changeView("browse");
          clearCart();
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}
