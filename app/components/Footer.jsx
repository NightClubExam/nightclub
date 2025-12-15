//Nanna
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaSnapchatGhost } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import FooterCard from "./FooterCard";
import { FaTwitter } from "react-icons/fa";
import { div } from "framer-motion/client";

const Footer = () => {
  return (
    <section
      className="bg-[url('/assets/bg/footerbg.jpg')] bg-cover
"
    >
      <div className="  bg-black/85 ">
        <div className="grid items-start gap-16 py-10 text-center md:grid-cols-3 max-w-[80%]  mx-auto ">
          <div className="flex flex-col items-center md:items-start justify-between h-full max-h-85">
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={160}
              height={200}
              className="object-contain pt-2"
            />

            <div className="text-center md:text-left">
              <h4>Location</h4>
              <p className="text-base!">Kompagnistræde 278 1265 København K</p>
            </div>

            <div className="text-center md:text-left">
              <h4>Opening Hours</h4>
              <p className="text-base!">WED - THU: 10:30 PM TO 3 AM</p>
              <p className="text-base!">SAT - SUN: 11 PM TO 5 AM</p>
            </div>
          </div>
          <div className="hidden md:flex md:gap-4 md:flex-col">
            <h4 className="text-left!">recent posts</h4>
            <FooterCard
              pic={
                <Image
                  src="/assets/content-img/recent_post1.jpg"
                  alt="post1"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              }
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting."
              }
              date={<div className="ml-4">"April 17, 2018"</div>}
            />
            <FooterCard
              pic={
                <Image
                  src="/assets/content-img/recent_post2.jpg"
                  alt="post2"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              }
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting."
              }
              date={<div className="ml-4">"April 17, 2018"</div>}
            />
          </div>
          <div className="hidden md:flex md:gap-4 md:flex-col">
            <h4 className="text-left!">recent tweets</h4>
            <FooterCard
              pic={<FaTwitter size={30} />}
              text={
                "It is a long established fact that a reader will be distracted by the readable... "
              }
              date={"3 hours ago"}
            />
            <FooterCard
              pic={<FaTwitter size={30} />}
              text={
                "It is a long established fact that a reader will be distracted by the readable... "
              }
              date={"3 hours ago"}
            />
          </div>

          <div className="flex flex-row justify-center gap-4 text-2xl mt-2 text-secondary">
            <div className="group border-2 border-secondary cursor-pointer p-2 hover:border-accent">
              <FaFacebookF className="text-secondary group-hover:text-accent" />
            </div>
            <div className="group border-2 border-secondary cursor-pointer p-2 hover:border-accent">
              <FaSnapchatGhost className="text-secondary group-hover:text-accent" />
            </div>
            <div className="group border-2 border-secondary cursor-pointer p-2 hover:border-accent">
              <FaInstagram className="text-secondary group-hover:text-accent" />
            </div>
          </div>

          <div className="md:flex md:whitespace-nowrap md:gap-2 md:col-start-1  md:row-start-2">
            <p className="text-base!">Night Club PSD Template</p>
            <p className="hidden md:block">-</p>
            <p className="text-base!">All Rights Reserved</p>
          </div>
          <p className="text-base! md:col-start-3 md:row-start-2">
            Copyright © NightClub
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
