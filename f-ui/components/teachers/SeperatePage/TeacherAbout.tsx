export default function TeacherAbout({ about }: any) {
  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">About me</h2>
      <p className="text-gray-600 leading-relaxed">{about}</p>
    </div>
  );
}
