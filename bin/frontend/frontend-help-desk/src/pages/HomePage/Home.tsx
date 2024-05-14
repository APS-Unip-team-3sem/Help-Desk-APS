import Navbar from '../../components/LandingPage/Navbar/Navbar';
import Hero from '../../components/LandingPage/Hero/Hero';
import VisualFeatures from '../../components/LandingPage/VisualFeatures/VisualFeatures';
import Features from '../../components/LandingPage/Features/Features';
import CTA from '../../components/LandingPage/CTA/CTA';
import Testimonial from '../../components/LandingPage/Testimonial/Testimonial';
import Pricing from '../../components/LandingPage/Pricing/Pricing';
import FAQs from '../../components/LandingPage/FAQs/FAQs';
import Team from '../../components/LandingPage/Team/Team';
import Footer from '../../components/LandingPage/Footer/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <VisualFeatures />
            <Features />
            <CTA />
            <Testimonial />
            <Pricing />
            <FAQs />
            <Team />
            <Footer />
        </>
    );
};

export default Home;