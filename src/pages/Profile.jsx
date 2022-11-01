import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import LoggedUserContext from "../context/loggedUserContext";
import { BASE_URL } from "../server-connection";
import PostCard from "../components/PostCard"
import { FiSettings } from "react-icons/fi";
import { motion } from "framer-motion"
import ProfilePlaceholder from "../components/ProfilePlaceholder";
import axios from "axios";
import PostPlaceholder from "../components/PostPlaceholder";


function Profile() {
    const { username } = useParams()

    const { loggedUser } = useContext(LoggedUserContext);

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState({})

    const [loadingPosts, setLoadingPosts] = useState(true)
    const [postsError, setPostsError] = useState(false)
    const [posts, setPosts] = useState([])

    const [index, setIndex] = useState(0)


    useEffect(() => {
        axios({
            method: "GET",
            url: BASE_URL + "/user/" + username,
            headers: {
                accessToken: loggedUser.accessToken
            }
        }).then((res) => {
            setUser(res.data)
            document.title = res.data.firstName + " " + res.data.lastName
            setLoading(false)

            // Fetching posts
            setLoadingPosts(true)
            axios({
                method: "GET",
                url: BASE_URL + "/post/" + username + "?index=" + index,
            }).then(res => {
                setLoadingPosts(false)
                setPosts(res.data)
            }).catch(err => {
                setLoadingPosts(false)
                setPostsError(err.response.data)
            })

        }).catch(err => {
            setLoading(false);
            setError(err.response.data.message)
        })
    }, [username])

    if (!loggedUser.data)
        return (
            <center>
                <Link to="/login">Login</Link>
            </center>
        );

    return (
        <>
            {
                loading ? (
                    <ProfilePlaceholder />
                ) : error ? (
                    <center>
                        <p>{error}</p>
                    </center>
                ) : user ? (


                    <main className="user-profile">
                        <motion.section className="main-user" layoutId="profile-info">
                            <div className="cover">
                                {user.coverPicture ? <img
                                    src={
                                        BASE_URL +
                                        "/user/uploads/" +
                                        user.coverPicture?.split("\\")[1]
                                    }
                                    alt="profile pic"
                                />
                                    : <></>
                                }
                            </div>
                            <center className="info">
                                <div className="profile-pic">
                                    <img
                                        src={
                                            BASE_URL +
                                            "/user/uploads/" +
                                            user.profilePicture?.split("\\")[1]
                                        }
                                        alt="profile pic"
                                    />
                                </div>
                                <h1 className="full-name">
                                    {" "}
                                    {user.firstName + " " + user.lastName}
                                </h1>
                                <h4 className="username">@{user.username}</h4>
                                <div className="states">
                                    <div className="state">
                                        <h4 className="name">Following</h4>
                                        <h2 className="number">
                                            {user.followingCount}
                                        </h2>
                                    </div>
                                    <div className="state">
                                        <h4 className="name">Followers</h4>
                                        <h2 className="number">
                                            {user.followersCount}
                                        </h2>
                                    </div>
                                    <div className="state">
                                        <h4 className="name">Memes</h4>
                                        <h2 className="number">{user.postsCount}</h2>
                                    </div>
                                </div>
                                <div className="floating-button">
                                    {
                                        loggedUser?.data?.username === username ? (
                                            <Link to="/settings" className="settings">
                                                <FiSettings />
                                            </Link>
                                        ) : (
                                            <Button type="follow" state={user.state} username={user.username} />
                                        )
                                    }
                                </div>
                            </center>
                        </motion.section>
                        {
                            loggedUser?.data?.username === username ? (
                                <Button type="upload" />
                            ) : (
                                <></>
                            )
                        }
                        {
                            loadingPosts ? (
                                <>
                                    <PostPlaceholder />
                                    <PostPlaceholder />
                                </>
                            )
                                : postsError ? (
                                    <center><p>Server error</p></center>
                                ) : posts &&
                                    posts.length > 0 ? (
                                    posts.map((post) =>
                                        <PostCard
                                            key={post._id}
                                            username={post.username}
                                            caption={post.caption}
                                            upvotesCount={post.upVotes.length}
                                            downvotesCount={post.downVotes.length}
                                            time={post.createdAt}
                                        />
                                    )
                                ) :
                                    (
                                        <center><p>No posts to show.</p></center>
                                    )
                        }
                    </main>
                ) : (
                    <center>
                        <p>Something went wrong. Try again later!</p>
                    </center>
                )

            }
        </>

    );
}

export default Profile;
