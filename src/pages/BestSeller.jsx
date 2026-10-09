import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdStarRate } from "react-icons/md";

const BestSeller = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const Products = [
    {
      category: "Keyboards",
      name: "Gaming Keyboard",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-2-1-600x600.png",
      title: "Logitech K780 Multi-Device Wireless Keyboard",
      price: "$770.77",
      dis: "$920.27",
    },
    {
      category: "Mouse",
      name: "Gaming Mouse",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-3-1.png",
      title: "Turtle Beach Recon Wired Gaming Controller",
      price: "$527.77",
      dis: "$620.27",
    },
    {
      category: "Mouse",
      name: "Gaming Mouse",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-17-1-600x600.png",
      title: "Microsoft Xbox Elite Wireless Controller",
      price: "$546.70",
      dis: "$600.27",
    },
    {
      category: "Chair Gaming",
      name: "Gaming Chair",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-29-1-600x600.png",
      title: "Antec NX200M RGB mATX Mini Tower Gaming Case",
      price: "$150.00",
      dis: "$178.50",
    },
    {
      category: "Headphone",
      name: "Gaming Headphone",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-5-1.png",
      title: "Corsair Void Elite RGB Wireless Gaming Headset",
      price: "$788.77",
      dis: "$920.27",
    },
    {
      category: "Mouse",
      name: "Gaming Mouse",
      img: "https://dlcdnwebimgs.asus.com/gain/12E6940F-3E6E-4229-88FE-847783CA0A6B/w717/h525/fwebp",
      title: "ROG Raikiri II Xbox Wireless Controller",
      price: "$590.77",
      dis: "$620.27",
    },
    {
      category: "Mouse",
      name: "Gaming Mouse",
      img: "https://dlcdnwebimgs.asus.com/gain/1CC19A05-CA1A-4EF7-A1A4-C15F6A63ED7F/w717/h525/fwebp",
      title: "ROG Tessen Mobile Gaming Controller",
      price: "$527.77",
      dis: "$620.27",
    },
  ];

  const filteredProducts =
    activeCategory === "All Products"
      ? Products
      : Products.filter((item) => item.category === activeCategory);

  const icons = Array(4).fill(0);

  return (
    <div>
      <div className="py-10 p-text px-4 sm:px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">
          <h1 className="text-3xl md:text-[40px] font-bold">
            <span className="text-blue-600"> BEST</span> SELLTER
          </h1>

          <div className="flex gap-3 md:gap-8 text-gray-600 font-bold text-base md:text-lg items-center overflow-x-auto pb-2 lg:pb-0">
            {[
              "All Products",
              "Keyboards",
              "Mouse",
              "Headphone",
              "Chair Gaming",
            ].map((cat) => (
              <li
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`list-none cursor-pointer whitespace-nowrap px-4 py-1 rounded-md ${
                  activeCategory === cat
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                {cat}
              </li>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <li className="list-none font-bold">View More</li>
            <FaChevronRight className="text-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-7 gap-5">
          {filteredProducts.map((item, i) => (
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
                    {item.price}
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
        <div className="mt-10 bg-[url('https://rog.asus.com/media/1767581932430.jpg')] bg-center bg-cover h-80 rounded-xl px-6 md:px-10 py-8">
          <p className="text-sky-600 font-bold">THE ULTIMATE PLAY</p>
          <h2 className="text-3xl md:text-5xl max-w-90 font-bold text-sky-600">
            ROG Ryuo Enthusiast
          </h2>
          <p className=" font-bold text-2xl text-blue-600">$399.99</p>
          <button className="shop-now-btn mt-15">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
