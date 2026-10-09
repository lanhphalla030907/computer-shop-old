import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Brands from "../components/Brands";
import { BiCategoryAlt } from "react-icons/bi";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdStarRate } from "react-icons/md";
import { FaRegHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import AddToCartModal from "../components/AddToCartModal";
import { productsStatic } from "../Data/productsStatic";
const AllProducts = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [show, setshow] = useState(true);
  const [show2, setshow2] = useState(true);
  const [show3, setshow3] = useState(true);
  const [show4, setshow4] = useState(true);
  const [price, setPrice] = useState(500);
  const [view, setview] = useState("grid");
  const [selectCate, setselectcate] = useState("All");
  const [selectBrand, setselectBrand] = useState(null);
  const [appliedPrice, setAppliedPrice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    setProducts(productsStatic);
  }, []);
  const ITEMS_PER_PAGE = 9; // NEW
  const [currentPage, setCurrentPage] = useState(1); // NEW

  const filterSelect = products.filter((item) => {
    const matchCategory = selectCate === "All" || item.category === selectCate;

    const matchPrice = appliedPrice === null || item.price <= appliedPrice;
    const matchBrand = selectBrand=== null || item.brand === selectBrand;

    return matchCategory && matchPrice && matchBrand;
  });
  


  //  Pagination calculations (NEW)
  const totalPages = Math.ceil(filterSelect.length / ITEMS_PER_PAGE); // NEW
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // NEW
  const endIndex = startIndex + ITEMS_PER_PAGE; // NEW
  const paginatedProducts = filterSelect.slice(startIndex, endIndex); // NEW

  //  Reset page when filter changes (NEW)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectCate, appliedPrice]);

  const product = [
    { name: "All", qty: products.length },
    {
      name: "Mouse Gaming",
      qty: products.filter((p) => p.category === "Mouse Gaming").length,
    },
    {
      name: "Computer",
      qty: products.filter((p) => p.category === "Computer").length,
    },
    {
      name: "Keyboard Gaming",
      qty: products.filter((p) => p.category === "Keyboard Gaming").length,
    },
    {
      name: "Chair Gaming&Office",
      qty: products.filter((p) => p.category === "Chair Gaming&Office")
        .length,
    },
    {
      name: "Headphone",
      qty: products.filter((p) => p.category === "Headphone").length,
    },
    {
      name: "Controller",
      qty: products.filter((p) => p.category === "Controller").length,
    },
  ];

  const Product = [
    {
      name: "Asus",
      qty: products.filter((p) => p.brand === "Asus").length,
    },
    {
      name: "Razer",
      qty: products.filter((m) => m.brand === "Razer").length,
    },
    { name: "MSI", qty: products.filter((m)=> m.brand=== "MSI").length, },
    { name: "VoidTech", qty: products.filter((m)=> m.brand=== "VoidTech").length, },
    { name: "Corsair", qty: products.filter((m)=> m.brand=== "Corsair").length, },
    { name: "SteelSerires", qty: 0 },
    { name: "Turtle Beach", qty: 0 },
  ];

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
      <div className="lg:px-15 px-5 py-10 md:py-15 p-text">
        <h2 className="text-4xl md:text-6xl font-bold">Products</h2>
        <div className=' rounded-xl mt-5 lg:bg-cover bg-contain lg:bg-center bg-[url("https://dlcdnwebimgs.asus.com/gain/A9E6C22B-47F1-4F8D-8B92-6052637263D2/fwebp/fwebp")] w-full h-50 md:h-70'></div>
        <div className="flex flex-col lg:flex-row gap-10 py-10">
          <div className={`w-full lg:w-[25%] lg:shrink-0 ${showFilters ? "flex" : "hidden"} lg:flex`}>
            <div className="w-full flex flex-col gap-5 font-bold text-gray-700">
              <div className="border-t border-b border-b-gray-300 border-t-gray-300 py-3">
                <div className="flex justify-between items-center ">
                  <p className="font-bold text-xl text-black cursor-pointer">
                    PRODUCT CATEGORIES
                  </p>

                  <p
                    onClick={() => setshow(!show)}
                    className="text-3xl font-bold text-gray-500 hover:text-blue-500 cursor-pointer"
                  >
                    {show ? "-" : "+"}
                  </p>
                </div>

                {show && (
                  <ul className="flex flex-col gap-4 mt-5">
                    {product.map((i, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div
                          onClick={() => setselectcate(i.name)}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectCate === i.name}
                            readOnly
                          />
                          <span>{i.name}</span>
                        </div>
                        <span className="text-gray-400">({i.qty})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t border-b border-b-gray-300 border-t-gray-300 py-3">
                <div className="flex justify-between items-center ">
                  <p className="font-bold text-xl text-black cursor-pointer">
                    FILTER BY PRICE
                  </p>

                  <p
                    onClick={() => setshow2(!show2)}
                    className="text-3xl font-bold text-gray-500 hover:text-blue-500 cursor-pointer"
                  >
                    {show2 ? "-" : "+"}
                  </p>
                </div>

                {show2 && (
                  <div className="mt-5 space-y-5">
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-black"
                    />
                    <div className="flex justify-between items-center text-gray-600 font-medium">
                      <p>
                        PRICE:{" "}
                        <span className="font-bold">$0-{price}</span>{" "}
                      </p>
                      <span
                        onClick={() => setAppliedPrice(price)}
                        className="text-blue-500 underline text-sm font-bold"
                      >
                        APPLY FILTER
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-b border-b-gray-300 border-t-gray-300 py-3">
                <div className="flex justify-between items-center ">
                  <p className="font-bold text-xl text-black cursor-pointer">
                    BRANDS CATEGORIES
                  </p>

                  <p
                    onClick={() => setshow3(!show3)}
                    className="text-3xl font-bold text-gray-500 hover:text-blue-500 cursor-pointer"
                  >
                    {show3 ? "-" : "+"}
                  </p>
                </div>

                {show3 && (
                  <ul className="flex flex-col gap-4 mt-5 ">
                    {Product.map((i, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3" onClick={()=> setselectBrand(i.name)}>
                          <input type="checkbox" checked={selectBrand===i.name} readOnly />
                          <span>{i.name}</span>
                        </div>
                        <span className="text-gray-400">({i.qty})</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="border-t border-b border-b-gray-300 border-t-gray-300 py-3">
                <div className="flex justify-between items-center ">
                  <p className="font-bold text-xl text-black cursor-pointer">
                    MEMORY
                  </p>

                  <p
                    onClick={() => setshow4(!show4)}
                    className="text-3xl font-bold text-gray-500 hover:text-blue-500 cursor-pointer"
                  >
                    {show4 ? "-" : "+"}
                  </p>
                </div>

                {show4 && (
                  <div className="grid grid-cols-4 gap-3">
                    <div className="border border-gray-200 rounded-sm py-2 text-sm font-bold text-gray-500 flex justify-center hover:bg-blue-500 hover:text-white ">
                      64GB
                    </div>
                    <div className="border border-gray-200 rounded-sm py-2 text-sm font-bold text-gray-500 flex justify-center hover:bg-blue-500 hover:text-white  ">
                      128GB
                    </div>
                    <div className="border border-gray-200 rounded-sm py-2 text-sm font-bold text-gray-500 flex justify-center hover:bg-blue-500 hover:text-white  ">
                      256GB
                    </div>
                    <div className="border border-gray-200 rounded-sm py-2 text-sm font-bold text-gray-500 flex justify-center hover:bg-blue-500 hover:text-white  ">
                      512GB
                    </div>
                    <div className="border border-gray-200 rounded-sm py-2 text-sm font-bold text-gray-500 flex justify-center hover:bg-blue-500 hover:text-white  ">
                      1TB
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-1 lg:min-w-0">
            <div className="flex justify-between">
              <div className="hidden lg:flex gap-3 items-center">
                <div
                  onClick={() => setview("grid")}
                  className={`border border-gray-400 px-3 py-2.5 rounded-sm cursor-pointer 
                ${
                  view === "grid"
                    ? "border-gray-700 text-gray-700 font-bold"
                    : "border-gray-400 text-gray-400 hover:text-blue-500"
                }`}
                >
                  <BiCategoryAlt className="text-xl" />
                </div>
                <div
                  onClick={() => setview("list")}
                  className={`border border-gray-400 px-3 py-2.5 rounded-sm cursor-pointer 
                ${
                  view === "list"
                    ? "border-gray-700 text-gray-700 font-bold"
                    : "border-gray-400 text-gray-400 hover:text-blue-500"
                }`}
                >
                  <BsFillMenuButtonWideFill className="text-xl" />
                </div>
                <p className=" font-bold text-gray-600 text-sm">
                  Show all products result
                </p>
              </div>
              <p
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden block px-5 py-2 bg-black font-bold text-white rounded-md cursor-pointer"
              >
                Filter
              </p>
              <div className="flex gap-3">
                <select
                  name=""
                  id=""
                  className=" leading-tight font-medium text-sm rounded-md border border-gray-400 px-3 py-2"
                >
                  <option value="">Defualt sorting</option>
                  <option value="">Sort by popular</option>
                  <option value="">Sort by lasted</option>
                  <option value="">Sort by price:Low to High</option>
                  <option value="">Sort by price:High to Low</option>
                </select>
                <select
                  name=""
                  id=""
                  className="hidden md:block font-medium text-sm rounded-md border border-gray-400 px-2 py-2"
                >
                  <option value="">Show 9</option>
                  <option value="">6</option>
                  <option value="">9</option>
                </select>
              </div>
            </div>
            {view === "grid" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 mt-7 gap-8">
                {paginatedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 shadow rounded-xl px-7 py-5 w-full h-120 flex flex-col"
                  >
                    <div className="flex flex-col ">
                      <div className="flex justify-between items-center mb-3">
                        <p className="text-gray-600 font-bold text-sm">
                          {item.name}
                        </p>
                        <FaRegHeart className="text-black hover:text-blue-500 cursor-pointer" />
                      </div>
                      <NavLink to={`/detail/${item.id}`}>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full lg:h-60 h-65 object-contain"
                        />
                      </NavLink>

                      <p className="text-black font-semibold leading-5 text-lg mt-4 line-clamp-2">
                        {item.title}
                      </p>

                      <div className="flex items-center mt-2 h-5">
                        {icons.map((_, i) => (
                          <MdStarRate
                            key={i}
                            className="text-blue-600 text-sm"
                          />
                        ))}
                        <MdStarRate className="text-gray-400 text-sm" />
                        <p className="text-black ms-1 text-[13px] font-bold">
                          5 Reviews
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-5">
                      <div>
                        <p className="text-2xl text-blue-600 font-extrabold">
                          ${item.price}
                        </p>
                        <p className="text-gray-700 text-sm line-through">
                          ${item.dis}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(item);
                          setShowModal(true);
                        }}
                        className="show-btn"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {view === "list" && (
              <div className="grid grid-cols-1  gap-4 mt-5">
                {paginatedProducts.map((a, b) => (
                  <div
                    key={b}
                    className="border border-gray-300 rounded-lg px-10 py-5"
                  >
                    <div className="flex gap-5">
                      <img className="w-65 h-60" src={a.img} alt="" />
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-gray-500">{a.name}</p>
                          <FaRegHeart className="text-black  hover:text-blue-500 cursor-pointer" />
                        </div>
                        <h2 className="text-3xl mt-4 font-bold ">{a.title}</h2>
                        <div className="flex items-center mt-2">
                          {icons.map((_, i) => (
                            <MdStarRate
                              key={i}
                              className="text-blue-600 text-sm"
                            />
                          ))}
                          <MdStarRate className="text-gray-400 text-sm" />
                          <p className="text-black ms-1 text-[13px] font-bold">
                            5 Reviews
                          </p>
                        </div>
                        <p className="max-w-160">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or randomised words
                          which don’t look even slightly believable.
                        </p>
                        <p className="font-bold text-blue-500 text-2xl ">
                          ${a.price}
                        </p>
                        <button className="show-btn ">Add To Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md border text-sm font-semibold
      bg-white text-gray-600 border-gray-300
      disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`hidden sm:block px-4 py-2 rounded-md border text-sm font-bold
        ${
          currentPage === i + 1
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white text-gray-600 border-gray-300 hover:bg-blue-100"
        }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Current Page (Mobile only) */}
              <span className="sm:hidden px-4 py-2 text-sm font-semibold">
                {currentPage} / {totalPages}
              </span>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md border text-sm font-semibold
      bg-white text-gray-600 border-gray-300
      disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddToCartModal show={showModal} onClose={() => setShowModal(false)} />
      <Brands />
    </div>
  );
};

export default AllProducts;
