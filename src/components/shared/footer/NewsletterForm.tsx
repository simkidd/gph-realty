"use client";
import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const NewsletterForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex items-stretch w-full ">
        <input
          type="text"
          placeholder="Email address"
          className="bg-[#202020] text-white rounded-tl-[23px] rounded-bl-[23px] py-[10px] px-[30px] w-full placeholder:text-neutral-500 outline-none"
        />
        <span className="">
          <button className="bg-primary text-white h-full rounded-tr-[23px] rounded-br-[23px] flex items-center p-[10px] pr-[15px] cursor-pointer">
            <RiSendPlaneFill />
          </button>
        </span>
      </div>
    </form>
  );
};

export default NewsletterForm;
