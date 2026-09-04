import { useState, useEffect } from "react";
import { TbTruckDelivery, TbCertificate } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { MdOutlineEqualizer } from "react-icons/md";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const Home = () => {
  const images = [
    "http://www.godofpcgame.com/uploads/categories/banner/1nkJmO24dJ4prpMBqDfDiEbVvhTZSQiC7tMVER7x.webp",
    "https://i.pinimg.com/1200x/7b/03/b8/7b03b8beb67ba762b1b5f69d04c1e658.jpg",
    "https://i.pinimg.com/1200x/8b/55/a8/8b55a800ebb32f334c64545aab233a41.jpg",
    "https://i.pinimg.com/1200x/b7/f5/15/b7f5156672a6e3cf0653e11723a544c1.jpg",
    "https://i.pinimg.com/1200x/45/91/a9/4591a9ff42d5bb5bc2d13605434d45ec.jpg",
  ];
  const {language, text } = useContext(LanguageContext);

  const services = [
  {
    icon: <TbTruckDelivery />,
    title: text.fastDelivery,
    desc: text.fastDeliveryDesc,
  },
  {
    icon: <TbCertificate />,
    title: text.certifiedProduct,
    desc: text.certifiedProductDesc,
  },
  {
    icon: <RiCustomerService2Line />,
    title: text.support,
    desc: text.supportDesc,
  },
  {
    icon: <TbTruckDelivery />,
    title: text.freeShipping,
    desc: text.freeShippingDesc,
  },
  {
    icon: <MdOutlineEqualizer />,
    title: text.quality,
    desc: text.qualityDesc,
  },
];


  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={language==="Cambodia" ? "p-text-1" : "p-text"}>

    <div className="mt-5 w-full px-4 lg:px-5">
      
      <div className="flex flex-col lg:flex-row gap-4">
        
        <div className="w-full lg:w-[65%] h-[50vh] lg:h-[60vh] overflow-hidden rounded-2xl relative">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-full flex-shrink-0"
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[35%] gap-4">
          <div className="h-[25vh] lg:h-[29vh] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://dlcdnwebimgs.asus.com/gain/52CE4B92-E837-4EE1-9245-4BA97955E3F8/fwebp/fwebp"
              alt=""
            />
          </div>

          <div className="h-[25vh] lg:h-[29vh] rounded-2xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://i.pinimg.com/736x/ee/39/07/ee3907eba72d41cd3e7388e894437b5b.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="mt-5 ">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-12 p-4 rounded-2xl bg-gray-100">
          {services.map((item, index) => (
            <div key={index} className="flex items-center gap-3 min-w-50 ">
              <div className="text-3xl text-blue-600">{item.icon}</div>
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
        </div>
    </div>
  );
};

export default Home;
