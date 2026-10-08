import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const FinalPage = () => {

  const handleShop = () => {
    window.location.href = "/collection";
  };

  return (
    <>
      <FinalCTA onShop={handleShop} />

      <Footer />
    </>
  );
};

export default FinalPage;