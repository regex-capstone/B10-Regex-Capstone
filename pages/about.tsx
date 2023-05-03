import "animate.css/animate.min.css";
import Header from "@/client/Header";
import Hero from "@/client/about/HeroComponent";
import Why from "@/client/about/WhyComponent";
import Footer from "@/client/about/FooterComponent";
import Journey from "@/client/about/JourneyComponent";

export default function About() {
    return (
        <>
            <Header disableSearchBar />
            <Hero />
            <Why />
            <Journey />
            <Footer />
        </>
    )
}