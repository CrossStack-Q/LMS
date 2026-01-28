export default function CategoryPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm ${
        active ? "bg-zinc-500 text-white" : "bg-white/90 border border-gray-100"
      }`}
    >
      <span>{label}</span>
      {/* Only show count if it exists and label is not All */}
      {count && label !== "All" && (
        <span className="ml-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs bg-gray-100 text-black">
          {count}
        </span>
      )}
    </button>
  );
}