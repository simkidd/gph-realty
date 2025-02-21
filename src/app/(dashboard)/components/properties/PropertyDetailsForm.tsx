import Button from "@/components/ui-custom/Button";
import { ChipInput } from "@/components/ui-custom/ChipInput";
import { Input } from "@/components/ui-custom/Input";
import { Textarea } from "@/components/ui-custom/Textarea";
import { createProperty } from "@/lib/api/properties";
import { nextStep } from "@/store/features/property/propertySlice";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  BedIcon,
  BuildingIcon,
  KeyboardIcon,
  MoveRightIcon,
  ShowerHeadIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Property name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  price: z.number().min(10000, "Price must be a positive number"),
  type: z.enum(["", "rent", "sell"]),
  beds: z.number().min(2, "Beds must be a positive number").optional(),
  baths: z.number().min(2, "Baths must be a positive number").optional(),
  lobbies: z.number().min(0, "Lobbies must be a positive number").optional(),
  squareFeet: z
    .number()
    .min(10, "Square feet must be a positive number")
    .optional(),
  amenities: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  virtualTour: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof schema>;

const typeOptions = [
  { value: "rent", label: "Rent" },
  { value: "sell", label: "Sell" },
];

const PropertyDetailsForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      location: "Port Harcourt",
      price: 0,
      type: "", // Default to Rent
      beds: 0,
      baths: 0,
      lobbies: 0,
      squareFeet: 0,
      amenities: [],
      features: [],
      virtualTour: false,
    },
  });

  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: (data) => {
      console.log("Property created:", data); // Debugging
      router.push(`?propertyId=${data.id}`);
      dispatch(nextStep());
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log("error", error);
      toast.error(error?.response?.data?.error || error?.message);
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
    createPropertyMutation.mutate(data);
  };

  const NairaIcon = () => <span className="text-gray-500 font-medium">₦</span>;

  // Update the ChipInput components
  const ChipInstructions = () => (
    <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
      <KeyboardIcon className="h-4 w-4" />
      Press <Kbd>Enter</Kbd> to add
    </div>
  );

  const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd className="mx-1 px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
      {children}
    </kbd>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Name
            </label>
            <Input id="name" {...register("name")} />
            {errors.name?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <Input id="location" {...register("location")} disabled />
            {errors.location?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <Input
              id="price"
              type="number"
              {...register("price", { valueAsNumber: true })}
              prefix={<NairaIcon />}
            />
            {errors.price?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  inputId="type"
                  options={typeOptions}
                  value={typeOptions.find((opt) => opt.value === field.value)}
                  onChange={(option) => field.onChange(option?.value)}
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.type?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div className="col-span-3">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              {...register("description")}
              rows={4}
              className="w-full"
            />
            {errors.description?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Property Specifications Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Property Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="beds"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Beds
            </label>
            <Input
              id="beds"
              type="number"
              {...register("beds", { valueAsNumber: true })}
              prefix={<BedIcon className="h-5 w-5 text-gray-500" />}
            />
            {errors.beds?.message && (
              <p className="mt-1 text-sm text-red-600">{errors.beds.message}</p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="baths"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Baths
            </label>
            <Input
              id="baths"
              type="number"
              {...register("baths", { valueAsNumber: true })}
              prefix={<ShowerHeadIcon className="h-5 w-5 text-gray-500" />}
            />
            {errors.baths?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.baths.message}
              </p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="lobbies"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lobbies
            </label>
            <Input
              id="lobbies"
              type="number"
              {...register("lobbies", { valueAsNumber: true })}
              prefix={<BuildingIcon className="h-5 w-5 text-gray-500" />}
            />
            {errors.lobbies?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lobbies.message}
              </p>
            )}
          </div>

          <div className="col-span-3 md:col-span-1">
            <label
              htmlFor="squareFeet"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Square Feet
            </label>
            <Input
              id="squareFeet"
              type="number"
              {...register("squareFeet", { valueAsNumber: true })}
              suffix={
                <div className="flex items-center gap-1 text-gray-500">
                  <span>sq ft</span>
                  <MoveRightIcon className="h-4 w-4" />
                </div>
              }
            />
            {errors.squareFeet?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.squareFeet.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Features & Amenities Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Features & Amenities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3">
            <Controller
              control={control}
              name="amenities"
              render={({ field }) => (
                <div>
                  <ChipInput
                    label="Amenities"
                    placeholder="Type and press Enter..."
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                  <ChipInstructions />
                </div>
              )}
            />
            {errors.amenities?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.amenities.message}
              </p>
            )}
          </div>

          <div className="col-span-3">
            <Controller
              control={control}
              name="features"
              render={({ field }) => (
                <div>
                  <ChipInput
                    label="Features"
                    placeholder="Type and press Enter..."
                    value={field.value || []}
                    onChange={field.onChange}
                  />
                  <ChipInstructions />
                </div>
              )}
            />
            {errors.features?.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.features.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Options Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Additional Options
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-3 flex items-center gap-2">
            <input
              type="checkbox"
              id="virtualTour"
              {...register("virtualTour")}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="virtualTour"
              className="text-sm font-medium text-gray-700"
            >
              Virtual Tour Available
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-span-3 flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={createPropertyMutation.isPending}>
          {createPropertyMutation.isPending
            ? "Creating..."
            : "Save and Continue"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyDetailsForm;
