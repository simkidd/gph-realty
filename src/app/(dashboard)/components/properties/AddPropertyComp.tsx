"use client";

import React from "react";
import StepHeader from "./StepHeader";
import PropertyDetailsForm from "./PropertyDetailsForm";
import { PropertyImageUploadForm } from "./PropertyImageUploadForm";
import { useAppSelector } from "@/store/hooks";

const AddPropertyComp = () => {
  const { currentStep } = useAppSelector((state) => state.property);

  return (
    <div className="w-full max-w-[800px] mx-auto">
      <StepHeader />

      {/* Step 1: Create Property */}
      {currentStep === 1 && <PropertyDetailsForm />}

      {/* Step 2: Upload Images */}
      {currentStep === 2 && <PropertyImageUploadForm />}
    </div>
  );
};

export default AddPropertyComp;
