"use client";

import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

export type ShippingFormValues = {
  recipientName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  province?: string;
  postalCode: string;
  countryCode: string;
};

const ShippingForm = ({ onContinue }: { onContinue: (data: ShippingFormValues) => void }) => {
  const { register, handleSubmit } = useForm<ShippingFormValues>({
    defaultValues: { countryCode: "VN" },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onContinue)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="recipientName" className="text-xs text-gray-500 font-medium">
          Name
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="recipientName"
          placeholder="John Doe"
          {...register("recipientName", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Phone
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="phone"
          placeholder="0901234567"
          {...register("phone", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="line1" className="text-xs text-gray-500 font-medium">
          Address
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="line1"
          placeholder="12 Nguyen Hue Street"
          {...register("line1", { required: true })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          City
        </label>
        <input
          className="border-b border-gray-200 py-2 outline-none text-sm"
          type="text"
          id="city"
          placeholder="Ho Chi Minh City"
          {...register("city", { required: true })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Province" className="border-b border-gray-200 py-2 text-sm outline-none" {...register("province")} />
        <input type="text" placeholder="Postal code" className="border-b border-gray-200 py-2 text-sm outline-none" {...register("postalCode", { required: true })} />
      </div>
      <input type="hidden" {...register("countryCode")} />
      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;
