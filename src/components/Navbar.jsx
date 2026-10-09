import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegHeart, FaSearch, FaTimes, FaBars } from "react-icons/fa";
import { IoPersonOutline, IoLocationSharp } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { LanguageContext } from "../context/LanguageContext";
import { productsStatic } from "../Data/productsStatic";

const Navbar = ({ cart, user, setUser }) => {
  const [login, setlogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [profile, setprofile] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");
  
  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const { language, setLanguage, text } = useContext(LanguageContext);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Load all products for search
  useEffect(() => {
    setAllProducts(productsStatic);
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = allProducts.filter(product => {
      const searchLower = term.toLowerCase();
      return (
        (product.name && product.name.toLowerCase().includes(searchLower)) ||
        (product.title && product.title.toLowerCase().includes(searchLower)) ||
        (product.category && product.category.toLowerCase().includes(searchLower)) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        (product.id && product.id.toString().includes(term))
      );
    });

    setSearchResults(filtered);
    setShowResults(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowResults(false);
  };

  // Handle product click from search results
  const handleProductClick = (product) => {
    // Navigate to product detail page or close search
    window.location.href = `/detail/${product.id}`;
    clearSearch();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username && password) {
      const userData = { username, role: "user" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Welcome Back!");
      setlogin(false);
      setUsername("");
      setPassword("");
    } else {
      alert("Wrong username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    alert("Account created! Now login");
    setIsRegister(false);
  };

  return (
    <div className={language === "Cambodia" ? "p-text-1" : "p-text"}>
      <header className="bg-blue-900 w-full px-4 md:px-10 lg:px-20 py-3 md:py-4">
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center gap-4 md:gap-10 text-white">
            <h2 className="font-bold text-xl md:text-2xl h-text">KEMIK</h2>
            <div className="hidden sm:flex flex-col items-center">
              <BiCategoryAlt className="text-2xl md:text-3xl" />
              <p className="text-[12px]">Categories</p>
            </div>
          </div>
          <div className="hidden md:block overflow-hidden whitespace-nowrap w-full mx-5">
            <div className="scroll-track">
              <p className="scroll-text">
                | {text.promoStart}{" "}
                <span className="text-blue-300">LANHPHALLA</span>{" "}
                {text.promoEnd}
              </p>
              <p className="scroll-text">
                | {text.promoStart}{" "}
                <span className="text-blue-300">LANHPHALLA</span>{" "}
                {text.promoEnd}
              </p>
            </div>
          </div>

          <div className="flex text-white text-lg md:text-xl gap-3 md:gap-5 items-center">
            <FaRegHeart className="hidden sm:block" />
            <div className="items-center flex gap-1">
              <IoPersonOutline className="hidden sm:block" />
              <div className="relative flex flex-col">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setprofile((prev) => !prev)}
                      className="flex items-center gap-2 border border-white px-3 py-2 rounded-xl hover:text-blue-500 hover:border-blue-500"
                    >
                      <span className="text-sm font-semibold">
                        {user.username}
                      </span>
                    </button>

                    {profile && (
                      <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md w-40 overflow-hidden">
                        <div className="flex items-center hover:bg-gray-100 cursor-pointer gap-2 px-4 py-2 text-black">
                          <IoPersonOutline />
                          <NavLink to="/profile">Profile</NavLink>
                        </div>
                         
                        <div
                          onClick={() => {
                            setUser(null);
                            localStorage.removeItem("user");
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-500"
                        >
                          <CiLogout />
                          <p>Log out</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setlogin((prev) => !prev)}
                    className="border border-white text-[14px] font-bold px-2 py-2 rounded-xl hover:border-blue-500 hover:text-blue-500"
                  >
                    {text.login}
                  </button>
                )}

                {login && (
                  <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-lg shadow-lg w-[85vw] max-w-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {text.signIn}
                      </h2>
                      <button
                        onClick={() => setIsRegister(true)}
                        className="text-gray-400 text-sm hover:text-gray-600"
                      >
                        {text.createAccount}
                      </button>
                    </div>

                    <form
                      onSubmit={isRegister ? handleRegister : handleLogin}
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <label className="text-sm text-gray-600">
                          {text.username}
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full border text-black border-gray-300 rounded-md px-3 py-2 mt-1"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">
                          {text.password}
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full border text-black border-gray-300 rounded-md px-3 py-2 mt-1"
                        />
                      </div>

                      <button className="w-full bg-blue-400 font-bold py-2 rounded-md hover:bg-blue-600">
                        {isRegister ? "Register" : "Login"}
                      </button>

                      <p
                        onClick={() => setIsRegister(!isRegister)}
                        className="text-sm text-blue-500 cursor-pointer text-center"
                      >
                        {isRegister
                          ? "Already have account? Login"
                          : "Create new account"}
                      </p>
                    </form>

                    <div className="text-right mt-4">
                      <a className="text-sm text-gray-400 hover:text-gray-600">
                        {text.lostPassword}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <NavLink to="/cart" className="relative">
              <p className="absolute bg-blue-700 left-4 w-4 h-4 bottom-2 font-semibold rounded-[50%] flex justify-center items-center text-[10px]">
                {totalItems}
              </p>
              <BsCart2 className="relative" />
            </NavLink>
          </div>
        </div>
      </header>
      <div className="w-full bg-gray-900 px-4 md:px-10 lg:px-20 py-3 md:py-5">
        <div className="flex justify-between items-center gap-3">
          <img
            src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/logo.svg"
            alt="logo"
            className="h-8 md:h-10"
          />
          <ul className="hidden lg:flex items-center text-white gap-8 font-bold">
            <NavLink className="hover:text-blue-500" to={"/"}>
              {text.home}
            </NavLink>
            <NavLink className="hover:text-blue-500" to={"/about"}>
              {text.about}
            </NavLink>
            <NavLink className="hover:text-blue-500" to={"/product"}>
              {text.products}
            </NavLink>
            <NavLink className="hover:text-blue-500" to={"/contact"}>
              {text.contact}
            </NavLink>
            
            {/* Search Bar - Updated */}
            <div className="relative w-80">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => searchTerm.trim() !== "" && setShowResults(true)}
                  className="bg-white  px-5 py-2 rounded-md placeholder:text-gray-500 font-light text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={text.searchPlaceholder}
                />
                {searchTerm ? (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                ) : (
                  <FaSearch className="absolute right-3 top-3 text-gray-400" />
                )}
              </div>

              {/* Search Results Modal */}
              {showResults && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-4 text-center">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-500">Loading products...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      <div className="p-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-700">
                            {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                          </p>
                          <button
                            onClick={clearSearch}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      
                      <div className="divide-y divide-gray-100">
                        {searchResults.slice(0, 8).map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product)}
                            className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12  bg-gray-100 rounded-md overflow-hidden">
                                {product.img ? (
                                <NavLink to={`/detail/${product.id}`}>

                                  <img
                                    src={product.img}
                                    alt={product.name || product.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = "https://via.placeholder.com/100";
                                    }}
                                  />
                                  </NavLink>
                                ) : (
                                  <div className="w-full h-full  flex items-center justify-center">
                                    <BsCart2 className="text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-800 truncate text-sm">
                                  {product.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm font-bold text-blue-600">
                                    ${parseFloat(product.price || 0).toFixed(2)}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    parseInt(product.stock || 0) > 10 
                                      ? 'bg-green-100 text-green-800'
                                      : parseInt(product.stock || 0) > 0
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {parseInt(product.stock || 0)} in stock
                                  </span>
                                </div>
                                {product.category && (
                                  <span className="text-xs text-gray-500 mt-1 block">
                                    {product.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {searchResults.length > 8 && (
                        <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
                          <p className="text-sm text-gray-500">
                            Showing 8 of {searchResults.length} products
                          </p>
                        </div>
                      )}
                    </>
                  ) : searchTerm.trim() !== "" ? (
                    <div className="p-8 text-center">
                      <FaSearch className="text-3xl text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No products found</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Try different keywords
                      </p>
                    </div>
                  ) : null}
                </div>
              )}

              {/* Click outside to close */}
              {showResults && (
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowResults(false)}
                />
              )}
            </div>
          </ul>
          
          <div className="flex items-center gap-4">
          <div className="flex flex-col relative">
            <div
              onClick={() => setshow((prev) => !prev)}
              className="flex items-center gap-1"
            >
              <p className="font-semibold text-white hover:text-blue-500">
                {language}
              </p>
              <IoMdArrowDropdown className="text-white" />
            </div>
            {show && (
              <div className="absolute top-full right-0 z-50 mt-2 w-44 bg-white rounded-md shadow-lg overflow-hidden">
                <div
                  onClick={() => {
                    setLanguage("English");
                    setshow(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-5 h-5 rounded-sm"
                    src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                    alt="English"
                  />
                  <p className="text-black font-medium">English</p>
                </div>

                <div
                  onClick={() => {
                    setLanguage("Cambodia");
                    setshow(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    className="w-5 h-5 rounded-sm"
                    src="https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_Cambodia.svg"
                    alt="Cambodia"
                  />
                  <p className="text-black font-medium">Cambodia</p>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            className="lg:hidden text-white text-2xl"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden flex flex-col gap-4 mt-4 pb-2 text-white font-semibold border-t border-gray-700 pt-4">
            <div className="relative">
              <input
                type="text"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setMobileMenu(false);
                    window.location.href = "/product";
                  }
                }}
                placeholder={text.searchPlaceholder}
                className="bg-white w-full px-4 py-2 rounded-md text-black outline-none"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <NavLink onClick={() => setMobileMenu(false)} to="/">{text.home}</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/about">{text.about}</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/product">{text.products}</NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/contact">{text.contact}</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;