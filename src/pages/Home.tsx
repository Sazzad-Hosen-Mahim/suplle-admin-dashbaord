import CursorAnimationWrapper from "@/components/CursorAnimation";
import Banner from "@/components/home/Banner/Banner";
import FAQ from "@/components/home/FAQ/FAQ";
import Footer from "@/components/home/Footer/Footer";
import HowSuplleHelps from "@/components/home/HowSuplleHelps/HowSuplleHelps";
import SignInBox from "@/components/home/SignInBox/SignInBox";
import Story from "@/components/home/Story/Story";
import Testimonial from "@/components/home/Testimonial/Testimonial";
import WhatIsSuplle from "@/components/home/WhatIsSuplle/WhatIsSuplle";
import WhyChooseSuplle from "@/components/home/WhyChooseSuplle/WhyChooseSuplle";

const Home = () => {
  return (
    <div className="" style={{ backgroundColor: "#030014" }}>
      <Banner />
      <CursorAnimationWrapper>
        <WhatIsSuplle />
        <Story />
        <WhyChooseSuplle />
        <HowSuplleHelps />
        <FAQ />
        <Testimonial />
        <SignInBox />
        <Footer />
      </CursorAnimationWrapper>
    </div>
  );
};

export default Home;
