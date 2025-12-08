"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const RecentBlog = () => {
  const [RecentBlog, setRecentBlog] = useState([]);

  // Hent kategorier fra API
  useEffect(() => {
    async function fetchRecentBlog() {
      const res = await fetch("http://localhost:4000/blogposts");
      const data = await res.json();
      setRecentBlog(data);
    }
    fetchRecentBlog();
  }, []);
  return (
    <div className="max-w-[80%] mx-auto flex flex-col items-center">
      <div className="max-w-[75%] mx-auto flex flex-col items-center mt-20 relative mb-5">
        <h1>Recent Blog</h1>
        <Image
          src="/assets/bottom_line.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>
      <Link href="/blog">
        <ul className="sm:grid lg:flex flex-row gap-4">
          {RecentBlog.map((post) => (
            <li key={post.id} className="mb-2">
              <Image
                src={post.asset.url}
                alt="img"
                width={400}
                height={400}
                unoptimized
                className="gap-4"
              />
              <h3>{post.title}</h3>
              <p className="text-accent! font-bold! text-sm! my-2.5">
                {post.author} / 3 Comments / 16 Nov 2018
              </p>
              <p className="line-clamp-3 mb-7">{post.content}</p>
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default RecentBlog;
