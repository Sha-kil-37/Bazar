import React from "react";
import bikshLogo from "../images/biksh.png";
import nogodLogo from "../images/nogod.png";
import FacebookIcon from "../icons/facebook.png";
import LinkedinIcon from "../icons/linkedin.png";
import GithubIcon from "../icons/github.png";

//
const Footer = () => {
  //
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-3 text-center">
      <div>
        <h3 className="text-primaryColor text-lg font-semibold font-primaryFont">
          Customer Care
        </h3>
        <ul>
          {[
            "Help center",
            "How to Buy",
            "Contact Us",
            "Terms & Conditions",
            "System",
          ].map((item, i) => {
            return (
              <li
                key={i}
                className="font-primaryFont font-medium transition duration-200 hover:text-primaryColor cursor-pointer text-black"
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-primaryColor text-lg font-semibold">About us</h3>
        <ul>
          {["Digital payment", "My Bazar card", "My Bazar exclosive"].map(
            (item, i) => {
              return (
                <li
                  key={i}
                  className="font-medium transition duration-200 hover:text-primaryColor cursor-pointer text-black"
                >
                  {item}
                </li>
              );
            }
          )}
        </ul>
      </div>

      <div>
        <h3 className="text-primaryColor text-lg font-semibold font-primaryFont">
          Follow us
        </h3>
        <ul className="flex gap-x-2 mt-[6px] justify-center">
          <li>
            <a
              className="h-6 w-6 rounded-full overflow-hidden inline-block cursor-pointer"
              href="https://www.facebook.com/shak.sakil.96"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-full w-full"
                src={FacebookIcon}
                alt="facebook"
              />
            </a>
          </li>
          <li>
            <a
              className="h-6 w-6 rounded-full overflow-hidden inline-block cursor-pointer"
              href="https://www.linkedin.com/in/shakil-ahmed-aba241317/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-full w-full"
                src={LinkedinIcon}
                alt="linkedin"
              />
            </a>
          </li>
          <li>
            <a
              className="h-6 w-6 rounded-full overflow-hidden inline-block cursor-pointer"
              href="https://github.com/shakil-37"
              target="_blank"
              rel="noreferrer"
            >
              <img className="h-full w-full" src={GithubIcon} alt="linkedin" />
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-primaryColor text-lg font-semibold font-primaryFont">
          Pyment method
        </h3>
        <div className="sm:flex md:flex lg:flex xl:flex 2xl:flex">
          <div className="overflow-hidden">
            <img src={bikshLogo} alt="biksh" />
          </div>
          <div className="overflow-hidden">
            <img src={nogodLogo} alt="biksh" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
