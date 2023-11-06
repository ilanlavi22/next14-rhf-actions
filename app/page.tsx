import SimpleForm from "@/components/simpleForm";
import ReactHookForm from "@/components/reactHookForm";
import ReactHookFormWz from "@/components/reactHookFormWz";
import ReactHookFormAction from "@/components/reactHookFormAction";

export default function Home() {
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="mb-12 text-2xl font-medium">React Hook Forms</h1>
        {/* <SimpleForm /> */}
        {/* <ReactHookForm /> */}
        {/* <ReactHookFormWz /> */}
        <ReactHookFormAction />
      </div>
    </section>
  );
}
