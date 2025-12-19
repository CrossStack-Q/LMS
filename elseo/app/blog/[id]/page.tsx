import Hero from "@/app/components/Hero";

type BlogItem = {
  ID: string;
  Title: string;
  Author: string;
  ShortDesc: string;
  Likes: number;
  Content: string;
  Image: string;
  CreatedAt: string;
};

async function getBlog(id: string): Promise<BlogItem> {
  const res = await fetch(`http://localhost:8080/api/v1/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.log("Failed to fetch blog");
  }

  return res.json();
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);

  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500)">
      {/* Blog Page ID: {blog.ID} */}
      <Hero text={blog.Title} isImage={true}
      desc={blog.ShortDesc}
      author={blog.Author}
      />
      <div className="grid grid-cols-4 border-t border-(--gray-500)">
        {/* <div className="col-span-1 border-r border-(--gray-500)">
l
        </div> */}
        <div className="col-span-4 p-6">
          <div dangerouslySetInnerHTML={{ __html: blog.Content }} />
        </div>
      </div>
    </div>
  );
}
