import { MailIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";
import Button from "../ui-custom/Button";

const ContactContent = () => {
  return (
    <section className="py-[30px] lg:py-[60px]">
      <div className="container mx-auto px-3">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
          <div className="lg:col-span-2 col-span-1">
            {/* form */}
            <div className="p-[30px] shadow-custom bg-white">
              <div className="mb-[30px]">
                <h2 className="font-semibold relative text-[#586167] text-[24px] lg:text-[30px] capitalize leading-[1.1] tracking-[0.001em] mb-3 before:content-[''] before:w-[30px] before:h-[2px] before:-bottom-2 before:absolute before:bg-primary">
                  Let&apos;s Get In Touch
                </h2>
              </div>
              <form className="grid lg:grid-cols-2 grid-cols-1">
                <div className="w-full col-span-1 lg:col-span-2 mb-[30px]">
                  <div className="flex items-stretch w-full relative">
                    <div className="flex items-center px-3 py-[.375rem] text-[#212529] rounded-sm ">
                      <UserIcon size={16} />
                    </div>
                    <input
                      type="text"
                      className="border-b flex-1 text-[#586167] text-sm px-3 py-[.375rem] rounded-sm outline-none"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                </div>
                <div className="w-full col-span-1 mb-[30px]">
                  <div className="flex items-stretch w-full relative">
                    <div className="flex items-center px-3 py-[.375rem] text-[#212529] rounded-sm ">
                      <PhoneIcon size={16} />
                    </div>
                    <input
                      type="tel"
                      className="border-b flex-1 text-[#586167] text-sm px-3 py-[.375rem] rounded-sm outline-none"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>
                <div className="w-full col-span-1 mb-[30px]">
                  <div className="flex items-stretch w-full relative">
                    <div className="flex items-center px-3 py-[.375rem] text-[#212529] rounded-sm ">
                      <MailIcon size={16} />
                    </div>
                    <input
                      type="email"
                      className="border-b flex-1 text-[#586167] text-sm px-3 py-[.375rem] rounded-sm outline-none"
                      placeholder="Email address"
                      required
                    />
                  </div>
                </div>
                <div className="w-full col-span-1 lg:col-span-2 mb-[30px]">
                  <div className="flex items-stretch w-full relative">
                    <textarea
                      className="border-b resize-none flex-1 text-[#586167] text-sm px-3 py-[.375rem] rounded-sm outline-none"
                      placeholder="Write here something..."
                      required
                      rows={5}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    size="lg"
                    type="submit"
                    className="rounded-full font-semibold text-sm"
                  >
                    Send Your Message
                  </Button>
                </div>
              </form>
            </div>

            {/* map */}
            <div className="p-[30px] shadow-custom bg-white mt-[45px]">
              <div className="lg:h-[250px] h-[200px] w-full">
                <div className="h-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d557.8187122340947!2d6.993123192947521!3d4.824900415175618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1719912936935!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid gap-6">
              <div className="w-full">
                <div className="shadow-custom text-center p-[30px]">
                  <MapPinIcon size={30} className="text-primary mx-auto" />
                  <h4 className="mb-5 mt-[10px] font-semibold text-[17.2px] tracking-[0.03em] leading-[1.2]">
                    Where?
                  </h4>
                  <p>
                    67 Tombia Ext., GRA Phase II, Port Harcourt, Rivers State,
                    Nigeria
                  </p>
                </div>
              </div>
              <div className="w-full">
                <div className="shadow-custom text-center p-[30px]">
                  <PhoneIcon size={30} className="text-primary mx-auto" />
                  <h4 className="mb-5 mt-[10px] font-semibold text-[17.2px] tracking-[0.03em] leading-[1.2]">
                    Call?
                  </h4>
                  <p>+234 812 696 5999</p>
                </div>
              </div>
              <div className="w-full">
                <div className="shadow-custom text-center p-[30px]">
                  <MailIcon size={30} className="text-primary mx-auto" />
                  <h4 className="mb-5 mt-[10px] font-semibold text-[17.2px] tracking-[0.03em] leading-[1.2]">
                    Inbox?
                  </h4>
                  <p>info@gphrealty.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactContent;
