import FeaturedProducts from "../components/FeaturedProducts";
import { GetItFrom } from "../components/GetItOnComponent";
import Hero from "../components/Hero";
import Services from "../components/ServicesComponent";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Services />
      <GetItFrom />
    </div>
  );
}
