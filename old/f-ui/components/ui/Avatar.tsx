export default function Avatar({
  src,
  size = 40,
  online,
}: {
  src: string;
  size?: number;
  online?: boolean;
}) {
  return (
    <div className="relative">
      <img
        src={src}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      {online && (
        <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
      )}
    </div>
  );
}
