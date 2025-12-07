export default function TeacherReviews({ reviews }: any) {
  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Reviews ({reviews.length})
      </h2>

      <div className="space-y-4">
        {reviews.map((r: any) => (
          <div key={r.id} className="flex gap-4">
            <img
              src={r.avatar}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
