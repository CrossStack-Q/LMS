// "use client";

// import { useEffect, useState } from "react";
// import Hero from "../components/Hero";

// type ForumPost = {
//   id: string;
//   author: string;
//   avatar: string;
//   title: string;
//   body: string;
//   tags: string[] | null;
//   views: number;
//   comments: number;
//   likes: number;
//   created_at: string;
//   updated_at: string;
// };

// type Pagination = {
//   page: number;
//   page_size: number;
//   total_items: number;
//   total_pages: number;
// };

// type ForumResponse = {
//   data: ForumPost[];
//   pagination: Pagination;
// };

// export default function Forum() {
//   const [posts, setPosts] = useState<ForumPost[]>([]);
//   const [pagination, setPagination] = useState<Pagination | null>(null);
//   const [loading, setLoading] = useState(false);

//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [searchTag, setSearchTag] = useState("");

//   // Create Forum
//   const [createForum, setCreateForum] = useState(false);

//   const [title, setTitle] = useState("");
//   const [forumTags, setForumTags] = useState<string[]>([]);
//   const [forumTagInput, setForumTagInput] = useState("");

//   const [body, setBody] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [submitting, setSubmitting] = useState(false);

//   function addForumTag() {
//     const tag = forumTagInput.trim().toLowerCase();
//     if (!tag) return;

//     setForumTags(prev => (prev.includes(tag) ? prev : [...prev, tag]));
//     setForumTagInput("");
//   }

//   function removeForumTag(tag: string) {
//     setForumTags(prev => prev.filter(t => t !== tag));
//   }

//   async function handleCreateTopic() {
//     if (!title.trim() || !body.trim()) return;

//     setSubmitting(true);

//     const res = await fetch("http://localhost:8080/api/v1/forum", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         body,
//         author: "Anurag Sharma",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//         tags,
//       }),
//     });

//     setSubmitting(false);

//     if (!res.ok) {
//       alert("Failed to create forum");
//       return;
//     }

//     setTitle("");
//     setBody("");
//     setTags([]);
//     setCreateForum(false);
//     setPage(1);
//   }


//   const [sortBy, setSortBy] =
//     useState<"newest" | "recent" | "popular">("newest");

//   const [page, setPage] = useState(1);

//   function buildForumsURL() {
//     const params = new URLSearchParams();

//     params.set("sort", sortBy);
//     params.set("page", page.toString());

//     if (selectedTags.length > 0) {
//       params.set("tags", selectedTags.join(","));
//     }

//     return `http://localhost:8080/api/v1/forums?${params.toString()}`;
//   }

//   useEffect(() => {
//     async function fetchForums() {
//       setLoading(true);

//       const res = await fetch(buildForumsURL());
//       const json: ForumResponse = await res.json();

//       setPosts(json.data);
//       setPagination(json.pagination);

//       setLoading(false);
//     }

//     fetchForums();
//   }, [sortBy, selectedTags, page]);

//   function addTagFromInput() {
//     const tag = searchTag.trim().toLowerCase();
//     if (!tag) return;

//     setSelectedTags(prev =>
//       prev.includes(tag) ? prev : [...prev, tag]
//     );

//     setSearchTag("");
//     setPage(1);
//   }

//   function removeTag(tag: string) {
//     setSelectedTags(prev => prev.filter(t => t !== tag));
//     setPage(1);
//   }

//   function clearFilters() {
//     setSelectedTags([]);
//     setSearchTag("");
//     setPage(1);
//   }

//   return (
//     <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) w-full flex-1">

//       <Hero
//         text={`Ask Community And <br/> Support Each Other`}
//         isImage={false}
//         createTopic={!createForum}
//         onCreateTopic={() => setCreateForum(true)}
//       />


//       {createForum ? (
//         <div className="border-t border-(--gray-500) p-10 relative">

//           {/* CLOSE BUTTON */}
//           <button
//             onClick={() => setCreateForum(false)}
//             className="absolute top-4 right-4 text-xl font-semibold"
//           >
//             ✕
//           </button>

//           <h2 className="text-2xl font-semibold mb-6">Create New Topic</h2>

