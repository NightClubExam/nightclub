const PrimaryButton = ({title}) => {
    return (
      <button className=" py-2 px-10 bg-black text-white text-lg border-t border-b border-white hover:bg-white hover:text-black transition-all duration-300 uppercase">
        {title}
      </button>
    );
}
 
export default PrimaryButton;