import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdStarRate } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoIosRefresh } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import { RiSubtractFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import AddToCartModal from "../components/AddToCartModal";
import { productsStatic } from "../Data/productsStatic";
const DetailProducts = ({ addToCart }) => {
const { id } = useParams();

const [products, setProducts] = useState([]);
const [count, setcount] = useState(1);
const [showModal, setShowModal] = useState(false);
const [comment, setComment] = useState("Description");

useEffect(() => {
  setProducts(productsStatic);
}, []);

if (products.length === 0) {
  return <p className="text-center mt-10 text-xl">Loading product...</p>;
}

const product = products.find(p => String(p.id) === String(id));

if (!product) {
  return <p className="text-center mt-10 text-xl">Product not found</p>;
}

const relatedProducts = products.filter(
  p => p.category === product.category && p.id !== product.id
).slice(0, 8);

  const icons = Array(4).fill(0);
  return (
    <div>
      <div className="w-full shadow bg-white border border-b-gray-200 p-text font-bold py-5">
        <ul className="flex overflow-x-auto md:justify-center gap-6 md:gap-15 px-4 text-sm md:text-base whitespace-nowrap">
          <li>COMPUTERS</li>
          <li>KEYBOARDS</li>
          <li>MOUSE</li>
          <li>CONTROLLERS GAMING</li>
          <li>MONITERS</li>
          <li>MICROPHONES</li>
          <li>CHAIR GAMING</li>
        </ul>
      </div>
     <div className="px-4 sm:px-8 lg:px-30 py-10 p-text">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-15">
    <img
      className="w-full max-w-md mx-auto lg:mx-0 lg:w-135 h-auto md:h-130 border border-gray-200 rounded-md"
      src={product.img}
      alt=""
    />
    <div className="flex flex-col gap-3 py-3">
      <h2 className="font-bold text-2xl md:text-4xl p-text">{product.title}</h2>
      <div className="flex flex-wrap gap-3 md:gap-5 items-center">
        <p className="text-gray-500 font-semibold">
          Brands: <span className="text-black">{product.brand}</span>
        </p>
        <p className="text-gray-500 text-2xl">|</p>
        <div className="flex items-center">
          {icons.map((_, i) => (
            <MdStarRate key={i} className="text-blue-600" />
          ))}
          <MdStarRate className="text-gray-400" />
          <p className="font-bold text-gray-500 ms-4">5 Reviews</p>
        </div>
        
        {product.stock > 10 ? (
          <button className="bg-[#73AF6F] text-white font-bold px-6 py-1 rounded-md">
            In stock
          </button>
        ) : product.stock > 0 ? (
          <button className="bg-yellow-500 text-white font-bold px-6 py-1 rounded-md">
            Low stock
          </button>
        ) : (
          <button className="bg-red-500 text-white font-bold px-6 py-1 rounded-md">
            Out of stock
          </button>
        )}
      </div>
      
      <div className="border-b-2 border-t-2 border-t-gray-200 border-b-gray-200 py-3 mt-4">
        <p className="font-medium">
          There are many variations of passages of Lorem Ipsum available,
          but the majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable.
        </p>
        <p className="text-blue-500 font-bold text-3xl py-5">
          ${product.price}
        </p>
        
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Stock:</span>
            {product.stock > 10 ? (
              <span className="text-green-600 font-bold">
                {product.stock} items available
              </span>
            ) : product.stock > 0 ? (
              <span className="text-yellow-600 font-bold">
                Only {product.stock} left!
              </span>
            ) : (
              <span className="text-red-600 font-bold">
                Currently unavailable
              </span>
            )}
          </div>
          
          
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button className="flex gap-7 items-center bg-gray-100 px-6 md:px-8 text-lg rounded-md h-14">
            <RiSubtractFill
              onClick={() => setcount((prev) => Math.max(prev - 1, 1))}
              className="hover:text-blue-500 cursor-pointer"
            />
            <p>{count}</p>
            <FiPlus
              onClick={() => {
                if (count < product.stock) {
                  setcount((prev) => prev + 1);
                } else {
                  alert(`Only ${product.stock} items available in stock!`);
                }
              }}
              className="hover:text-blue-500 cursor-pointer"
            />
          </button>
          
          <button
            onClick={() => {
              if (product.stock === 0) {
                alert("This product is out of stock!");
                return;
              }
              
              if (count > product.stock) {
                alert(`Only ${product.stock} items available! Please reduce quantity.`);
                return;
              }
              
              addToCart({ ...product, qty: count, id: product.id });
              setShowModal(true);
            }}
            className="h-14 text-base md:text-xl hover:bg-blue-500 bg-black text-white font-bold px-8 md:px-35 rounded-sm"
            disabled={product.stock === 0} 
          >
            {product.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </button>
          
          <button className="py-3 border border-gray-300 px-5 rounded-md hover:bg-gray-50">
            <FaRegHeart className="hover:text-blue-500" />
          </button>
          <button className="py-3 border border-gray-300 px-5 rounded-md hover:bg-gray-50">
            <FiRefreshCcw className="hover:text-blue-500" />
          </button>
        </div>
        
        {product.stock > 0 && product.stock <= 5 && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-yellow-500" />
              <p className="text-yellow-700 font-semibold text-sm">
                Hurry! Only {product.stock} item(s) left in stock
              </p>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between py-7">
          <div className="flex items-center gap-2">
            <TbTruckDelivery className="text-3xl" />
            <p className="text-black font-bold text-sm">
              FREE DELIVERY <span className="text-gray-500">OVER 100$</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <IoIosRefresh className="text-3xl" />
            <p className="text-black font-bold text-sm">
              10 DAYS RETURN <span className="text-gray-500">PERIOD</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TiMessages className="text-3xl" />
            <p className="text-black font-bold text-sm">
              CUSTOMER <span className="text-gray-500">SUPPORT</span>
            </p>
          </div>
        </div>
        
        <div className="border-t-2 text-center border-t-gray-200 py-3 mt-4">
          <p className="font-semibold text-sm text-gray-800">
            Guarantee Safe & Secure Checkout
          </p>
          <img
            className="mx-auto mt-2"
            src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/safe.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</div>
      <div className="mt-5 border-t border-b border-t-gray-200 border-b-gray-200 py-7 p-text">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-lg md:text-2xl text-gray-700 font-bold px-4">
          <li
            onClick={() => setComment("Description")}
            className={` list-none relative px-3 py-1 font-medium cursor-pointer
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 
                        after:transition-all after:duration-300 hover:after:w-full
                      ${
                        comment === "Description"
                          ? "after:w-full text-blue-500"
                          : "text-gray-700"
                      }
                      `}
          >
            Description
          </li>
          <li
            className={` list-none relative px-3 py-1 font-medium cursor-pointer
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 
                        after:transition-all after:duration-300 hover:after:w-full
                      ${
                        comment === "Specifications"
                          ? "after:w-full text-blue-500"
                          : "text-gray-700"
                      }
                      `}
            onClick={() => setComment("Specifications")}
          >
            Specifications
          </li>
          <li
            className={` list-none relative px-3 py-1 font-medium cursor-pointer
                        after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-500 
                        after:transition-all after:duration-300 hover:after:w-full
                      ${
                        comment === "Reviews"
                          ? "after:w-full text-blue-500"
                          : "text-gray-700"
                      }
                      `}
            onClick={() => setComment("Reviews")}
          >
            Reviews(5)
          </li>
        </div>
        {comment == "Description" && (
          <div className=" max-w-4xl mx-auto py-10">
            <p className=" font-semibold text-lg text-gray-700 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              ducimus cum nam eius. Veniam mollitia repellat deleniti autem
              libero. Nesciunt explicabo harum sunt possimus dignissimos eveniet
              rem distinctio dolor?
            </p>
            <div className="flex flex-col md:flex-row gap-8 py-7">
              <div className="flex flex-col w-full md:w-[45%]">
                <p className="font-bold text-2xl md:text-4xl">Take Control</p>
                <p className=" font-medium mt-3">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don’t look
                  even slightly believable.
                </p>
                <img
                  className="mt-2 rounded-2xl"
                  src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/single-product-1.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col w-full md:w-[45%]">
                <p className="font-bold text-2xl md:text-4xl">Play-A-Long</p>
                <p className="font-medium mt-3">
                  Lorem ipsum dolor sit amet consectetur adipiscing diam tortor
                  sit feugiat dictum eu diam euismod ultrices convallis eget vel
                  velit posuere mi consequat leo egestas sed odio molestie non
                  imperdiet malesuada.
                </p>
                <img
                  className="mt-2 rounded-2xl"
                  src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/single-product-2.png"
                  alt=""
                />
              </div>
            </div>
            <p className="font-bold text-2xl md:text-4xl ">Smooth Moves</p>
            <p className="font-medium mt-3">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don’t look even
              slightly believable.
            </p>
          </div>
        )}
        {comment == "Specifications" && (
          <div className="max-w-4xl mx-auto py-8">
            <h2 className="flex justify-center font-bold text-3xl md:text-5xl">
              Specifications
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 mt-5 max-w-3xl justify-between border-b border-b-gray-200 py-10">
              <p className="text-xl text-gray-400 font-bold">GENERAL :</p>
              <div className="flex flex-col gap-1.5">
                <li>
                  {" "}
                  <span className="font-semibold">Connectivity:</span> 2.4GHz
                  Stellar Wireless via USB-A Receiver
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Connectivity:</span> 2.4GHz
                  Stellar Wireless via USB-A Receiver
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Bluetooth:</span> 5.1
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Cable:</span> None
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Battery:</span> 1 or 2 AA
                  alkaline batteries
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Switches:</span> ROCCAT® Titan
                  Switch Optical, 100 million click life cycle
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">USB Report Rate:</span> 1000
                  Hz
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">On-board memory:</span> 1
                  Profile
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Software:</span> ROCCAT Swarm
                </li>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5 max-w-3xl gap-4 sm:gap-70 border-b border-b-gray-200 py-10">
              <p className="text-xl text-gray-400 font-bold">SENSOR :</p>
              <div className="flex flex-col gap-1.5">
                <li className="font-bold">
                  ROCCAT® Owl-Eye 19K Optical Sensor
                </li>
                <li className="font-bold">Adjustable lift-off distance</li>
                <li className="font-bold">50g acceleration</li>
                <li className="font-bold">Minimum DPI:50</li>
                <li className="font-bold">Maximum DPI: 19,000</li>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5 max-w-3xl gap-4 sm:gap-62  border-b border-b-gray-200 py-10">
              <p className="text-xl text-gray-400 font-bold">DIMENSIONS:</p>
              <div className="flex flex-col gap-1.5">
                <li>
                  {" "}
                  <span className="font-semibold">
                    Product Dimensions:
                  </span>{" "}
                  5.20 x 3.23 x 1.69in / 13.2 x 8.2 x 4.3cm
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">Weight:</span> 96g weight
                  (without batteries) 119g weight (with one battery)
                </li>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5 max-w-3xl gap-4 sm:gap-57  ">
              <p className="text-xl text-gray-400 font-bold">COMPATIBILITY:</p>
              <div className="flex flex-col gap-1.5">
                <li>
                  {" "}
                  <span className="font-semibold">
                    Windows® 7 and above
                  </span>{" "}
                  (software support){" "}
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">USB 2.0 </span> (or higher)
                </li>
                <li>
                  {" "}
                  <span className="font-semibold">
                    Internet connection{" "}
                  </span>{" "}
                  (for driver software)
                </li>
              </div>
            </div>
          </div>
        )}
        {comment == "Reviews" && (
          <div className="max-w-4xl mx-auto py-10 space-y-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-bold">Customer Reviews</h2>
              <div className="flex justify-center items-center gap-3 mt-3">
                <span className="text-4xl font-semibold">3.5</span>
                <div className="text-yellow-400 text-lg">★★★★☆</div>
                <span className="text-gray-500 text-sm">
                  5 verified ratings
                </span>
              </div>
              <button className="mt-4 bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
                Write a Review
              </button>
            </div>

            <div className="space-y-6 border-t pt-6">
              {[
                {
                  name: "Linda Hayes",
                  text: "Great fit and very comfortable. Fabric feels premium.",
                },
                {
                  name: "Philip King",
                  text: "Nice quality but sizing runs a little small.",
                },
                {
                  name: "Amanda",
                  text: "Shirt looks good but sleeves are tighter than expected.",
                },
                {
                  name: "Ervin Arlington",
                  text: "Material wasn't what I expected, but still wearable.",
                },
                {
                  name: "Patrick N. Newman",
                  text: "Good quality overall but fit is larger than usual.",
                },
              ].map((review, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="text-yellow-400 text-sm">★★★★☆</div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>

            <div className=" pt-8">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Name"
                />
                <input
                  className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Email"
                />
              </div>

              <textarea
                className="border w-full h-32 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-black mb-4"
                placeholder="Your review..."
              />

              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition">
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="py-12 md:py-15 px-4 sm:px-8 lg:px-10 p-text">
        <h2 className="text-3xl md:text-5xl font-bold">Related products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 gap-5">
          {relatedProducts.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 shadow rounded-xl px-5 md:px-7 py-5 w-full"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-700 text-sm">{item.name}</p>
                <FaRegHeart className="text-black hover:text-blue-500 cursor-pointer" />
              </div>

              <img
                src={item.img}
                alt=""
                className="w-full h-65 object-contain"
              />

              <p className="text-black font-semibold leading-5 text-lg mt-4">
                {item.title}
              </p>

              <div className="flex items-center mt-2">
                {icons.map((_, i) => (
                  <MdStarRate key={i} className="text-blue-600 text-sm" />
                ))}
                <MdStarRate className="text-gray-400 text-sm" />
                <p className="text-black ms-1 text-[13px] font-bold">
                  5 Reviews
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-2xl text-blue-600 font-extrabold">
                    ${item.price}
                  </p>
                  <p className="text-gray-700 text-sm line-through">
                    {item.dis}
                  </p>
                </div>

                <button className="show-btn">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddToCartModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default DetailProducts;
