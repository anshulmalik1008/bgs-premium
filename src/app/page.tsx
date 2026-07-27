import { Navbar} from "./components/navbar";
import Hero from "./components/hero/Hero";
import MacbookPremium from "./components/premium-phone/MacbookPremium";
import DeliveryStory from "./components/Delivery-story/Deliverystory";
import SignatureUniverse from "./components/signature/SignatureUniverse";
import GiftStudio from "./components/gift-studio/Giftstudio";
import PosterShowcase from "./components/poster-showcase/PosterShowcase";
import OccasionJourney from "./components/occasion-journey/OccasionJourney";
import GiftFinderConcierge from "./components/gift-finder/GiftFinderConcierge";
import LuxuryExperienceWall from "./components/luxury-experience/LuxuryExperienceWall";
import CustomerLove from "./components/customer-love/CustomerLove";
import SocialGallery from "./components/social-gallery/SocialGallery";
import TrustedBrands from "./components/trusted-brands/TrustedBrands";
import LuxuryFooter from "./components/luxury-footer-pro/LuxuryFooter";

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
       <GiftFinderConcierge />
       <LuxuryExperienceWall />
       <CustomerLove />
       <SocialGallery />
       <TrustedBrands />
       <LuxuryFooter />
       


       
  

    </>
  );
}