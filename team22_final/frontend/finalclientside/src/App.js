import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'bootstrap';
import "./style.css";


//Main component that manages the view of the website
//useState is used to maintain view, cart and formData states
//changeView, clearCart, add and remove from cart functions are used to manipulate and change these states
//Depending on the view state different webpages are rendered like browse, cart and confirmation 
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
    <Router>
      <Routes>
        <Route path="/" element={<BrowseView addToCart={addToCart} cartLength={cart.length} removeFromCart={removeFromCart} />} />
        <Route path="/category/:categoryName" element={<CategoryView addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} cartLength={cart.length} />} />
        <Route path="/name/:name" element={<CategoryView addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} cartLength={cart.length} />} />
        <Route path="/FinalData" element={<CategoryView addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} cartLength={cart.length} />} />
        <Route path="/checkout" element={<CheckoutForm cart={cart} changeView={changeView} updateFormData={updateFormData} clearCart={clearCart} />} />
        <Route path="/confirmation" element={<ConfirmationView cart={cart} orderData={formData} changeView={changeView} clearCart={clearCart} />} />
        <Route path="/aboutPage" element={<aboutPage/>}/>

      </Routes>
    </Router>
  );
}

export default App;

//Allows users to view and search for different products
//BrowseView also has it's own states for search terms and product info
//Based on the states browseView will render the current products in products.json and will filter the users
//search terms to correlate with current products
function BrowseView({ addToCart, changeView, cartLength, removeFromCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the products from the server
    fetch('/FinalData')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';
        const updatedProducts = data.map(product => {
          return {
            ...product,
            image: product.image.startsWith('./images/')
              ? `${serverUrl}${product.image.replace('./images/', '/images/')}`
              : `${serverUrl}/images/${product.image}`
          };
        });
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>Tech TreauserTrove</h1>
          <div>
            <button onClick={() => navigate('/checkout')} className="btn btn-primary"
            >
              Checkout{" "}
              {cartLength > 0 && (
                <span className="badge bg-primary ml-2" id="CartNum">{cartLength} Items</span>
              )}
            </button>
            <Link to={'/aboutPage'}>about</Link>
          </div>
        </div>
      </header>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner py-4">
          <div className="carousel-item active">
            <Link to={'name/Quantum X1'}>
              <img src="./images/GPU1.png" className="d-block w-100" alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>Quantum X1</h1>
                  <p>The most robust GPU on the market. With an impressive speed of 100 TFLOPS nothing on the market today compares to this beast!</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={'name/ThunderBolt 16GB DDR5'}>
              <img src="./images/RAM1.png" className="d-block w-100" alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>ThunderBolt 16GB DDR5</h1>
                  <p>Unleash your system's true potential with RamifyTech's ThunderBolt 16GB DDR5. High-speed, low latency, and designed to overclock, it ensures a seamless performance.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={'name/Ryzer 7'}>
              <img src="./images/CPU3.png" className="d-block w-100" alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>Ryzer 7</h1>
                  <p>InnovaTech's Ryzer 7 is a gamer’s delight, featuring enhanced VR capabilities, a thoughtful thermal design, and impressive clock speeds.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="carousel-item">
            <Link to={'name/Tactile Pro Keyboard'}>
              <img src="./images/keyboard1.png" className="d-block w-100" alt="First slide" />
              <div className="container">
                <div className="carousel-caption text-start">
                  <h1>Tactile Pro Keyboard</h1>
                  <p>Experience superior typing with Periphera's Tactile Pro Keyboard. Equipped with RGB lighting, it offers an ergonomic design and durable build quality.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container marketing">
        <div className="col-lg-6 col-12" id="CategoryButtons">
          <div className="Bcard">
            <Link to="/FinalData">
              <h2>View All Products</h2>
            </Link>
          </div>
        </div>
        <div className="row py-5">
          <div className="col-lg-6 col-12" id="CategoryButtons">
            <div className="Bcard">
              <Link to="/category/GPU">
                <img
                  src="./images/GPU2.png"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                  role="img"
                  aria-label="Placeholder"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  alt="A description of the image"
                />
                <h2 className="fw-normal">Graphic Cards</h2>
                <p>View our selection of the best graphics cards on the market</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-12" id="CategoryButtons">
            <div className="Bcard">
              <Link to="/category/RAM">
                <img
                  src="./images/RAM3.png"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                  role="img"
                  aria-label="Placeholder"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  alt="A description of the image"
                />
                <h2 className="fw-normal">RAM</h2>
                <p>View our listings for the fastest RAM money can buy</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="row py-4">
          <div className="col-lg-6 col-12" id="CategoryButtons">
            <div className="Bcard">
              <Link to="/category/CPU">
                <img
                  src="./images/CPU1.png"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                  role="img"
                  aria-label="Placeholder"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  alt="A description of the image"
                />
                <h2 className="fw-normal">CPUs</h2>
                <p>With our wide range of CPUs you're bound to find one that fits your needs</p>
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-12" id="CategoryButtons">
            <div className="Bcard">
              <Link to="/category/Accessories">
                <img
                  src="./images/Mouse3.png"
                  className="bd-placeholder-img rounded-circle"
                  width="140"
                  height="140"
                  role="img"
                  aria-label="Placeholder"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                  alt="A description of the image"
                />
                <h2 className="fw-normal">Computer Accesories</h2>
                <p>Get ahead of the competition in any game with our utlra responsive keyboards and mice</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

function CategoryView({ addToCart, removeFromCart, cartLength }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();
  const { name } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSingleProductView, setIsSingleProductView] = useState(false);



  useEffect(() => {
    let query;
    if (name) {
      let productName = decodeURIComponent(name);
      query = name ? `?name=${encodeURIComponent(productName)}` : '';
    } else {
      query = categoryName ? `?category=${encodeURIComponent(categoryName)}` : '';
    }
    fetch(`/FinalData${query}`)
      .then((response) => response.ok ? response.json() : Promise.reject('Network response was not ok.'))
      .then((data) => {
        const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:8081';
        const categoryProducts = data.map((product) => ({
          ...product,
          image: product.image.startsWith('./images/')
            ? `${serverUrl}${product.image.replace('./images/', '/images/')}`
            : `${serverUrl}/images/${product.image}`,
          keywords: product.keywords
        }));
        setProducts(categoryProducts);
      })
      .catch((error) => console.error('Fetch error:', error));

    setIsSingleProductView(!!name);
  }, [categoryName, name]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    (product.keywords && product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm)))
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupMessage(`${product.title} added to cart!`);
    setShowPopup(true);
    // Set a timeout to hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };


  return (
    <div className="container">
      <header>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1>{categoryName} Products</h1>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div ClassName="Buttons">
            <button onClick={() => navigate('/checkout')} className="btn btn-primary"
            >
              Checkout{" "}
              {cartLength > 0 && (
                <span className="badge bg-primary ml-2">{cartLength} Items</span>
              )}
            </button>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Back to Home
            </button>
          </div>
        </div>
      </header>
      <div>
        {showPopup && <Popup message={popupMessage} />}
      </div>
      <div className="row">
        {isSingleProductView && products.length > 0 ? (
          <SingleProductView product={products[0]}
            title={products[0].title}
            description={products[0].description}
            price={products[0].price}
          />
        ) : (
          filteredProducts.map((product, index) => (
            <Product
              key={index}
              title={product.name}
              description={product.description}
              price={product.price}
              handleAddToCart={handleAddToCart}
              removeFromCart={removeFromCart}
              imagePath={product.image}
            />
          ))
        )}
      </div>
    </div>
  );
}