//           {/* TITLE */}
//           <div className="mb-6">
//             <label className="block font-medium">Title</label>
//             <input
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               placeholder="Title"
//               className="w-full border p-3 rounded"
//             />
//           </div>

//           {/* SUBTITLE */}
//           <div className="mb-6">
//             <label className="block font-medium">Subtitle</label>
//             <textarea
//               value={body}
//               onChange={e => setBody(e.target.value)}
//               placeholder="Describe your question..."
//               className="w-full border p-3 rounded"
//             />
//           </div>

//           {/* TAGS */}
//           <div className="mb-8">
//             <label className="block font-medium">Tags</label>

//             <div className="border border-(--gray-500) rounded-md p-2 flex flex-wrap gap-2">
//               {forumTags.map(tag => (
//                 <span
//                   key={tag}
//                   className="px-2 py-1 bg-(--gray-200) rounded text-sm cursor-pointer"
//                   onClick={() => removeForumTag(tag)}
//                 >
//                   {tag} ✕
//                 </span>
//               ))}

//               <input
//                 value={forumTagInput}
//                 onChange={e => setForumTagInput(e.target.value)}
//                 onKeyDown={e => {
//                   if (e.key === "Enter" || e.key === ",") {
//                     e.preventDefault();
//                     addForumTag();
//                   }
//                 }}
//                 placeholder="Type tag and press Enter"
//                 className="outline-none bg-transparent text-sm flex-1"
//               />
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleCreateTopic}
//               disabled={submitting}
//               className="bg-(--primary-green) px-6 py-2 rounded font-medium disabled:opacity-50"
//             >
//               {submitting ? "Creating..." : "Create Topic"}
//             </button>

//             <button
//               onClick={() => setCreateForum(false)}
//               className="px-6 py-2 border border-(--gray-500) rounded"
//             >
//               Cancel
//             </button>
//           </div>

//         </div>
//       ) : (
//         <div className="border-t border-(--gray-500) grid grid-cols-4">

//           {/* SIDEBAR */}
//           <div className="border-r border-b border-(--gray-500) col-span-1 p-6">

//             <p className="font-semibold text-lg mb-4">Sorted By</p>

//             <div className="space-y-3">
//               <label className="flex gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   checked={sortBy === "newest"}
//                   onChange={() => {
//                     setSortBy("newest");
//                     setPage(1);
//                   }}
//                 />
//                 Newest
//               </label>

//               <label className="flex gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   checked={sortBy === "recent"}
//                   onChange={() => {
//                     setSortBy("recent");
//                     setPage(1);
//                   }}
//                 />
//                 Recent activity
//               </label>

//               <label className="flex gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   checked={sortBy === "popular"}
//                   onChange={() => {
//                     setSortBy("popular");
//                     setPage(1);
//                   }}
//                 />
//                 Most popular
//               </label>
//             </div>

//             {/* TAG FILTER */}
//             <div className="mt-10">
//               <p className="font-semibold text-lg mb-4">Filter By Tags</p>

//               <div className="border rounded-md p-2 flex flex-wrap gap-2">
//                 {selectedTags.map(tag => (
//                   <span
//                     key={tag}
//                     className="px-2 py-1 bg-(--gray-200) rounded text-sm cursor-pointer"
//                     onClick={() => removeTag(tag)}
//                   >
//                     {tag} ✕
//                   </span>
//                 ))}

//                 <input
//                   value={searchTag}
//                   onChange={e => setSearchTag(e.target.value)}
//                   onKeyDown={e => {
//                     if (e.key === "Enter" || e.key === ",") {
//                       e.preventDefault();
//                       addTagFromInput();
//                     }
//                   }}
//                   placeholder="Type tag and press Enter"
//                   className="outline-none bg-transparent text-sm flex-1"
//                 />
//               </div>

//               {selectedTags.length > 0 && (
//                 <div className="mt-6">
//                   <button
//                     onClick={clearFilters}
//                     className="bg-(--primary-green) px-4 py-2 rounded font-medium"
//                   >
//                     Clear
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* FEED */}
//           <div className="col-span-3 space-y-10">

//             {loading && <p className="p-6">Loading forums...</p>}

