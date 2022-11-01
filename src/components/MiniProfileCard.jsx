import { useContext } from "react"
import { FiSettings } from "react-icons/fi"
import { Link } from "react-router-dom"
import LoggedUserContext from "../context/loggedUserContext"
import { BASE_URL } from "../server-connection"
import { motion } from "framer-motion"

function MiniProfileCard() {
    const { loggedUser } = useContext(LoggedUserContext)

    return (
        <motion.main id="mini-profile-card" layoutId="profile-info">
            <div className="cover">
                {
                    loggedUser?.data?.coverPicture ? (
                        <img
                            src={
                                BASE_URL +
                                "/user/uploads/" +
                                loggedUser?.data?.coverPicture?.split("\\")[1]
                            }
                            alt="profile pic"
                        />
                    ) : (
                        <></>
                    )
                }

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
                <motion.div className="actions"
                    initial={{
                        y: 100,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    exit={{
                        y: 100,
                        opacity: 0
                    }}
                >
                    <Link className="primary" to={"/profile/" + loggedUser?.data?.username}>View profile</Link>
                    <Link className="secondary" to={"/settings"}>
                        <FiSettings />
                    </Link>
                </motion.div>
            </center>
        </motion.main>
    )
}

export default MiniProfileCard