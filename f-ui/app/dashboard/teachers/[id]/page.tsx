import reviews from "@/lib/reviews.json";

import TeacherHeader from "@/components/teachers/SeperatePage/TeacherHeader";
import TeacherTags from "@/components/teachers/SeperatePage/TeacherTags";
import TeacherStats from "@/components/teachers/SeperatePage/TeacherStats";
import TeacherActions from "@/components/teachers/SeperatePage/TeacherActions";
import HomeTopBar from "@/components/topBar/HomeTopBar";

import TeacherProfileClient from "./Client";   // <- IMPORTANT FIX
import TeacherSideReviews from "@/components/teachers/SeperatePage/TeacherSideReviews";

export default async function TeacherProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // const id = params.id;

  // Fetch teacher directly on the server
  const res = await fetch(`http://localhost:8080/api/v1/teachers?id=${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  const teacher = data[0];

  if (!teacher) return <div className="p-6">Teacher not found</div>;

  return (
      <div className="h-full px-6 overflow-y-auto hidescroll gap-8">
      
      <div className="sticky top-0 bg-gray-50 z-50 pb-1">
        <HomeTopBar />
      </div>
      <p className="p-2 text-xl">
        
        <span className="text-zinc-500">
          Teacher /&nbsp;
        </span>
        <span className="font-medium">
        {teacher.name}
        </span>
      </p>

      <div className="flex gap-8">

      {/* LEFT MAIN CONTENT */}
      <div className="flex-1">
        <div className="bg-white p-4">
        <TeacherHeader teacher={teacher} />
        <TeacherTags tags={teacher.tags} />
        <TeacherStats teacher={teacher} />
        </div>

        {/* CLIENT WRAPPER */}
        <TeacherProfileClient teacher={teacher} reviews={reviews} />
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-4">
      <TeacherActions teacher={teacher} />
      <TeacherSideReviews/>
      </div>
    </div>
    </div>
  );
}
