import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
// import SearchCard from "./components/SearchCard";
import Footer from "./components/Footer";
import Destination from "./components/Destination";
import ChooseUs from "./components/ChooseUs";
import Testimoni from "./components/Testimoni";
import InputTestimoni from "./components/InputTestimoni";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />

      <section>
        <Hero />
      </section>

      <section>
        <Destination />
      </section>

      <section>
        <ChooseUs />
      </section>

      <section>
        <Testimoni />
      </section>

      <section>
        <InputTestimoni />
      </section>

      <Footer />
    </main>
  );
}
