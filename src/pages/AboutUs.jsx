import {useState,useContext} from 'react'
import bg from '../assets/bg.jpg'
import image from '../assets/image3.png'
import image2 from '../assets/image2.jpg'
import { MdOutlineAddHomeWork,MdOutlineArrowRight  } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { LanguageContext } from "../context/LanguageContext";

const AboutUs = () => {
    const timelineData = [
  {
    title: "Razox founded with headquarters in UK.",
    desc: "We believe in giving each customer access to exceptional products that are expertly crafted to give only positive experiences.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    side: "right",
    year: "2016",
  },
  {
    title: "We have expert team member",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor sit feugiat dictum.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    side: "left",
    year: "2018",
  },
  {
    title: "Redefining what it means to be professional",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor sit feugiat dictum.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    side: "right",
    year: "2021",
  },
  {
    title: "The next chapter",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor sit feugiat dictum.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    side: "left",
    year: "2024",
  },
];
  const {language, text } = useContext(LanguageContext);

const team = [
  {
      img: image,
      name:"LANH PHALLA",
      skills:"WEB DEVELOPER"
  },
  {
      img: image2,
      name:"SOTHEA VATHANA",
      skills:"FRONT-END DEVELOPER"
  },
  
]
const [show,setshow]=useState(false); 
  return (
    <div className={language==="Cambodia" ? "p-text-1" : "p-text"}>
    <div className="w-full h-120 bg-bottom bg-cover bg-no-repeat  relative " style={{
        backgroundImage: `url(${bg})`,
      }}
>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white">
    <p className="max-w-xl font-bold text-xl md:text-2xl text-gray-200">
      WE ARE KEMIK
    </p>
    <h1 className="text-4xl md:text-8xl font-bold mb-16 md:mb-30">
      PLAY TO YOUR LEVEL
    </h1>
  </div>
</div>
      <div className='w-full py-12 md:py-20 px-4 sm:px-8 lg:px-15 '>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <div >
        <h2 className=' text-3xl md:text-5xl  font-bold p-text'> <span className='text-blue-500'>WHO </span>WE ARE</h2>
        <p className='mt-4 font-medium'>{text.shopHistoryDesc}</p>
        <p className='mt-4 font-medium'>{text.history}</p>
        <div className='flex items-center mt-2'>
        <button className='font-bold '>See all Products</button>
        <MdOutlineArrowRight className='text-xl text-blue-500 font-bold'/>
        </div>

            </div>
            <div className='bg-gray-100 px-8 md:px-20 rounded-2xl py-5 h-auto md:h-70'>
                <div className='h-20 md:h-30'>
                    <MdOutlineAddHomeWork className='text-6xl'/>
                </div>
                <div className='leading-0'>
                <p className=' text-6xl md:text-8xl text-blue-600 font-bold'>15+</p>
                <p className='font-bold'>worldwide stories</p>
                </div>
            </div>
            <div className='bg-gray-100 px-8 md:px-20 rounded-2xl py-5 h-auto md:h-70'>
                <div className='h-20 md:h-30'>
                    <IoGameController className='text-6xl'/>
                </div>
                <div className='leading-0'>
                <p className=' text-6xl md:text-8xl text-blue-600 font-bold'>2K+</p>
                <p className='font-bold'>gaming products</p>
                </div>
            </div>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 ">
      <div className="text-center mb-12 md:mb-20">
        <p className="text-blue-500 font-bold text-3xl md:text-5xl">
          MAKING <span className="text-black">HISTORY</span>
        </p>
        <h2 className=" font-bold text-3xl md:text-5xl">TOGETHER</h2>
        <p className="max-w-2xl mx-auto font-semibold text-gray-500 mt-2">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor sit
          feugiat dictum.
        </p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-blue-500"></div>

        <div className="space-y-16 md:space-y-24">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 md:gap-0 md:items-center w-full ${
                item.side === "left"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
              }`}
            >
              <div className="w-full md:w-1/2 px-0 md:px-10">
                <div className="mb-4">
                  <h3 className="font-bold text-2xl md:text-3xl">{item.title}</h3>
                  <p className="text-gray-500 text-base md:text-lg font-semibold mt-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-row md:flex-col items-center gap-2 md:gap-0">
                <span className="text-blue-500 font-bold md:mb-2 md:rotate-90">
                  {item.year}
                </span>
                <div className="w-3 h-3 bg-blue-500 rounded-full z-10"></div>
              </div>

              <div className="w-full md:w-1/2 px-0 md:px-10">
                <img
                  src={item.image}
                  alt=""
                  className="rounded-lg grayscale object-cover w-full h-56"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
   <div className="w-full bg-gray-100 py-12 md:py-15 px-4 sm:px-8 lg:px-15">
  <h2 className="text-3xl md:text-4xl font-bold text-center">
    <span className="text-blue-500">OUR</span> TEAM
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-5">
    {team.map((i, index) => (
      <div
        key={index}
        className="relative group rounded-xl bg-cover bg-center w-full h-80 md:h-120 overflow-hidden"
        style={{ backgroundImage: `url(${i.img})` }}
      >
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-10">
          <p className="text-white font-bold text-2xl">{i.name}</p>
          <p className="text-white font-bold text-sm">{i.skills}</p>

          <div className="flex gap-4 mt-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
            <a href="#" className="text-white hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-blue-600">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>

  )
}

export default AboutUs