import Image from "next/image";

const WelcomeCard = ({ title, icon, pic }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 gap-8 w-full md:px-0 px-[10%]">
        <div className="relative w-full">
          {pic}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 border-2 border-y-[#FF2A70] border-x-0">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-[#FF2A70] border-r-50 border-r-transparent"></div>
            <div
              className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-[#FF2A70]
      border-l-50 border-l-transparent"
            ></div>

            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-[#FF2A70] rounded-[7px] flex items-center justify-center w-max">
                {icon}
              </div>
              <h4 className="text-secondary!">{title}</h4>
              <p className="text-sm! px-10 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus voluptate totam perferendis commodi consectetur quidem
                similique aspernatur earum eligendi cumque.totam perferendis
                commodi consectetur quidem similique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
