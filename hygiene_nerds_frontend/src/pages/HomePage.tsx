import FeaturedProducts from "../components/FeaturedProductsComponent";
import { GetItFrom } from "../components/GetItOnComponent";
import Hero from "../components/HeroComponent";
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