//             {!loading && posts.map(post => (
//               <div key={post.id} className="border-b p-6">
//                 <div className="flex gap-4 mb-3">
//                   <img src={post.avatar} className="w-12 h-12 rounded-full" />
//                   <div>
//                     <p className="font-medium">{post.author}</p>
//                     <p className="text-xs">
//                       Created • {new Date(post.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-semibold">{post.title}</h2>
//                 <p className="mb-3">{post.body}</p>

//                 <div className="flex gap-2 flex-wrap mb-3">
//                   {post.tags?.map(tag => (
//                     <span
//                       key={tag}
//                       className="px-2 py-1 bg-(--gray-200) rounded text-xs"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex gap-6 text-sm">
//                   <span>👁 {post.views}</span>
//                   <span>💬 {post.comments}</span>
//                   <span>❤️ {post.likes}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {!createForum && pagination && pagination.total_pages > 1 && (
//         <div className="p-6 flex justify-center">
//           <div className="flex border">
//             <button
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="px-4 py-2 border-r"
//             >
//               ‹
//             </button>

//             {Array.from({ length: pagination.total_pages }).map((_, i) => {
//               const p = i + 1;
//               return (
//                 <button
//                   key={p}
//                   onClick={() => setPage(p)}
//                   className={`px-6 py-2 border-r ${p === page ? "bg-(--primary-green)" : ""
//                     }`}
//                 >
//                   {p}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => setPage(p => Math.min(pagination.total_pages, p + 1))}
//               disabled={page === pagination.total_pages}
//               className="px-4 py-2"
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Hero from "../components/Hero";

/* ================= TYPES ================= */

type ForumPost = {
  id: string;
  author: string;
  avatar: string;
  title: string;
  body: string;
  tags: string[] | null;
  views: number;
  comments: number;
  likes: number;
  created_at: string;
  updated_at: string;
};

