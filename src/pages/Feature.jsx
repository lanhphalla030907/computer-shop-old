import React from "react";
import computer from "../assets/comuter.png";
const Feature = () => {
  const catagories = [
    {
      product: "20 products",
      title: "Controller Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/home1-cate1.png",
    },
    {
      product: "20 products",
      title: "Mouse Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/home1-cate2.png",
    },
    {
      product: "20 products",
      title: "Chair Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/home1-cate3.png",
    },
    {
      product: "20 products",
      title: "Headphone Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/home1-cate4.png",
    },
    {
      product: "20 products",
      title: "Keyboard Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/home1-cate5.png",
    },
    {
      product: "20 products",
      title: "Computer Gaming",
      img: computer,
    },
  ];
  return (
    <div className="mt-5 p-text">
      <h2 className="p-text flex justify-center font-bold text-3xl">
        Shop By Category
      </h2>
      <div className="grid md:grid-cols-3 grid-cols-1 lg:px-12 px-5 py-5 lg:gap-10 gap-7">
        {catagories.map((item, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-xl flex flex-col sm:flex-row justify-between pt-6 lg:ps-10 ps-5 lg:h-70 h-60 w-full relative overflow-hidden"
          >
            <div className="w-full sm:w-1/2 lg:w-100">
              <p className="relative overflow-hidden bg-white w-fit px-3 py-1 lg:text-sm text-[12px] font-light rounded-md group cursor-pointer">
                <span className="absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>

                <span className="absolute inset-0 bg-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300 delay-150"></span>

                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {item.product}
                </span>
              </p>

              <h2 className="lg:text-5xl text-3xl mt-3 font-bold hover:text-blue-600">
                {item.title}
              </h2>
            </div>

            <img
              className="self-end sm:mt-auto w-40 sm:w-45 lg:w-120 h-32 sm:h-45 lg:h-50 object-contain"
              src={item.img}
              alt=""
            />
            <button
              className="absolute bottom-0 right-0 bg-white px-2 py-1 
             flex items-center gap-2 font-semibold text-sm
             rounded-tl-sm hover:text-blue-600 transition"
            >
              Shop Now
              <span className="text-blue-500">➜</span>
            </button>
          </div>
        ))}
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8 px-5 md:px-10 py-10">
          <div className="bg-[url('https://dlcdnwebimgs.asus.com/gain/5DEF33D2-B9E4-4983-BE85-F93C4E4AD5FC/w750/h470/fwebp')] bg-cover bg-center h-60 rounded-xl px-6 md:px-10 py-8">
            <p className="text-white">THE ULTIMATE PLAY</p>
            <h2 className="text-3xl md:text-5xl max-w-90 font-bold text-white">
              GEFORCE RTX 3060Ti
            </h2>
            <p className=" font-bold text-2xl text-blue-600">$599.99</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
          <div className="bg-[url('https://dlcdnwebimgs.asus.com/gain/C7670A98-F9B6-4CBF-953C-FAECDD84D20E/w750/h470/fwebp')] bg-cover bg-center h-60 rounded-xl px-6 md:px-10 py-8">
            <p className="text-white">THE ULTIMATE PLAY</p>
            <h2 className="text-3xl md:text-5xl max-w-90 font-bold text-white">
              ROG Ryuo Enthusiast
            </h2>
            <p className=" font-bold text-2xl text-blue-600">$399.99</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
