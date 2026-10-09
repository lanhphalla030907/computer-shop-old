import { useState, useContext } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

const ContactPage = () => {
  const { language, text } = useContext(LanguageContext);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email and message.");
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const cards = [
    {
      icon: <FaMapMarkerAlt />,
      title: text.contactAddress,
      lines: ["2972 Westheimer Rd.", "Santa Ana, Illinois 85486"],
    },
    {
      icon: <FaPhoneAlt />,
      title: text.contactPhone,
      lines: ["(+885) 962657233", "Mon - Fri: 9am - 5pm"],
    },
    {
      icon: <FaEnvelope />,
      title: text.contactEmail,
      lines: ["support@kemik.com", "info@kemik.com"],
    },
  ];

  return (
    <div className={language === "Cambodia" ? "p-text-1" : "p-text"}>
      {/* Hero */}
      <div className="w-full bg-blue-700 text-white py-16 md:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">{text.contactTitle}</h1>
          <p className="mt-4 text-blue-100 text-base md:text-lg max-w-2xl mx-auto">
            {text.contactSubtitle}
          </p>
        </div>
      </div>

      {/* Info cards */}
      <div className="max-w-6xl mx-auto px-5 -mt-10 md:-mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 text-2xl flex items-center justify-center mb-4">
              {card.icon}
            </div>
            <h3 className="font-bold text-lg text-gray-800">{card.title}</h3>
            {card.lines.map((line, j) => (
              <p key={j} className="text-gray-500 text-sm mt-1">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Form + Map */}
      <div className="max-w-6xl mx-auto px-5 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {text.contactFormTitle}
          </h2>
          <p className="text-gray-500 mb-6">{text.contactFormDesc}</p>

          {sent && (
            <div className="mb-5 bg-green-50 text-green-700 border border-green-200 rounded-lg px-4 py-3 text-sm">
              {text.contactSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={text.contactName}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={text.contactEmailPlaceholder}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={text.contactSubject}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder={text.contactMessage}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              {text.contactSend}
            </button>
          </form>

          <div className="flex items-center gap-3 mt-8">
            <span className="text-gray-500 text-sm">{text.contactFollow}</span>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 min-h-[300px] shadow-sm">
          <iframe
            title="KEMIK location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-1.7%2C52.3%2C0.2%2C52.7&layer=mapnik"
            className="w-full h-full min-h-[300px] lg:min-h-[520px] border-0"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
