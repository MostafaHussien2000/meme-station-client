import React from "react";
import PostCard from "../components/PostCard";
import Button from "../components/Button"

function NewFeedPage() {
  document.title = "MEME STATION | FEED"
  return (
    <main id="new-feed-page">
      <section>as</section>
      <section id="posts-feed">
        <Button type="upload" />
        <PostCard />
      </section>
      <section>csx</section>
    </main>
  );
}

export default NewFeedPage;
