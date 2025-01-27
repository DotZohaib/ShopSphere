import Category from "@/components/Category";
import FlashSales from "@/components/Flashsale";
import Sidebar from "@/components/Sidebar";
import SellingProduct from "@/components/SellingProduct";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Features from "@/components/Features";

const Home = () => {

  return (
    <>
    <header>
      <Sidebar/>
      <FlashSales/>
      <Category/>
      <SellingProduct/>
      <Hero/>
      <Products/>
      <Features/>
    </header>
    </>
  );
};

export default Home;
