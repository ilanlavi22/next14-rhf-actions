"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addEntry } from "@/app/_actions";
import { FormDataSchema } from "@/lib/schema";

type Inputs = z.infer<typeof FormDataSchema>;

export default function reactHookFormAction() {
  const [data, setData] = useState<Inputs>();

  const {
    register,
    handleSubmit,
    watch, // if you want to watch individual input by `name`
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addEntry(data);
    if (!result) {
      console.log("Something went wrong");
      return;
    }
    if (result.error) {
      // set local error state
      console.log(result.error);
      return;
    }

    reset();
    setData(result.data);
  };

  // console.log(watch("name")); // watch input value by passing the name of it

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
        {errors.name?.message && (
          <p className="text-red-500">{errors.name.message}</p>
        )}

        <input
          type="text"
          className="rounded-lg"
          placeholder="message"
          {...register("message")}
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
