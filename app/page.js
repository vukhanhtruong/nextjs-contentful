import React from "react";
import { createClient } from "contentful";
import { PostCard, PostTitle } from "@/components/Post";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

async function Home() {
  const entries = await client.getEntries({
    content_type: 'pageBlogPost'
  });
  const posts = entries.items; 

  return (
    <div className="w-3/4 mx-auto">
      <div className="py-16">
        <PostTitle>My Blog Post</PostTitle>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {posts.map((post) => {
          return (
            <PostCard
              id={post.sys.id}
              key={post.sys.id}
              slug={post.fields.slug + "___" + post.sys.id}
              title={post.fields.title}
              createdAt={post.sys.createdAt}
              imageUrl={post.fields.featuredImage?.fields.file.url}
            />
          )
        })}
      </div>
    </div>
  ); 
}

export const metadata = {
  title: "Blog Posts",   description: "A demo to show Contentful and Amplify Integration", 
};

export default Home;
