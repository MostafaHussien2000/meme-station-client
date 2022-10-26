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


function Profile() {
    const { username } = useParams()

    const { loggedUser } = useContext(LoggedUserContext);
    document.title = loggedUser?.data?.firstName + " " + loggedUser?.data?.lastName || "Undefined"

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState({})


    useEffect(() => {
        axios({
            method: "GET",
            url: BASE_URL + "/user/" + username,
        }).then((res) => {
            console.log(res.data)
            setUser(res.data)
            setLoading(false)
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
                                <img
                                    src={
                                        BASE_URL +
                                        "/user/uploads/" +
                                        loggedUser?.data?.coverPicture?.split("\\")[1]
                                    }
                                    alt="profile pic"
                                />
                            </div>
                            <center className="info">
                                <div className="profile-pic">
                                    <img
                                        src={
                                            BASE_URL +
                                            "/user/uploads/" +
                                            loggedUser?.data?.profilePicture?.split("\\")[1]
                                        }
                                        alt="profile pic"
                                    />
                                </div>
                                <h1 className="full-name">
                                    {" "}
                                    {loggedUser?.data?.firstName + " " + loggedUser?.data?.lastName}
                                </h1>
                                <h4 className="username">@{loggedUser?.data?.username}</h4>
                                <div className="states">
                                    <div className="state">
                                        <h4 className="name">Following</h4>
                                        <h2 className="number">
                                            {loggedUser?.data?.followingCount || 50}
                                        </h2>
                                    </div>
                                    <div className="state">
                                        <h4 className="name">Followers</h4>
                                        <h2 className="number">
                                            {loggedUser?.data?.followersCount || 22}
                                        </h2>
                                    </div>
                                    <div className="state">
                                        <h4 className="name">Memes</h4>
                                        <h2 className="number">70</h2>
                                    </div>
                                </div>
                                {
                                    loggedUser?.data?.username === username ? (
                                        <Link to="/settings" className="settings">
                                            <FiSettings />
                                        </Link>
                                    ) : (
                                        <></>
                                    )
                                }
                            </center>
                        </motion.section>
                        <Button type="upload" />
                        <PostCard />
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
