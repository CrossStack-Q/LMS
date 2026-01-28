export default function SearchBar({ button = false }: { button?: boolean }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center border border-subtle px-4 py-2 bg-(--bg-light) w-full md:w-80">
        <input
          type="text"
          placeholder="Search"
          className="outline-none w-full text-(--gray-700)"
        />
        <span className="text-(--gray-700)">🔍</span>
      </div>

      {button && (
        <button className="px-4 py-2 bg-(--primary-green) text-(--gray-900) border border-(--primary-green)">
          Search
        </button>
      )}
    </div>
  );
}
