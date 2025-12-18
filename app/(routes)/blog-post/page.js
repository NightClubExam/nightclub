//NANNA
import Navigation from "../../components/layouts/Navigation";
import { Suspense } from "react";
import Footer from "../../components/layouts/Footer";
import Image from "next/image";
import PageHero from "../../components/layouts/PageHero";
import CommentSection from "../../components/blogs/CommentSection";

export default function BlogPost({ searchParams }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p>Loader blog post...</p>}>
        <BlogPostcontainer searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<p>Loader kommentarer...</p>}>
        <CommentSection />
      </Suspense>
      <Footer />
    </div>
  );
}
async function BlogPostcontainer({ searchParams }) {
  // Henter id fra URL'en — fx /detalje?id=2
  const params = await searchParams;
  const id = params.id;

  // Henter produktet fra API'et
  const response = await fetch(`http://localhost:4000/blogposts/${id}`);
  const post = await response.json();

  return (
    <>
      <PageHero title="blog post" />

      <div className="md:max-w-[80%] flex mx-auto flex-col pt-20">
        <Image
          loading="eager"
          alt={post.title}
          src={post.asset.url}
          width={350}
          height={350}
          unoptimized //prop man kan sætte på Next.js Image component for at undgå optimering, og så tager den dirkete url fra apiet
          className="object-cover w-full h-66 md:h-[500px] lg:h-[400px]"
        />
        <div className="max-w-[90%] flex mx-auto flex-col pb-20 md:max-w-full">
          <h3 className="mt-10">{post.title}</h3>
          <p className="text-accent!">
            {post.author}/ 3 Comments / 16 Nov 2018
          </p>
          <p className="mt-4">{post.content}</p>
        </div>
      </div>
    </>
  );
}
