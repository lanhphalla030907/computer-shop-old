import { FaTrash, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import qr from "../assets/qr.jpg";
import image from "../assets/image.png";
import image2 from "../assets/image4.png";
const Cart = ({ cart, setCart }) => {
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.qty) || 1;
    return sum + (price * qty);
  }, 0);
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");
  const [slip, setSlip] = useState(null);
  const [location, setLocation] = useState("Phnom Penh");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cities = [
    "Phnom Penh",
    "Siem Reap",
    "Sihanoukville",
    "Battambang",
    "Kampong Cham",
    "Pursat",
    "Takeo",
    "Kampot",
    "Kandal",
    "Kampong Thom"
  ];

  // Payment methods
  const paymentMethods = [
    { value: "COD", label: "Cash on Delivery",  description: "Pay when receiving items" },
    { value: "ABA", label: "ABA QR Payment",  description: "Scan QR with ABA app" },
    { value: "ACLEDA", label: "ACLEDA Bank",  description: "Transfer via ACLEDA" },
    { value: "WING", label: "WING Money",  description: "Pay via WING account" },
  ];

  const finalTotal = subtotal - discount;
  
  // ពេល location ប្តូរ
  useEffect(() => {
    if (payment === "COD" && location !== "Phnom Penh") {
      setPayment("ABA");
      setTimeout(() => {
        alert("COD is only available in Phnom Penh. Payment method has been changed to ABA.");
      }, 100);
    }
  }, [location, payment]);

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "LANHPHALLA") {
      setDiscount(subtotal * 0.15);
      alert("Congratulations! You got 15% discount!");
    } else if (promo.trim().toUpperCase() === "WELCOME10") {
      setDiscount(subtotal * 0.10);
      alert("Congratulations! You got 10% discount!");
    } else {
      setDiscount(0);
      alert("Promo code incorrect or expired.");
    }
  };
  
  const sendOrder = async () => {
    if (isLoading) return;
    
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all required information.");
      return;
    }
    
    if (phone.length < 9 || !/^\d+$/.test(phone)) {
      alert("Please enter a valid phone number (at least 9 digits).");
      return;
    }
    
    // Check COD
    if (payment === "COD" && location !== "Phnom Penh") {
      alert("COD is only available for Phnom Penh. Please choose another payment method.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Check stock first
      let stockError = "";
      for (const item of cart) {
        if (item.stock !== undefined && item.qty > item.stock) {
          stockError += `${item.title}: Available ${item.stock}, You ordered ${item.qty}\n`;
        }
      }
      
      if (stockError) {
        alert(`Not enough stock:\n\n${stockError}\nPlease reduce quantity or remove items.`);
        setIsLoading(false);
        return;
      }
      
      // Confirm order
      const confirmed = window.confirm(
        `Confirm your order?\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal: $${finalTotal.toFixed(2)}\n\nClick OK to continue.`
      );
      
      if (!confirmed) {
        setIsLoading(false);
        return;
      }
      
      // Prepare data for Telegram
      const orderDetails = cart.map((item) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.qty) || 1;
        return `• ${item.title} x ${qty} = $${(price * qty).toFixed(2)}`;
      }).join("\n");
      
      const message = `
🛒 NEW ORDER
────────────────
👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${location}
🏠 Address: ${address}
💳 Payment: ${paymentMethods.find(p => p.value === payment)?.label}
────────────────
${orderDetails}
────────────────
💰 Subtotal: $${subtotal.toFixed(2)}
🎁 Discount: $${discount.toFixed(2)}
💵 Total: $${finalTotal.toFixed(2)}
────────────────
Order ID: ORD-${Date.now().toString().slice(-8)}
      `;
      
      // Send to your PHP API
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("location", location);
      formData.append("address", address);
      formData.append("payment", payment);
      formData.append("total", finalTotal);
      formData.append("message", message);
      formData.append("product_ids", JSON.stringify(
        cart.map(item => ({ id: item.id, qty: item.qty }))
      ));
      
      if (slip) {
        formData.append("photo", slip);
      }

      setShowCheckout(false);
      setShowSuccessModal(true);
      setCart([]);
      
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format price
  const formatPrice = (price) => {
    const num = parseFloat(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="px-4 md:px-20 py-10 p-text">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="flex flex-col gap-7 items-center">
            <BsCartX className="text-[150px] md:text-[180px] text-gray-700" />
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <NavLink to="/product" className="show-btn bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Back to Shopping
            </NavLink>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row w-full gap-5 items-start py-5">
            {/* Cart Items */}
            <div className="border border-gray-200 rounded-md w-full lg:w-[60%]">
              {cart.map((item) => {
                const price = parseFloat(item.price) || 0;
                const qty = parseInt(item.qty) || 1;
                const total = price * qty;
                
                return (
                  <div key={item.id} className="flex flex-col">
                    <div className="flex flex-col sm:flex-row gap-3 border-b p-4 sm:p-6 border-b-gray-200">
                      <img
                        src={item.img}
                        className="w-full sm:w-32 h-32 object-cover bg-gray-100 rounded-md"
                        alt={item.title}
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-lg">{item.title}</p>
                          <FaTrash
                            onClick={() => removeItem(item.id)}
                            className="text-blue-600 hover:text-red-500 cursor-pointer text-xl"
                          />
                        </div>
                        <p className="text-sm text-gray-600">Type: {item.category}</p>
                        <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xl font-bold text-gray-800">
                            ${formatPrice(price)}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="bg-gray-100 px-4 py-1 rounded-2xl text-gray-700 font-medium">
                              Qty: {qty}
                            </span>
                            <span className="font-bold text-blue-600">
                              ${formatPrice(total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Order Summary */}
            <div className="border border-gray-200 rounded-md w-full lg:w-[40%] sticky top-5">
              <div className="flex flex-col p-5">
                <p className="font-bold text-2xl mb-4">Order Summary</p>
                
                <div className="py-3 border-b border-b-gray-200 space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal:</p>
                    <p className="font-bold">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Discount:</p>
                    <p className="font-bold text-red-500">-${discount.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Delivery:</p>
                    <p className="font-bold text-green-600">Free</p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 items-center">
                  <p className="font-bold text-lg">Final Total:</p>
                  <p className="font-bold text-xl text-blue-600">
                    ${finalTotal.toFixed(2)}
                  </p>
                </div>
                
                {/* Promo Code */}
                <div className="mt-4">
                  <div className="relative">
                    <input
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      type="text"
                      className="bg-gray-100 font-medium text-sm w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Enter promo code"
                    />
                    <button
                      onClick={applyPromo}
                      className="absolute right-1 top-1 px-4 py-2 text-sm bg-black text-white rounded-xl hover:bg-gray-800"
                    >
                      Apply
                    </button>
                  </div>
                 
                </div>
                
                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full bg-blue-600 font-bold py-3 text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    Proceed to Checkout <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center mb-6">
              Checkout Information
            </h3>

            <div className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Phone Number *
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="012 345 678"
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    <FaMapMarkerAlt className="inline mr-2" /> City/Province *
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {location !== "Phnom Penh" && (
                    <p className="text-xs text-red-500 mt-1">
                      COD is only available in Phnom Penh
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Detailed Address *
                  </label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Street, House number, etc."
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Payment Method *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => {
                    const isDisabled = method.value === "COD" && location !== "Phnom Penh";
                    return (
                      <div
                        key={method.value}
                        className={`border rounded-lg p-3 cursor-pointer transition ${
                          payment === method.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => {
                          if (isDisabled) {
                            alert("COD is only available for Phnom Penh.");
                          } else {
                            setPayment(method.value);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{method.icon}</span>
                          <div>
                            <span className="font-medium">{method.label}</span>
                            <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                          </div>
                        </div>
                        {payment === method.value && (
                          <div className="text-right text-blue-500 mt-2">
                            ✓ Selected
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Slip Upload */}
              {payment !== "COD" && (
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Upload Payment Slip *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setSlip(e.target.files[0])}
                      className="w-full"
                    />
                    {slip && (
                      <p className="text-sm text-green-600 mt-2">
                        File selected: {slip.name}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Upload screenshot or photo of your payment confirmation
                    </p>
                  </div>
                </div>
              )}

              {/* QR Code for Online Payment */}
              {(payment === "ABA" || payment === "KHQR") && (
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="font-semibold mb-3">
                    Scan QR Code with your banking app
                  </p>
                  <img
                    src={qr}
                    className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-lg shadow-lg"
                    alt="QR Code"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Scan and pay ${finalTotal.toFixed(2)}
                  </p>
                </div>
              )}
              {(payment === "ACLEDA" || payment === "KHQR") && (
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="font-semibold mb-3">
                    Scan QR Code with your banking app
                  </p>
                  <img
                    src={image2}
                    className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-lg shadow-lg"
                    alt="QR Code"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Scan and pay ${finalTotal.toFixed(2)}
                  </p>
                </div>
              )}
              {(payment === "WING" || payment === "KHQR") && (
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="font-semibold mb-3">
                    Scan QR Code with your banking app
                  </p>
                  <img
                    src={image}
                    className="w-48 h-48 mx-auto border-2 border-gray-300 rounded-lg shadow-lg"
                    alt="QR Code"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    Scan and pay ${finalTotal.toFixed(2)}
                  </p>
                </div>
              )}

              {/* Order Summary in Modal */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-bold mb-2">Order Summary</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Items ({cart.length}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span className="text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2 mt-2">
                    <span>Total:</span>
                    <span className="text-blue-600 text-lg">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={sendOrder}
                disabled={isLoading}
                className={`w-full ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : payment === "COD" 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white py-4 rounded-xl font-bold mt-4 transition flex items-center justify-center gap-3 text-lg`}
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Order...
                  </>
                ) : payment === "COD" ? (
                  "Place Order (COD)"
                ) : (
                  `Confirm ${payment} Payment`
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-4xl">✓</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Order Successful!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your order! We will contact you soon.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  window.location.href = "/";
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;