function SingleProductView({ product, addToCart, removeFromCart, cartLength }) {

  return (
    <div className="productView">
      <div>
        <div className="ImageContainer">
          <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '1000px' }} />

        </div>
        <div id="pvcontent">
          <h1>{product.name}</h1>
          <h5>{product.company}</h5>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          {/* Will need to get add to cart feature fully working by final due date */}
        </div>
      </div>
    </div>
  );
}

function Popup({ message }) {
  useEffect(() => {
    let toastElement = document.querySelector('.toast');
    let toast = new Toast(toastElement);
    toast.show();
  }, []);

  return (
    <div className="popup-notification">
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}

function aboutPage() {
  return (
    <div className="container">
      <section className="py-5">
        <div className="container">
          <h1 className="fw-light">Authors</h1>
        </div>
      </section>

      <section id="Authors">
        <div className="container">
          <h1>Andrew Vick</h1>
          <p id="Author-Info">
            Hello, I am a third year software engineering student at Iowa State. I am currently learning
            how to utilize
            html, css, javascript and JSON to create and design dynamic websites. I hope you have enjoyed our tech related webstore. It was our first take
            using JSON to dynamically load products based on the users inputs.
          </p>
          <p id="Email-Info">
            <a href="mailto:avick@iastate.edu">avick@iastate.edu</a>
          </p>
        </div>

        <div className="container">
          <h1>Draven</h1>
          <p id="Author-Info">
            Hello, I am a senior at Iowa State University majoring in Aerospace Engineering and minoring
            in Computer Science.
            I am currently learning how to utilize HTML, CSS, and Javascript to create and design
            websites.
          </p>
          <p id="Email-Info">
            <a href="mailto:avick@iastate.edu">dravenr@iastate.edu</a>
          </p>
        </div>

      </section>

      <section id="Course" className="py-5">
        <div className="container">
          <h1 className="fw-light">Course</h1>
        </div>
      </section>

      <section>
        <div className="container">
          <h1>ComS 319</h1>
          <h4>Construction of User Interfaces</h4>
          <p>Instructor: Abraham Aldaco, Ph.D.</p>
          <p>Date: October, 18th 2023</p>
        </div>
      </section>

      <footer>
        <div>
          <div className="container-footer">
            <p>&copy;TechTreasure Trove. All rights reserved.</p>
            <p>All images were AI generated no copyrights were infringed</p>d
            <br />
            <br />
          </div>
        </div>
      </footer>
    </div>


  );
}





//Child component of BrowseView which displays the individual products
//Also receives product details and functions to manage cart operations
//such as the addToCart and removeFromCart buttons
function Product({
  title,
  description,
  price,
  handleAddToCart,
  imagePath,
  removeFromCart,
}) {

  const handleRemoveFromCart = () => {
    removeFromCart({ title, price, imagePath });
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100">
        <img src={imagePath} className="card-img-top" alt="..." />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">${price}</p>
          <div className="mt-auto">
            <button className="btn btn-success" onClick={() => handleAddToCart({ title, price, imagePath })}>
              +
            </button>
            <button className="btn btn-danger ml-2" onClick={handleRemoveFromCart}>
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//CheckoutForm houses the cart and form to check out
//Displays the items, quantites, and price of the products along with the total price
//Maintians it's own error states to ensure the user inputs the correct information on the checkout form
function CheckoutForm({ changeView, cart, updateFormData, clearCart }) {
  const navigate = useNavigate();
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

  const validateField = (key, value) => {
    switch (key) {
      case 'email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Invalid email format.';
      case 'card':
        return /(\d{4}-){3}\d{4}/.test(value) ? '' : 'Invalid card format.';
      case 'zip':
        return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Invalid ZIP format.';
      default:
        return value.trim() ? '' : 'This field is required.';
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'card') {
      formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})(?=\d)/g, '$1-');
    }

    setFormData((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));

    const fieldError = validateField(id, formattedValue);
    setError((prev) => ({
      ...prev,
      [id]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};
    // Validate all fields and populate newError object
    for (const key in formData) {
      if (key === 'address2' && !formData[key]) continue;
      const fieldError = validateField(key, formData[key]);
      if (fieldError) {
        newError[key] = fieldError;
      }
    }

    setError(newError);
    if (Object.keys(newError).length === 0) {
      updateFormData(formData);
      navigate('/confirmation');
    }
  }

  return (
    <div className="head" style={{ color: 'white' }}>
      <div className="container">
        <header>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Your Cart</h2>
            <div className="Buttons">
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Return
              </button>
              <button onClick={() => { clearCart(); }} className="btn btn-danger">
                Clear Cart
              </button>
            </div>
          </div>
        </header>

        <div className="row" style={{ color: 'white' }}>
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
          <div className="row" key={index} style={{ color: 'white' }}>
            <div className="col-md-5 d-flex align-items-center">
              <img
                style={{ height: 100, marginRight: 10, marginBottom: 10 }}
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
                className={`form-control ${error.address2 && formData.address2 ? "is-invalid" : ""}`}
                id="address2"
                value={formData.address2}
                onChange={handleChange}

                placeholder="Apartment, studio, or floor"
              />
              <div className="invalid-feedback">{error.address2}</div>
            </div>
            <div className="row">
              <div className="col-md-5 mb-3">
                <input
                  type="text"
                  className={`form-control ${error.city ? "is-invalid" : ""}`}
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                />
              </div>
              <div className="col-md-4 mb-3">
                <select
                  className={`form-select ${error.state ? "is-invalid" : ""}`}
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
    </div>
  );
}

//Displays the order summary 
//including purchased products and the users information
function ConfirmationView({ cart, orderData, changeView, clearCart }) {
  const navigate = useNavigate();
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
    <div className="container" style={{color: 'white'}}>
      <div className="row">
        <h1 className="text-success">You have made an order!</h1>
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
      <button onClick={() => { navigate('/'); clearCart(); }} className="btn btn-primary">
        Back to Browse
      </button>
    </div>
  );
}
