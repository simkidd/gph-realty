import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const AboutContent = () => {
  return (
    <section className="py-[90px]">
      <div className="container mx-auto px-3">
        <div className="flex flex-wrap">
          <div className="">
            <div className="text-center">
              <div className="group text-center flex flex-col items-center">
                <h2 className="pt-[15px] leading-[1.3] text-[30px] font-bold text-[#1c2d3a]">
                  About Us
                </h2>
                <hr className="w-[80px] h-[2px] bg-primary group-hover:w-[150px] transition-all duration-500 my-5" />
              </div>

              <p className="mb-[50px] text-[#3b4249] text-[15.52]">
                Residences can be classified into different type of housing
                tenure can used for same physical type.
              </p>
            </div>

            <div className="w-full">
              <div className="flex flex-col-reverse lg:grid grid-cols-12 gap-6">
                <div className="lg:col-span-5 col-span-12">
                  <div className="mb-[36px]">
                    <h3 className="text-primary font-semibold mb-[10px] text-2xl leading-[1.2] tracking-[0.03em]">
                      We are the <br />
                      expert of communication
                    </h3>
                    <p className="leading-[1.8] tracking-[.5px] text-[15px] text-[#647589]">
                      Decoration is the furnishing of a space with decorative
                      elements, sometimes complemented by advice and practical
                      assistance. sometimes complemented by advice and practical
                      assistance.
                    </p>
                  </div>

                  <div className="shadow-custom p-[30px]">
                    <ul className="flex">
                      <li className="text-sm inline-block">
                        <h4 className="text-primary font-semibold leading-[1.2] tracking-[.03em] capitalize text-[22px]">
                          15,801
                        </h4>
                        <p className="text-[#647589] text-[15px] leading-[1.2]">
                          Total property
                        </p>
                      </li>
                      <li className="text-sm inline-block pl-8">
                        <h4 className="text-primary font-semibold leading-[1.2] tracking-[.03em] capitalize text-[22px]">
                          3871
                        </h4>
                        <p className="text-[#647589] text-[15px] leading-[1.2]">
                          Agency
                        </p>
                      </li>
                      <li className="text-sm inline-block pl-8">
                        <h4 className="text-primary font-semibold leading-[1.2] tracking-[.03em] capitalize text-[22px]">
                          4791+
                        </h4>
                        <p className="text-[#647589] text-[15px] leading-[1.2]">
                          Sold out property
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-12 bg-map-image bg-contain bg-center bg-no-repeat block bg-blend-overlay bg-white/90 relative before:content-[''] before:block before:pt-[36%]">
                  {/* <Image
                    src="../assets/images/about/map.png"
                    className="Image-fluid bg-Image"
                    alt=""
                  /> */}
                  <div className="marker-icons">
                    <ul>
                      <li>
                        <HiLocationMarker
                          size={40}
                          className="text-primary absolute top-[25%] right-[20%] "
                        />
                      </li>
                      <li>
                        <HiLocationMarker
                          size={40}
                          className="text-primary absolute top-[18%] left-[20%] "
                        />
                      </li>
                      <li>
                        <HiLocationMarker
                          size={40}
                          className="text-primary absolute bottom-[39%] left-[47%] animate-bounce"
                        />
                      </li>
                      <li>
                        <HiLocationMarker
                          size={40}
                          className="text-primary absolute top-[30%] right-[30%]"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
