import SectionItem from "@/components/courses/SectionItem";
import Accordion from "./dummy/Accordian";

export default function CourseContent({ sections }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Course content</h2>

      <div className="space-y-6">
        <Accordion sections={sections} />
      </div>
    </div>
  );
}
