//Alberte Remmer

const PrimaryButton = ({ type = "button", disabled, children }) => (
  <button
    type={type}
    disabled={disabled}
    className={`py-2 px-10 bg-black text-white text-lg border-t border-b cursor-pointer border-white hover:bg-white hover:text-black transition-all duration-300 uppercase ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
  >
    {children}
  </button>
);

export default PrimaryButton;
