import {
  Box
} from '@chakra-ui/react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import Stats from '../components/Home/Stats';
import CTA from '../components/Home/CTA';
import Footer from '../components/Home/Footer';


const Home = () => {
 


  return (
    <Box>
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </Box>
  );
};

export default Home;