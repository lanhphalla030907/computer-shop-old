import React from "react";
import Brands from "../components/Brands";
import { MdStarRate } from "react-icons/md";

const Special = () => {
  const icons = Array(4).fill(0);
   
  const news = [
    {
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-16-1-600x600.png",
      desc: "120mm Antec Prizm ARGB PWM Case Fan",
      price: "$189.99",
    },
    {
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-6-1-600x600.png",
      desc: "Antec RGB mATX Mini Tower Gaming Case",
      price: "$99.99",
    },
    {
      img: "https://image-cdn-v2.jambuntech.dev/1xq52fXVXmksHiSs-bYVUJtdKQ0=/640x/filters:format(webp)/tk-files/alphaseat___battlefiled_140___pink_56ded84f3e87e5468fd2b5b2e4c79b2d.png",
      desc: "Essential (Electric Adjustable Height Table, 1.6M)",
      price: "$239.99",
    },
  ];
  const New = [
    {
      img: "https://image-cdn-v2.jambuntech.dev/_ViEBQFdKoS1QH6Jj9lNaUjLHxs=/640x/filters:format(webp)/tk/1_ab5d5d02e8.png",
      desc: "MA02W - Wasteland Survival Headphone Gaming",
      price: "$69.99",
    },
    {
      img: "https://image-cdn-v2.jambuntech.dev/FqJEvNYpwkZ3UDPxgGFwF8TzSMY=/640x/filters:format(webp)/tk/1_7205c02c20.png",
      desc: "R3 Magnesium Alloy 8K Gaming Mouse",
      price: "$79.99",
    },
    {
      img: "https://image-cdn-v2.jambuntech.dev/n6hNmuZaTI9Kuh4hck2fWQBVniY=/640x/filters:format(webp)/tk/1_c53ebbac13.png",
      desc: "Yeti GX Microphone Gaming",
      price: "$239.99",
    },
  ];
  return (
    <div>
      <div className=" w-full bg-white px-4 sm:px-8 lg:px-15 p-text">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="w-full py-10 lg:py-25">
            <h2 className="text-black font-bold text-3xl md:text-5xl ">
              {" "}
              <span className="text-blue-500">NEWS</span> PRODUCTS
            </h2>
            <div className="flex flex-col gap-5 py-5">
              {news.map((item, i) => (
                <div
                  key={i}
                  className="w-full min-h-45 border border-gray-200 shadow text-black rounded-lg px-2 py-5 "
                >
                  <div className="flex gap-3">
                    <img className="w-28 h-28 md:w-35 md:h-35 object-contain" src={item.img} alt="" />
                    <div className="flex flex-col">
                      <p className=" font-semibold text-lg">{item.desc}</p>
                      <div className="flex items-center mt-1">
                        {icons.map((_, i) => (
                          <MdStarRate key={i} className="text-blue-600 " />
                        ))}
                        <MdStarRate className="text-gray-300" />
                        <p className="text-sm font-semibold ms-2">5 Reviews</p>
                      </div>
                      <p className="font-semibold text-2xl mt-3 text-blue-500">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-3 rounded-lg px-6 md:px-8 lg:mt-17 py-8 border-blue-600 h-auto lg:h-170">
            <h2 className="text-black font-bold text-3xl md:text-5xl ">
              {" "}
              <span className="text-blue-500">SPECIAL</span> OFFER
            </h2>
            <div className="flex flex-col">
              <img className="h-64 md:h-100 object-contain" 
                src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-30-1-600x600.png"
                alt=""
              />
              <p className="text-2xl font-semibold  text-black">
                Turtle Beach VelocityONE Flightstick for XBX
              </p>
              <div className="flex items-center mt-1">
                {icons.map((_, i) => (
                  <MdStarRate key={i} className="text-blue-600 " />
                ))}
                <MdStarRate className="text-gray-300" />
                <p className="text-sm font-semibold ms-2 text-black">5 Reviews</p>
              </div>
                <div className="flex justify-between items-center mt-5">
              <p className="font-semibold text-2xl  text-blue-500">$250.55 - $515.34</p> 
              <button className="show-btn">Shop Now</button>

                </div>
            </div>
          </div>
           <div className="w-full py-10 lg:py-25">
            <h2 className="text-black font-bold text-3xl md:text-5xl ">
              {" "}
              <span className="text-blue-500">TOP</span> SELLING
            </h2>
            <div className="flex flex-col gap-5 py-5">
              {New.map((item, i) => (
                <div
                  key={i}
                  className="w-full min-h-45 border border-gray-200 shadow text-black rounded-lg px-2 py-5 "
                >
                  <div className="flex gap-3">
                    <img className="w-28 h-28 md:w-35 md:h-35 object-contain" src={item.img} alt="" />
                    <div className="flex flex-col">
                      <p className=" font-semibold text-lg">{item.desc}</p>
                      <div className="flex items-center mt-1">
                        {icons.map((_, i) => (
                          <MdStarRate key={i} className="text-blue-600 " />
                        ))}
                        <MdStarRate className="text-gray-300" />
                        <p className="text-sm font-semibold ms-2">5 Reviews</p>
                      </div>
                      <p className="font-semibold text-blue-500 text-2xl mt-3">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
       <Brands/>
    </div>
  );
};

export default Special;
