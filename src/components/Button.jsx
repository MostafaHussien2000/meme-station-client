import { useState } from "react";

import { FiUpload } from "react-icons/fi"

function Button({ type }) {
  switch (type) {
    case "follow":
      return <FollowButton />;

    case "upload":
      return <UploadNewMemeButton />

    default:
      return <button>Nope!</button>;
  }
}

export default Button;

function FollowButton() {
  const [following, setFollowing] = useState(false);

  const follow = () => {
    setFollowing(true);
  };

  const unFollow = () => {
    setFollowing(false);
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
