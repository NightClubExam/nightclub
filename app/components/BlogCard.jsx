"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PrimaryButton from "./PrimaryButton";

const BlogCard = () => {
  const [blogCard, setBlogCard] = useState([]);

  useEffect(() => {
    async function fetchBlogCard() {
      const res = await fetch("http://localhost:4000/blogposts");
      const data = await res.json();
      setBlogCard(data);
    }
    fetchBlogCard();
  }, []);

  return (
    <div className="flex flex-col gap-10 mt-10">
      {blogCard.map((post, index) => (
        <article
          key={post.id}
          // Gør at billederne placerer sig skiftevis højre/venstre
          className={`flex flex-col md:flex-row items-center gap-6
        ${index === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          {/* Billede */}
          <div className="relative h-48 sm:h-64 lg:h-96 w-full sm:w-1/2">
            <Image
              src={post.asset.url}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>

          {/* Tekst med 32px afstand fra kanten */}
          <div className="md:w-1/2 p-8">
            {" "}
            {/* px-8 = 32px padding horisontalt, py kan justeres */}
            <h3 className="mt-3">{post.title}</h3>
            <p className="text-accent font-bold text-sm my-2.5">
              {post.author} / 3 Comments / 16 Nov 2018
            </p>
            <p className="line-clamp-6">{post.content}</p>
            <div className="flex justify-center lg:justify-end my-6">
            <Link href="/blog-post">
              <PrimaryButton children="Read More" />
            </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogCard;
