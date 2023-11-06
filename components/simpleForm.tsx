"use client";

import { FormEvent, useState } from "react";

export default function simpleForm() {
  const [data, setData] = useState();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    const data = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify(formDataObject),
    }).then((res) => res.json());

    setData(data);
    form.reset();
  };

  return (
    <section className="flex gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col gap-4 sm:w-1/2"
      >
        <input
          type="text"
          className="rounded-lg"
          name="name"
          placeholder="name"
          required
        />
        <input
          type="text"
          className="rounded-lg"
          name="message"
          placeholder="message"
          required
        />
        <button className=" rounded-lg bg-black py-2 text-white">Submit</button>
      </form>

      <div className="flex-1 rounded-lg bg-cyan-600 p-8 text-white">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
}
