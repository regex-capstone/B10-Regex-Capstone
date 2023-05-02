import "animate.css/animate.min.css";
import Header from "@/client/Header";
import Hero from "@/client/about/HeroComponent";
import How from "@/client/about/HowComponent";
import Why from "@/client/about/WhyComponent";
import Footer from "@/client/about/FooterComponent";
import Stakeholders from "@/client/about/StakeholderComponent";

export default function About() {
    return (
        <>
            <Header disableSearchBar />
            <Hero />
            <Why />
            <How />
            <Stakeholders />
            <Footer />
        </>
    )
}