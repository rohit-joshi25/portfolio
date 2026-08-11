import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full pt-20" id="contact">
      {/* background grid */}
      <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Looking for a <span className="text-purple">Backend Engineer</span>{" "}
          for your next product?
        </h1>

        <p className="text-white-200 md:mt-10 my-5 text-center">
          Open to Laravel / PHP backend roles and freelance work. Let&apos;s talk
          about APIs, databases, and shipping reliable systems.
        </p>

        <a href="mailto:rohitjoshi2899@gmail.com">
          <MagicButton
            title="Email me"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="mt-16 flex flex-col items-center gap-6">
        {/* Copyright */}
        <p className="text-sm text-white-200 font-light text-center md:text-left">
          © {currentYear} Rohit Joshi. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-5">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex justify-center items-center rounded-lg border border-white/10 bg-black/40 hover:bg-black/60 hover:scale-110 transition"
            >
              <img src={info.img} alt="social icon" width={18} height={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
