import Cart from "../components/Cart";
import { ModelPage } from "../components/IntroPage";

export default function CartPage() {
  return (
    <>
    {/* <ModelPage pageKey="cart" duration={2000} /> */}
    <ModelPage pageKey="main" duration={2000} />
    <Cart />
    </>
  );
}
