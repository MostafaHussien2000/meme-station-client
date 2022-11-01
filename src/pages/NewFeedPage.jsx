import { useEffect, useContext, useState } from "react";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import MiniProfileCard from "../components/MiniProfileCard";
import LoggedUserContext from "../context/loggedUserContext";
import axios from "axios";
import PostPlaceholder from "../components/PostPlaceholder";
import { BASE_URL } from "../server-connection";

function NewFeedPage() {
  document.title = "Meme Station | FEED";

  const { loggedUser } = useContext(LoggedUserContext);

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([]);

  const [index, setIndex] = useState(0);


  const getPosts = async () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/post/timeline?index=" + index,
      headers: {
        accessToken: loggedUser.accessToken,
      },
    }).then(res => {
      console.dir(res.data);
    }).catch(err => {
      setError(err.response.data.message)
    })
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: BASE_URL + "/post/timeline?index=" + index,
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
  }, [index]);

  return (
    <main id="new-feed-page">
      <section id="left-panel">
        <MiniProfileCard />
      </section>
      <section id="posts-feed">
        <Button type="upload" />
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
                    upVoted={post.upVotes.includes(loggedUser.data.username)}
                    downVoted={post.downVotes.includes(loggedUser.data.username)}
                    time={post.createdAt}
                    postId={post._id}
                  />
                )
                )
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
