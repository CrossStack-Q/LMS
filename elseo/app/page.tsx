import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TopicsSection from "./components/TopicsSection";
import Footer from "./components/Footer";
import Tracks from "./components/Tracks/Tracks";
import Courses from "./components/Courses/Courses";
import Reviews from "./components/Reviews/Reviews";
import NormalFooter from "./components/NormalFooter";
import Spacing from "./components/Reviews/Spacing";
import ReviewHeader from "./components/Reviews/ReviewHeader";

export default function Home() {
  return (
    <main className="min-h-screen text-(--gray-900)">
      <Navbar />
      <div className="border-x-2 border-(--gray-500) max-w-7xl mx-auto">
      <Hero text={`Your Space <br/> To Grow In <br/> Software Engineering`}
            desc={`Find the knowledge that shapes great software engineers.`}
            author={`Anurag Sharma`}
            search={true}
      />        
      <Tracks/> 
      <Courses/>
      <Spacing/>
      <ReviewHeader/>
      <Reviews/>
      <NormalFooter/>
      {/* <TopicsSection />  */}
      </div>
      <Footer />
    </main>
  );
}