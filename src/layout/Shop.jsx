import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Productos from "../components/Productos";
import "./css/Shop.css";

export default function Shop() {
  return (
    <>
      <Header />
      <div className="shop-container">
        <Productos />
      </div>
      <Footer />
    </>
  );
}
