import axios from "axios";
import { useContext, useState } from "react";

import { FiUpload } from "react-icons/fi"
import LoggedUserContext from "../context/loggedUserContext";
import { BASE_URL } from "../server-connection";

function Button({ type, state, username }) {

  switch (type) {
    case "follow":
      return <FollowButton state={state} username={username} />;

    case "upload":
      return <UploadNewMemeButton />

    default:
      return <button>Nope!</button>;
  }
}

export default Button;

function FollowButton({ state, username }) {
  const [following, setFollowing] = useState(state === 0 ? false : true);

  const { loggedUser } = useContext(LoggedUserContext);

  const follow = () => {
    axios({
      method: "PUT",
      url: BASE_URL + "/user/follow/" + username,
      headers: {
        accessToken: loggedUser.accessToken
      }
    }).then(res => {
      setFollowing(true)
    }).catch(err => console.error(err))
  };

  const unFollow = () => {
    axios({
      method: "PUT",
      url: BASE_URL + "/user/unfollow/" + username,
      headers: {
        accessToken: loggedUser.accessToken
      }
    }).then(res => {
      setFollowing(false);
    }).catch(err => console.error(err))
  };

  return (
    <button
      className={`button follow-button ${following ? "following" : ""}`}
      onClick={following ? unFollow : follow}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}

function UploadNewMemeButton() {
  return (
    <button className="button upload-button">
      <FiUpload color="#ffffff" />
      <span>Upload new meme !</span>
    </button>
  )
}
