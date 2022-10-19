import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

import { motion } from "framer-motion"
import { useContext } from "react";
import LoggedUserContext from "../context/loggedUserContext";

function HomePage() {
  const { loggedUser, setLoggedUser } = useContext(LoggedUserContext);
  console.log(loggedUser)

  return (
    <main

      className="home-page"
    >
      <motion.header
        initial={
          {
            y: -100
          }
        }
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo">
          <img src={logo} alt="application-logo" />
          <span>Meme Station</span>
        </div>
        <div className="actions">
          {
            loggedUser.accessToken ?
              (<>
                <button id="logout" onClick={() => setLoggedUser({})}>Logout</button>
              </>) : (<>
                <Link to={"/login"} id="login">Login</Link>
                <Link to={"/create-account"} id="create-account">Create account</Link>

              </>)
          }
        </div>
      </motion.header>
      <center>
        <motion.div
          initial={
            {
              scale: 0.6,
              opacity: 0
            }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
        >
          <h1>The first all-in-one<br />meme platform</h1>
          <Link to={"/create-account"} id="join">Join and explore memes !</Link>
        </motion.div>
      </center>
    </main>
  );
}

export default HomePage;
