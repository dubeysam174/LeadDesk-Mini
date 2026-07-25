const Hero = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-3xl">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            Lead Management Made Simple
          </span>

          <h1 className="mt-6 text-5xl font-bold text-slate-900 leading-tight">
            Capture & Manage
            <span className="text-blue-600"> Leads </span>
            Effortlessly
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            Collect client inquiries through a simple form and
            manage them from a secure admin dashboard.
          </p>

          <a
            href="#lead-form"
            className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition"
          >
            Get Started
          </a>

        </div>

      </div>
    </section>
  );
};

export default Hero;