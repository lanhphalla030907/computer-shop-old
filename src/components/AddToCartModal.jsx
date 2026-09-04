import { FaCheckCircle } from "react-icons/fa";

const AddToCartModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-text">
      <div className="bg-white rounded-xl px-8 py-6 flex flex-col items-center gap-3 animate-scaleIn">
        <FaCheckCircle className="text-green-500 text-5xl" />
        <h3 className="text-xl font-bold">Added to cart!</h3>
        <p className="text-gray-500 text-sm">Product added successfully</p>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-1 rounded-md bg-blue-600 text-white text-sm"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AddToCartModal;
