import Link from "next/link";

type BlogListItem = {
  id: string;
  title: string;
  author: string;
  short_desc: string;
  likes: number;
  image: string;
  created_at: string;
};

async function getBlogs(): Promise<BlogListItem[]> {
  const res = await fetch("http://localhost:8080/api/v1/blogs", {
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <div className='max-w-7xl mx-auto border-x border-b border-(--gray-500)'>
        <div className='flex justify-between items-end px-6 pb-2 pt-10'>
            <div>
                <p className='text-2xl font-semibold'>Blogs</p>
                <button>Newest</button>
                <button>Popular</button>
            </div>
            <div>
                Filter
            </div>
        </div>
        <div className="grid grid-cols-4 border-t border-(--gray-500)">
  {blogs.map((blog, index) => (
  <a
  key={blog.id}
  href={`/blog/${blog.id}`}
  className={`
    relative
    border-(--gray-500)
    border-r border-b
    col-4n:no-r
    ${index >= blogs.length - 4 ? 'last-row:border-b' : ''}
    transition block group
    overflow-hidden
    hover:bg-white
  `}
>

<div className="p-6 flex flex-col space-y-1">
    <div className="flex justify-center">
      <img src={blog.image} alt={blog.title} className="h-full object-cover rounded" />
    </div>

    <h3 className="text-xl font-medium pt-2">{blog.title}</h3>
    <p className="text-sm text-(--primary-dark) font-medium">{blog.author}</p>

    <p className="text-sm text-(--gray-700) leading-relaxed line-clamp-2">
      {blog.short_desc}
    </p>

    {/* NORMAL FOOTER NOW BELONGS TO CONTENT */}
    <div
      className="
        flex justify-between
        text-sm font-medium text-(--gray-700)
      "
    >
      <div>{blog.created_at}</div>
      <p>{blog.likes}</p>
    </div>
  </div>

  {/* HOVER GREEN BAR (ONLY ABSOLUTE ELEMENT) */}
  {/* <div
    className="
      absolute bottom-0 left-0 w-full
      hidden group-hover:flex
      bg-(--primary-green)
      py-4 px-6 justify-center
      font-medium text-sm
    "
  >
    →
  </div> */}

          </a>
          ))}
        </div>
        <div className='p-8'>

        </div>
    </div>
  )
}