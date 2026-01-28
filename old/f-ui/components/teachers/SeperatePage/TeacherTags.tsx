export default function TeacherTags({ tags }: any) {
  const tagList = typeof tags === "string"
    ? tags.split(",").map(t => t.trim())
    : tags;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tagList.map((tag: string, i: number) => (
        <span
          key={i}
          className="px-3 py-1 bg-zinc-800 text-white rounded-lg text-base cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
