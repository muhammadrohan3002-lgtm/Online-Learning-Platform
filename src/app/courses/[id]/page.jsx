"use client";

import { useParams } from "next/navigation";
import coursesData from "@/data/courses.json";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id, 10));

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Course Not Found</h2>
        <Link href="/courses" className="btn btn-link">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-12 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-md">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center mb-2">
              <span className="badge badge-primary">{course.category}</span>
              <span className="badge badge-outline">{course.level}</span>
            </div>
            <h1 className="text-3xl font-black">{course.title}</h1>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">{course.description}</p>
          </div>

          {/* Curriculum Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
            <div className="space-y-3">
              {course.curriculum?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-base-100 rounded-lg border border-base-200"
                >
                  <span className="badge badge-neutral badge-sm font-mono">{idx + 1}</span>
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 border border-base-300 p-6 sticky top-24 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Track Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Instructor</span>
                <span className="font-semibold">{course.instructor}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Rating</span>
                <span className="font-semibold text-amber-600">⭐ {course.rating}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-gray-500">Access</span>
                <span className="font-semibold text-success">Full Lifetime</span>
              </div>
            </div>
            <button
              onClick={() => toast.success("Enrolled in track successfully!")}
              className="btn btn-primary w-full mt-6"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}