import Link from "next/link";

const ContactHeader = () => {
  return (
    <section className="bg-heading-bg bg-cover bg-no-repeat w-full h-auto relative">
      <div className="container mx-auto px-3">
        <div className="lg:h-[500px] h-[270px] lg:pt-[89px] pt-[56px] flex items-center">
          <div>
            <h2 className="text-white leading-[1.2] lg:text-[32px] text-[28px] font-bold mb-2">
              Contact Us
            </h2>
            {/* breadcrumb */}
            <nav>
              <ol className="flex items-center flex-wrap ml-5">
                <li className="leading-[1.4] font-medium capitalize text-[15.52px] ">
                  <Link href="/" className="text-white/80 hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="leading-[1.4] font-medium capitalize text-[15.52px] text-gray-400 before:content-['/'] before:text-white/80 before:pr-2 pl-2">
                  Contact Us
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
