import React, { useEffect, useState } from "react";
import controller from "../assets/controller.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { FaRegHeart } from "react-icons/fa6";
import { MdStarRate } from "react-icons/md";

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 146);

const Discount = () => {
  const icons = Array(4).fill(0);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) return clearInterval(timer);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const Products = [
    {
      name: "Gaming Controller",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-3-1.png",
      title: "Turtle Beach Recon Wired Gaming Controller",
      price: "$527.77",
      dis: "$620.27",
    },
    {
      name: "Gaming Controller",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-17-1-600x600.png",
      title: "Microsoft Xbox Elite Wireless Controller",
      price: "$546.70",
      dis: "$600.27",
    },
    {
      name: "Moniters",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-18-1-600x600.png",
      title: "Juggernaut 32″ Full HD Curved 165Hz Gaming Monitor",
      price: "$720.77",
      dis: "$770.27",
    },
    {
      name: "Gaming Keybord",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-2-1-600x600.png",
      title: "Logitech K780 Multi-Device Wireless Keyboard",
      price: "$770.77",
      dis: "$920.27",
    },
    {
      name: "Case Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-29-1-600x600.png",
      title: "Antec NX200M RGB mATX Mini Tower Gaming Case",
      price: "$150.00",
      dis: "$178.50",
    },
    {
      name: "Heading Gaming",
      img: "https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/product-5-1.png",
      title: "Corsair Void Elite RGB Wireless Gaming Headset",
      price: "$788.77",
      dis: "$920.27",
    },
    {
      name: "Gaming Controller",
      img: "https://dlcdnwebimgs.asus.com/gain/12E6940F-3E6E-4229-88FE-847783CA0A6B/w717/h525/fwebp",
      title: "ROG Raikiri II Xbox Wireless Controller",
      price: "$590.77",
      dis: "$620.27",
    },
    {
      name: "Gaming Controller",
      img: "https://dlcdnwebimgs.asus.com/gain/1CC19A05-CA1A-4EF7-A1A4-C15F6A63ED7F/w717/h525/fwebp",
      title: "ROG Tessen Mobile Gaming Controller",
      price: "$527.77",
      dis: "$620.27",
    },
    {
      name: "Gaming Computer",
      img: "https://dlcdnwebimgs.asus.com/gain/87C641FC-4E5F-4073-B739-1C41E2783B96/w260/fwebp",
      title: "ROG-STRIX Zephyrus G14 GA401 (2026)",
      price: "$2727.77",
      dis: "$300.27",
    },
    {
      name: "Gaming Microphone",
      img: "https://dlcdnwebimgs.asus.com/gain/374AA038-9A8A-4D92-AD8D-ECBA7E5B6F03/w717/h525/fwebp",
      title: "ROG Carnyx Gaming Microphone",
      price: "$420.77",
      dis: "$620.27",
    },
  ];
  const visibleCards = 4;
  const cardWidth = 348; // width + gap
  const maxIndex = Products.length - visibleCards;

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    
    <div className="bg-[#0b1020] py-10 text-white p-text mt-60 relative">
      <div className=" absolute left-[55%] top-[-7%] z-0  pointer-events-none ">
        <img className="w-160" src={controller} alt="" />
      </div>
      <div className="relative flex items-center px-16 py-20 overflow-hidden">
        <div className="z-10 max-w-xl">
          <h2 className="text-blue-500 font-bold text-5xl mb-2">
            GET SPECIAL PRICE
          </h2>

          <h1 className="text-5xl font-extrabold ">UP TO 50% OFF</h1>

          <p className="text-white mb-8 uppercase tracking-wide font-bold text-lg">
            Trusted by pros. Made for winners.
          </p>
          <p className="text-white uppercase tracking-wide  text-md">
            This time running out
          </p>

          <div className="flex gap-3">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINS", value: timeLeft.mins },
              { label: "SECS", value: timeLeft.secs },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-blue-700 w-20 py-4 rounded-lg text-center"
              >
                <p className="text-4xl font-bold">{item.value ?? "00"}</p>
                <span className="text-md font-bold ">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full px-14 relative z-20">
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-7 transition-transform duration-500"
            style={{
              transform: `translateX(-${index * cardWidth}px)`,
            }}
          >
            {Products.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl px-7 py-5 w-80 flex-shrink-0"
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
        </div>

        <div className="mt-8 flex items-center gap-6">
          <div className="flex-1 h-0.5 bg-white/20 rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{
                width: `${((index + 1) / (maxIndex + 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 flex items-center justify-center rounded border border-white/30 text-white hover:bg-white/10 disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={next}
              disabled={index === maxIndex}
              className="w-10 h-10 flex items-center justify-center rounded border border-white/30 text-white hover:bg-white/10 disabled:opacity-40"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      
      </div>
    </div>
  
  );
};

export default Discount;
