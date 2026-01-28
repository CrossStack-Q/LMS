import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopicsSection from "./components/TopicsSection";
import Footer from "./components/Footer";
import Tracks from "./components/Tracks/Tracks";
import Courses from "./components/Courses/Courses";
import Reviews from "./components/Reviews/Reviews";
import HomeScreenFooter from "./components/HomeScreenFooter";
import Spacing from "./components/Reviews/Spacing";
import ReviewHeader from "./components/Reviews/ReviewHeader";
import ReviewsCarousel from "./components/Reviews/ReviewsCarousel";

export default function Home() {
  return (
    <main className="text-(--gray-900)">
      <div className="border-x border-b border-(--gray-500) max-w-7xl mx-auto">
      <Hero text={`Your Space <br/> To Grow In <br/> Software Engineering`}
            desc={`Find the knowledge that shapes great software engineers.`}
            author={`Anurag Sharma`}
            search={true}
            isImage={true}
            imageURL={`https://raw.githubusercontent.com/manyyearstoogo-boop/Res/refs/heads/main/H1.png`}
      />        
      <Tracks/> 
      <Courses/>
      <Spacing/>
      {/* <ReviewHeader/> */}
      {/* <Reviews/> */}
      <ReviewsCarousel/>
      <HomeScreenFooter/>
      {/* <TopicsSection />  */}
      <div className="py-10"></div>
      </div>
    </main>
  );
}