import "animate.css/animate.min.css";
import Header from "@/client/Header";
import Hero from "@/client/about/HeroComponent";
import Who from "@/client/about/WhoComponent";
import Why from "@/client/about/WhyComponent";
import Users from "@/client/about/UsersComponent";
import Footer from "@/client/about/FooterComponent";

export default function About() {
    return (
        <>
            <Header disableSearchBar />
            <Hero />
            <Why />
            <Who />
            <Users />
            <Footer />
        </>
    )
}