import { Navbar} from "./components/navbar";
import Hero from "./components/hero/Hero";
import MacbookPremium from "./components/premium-phone/MacbookPremium";
import DeliveryStory from "./components/Delivery-story/Deliverystory";
import SignatureUniverse from "./components/signature/SignatureUniverse";
import GiftStudio from "./components/gift-studio/Giftstudio";
import PosterShowcase from "./components/poster-showcase/PosterShowcase";
import OccasionJourney from "./components/occasion-journey/OccasionJourney";
import Featured from "./components/featured/Featured";
import LuxuryShowcase from "./components/luxuryshowcase/LuxuryShowcase";
// import Categories from "./components/categories/Categories";
// import PremiumCategories from "./components/categories-story/PremiumCategories";

import CollectionUniverse from "./components/collection-universe/CollectionUniverse";
import FloatingUniverse from "./components/floating-universe/FloatingUniverse";

export default function Home() {
  return (
    <>
      <Navbar />

      
      <Hero />
      <MacbookPremium />
       <DeliveryStory />
       <SignatureUniverse />
       <GiftStudio />
       <PosterShowcase />
       <OccasionJourney />
      <Featured />
      <LuxuryShowcase />
      <FloatingUniverse />
      {/* <PremiumCategories /> */}
      
      <CollectionUniverse />
      

    </>
  );
}