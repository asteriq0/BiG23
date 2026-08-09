import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Coverage from "../components/Coverage";
import FAQ from "../components/FAQ";
import EmergencyCTA from "../components/EmergencyCTA";
import Footer from "../components/Footer";

function Home () {
    return (
        <>
        <Hero />
        <WhyChoose />
        <Services />
        <HowItWorks />
        <Coverage />
        <FAQ />
        <EmergencyCTA />
        <Footer />
        </>
    );
}

export default Home;