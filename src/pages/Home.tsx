import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Services from "./Services";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Services />
    </div>
  );
};