import { useEffect, useContext, useState } from "react";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import MiniProfileCard from "../components/MiniProfileCard";
import LoggedUserContext from "../context/loggedUserContext";
import axios from "axios";
import PostPlaceholder from "../components/PostPlaceholder";

function NewFeedPage() {
  document.title = "Meme Station | FEED";

  const { loggedUser } = useContext(LoggedUserContext);

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([]);

  const [index, setIndex] = useState(0);

  const getPosts = async () => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8080/post/timeline?index=" + index,
      headers: {
        accessToken: loggedUser.accessToken,
      },
    });

    console.dir(response.data);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/post/timeline?index=" + index,
      headers: {
        accessToken: loggedUser.accessToken,
      },
    })
      .then((res) => {
        setLoading(false)
        setError(false)
        setPosts(res.data);
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
      });
  }, []);

  return (
    <main id="new-feed-page">
      <section id="left-panel">
        <MiniProfileCard />
      </section>
      <section id="posts-feed">
        <Button type="upload" />
        {/* {posts ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              username={post.username}
              caption={post.caption}
              upvotesCount={post.upVotes.length}
              downvotesCount={post.downVotes.length}
              time={post.createdAt}
            />
          ))
        ) : (
          <div className="loading">
            <PostPlaceholder />
            <PostPlaceholder />
            <PostPlaceholder />
          </div>
        )} */}

        {
          loading ? (
            <div className="loading">
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
            </div>
          ) :
            error ? (
              <center>
                <p>Something went wrong. Try reloading the page.</p>
              </center>
            ) : (
              posts && posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    username={post.username}
                    caption={post.caption}
                    upvotesCount={post.upVotes.length}
                    downvotesCount={post.downVotes.length}
                    time={post.createdAt}
                  />
                ))
              ) : (
                <center>
                  <p>No posts to view. Follow someone to view their latest posts in the feed.</p>
                </center>
              )
            )

        }
      </section>
      <section id="right-panel">as</section>
    </main>
  );
}

export default NewFeedPage;
