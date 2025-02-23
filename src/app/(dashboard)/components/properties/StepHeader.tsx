import { useAppSelector } from "@/store/hooks";

const steps = [
  { number: 1, title: "Property Details" },
  { number: 2, title: "Property Images" },
];

const StepHeader = () => {
  const { currentStep } = useAppSelector((state) => state.property);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center relative">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`relative flex-1 flex flex-col items-center  border-b-2 py-3 ${
              currentStep >= step.number
                ? "border-primary text-white"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {/* Step Number */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
                ${
                  currentStep >= step.number
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-white"
                }
              `}
            >
              {step.number}
            </div>

            {/* Step Title */}
            <span
              className={`text-sm font-medium mt-2 ${
                currentStep >= step.number ? "text-primary" : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepHeader;
