"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import coursesData from "@/data/courses.json";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = coursesData.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black">All Skill Programs</h1>
          <p className="text-gray-500 text-sm mt-1">Explore all {coursesData.length} available programs</p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search courses by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full input-sm md:input-md"
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
          <p className="text-gray-500 font-medium">No courses match "{searchQuery}"</p>
          <button onClick={() => setSearchQuery("")} className="btn btn-link btn-sm mt-2">
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
              <figure className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </figure>
              <div className="card-body p-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="badge badge-primary badge-outline">{course.category}</span>
                  <span className="font-semibold text-amber-600"> {course.rating}</span>
                </div>
                <h2 className="card-title text-base font-bold">{course.title}</h2>
                <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 my-2 pt-2 border-t">
                  <span> {course.instructor}</span>
                  <span> {course.duration}</span>
                </div>
                <div className="card-actions justify-end mt-2">
                  <Link href={`/courses/${course.id}`} className="btn btn-primary btn-sm w-full">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
