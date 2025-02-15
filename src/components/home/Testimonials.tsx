import Reviews from "./Reviews";

const Testimonials = () => {
  return (
    <section className="relative bg-review-bg bg-no-repeat bg-cover bg-center py-[90px]">
      <div className="bg-black/70 w-full h-full absolute top-0 left-0"></div>
      <div className="container mx-auto px-3 relative">
        <div className="text-center pb-[53px]">
          <div className="pb-3">
            <h6 className="font-medium text-[13px] uppercase text-primary ">
              Our
            </h6>
          </div>
          <div className="text-center flex flex-col items-center group">
            <h2 className="leading-[1.3] text-[30px] text-white font-bold">
              Happy clients
            </h2>
            <hr className="w-[80px] h-[2px] text-white group-hover:w-[150px] transition-all duration-500 my-5" />
          </div>
        </div>
        <div>
          <Reviews />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
