import Image from "next/image";

const FooterCard = ({ pic, date, text }) => {
  return (
    <div className="grid grid-cols-[auto_1fr] w-full h-40 gap-4">
      <div
        className="flex items-start justify-center
 text-accent! "
      >
        {pic}
      </div>

      <div className="text-left ">
        <div className="text-base!">{text}</div>
        <div className="text-accent! text-sm!">{date}</div>
      </div>
    </div>
  );
};

export default FooterCard;
