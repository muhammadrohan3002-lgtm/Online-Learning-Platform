import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../ui/SectionHeader";
import coursesData from "@/data/courses.json";

export default function PopularCourses() {
  const popular = [...coursesData].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section>
      <SectionHeader 
        title="🔥 Popular Courses" 
        subtitle="Our highest-rated tracks chosen by learners worldwide" 
        linkHref="/courses" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popular.map((course) => (
          <div key={course.id} className="card bg-base-100 shadow-md border border-base-300 overflow-hidden hover:shadow-lg transition-shadow">
            <figure className="relative h-48 w-full">
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span className="badge badge-sm badge-ghost">{course.category}</span>
                <span className="font-semibold text-amber-500">⭐ {course.rating}</span>
              </div>
              <h3 className="card-title text-base font-bold line-clamp-1">{course.title}</h3>
              <p className="text-xs text-gray-500">Instructor: {course.instructor}</p>
              <div className="card-actions justify-end mt-4">
                <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm w-full">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}