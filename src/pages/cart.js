import React, { useState, useContext, createContext } from "react";
import { FiTrash2, FiSearch, FiUser } from "react-icons/fi";
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { BsCreditCard2Back, BsSun, BsMoon } from "react-icons/bs";
import Header from "../components/Header";
import CartBackground from "../components/cart/CartBackground";

const CartContext = createContext();

const ShoppingCart = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [errors, setErrors] = useState({});
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        email: ""
    });

    const cartItems = [
        {
            id: 1,
            type: "Certamen (Con Solución)",
            price: 1000,
            year: 2019,
            career: "Ingeniería Civil Informática",
            subject: "Programación II",
            teacher: "Rodrigo Olivares",
            contents: ["Polimorfismo", "Herencia", "Abstracción", "Encapsulamiento"]
        },
        {
            id: 2,
            type: "Certamen (Sin Solución)",
            price: 850,
            year: 2021,
            career: "Medicina",
            subject: "Anatomía I",
            teacher: "Juan Pérez",
            contents: ["Huesos", "Músculos", "Vasos", "Órganos"]
        },
        {
            id: 3,
            type: "Apuntes (Con solución)",
            price: 650,
            year: 2016,
            career: "Ingeniería Civil",
            subject: "Física Mecánica",
            teacher: "Oscar Aravena",
            contents: ["Movimiento Rotacional", "Torque", "Rodamiento"]
        }
    ];

    const [items, setCartItems] = useState(cartItems);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

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
        <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <CartBackground darkMode={darkMode} />

            <div className="container mx-auto px-4 p-5">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        {cartItems.length === 0 ? (
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <p className="text-gray-600">Tu carro está vacío</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className={`p-4 rounded-lg shadow-md flex flex-col justify-between ${darkMode ? "text-white border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]" : "text-gray-800 border border-black"}`}>
                                        <div className="space-y-1">
                                            <p className={`${darkMode ? "text-white drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"} font-semibold text-base`}>CLP${item.price}</p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Tipo: <span className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"}`}>{item.type}</span></p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Año: <span className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"}`}>{item.year}</span></p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Carrera: <span className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"}`}>{item.career}</span></p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Asignatura: <span className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"}`}>{item.subject}</span></p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Profesor: <span className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"}`}>{item.teacher}</span></p>
                                            <p className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-600"} text-sm`}>Contenidos:</p>
                                            <ul className="ml-2">
                                                {item.contents.map((content, index) => (
                                                    <li key={index} className={`${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-600"} text-sm`}>
                                                        • {content}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className={`p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors ${darkMode ? "drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" : ""}`}
                                                aria-label="Remove item"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <div className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-900 border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]" : "bg-gray-50 border border-black"}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"}`}>Resumen de Orden</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-800"}`}>Subtotal</span>
                                    <span className={`font-medium ${darkMode ? "text-white drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"}`}>CLP${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-gray-800"}`}>IVA (19%)</span>
                                    <span className={`font-medium ${darkMode ? "text-white drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"}`}>CLP${(cartItems.reduce((sum, item) => sum + item.price, 0) * 0.19)}</span>
                                </div>
                                <div className="border-t pt-2 mt-2">
                                    <div className={`flex justify-between font-semibold text-lg ${darkMode ? "text-white drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"}`}>
                                        <span className={`${darkMode ? "text-amber-400" : "text-black"}`}>Total</span>
                                        <span>CLP${(cartItems.reduce((sum, item) => sum + item.price, 0) * 1.19)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className={`p-6 rounded-lg shadow-md ${darkMode ? "bg-gray-900 border-2 border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.3)]" : "bg-gray-50 border border-black"}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" : "text-gray-800"}`}>Métodos de Pago</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-800 transition-colors text-gray-50" : "text-gray-800"}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="debit-card"
                                            checked={paymentMethod === "debit-card"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-3"
                                        />
                                        <BsCreditCard2Back className="w-6 h-6 text-green-500 mr-2" />
                                        <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-black"}`}>Tarjeta de Débito</span>
                                    </label>
                                    {paymentMethod === "debit-card" && (
                                        <div className="ml-8 space-y-2">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Número de tarjeta"
                                                value={paymentDetails.cardNumber}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    placeholder="MM/AA"
                                                    value={paymentDetails.expiryDate}
                                                    onChange={handleInputChange}
                                                    className={`w-1/2 p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    placeholder="CVV"
                                                    value={paymentDetails.cvv}
                                                    onChange={handleInputChange}
                                                    className={`w-1/2 p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-800 transition-colors text-gray-50" : "text-gray-800"}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit-card"
                                            checked={paymentMethod === "credit-card"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-3"
                                        />
                                        <FaCreditCard className="w-6 h-6 text-blue-500 mr-2" />
                                        <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-black"}`}>Tarjeta de Crédito</span>
                                    </label>
                                    {paymentMethod === "credit-card" && (
                                        <div className="ml-8 space-y-2">
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                placeholder="Número de tarjeta"
                                                value={paymentDetails.cardNumber}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                            />
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    placeholder="MM/AA"
                                                    value={paymentDetails.expiryDate}
                                                    onChange={handleInputChange}
                                                    className={`w-1/2 p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                                />
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    placeholder="CVV"
                                                    value={paymentDetails.cvv}
                                                    onChange={handleInputChange}
                                                    className={`w-1/2 p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-800 transition-colors text-gray-50" : "text-gray-800"}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === "paypal"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-3"
                                        />
                                        <FaPaypal className="w-6 h-6 text-blue-700 mr-2" />
                                        <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-black"}`}>PayPal</span>
                                    </label>
                                    {paymentMethod === "paypal" && (
                                        <div className="ml-8">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Correo electrónico de PayPal"
                                                value={paymentDetails.email}
                                                onChange={handleInputChange}
                                                className={`w-full p-2 border rounded ${darkMode ? "bg-gray-800 text-green-400 border-green-400" : "bg-gray-50 text-black border-green-600" }`}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-800 transition-colors text-gray-50" : "text-gray-800"}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="apple-pay"
                                            checked={paymentMethod === "apple-pay"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-3"
                                        />
                                        <FaApplePay className={`w-6 h-6 mr-2 ${darkMode ? "text-gray-50" : "text-gray-800" }`}/>
                                        <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-black"}`}>Apple Pay</span>
                                    </label>
                                    {paymentMethod === "apple-pay" && (
                                        <div className={`ml-8 p-2 ${darkMode ? "text-green-400" : "text-black" }`}>
                                            El pago se hará a través de Apple Pay
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${darkMode ? "hover:bg-gray-800 transition-colors text-gray-50" : "text-gray-800"}`}>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="google-pay"
                                            checked={paymentMethod === "google-pay"}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="mr-3"
                                        />
                                        <FaGooglePay className={`w-6 h-6 mr-2 ${darkMode ? "text-gray-50" : "text-gray-800" }`} />
                                        <span className={`${darkMode ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" : "text-black"}`}>Google Pay</span>
                                    </label>
                                    {paymentMethod === "google-pay" && (
                                        <div className={`ml-8 p-2 ${darkMode ? "text-green-400" : "text-black" }`}>
                                            El pago se hará a través de Google Pay
                                        </div>
                                    )}
                                </div>

                                {errors.payment && (
                                    <p className="text-red-500 text-sm mt-2">{errors.payment}</p>
                                )}

                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                        darkMode 
                                            ? "bg-green-600 text-white hover:bg-green-700 shadow-[0_0_10px_rgba(74,222,128,0.3)]" 
                                            : "bg-white text-black border-2 border-black hover:bg-gray-100"
                                    }`}
                                >
                                    Pagar
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