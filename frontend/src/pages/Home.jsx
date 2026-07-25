import Navbar from "../components/Navbar";
import Hero from "../components/HeroSection";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">

          <Hero />

          <LeadForm />


        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Home;