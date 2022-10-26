import React from 'react'
import { HiOutlineArrowSmDown, HiOutlineArrowSmUp } from 'react-icons/hi'
import { MdModeComment } from 'react-icons/md'

function PostPlaceholder() {
    return (
        <div className="post-loader">
            <div className="head">
                <div className="pic placeholder"></div>
                <div className="info">
                    <div className="username placeholder"></div>
                    <div className="full-name placeholder"></div>
                </div>
            </div>
            <div className="body">
                <div className="caption line-one placeholder"></div>
                <div className="caption line-two placeholder"></div>
                <div className="meme">
                    <div className="pic placeholder"></div>
                    <div className="actions ">
                        <HiOutlineArrowSmUp />
                        <HiOutlineArrowSmDown />
                        <MdModeComment />
                    </div>
                </div>
            </div>
            <div className="tail">
                <div className="pic placeholder"></div>
                <div className="box placeholder"></div>
            </div>
        </div>
    )
}

export default PostPlaceholder