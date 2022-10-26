import { BiCheckShield, BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp, HiEyeOff } from "react-icons/hi";
import { MdModeComment, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FiLink2 } from "react-icons/fi";
import { FaExclamationCircle } from "react-icons/fa"

import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../server-connection";
import LoggedUserContext from "../context/loggedUserContext";
import axios from "axios";
import { Link } from "react-router-dom";

function PostCard({ username, caption, upvotesCount, downvotesCount, time, meme }) {
  const { loggedUser } = useContext(LoggedUserContext)
  const [menu, viewMenu] = useState(false)

  const [whoPosted, setWhoPosted] = useState({})

  const covertTime = (t) => {
    const postTime = new Date(t).getTime();
    const currentTime = new Date().getTime();

    const diff = currentTime - postTime;

    /* Rules:
      * Less than minute  => just now
      * Less than hour    => minutes
      * Less than day     => hours
      * Less than month   => days
      * Less than year    => months
      * More than year    => years
    */

    if (diff < 60000) return "Just now"
    else if (diff < 3.6e+6) return `${Math.round(diff / 60000)} min`
    else if (diff < 8.64e+7) return `${Math.round(diff / 3.6e+6)} hr`
    else if (diff < 2.628e+9) return `${Math.round(diff / 8.64e+7)} day`
    else if (diff < 3.154e+10) return `${Math.round(diff / 2.628e+9)} mon`
    else if (diff > 3.154e+10) return `${Math.round(diff / 3.154e+10)} year`
    else return t

  }


  useEffect(() => {
    axios({
      method: "GET",
      url: `${BASE_URL}/user/${username}`,
    }).then((res) => {
      setWhoPosted(res.data)
    }).catch(err => console.error(err))
  }, [])
  return (
    <div className="post_card">
      <div className="top">
        <div className="profile_pic">
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            alt="memer profile pic"
          />
        </div>
        <div className="info">
          <p className="username">
            <span>@{username}</span>
            <span className="verfied">
              <BiCheckShield />
            </span>
          </p>
          <h3 className="full_name">
            <span>{whoPosted.firstName} {whoPosted.lastName}</span>
            <span className="time">{covertTime(time)}</span>
          </h3>
        </div>
        <div className="menu">
          <BiDotsVerticalRounded onClick={() => {
            viewMenu(m => !m)
          }} />
          {
            menu ? (
              <div className="menu-wrapper">
                <div className="tags">
                  <h2>Tags</h2>
                  <ul>
                    <li>#programming</li>
                    <li>#science</li>
                    <li>#hacking</li>
                    <li>#funny</li>
                    <li>#global</li>
                    <li>#web_development</li>
                  </ul>
                </div>

                <hr />
                <ul className="actions">
                  <li>
                    <span className="icon">
                      <FiLink2 />
                    </span>
                    <span className="text">Copy post link.</span>
                  </li>
                  <li>
                    <span className="icon">
                      <HiEyeOff />
                    </span>
                    <span className="text">Hide post.</span>
                  </li>
                  <li className="danger">
                    <span className="icon">
                      <FaExclamationCircle />
                    </span>
                    <span className="text">Report post.</span>
                  </li>
                </ul>
              </div>
            ) : (
              <></>
            )
          }
        </div>
      </div>
      <p className="caption">
        {caption}
      </p>
      <div className="main-part">
        <div className="meme">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT20VaxFGDv-47l6IHV-RS1NDsXaNgcRFiG4w&usqp=CAU"
            }
            alt="meme"
          />
        </div>
        <div className="actions">
          <input type="radio" id="like" name="likeOrDislike" />
          <label className="like" htmlFor="like">
            <HiOutlineArrowSmUp />
          </label>
          <input type="radio" id="dislike" name="likeOrDislike" />
          <label className="dislike" htmlFor="dislike" onClick={(e) => {
            // e.target.closest("input#dislike").checked = false
            console.log("B:", e.target.previousElementSibling.checked)
            e.target.previousElementSibling.checked = 'x'
            console.log("A:", e.target.previousElementSibling.checked)
          }}>
            <HiOutlineArrowSmDown onClick={e => e.stopPropagation()} />
          </label>
          <label className="comment" htmlFor="commentBox">
            <MdModeComment />
          </label>
        </div>
      </div>
      <div className="states">
        <div className="state likes">
          <HiOutlineArrowSmUp />
          <span className="count">{upvotesCount}</span>
        </div>
        <div className="state dislikes">
          <HiOutlineArrowSmDown />
          <span className="count">{downvotesCount}</span>
        </div>

        {/* TODO: Implement the comments count after implementing the commenting feature */}
        {/* <div className="state comment">
          <MdModeComment />
          <span className="count">??</span>
        </div> */}

      </div>
      <div className="comment">
        <Link to={`/profile/${loggedUser?.data?.username}`}>
          <div className="profile_pic">
            <img
              src={
                BASE_URL +
                "/user/uploads/" +
                loggedUser?.data?.coverPicture?.split("\\")[1]
              }
              alt="profile pic"
            />
          </div>
        </Link>
        <form
          className="comment_box"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Write your comment"
            name="commentText"
            id="commentBox"
          />
          <input type="file" alt="comment pic" id="comment_pic" />
          <label htmlFor="comment_pic">
            <MdOutlineAddPhotoAlternate />
          </label>
        </form>
      </div>
    </div>
  );
}

export default PostCard;
