import FeaturedProducts from "../components/FeaturedProductsComponent";
import { GetItFromComponent } from "../components/GetItOnComponent";
import HeroComponent from "../components/HeroComponent";
import ServicesComponent from "../components/ServicesComponent";

export default function HomePage() {
  return (
    <div>
      <HeroComponent />
      <FeaturedProducts />
      <ServicesComponent />
      <GetItFromComponent />
    </div>
  );
}
