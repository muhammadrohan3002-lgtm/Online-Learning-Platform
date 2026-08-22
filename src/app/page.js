import HeroSlider from "@/component/HeroSlider";
import PopularCourses from "@/component/home/PopularCourses";
import StudyTips from "@/component/home/StudyTips";
import TrendingCourses from "@/component/home/TrendingCourses";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <HeroSlider />
      <PopularCourses />
      <StudyTips />
      <TrendingCourses />
    </div>
  );
}
