import React from "react";
import Image from "next/image"; 
import Link from "next/link"; 
import { PostBody, PostTitle } from "@/components/Post"; 
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

async function Post({ params }) {
  const post = await fetchPost(params)

  return (
    <div className="w-3/4 mx-auto">
       <div className="py-16">
         <PostTitle>{post.fields.title}</PostTitle>
       </div>
       <Link href="/" 
             className="text-base text-indigo-600 hover:text-indigo-500">
         Home
       </Link>
       <div className="relative h-80 my-10">
         <Image src={"https://" + post.fields.featuredImage.fields.file.url} alt="post-img"  fill 
                style={{ objectFit: "cover", }} />
       </div>
       <PostBody>{post.fields.content}</PostBody>
     </div>
    );
}

async function fetchPost(params) {
  const id = getIdFromSlug(params.slug);
  const post = await client.getEntry(id);
  return post;
}

function getIdFromSlug(slug) {
  const id = slug.split("___")[1];
  return id; 
}

export default Post;


