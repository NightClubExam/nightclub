//Nanna
import Navigation from "../../components/Navigation";
import { Suspense } from "react";
import Footer from "../../components/Footer";
import Image from "next/image";
import PageHero from "../../components/PageHero";
import CommentSection from "../../components/CommentSection";

export default function BlogPost({ searchParams }) {
  return (
    <div>
      <Navigation />
      <Suspense>
        <Filtreringscontainer searchParams={searchParams} />
      </Suspense>
      <CommentSection />
      <Footer />
    </div>
  );
}
async function Filtreringscontainer({ searchParams }) {
  // Henter id fra URL'en — fx /detalje?id=7
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
          className="object-cover w-full h-66 md:h-[500px] lg:h-[600px]"
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
