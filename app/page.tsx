import { Metadata } from 'next';
import Faq from "./home/components/Faq";
import Guarantee from "./home/components/Guarantee";
import Hero from "./home/components/Hero";
import Portfolio from "./home/components/Portfolio";
import Process from "./home/components/Process";
import RecentPosts from "./home/components/RecentPosts";
import Services from "./home/components/Services";
import Testimonials from "./home/components/Testimonials";

export const metadata: Metadata = {
  title: 'Web Design in Phalaborwa | Malalang - Local Website Development',
  description: 'Looking for a web designer in Phalaborwa? Malalang builds affordable, professional websites for local businesses. We help you get online, attract more customers, and grow your business with a stunning, mobile-friendly site. Contact us for a free quote!',
};

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <Testimonials />
      <Guarantee />
      <Services />
      <Process />
      <Portfolio />
      <Faq />
      <RecentPosts />
    </main>
  );
};

export default HomePage;
