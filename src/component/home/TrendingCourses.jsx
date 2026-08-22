import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";
import coursesData from "@/data/courses.json";

export default function TrendingCourses() {
  const trending = coursesData.slice(3, 6);

  return (
    <section id="trending">
      <SectionHeader 
        title="⚡ Trending New Releases" 
        subtitle="Recently updated technologies and modern workflows" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trending.map((course) => (
          <div key={course.id} className="card bg-base-100 shadow-sm border border-base-200 overflow-hidden hover:shadow-md transition-shadow">
            <figure className="relative h-44 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <span className="badge badge-secondary badge-sm mb-1">{course.level}</span>
              <h3 className="font-bold text-base line-clamp-1">{course.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2 mt-1">{course.description}</p>
              <div className="mt-4 pt-3 border-t flex justify-between items-center text-xs text-gray-500">
                <span>⏱ {course.duration}</span>
                <Link href={`/courses/${course.id}`} className="text-primary font-bold hover:underline">
                  Inspect Track →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}