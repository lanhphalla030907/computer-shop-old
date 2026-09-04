import {
  Phone,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1f1f1f] text-gray-400 relative p-text mt-30">
      <div className="border-b border-gray-700">
        <div className=" px-15 py-10 flex flex-col lg:flex-row items-center gap-6">
          <div className="flex items-center gap-4 text-white flex-1">
            <Phone className="text-blue-500 " size={50} />
            <div>
              <p className="text-lg text-gray-400">Order And Service</p>
              <p className="text-4xl font-bold text-blue-500">
                (+885) 962657233
              </p>
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-white text-xl font-semibold">
              Subscribe to our mailing list
            </h3>
            <p className="text-md">
              Sign up for special perks starting now with a 10% Off Coupon!
            </p>
          </div>

          <div className="flex-1 w-full">
            <div className="flex bg-white rounded overflow-hidden">
              <input
                type="email"
                placeholder="Enter email address..."
                className="flex-1 px-4 py-3 text-black outline-none"
              />
              <button className="bg-white px-6 text-black font-semibold flex items-center gap-1 hover:text-blue-500 transition">
                Subscribe <span className="text-blue-500">▶</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div>
          <h4 className="text-white font-bold text-xl mb-4">Customer</h4>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>My Account</li>
            <li>Track My Order</li>
            <li>Return Policy</li>
            <li>Gift Cards</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xl mb-4">About Us</h4>
          <ul className="space-y-2">
            <li>Company Info</li>
            <li>Press Releases</li>
            <li>Careers</li>
            <li>Reviews</li>
            <li>Investor Relations</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xl mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>Search</li>
            <li>Become a Reseller</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xl mb-4">My Account</h4>
          <ul className="space-y-2">
            <li>Store Location</li>
            <li>Order History</li>
            <li>Wish List</li>
            <li>Newsletter</li>
            <li>Specials</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xl mb-4">
            2972 Westheimer Rd.
          </h4>
          <p>Santa Ana, Illinois 85486</p>
          <button className="text-blue-500 mt-3 flex items-center gap-1">
            Send Message ▶
          </button>
          <p className="mt-3 text-sm">Mon - Fri: 9am - 5pm</p>

          <div className="flex gap-3 mt-4">
            <SocialIcon icon={<Facebook size={18} />} />
            <SocialIcon icon={<Instagram size={18} />} />
            <SocialIcon icon={<Youtube size={18} />} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-md font-bold">
            Copyright © 2024 <span className="text-white">Razox</span>. All
            rights reserved
          </p>

          <div className="flex gap-3">
            <img src="https://demo2.pavothemes.com/razox/wp-content/uploads/2024/03/pay.png" alt="mc" className="h-6" />
           
          </div>
        </div>
      </div>

     
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center bg-[#2a2a2a] rounded hover:bg-red-500 text-white transition cursor-pointer">
      {icon}
    </div>
  );
}
