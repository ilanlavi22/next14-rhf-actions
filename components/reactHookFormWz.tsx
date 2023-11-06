"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormDataSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required.")
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  message: z
    .string()
    .nonempty("Message is required.")
    .min(2, { message: "Message must be at least 2 characters long" }),
});

type Inputs = z.infer<typeof FormDataSchema>;

export default function reactHookForm() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema), // validating form data against schema
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
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          type="text"
          className="rounded-lg"
          placeholder="message"
          {...register("message")}
        />
        {errors.message && (
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
