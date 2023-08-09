import Hero from "../Components/Homecomponents/Hero/Hero";
import Navbar from '../Components/Homecomponents/Navbar/Navbar'
import Features from '../Components/Homecomponents/Features/Features'
import Footer from '../Components/Homecomponents/Footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
