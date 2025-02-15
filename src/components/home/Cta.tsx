import React from "react";
import Button from "../ui/Button";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="relative bg-gray-100 py-16 px-6 lg:px-16">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/real-estate-bg.jpg')" }}
      ></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find Your Perfect Home with{" "}
          <span className="text-primary">GPH Realty</span>
        </h2>
        <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
          Browse our latest listings or schedule a consultation with our expert
          agents. We’ll help you find a home that suits your needs.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <Link href="/listing">
            <Button className="px-6 ">
              View Listings
            </Button>
          </Link>
          <Link href="/contact">
            <Button className="px-6  ">
              Contact an Agent
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;
