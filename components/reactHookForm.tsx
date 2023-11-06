"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  message: string;
};

export default function reactHookForm() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    reset();
    setData(data);
  };

  return (
    <section className="flex gap-6">
      <form
        onSubmit={handleSubmit(processForm)}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
      >
        <input
          type="text"
          className="rounded-lg"
          placeholder="name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name?.message && (
          <p className="text-red-500">{errors.name.message}</p>
        )}

        <input
          type="text"
          className="rounded-lg"
          placeholder="message"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters long",
            },
          })}
        />
        {errors.message?.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}
        <button className=" rounded-lg bg-black py-2 text-white">Submit</button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
