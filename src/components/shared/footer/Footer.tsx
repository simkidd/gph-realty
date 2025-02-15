import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import NewsletterForm from "./NewsletterForm";

interface IContactList {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const contactLists: IContactList[] = [
  {
    name: "Phone",
    href: "tel:+234 812 696 5999",
    icon: <FaPhone size={16} />,
  },
  {
    name: "Email",
    href: "mailto:info@mantabaylimited.com",
    icon: <FaEnvelope size={16} />,
  },
  {
    name: "Address",
    href: "https://www.google.com/maps/@4.8247647,6.9933742,20.13z?entry=ttu&g_ep=EgoyMDI1MDIwNS4xIKXMDSoASAFQAw%3D%3D",
    icon: <FaLocationDot size={16} />,
  },
];

const socialLinks = {
  instagram_url: "https://www.instagram.com/yourinstagram",
  x_url: "https://twitter.com/yourtwitter",
  facebook_url: "https://www.facebook.com/yourfacebook",
  linkedin_url: "https://www.linked.com/yourlinkedin",
};

const socialIcons: { [key: string]: React.JSX.Element } = {
  instagram_url: <PiInstagramLogoFill size={16} />,
  x_url: <FaXTwitter size={16} />,
  facebook_url: <FaFacebook size={16} />,
  linked_url: <FaLinkedinIn size={16} />,
};

const Footer = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer>
      <div className="bg-footer-bg bg-cover bg-no-repeat bg-center py-[90px]">
        <div className="container mx-auto px-3">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#202020] p-[30px]">
                <div className="w-fit mb-4 mt-2">
                  <Link href="/" className="text-2xl font-bold text-white">
                    <div className="w-[150px] ">
                      <Image
                        src="/images/logos/gph-logo-full.png"
                        alt="logo"
                        width={300}
                        height={200}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>

                <p className="font-medium mt-[8px] mb-[30px] text-white text-sm leading-normal">
                  Connecting people with the best real estate deals, ensuring
                  trust and transparency.
                </p>

                <h6 className="uppercase font-bold mb-[15px] text-white/85 text-base leading-[1.2]">
                  Contact Us
                </h6>

                <ul className="gap-2 flex items-center">
                  {contactLists.map(({}, i) => (
                    <li key={i}>
                      <a
                        href={contactLists[i].href}
                        className="w-10 h-10 rounded-full text-white border border-transparent  hover:border-white transition-all duration-500 ease-in-out flex items-center justify-center bg-[#151515]"
                        title={contactLists[i].name}
                        target="_blank"
                      >
                        {contactLists[i].icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid lg:grid-cols-5 lg:gap-8 gap-4 lg:pl-10">
                <div>
                  <div className="lg:pb-[30px]">
                    <h5 className="uppercase font-semibold text-white text-[17.52px] leading-6">
                      Useful links
                    </h5>
                    <ul className="lg:mt-[30px] mt-4 lg:space-y-4 space-y-2">
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          About Us
                        </Link>
                      </li>
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          New Arrivals
                        </Link>
                      </li>
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          Faq
                        </Link>
                      </li>
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="lg:pb-[30px]">
                    <h5 className="uppercase font-semibold text-white text-[17.52px] leading-6">
                      Features
                    </h5>
                    <ul className="lg:mt-[30px] mt-4 lg:space-y-4 space-y-2">
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          Services
                        </Link>
                      </li>
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li className="block text-sm">
                        <Link
                          href=""
                          className="text-[#d2d2d2] hover:text-white transition duration-500"
                        >
                          Favourites
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="lg:pb-[30px]">
                    <h5 className="uppercase font-semibold text-white text-[17.52px] leading-6">
                      Social
                    </h5>
                    <ul className="lg:mt-[30px] mt-4 flex items-center gap-2">
                      {socialLinks &&
                        Object.entries(socialLinks).map(([key, url]) => {
                          if (socialIcons[key] && url) {
                            return (
                              <li key={key}>
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-10 h-10 rounded-full text-white border border-transparent  hover:border-white transition-all duration-500 ease-in-out flex items-center justify-center bg-[#151515]"
                                >
                                  {socialIcons[key]}
                                </a>
                              </li>
                            );
                          }
                          return null;
                        })}
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="pb-[30px]">
                    <h5 className="uppercase font-semibold text-white text-[17.52px] leading-6">
                      Subscribe
                    </h5>

                    <div className="lg:mt-[30px] mt-4">
                      <p className="text-sm text-[#d2d2d2] leading-6">
                        Get exclusive property updates and market insights
                        straight to your inbox.
                      </p>

                      <div className="mt-5 lg:mt-[45px] ">
                        <NewsletterForm />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#202020] py-3">
        <div className="container mx-auto px-3">
          <div className="grid lg:grid-cols-2 gap-2 items-center justify-center">
            <div>
              <p className="text-[#d2d2d2] text-sm text-center md:text-left">
                &copy; {getYear()} All Right Reserved GPH Realty
              </p>
            </div>
            <div className="">
              <ul className="flex items-center gap-5 lg:justify-end">
                <li className="text-sm">
                  <Link href="/" className="text-[#d2d2d2] hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="text-sm">
                  <Link href="#" className="text-[#d2d2d2] hover:text-white">
                    Terms
                  </Link>
                </li>
                <li className="text-sm">
                  <Link href="#" className="text-[#d2d2d2] hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li className="text-sm">
                  <Link
                    href="/contact-us"
                    className="text-[#d2d2d2] hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
