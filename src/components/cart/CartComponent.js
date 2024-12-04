import React, { useState, useContext, createContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { BsCreditCard2Back } from "react-icons/bs";

const CartContext = createContext();

const initialItems = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 199.99,
    quantity: 1,
    image: "images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    price: 299.99,
    quantity: 1,
    image: "images.unsplash.com/photo-1523275335684-37898b6baf30"
  },
  {
    id: 3,
    title: "Portable Power Bank",
    price: 49.99,
    quantity: 2,
    image: "images.unsplash.com/photo-1609592434539-4ede9d0f84bc"
  }
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(initialItems);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: ""
  });

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const tax = calculateSubtotal() * 0.1;
  const shipping = 15.99;
  const total = calculateSubtotal() + tax + shipping;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!paymentMethod) {
      newErrors.payment = "Please select a payment method";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Processing payment...");
    }
  };

  const handleInputChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={`https://${item.image}`}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1560393464-5c69a73c5770";
                      }}
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <p className="text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="debit-card"
                      checked={paymentMethod === "debit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <BsCreditCard2Back className="w-6 h-6 text-green-500 mr-2" />
                    <span>Debit Card</span>
                  </label>
                  {paymentMethod === "debit-card" && (
                    <div className="ml-8 space-y-2">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={paymentDetails.cvv}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <FaCreditCard className="w-6 h-6 text-blue-500 mr-2" />
                    <span>Credit Card</span>
                  </label>
                  {paymentMethod === "credit-card" && (
                    <div className="ml-8 space-y-2">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border rounded"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={paymentDetails.cvv}
                          onChange={handleInputChange}
                          className="w-1/2 p-2 border rounded"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <FaPaypal className="w-6 h-6 text-blue-700 mr-2" />
                    <span>PayPal</span>
                  </label>
                  {paymentMethod === "paypal" && (
                    <div className="ml-8">
                      <input
                        type="email"
                        name="email"
                        placeholder="PayPal Email Address"
                        value={paymentDetails.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="apple-pay"
                      checked={paymentMethod === "apple-pay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <FaApplePay className="w-6 h-6 text-gray-800 mr-2" />
                    <span>Apple Pay</span>
                  </label>
                  {paymentMethod === "apple-pay" && (
                    <div className="ml-8 p-2 text-gray-600">
                      Payment will be processed through Apple Pay
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="google-pay"
                      checked={paymentMethod === "google-pay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <FaGooglePay className="w-6 h-6 text-gray-800 mr-2" />
                    <span>Google Pay</span>
                  </label>
                  {paymentMethod === "google-pay" && (
                    <div className="ml-8 p-2 text-gray-600">
                      Payment will be processed through Google Pay
                    </div>
                  )}
                </div>

                {errors.payment && (
                  <p className="text-red-500 text-sm mt-2">{errors.payment}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;