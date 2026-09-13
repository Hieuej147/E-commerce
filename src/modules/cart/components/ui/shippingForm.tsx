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
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormValues>({
    defaultValues: { countryCode: "VN" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-outline">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-secondary-container px-2 py-0.5 font-mono text-xs font-bold">
            01
          </span>
          <h2 className="font-sans font-bold text-base uppercase text-primary tracking-tight">
            Shipping Address
          </h2>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onContinue)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="recipientName" className="font-mono text-xs text-on-surface uppercase font-bold">
              Recipient Full Name *
            </label>
            <input
              id="recipientName"
              className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
              type="text"
              placeholder="e.g. Nguyen Van An"
              {...register("recipientName", { required: "Name is required" })}
            />
            {errors.recipientName && (
              <span className="font-mono text-[10px] text-error font-bold">
                ! {errors.recipientName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-mono text-xs text-on-surface uppercase font-bold">
              Phone Number *
            </label>
            <input
              id="phone"
              className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
              type="tel"
              placeholder="+84 (0) 904 883 291"
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && (
              <span className="font-mono text-[10px] text-error font-bold">
                ! {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="line1" className="font-mono text-xs text-on-surface uppercase font-bold">
            Delivery Address (Street, Building, Unit) *
          </label>
          <input
            id="line1"
            className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
            type="text"
            placeholder="Plot 44, Nguyen Hue Boulevard, Ben Nghe Ward"
            {...register("line1", { required: "Address is required" })}
          />
          {errors.line1 && (
            <span className="font-mono text-[10px] text-error font-bold">
              ! {errors.line1.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 sm:col-span-1">
            <label htmlFor="city" className="font-mono text-xs text-on-surface uppercase font-bold">
              City *
            </label>
            <input
              id="city"
              className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
              type="text"
              placeholder="Ho Chi Minh City"
              {...register("city", { required: "City is required" })}
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-1">
            <label htmlFor="province" className="font-mono text-xs text-on-surface uppercase font-bold">
              Province
            </label>
            <input
              id="province"
              className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
              type="text"
              placeholder="District 1"
              {...register("province")}
            />
          </div>

          <div className="flex flex-col gap-1 sm:col-span-1">
            <label htmlFor="postalCode" className="font-mono text-xs text-on-surface uppercase font-bold">
              Postal Code *
            </label>
            <input
              id="postalCode"
              className="w-full bg-surface-container-lowest border border-outline p-2.5 font-mono text-xs text-on-surface focus:outline-none focus:border-l-4 focus:border-l-secondary-container focus:border-primary transition-all shadow-hard-sm"
              type="text"
              placeholder="700000"
              {...register("postalCode", { required: "Postal code is required" })}
            />
          </div>
        </div>

        <input type="hidden" {...register("countryCode")} />

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-secondary-container text-on-primary hover:text-on-secondary-container font-mono font-bold text-xs uppercase py-3.5 px-4 transition-all duration-300 shadow-hard-md flex items-center justify-center gap-2 clip-chamfer-sm"
          >
            [ CONTINUE TO PAYMENT METHOD ]
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