type Pagination = {
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type ForumResponse = {
  data: ForumPost[];
  pagination: Pagination;
};

/* ================= PAGE ================= */

export default function Forum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTag, setSearchTag] = useState("");

  const [createForum, setCreateForum] = useState(false);

  const [title, setTitle] = useState("");
  const [forumTags, setForumTags] = useState<string[]>([]);
  const [forumTagInput, setForumTagInput] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [sortBy, setSortBy] =
    useState<"newest" | "recent" | "popular">("newest");

  const [page, setPage] = useState(1);

  /* ================= HELPERS ================= */

  function buildForumsURL() {
    const params = new URLSearchParams();
    params.set("sort", sortBy);
    params.set("page", page.toString());
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    return `http://localhost:8080/api/v1/forums?${params.toString()}`;
  }

  function addForumTag() {
    const tag = forumTagInput.trim().toLowerCase();
    if (!tag) return;
    setForumTags(prev => (prev.includes(tag) ? prev : [...prev, tag]));
    setForumTagInput("");
  }

  function removeForumTag(tag: string) {
    setForumTags(prev => prev.filter(t => t !== tag));
  }

  function addTagFromInput() {
    const tag = searchTag.trim().toLowerCase();
    if (!tag) return;
    setSelectedTags(prev => (prev.includes(tag) ? prev : [...prev, tag]));
    setSearchTag("");
    setPage(1);
  }

  function removeTag(tag: string) {
    setSelectedTags(prev => prev.filter(t => t !== tag));
    setPage(1);
  }

  function clearFilters() {
    setSelectedTags([]);
    setSearchTag("");
    setPage(1);
  }

  /* ================= API ================= */

  useEffect(() => {
    async function fetchForums() {
      setLoading(true);
      const res = await fetch(buildForumsURL());
      const json: ForumResponse = await res.json();
      setPosts(json.data);
      setPagination(json.pagination);
      setLoading(false);
    }
    fetchForums();
  }, [sortBy, selectedTags, page]);

  async function handleCreateTopic() {
    if (!title.trim() || !body.trim()) return;

    setSubmitting(true);

    const res = await fetch("http://localhost:8080/api/v1/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        author: "Anurag Sharma",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        tags: forumTags,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      alert("Failed to create forum");
      return;
    }

    setTitle("");
    setBody("");
    setForumTags([]);
    setCreateForum(false);
    setPage(1);
  }

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) w-full">

      <Hero
        text={`Ask Community And <br/> Support Each Other`}
        isImage={false}
        createTopic={!createForum}
        onCreateTopic={() => setCreateForum(true)}
      />

      {/* ================= CREATE FORUM ================= */}
      {createForum ? (
        <div className="border-t border-(--gray-500) p-4 sm:p-6 lg:p-10 relative">

          <button
            onClick={() => setCreateForum(false)}
            className="absolute top-4 right-4 text-xl font-semibold"
          >
            ✕
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Create New Topic
          </h2>

          <div className="mb-6">
            <label className="block font-medium">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium">Description</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mb-8">
            <label className="block font-medium">Tags</label>
            <div className="border rounded-md p-2 flex flex-wrap gap-2">
              {forumTags.map(tag => (
                <span
                  key={tag}
                  onClick={() => removeForumTag(tag)}
                  className="px-2 py-1 bg-(--gray-200) rounded text-sm cursor-pointer"
                >
                  {tag} ✕
                </span>
              ))}
              <input
                value={forumTagInput}
                onChange={e => setForumTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addForumTag();
                  }
                }}
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCreateTopic}
              disabled={submitting}
              className="bg-(--primary-green) px-6 py-2 rounded font-medium"
            >
              {submitting ? "Creating..." : "Create Topic"}
            </button>

            <button
              onClick={() => setCreateForum(false)}
              className="px-6 py-2 border border-(--gray-500) rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (

        /* ================= FEED ================= */
        <div className="border-t border-(--gray-500) grid grid-cols-1 lg:grid-cols-4">

          {/* SIDEBAR */}
          <aside className="border-b lg:border-r border-(--gray-500) p-4 sm:p-6">
            <p className="font-semibold text-lg mb-4">Sorted By</p>

            <div className="space-y-3">
              {["newest", "recent", "popular"].map(option => (
                <label key={option} className="flex gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={sortBy === option}
                    onChange={() => {
                      setSortBy(option as any);
                      setPage(1);
                    }}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="mt-8">
              <p className="font-semibold text-lg mb-3">Filter By Tags</p>
              <div className="border rounded-md p-2 flex flex-wrap gap-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    onClick={() => removeTag(tag)}
                    className="px-2 py-1 bg-(--gray-200) rounded text-sm cursor-pointer"
                  >
                    {tag} ✕
                  </span>
                ))}
                <input
                  value={searchTag}
                  onChange={e => setSearchTag(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTagFromInput();
                    }
                  }}
                  className="flex-1 outline-none text-sm"
                />
              </div>

              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 bg-(--primary-green) px-4 py-2 rounded font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </aside>

          {/* POSTS */}
          <section className="lg:col-span-3 space-y-6 sm:space-y-8">
            {loading && <p className="p-6">Loading forums...</p>}

            {!loading && posts.map(post => (
              <article key={post.id} className="border-b p-4 sm:p-6">
                <div className="flex gap-3 items-start mb-3">
                  <img
                    src={post.avatar}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-xs">
                      {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-semibold">
                  {post.title}
                </h2>

                <p className="text-sm sm:text-base mt-2 mb-3">
                  {post.body}
                </p>

                <div className="flex flex-wrap gap-2 mb-3 text-xs sm:text-sm">
                  {post.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-(--gray-200) rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap">
                  <span>👁 {post.views}</span>
                  <span>💬 {post.comments}</span>
                  <span>❤️ {post.likes}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      )}

      {/* PAGINATION */}
      {!createForum && pagination && pagination.total_pages > 1 && (
        <div className="p-4 sm:p-6 flex justify-center overflow-x-auto">
          <div className="flex border">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border-r"
            >
              ‹
            </button>

            {Array.from({ length: pagination.total_pages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-5 py-2 border-r ${
                    p === page ? "bg-(--primary-green)" : ""
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage(p => Math.min(pagination.total_pages, p + 1))}
              disabled={page === pagination.total_pages}
              className="px-4 py-2"
            >
              ›
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
