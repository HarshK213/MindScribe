import React, { useState } from "react";
import { RemoveFromNotes } from "../redux/noteslice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { Link } from "react-router";




const NoteBlock = ({ note }) => {

  const shareURL = `http://localhost:5173/notes/${note._id}`;

  const title = `Sharing notes \n Title : ${note.title}`;

  const dispatch = useDispatch();

  const [isActive, setisActive] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard");
  };

  const handleDelete = (NoteID) => {
    dispatch(RemoveFromNotes(NoteID));
  };

  const handleShare = () => {
    isActive ? setisActive(false) : setisActive(true);
  };
  
  return (
    <div
      className={`${isActive ? "h-[210px]" : "h-[150px]"} w-[900px] my-4 flex flex-col items-center border-[2px] rounded-2xl border-[#ffdbdb]`}
    >
      {/* Info Bar */}
      <div className="h-[150px] w-[900px] p-4 flex justify-between">
        {/* Left Part having title and content */}
        <div className="flex flex-col justify-evenly w-[60%]">
          {/* For Title */}
          <div className="text-5xl font-bold">{note.title}</div>

          {/* For Content */}
          <div className="text-sm">{note.content}</div>
        </div>

        {/* Right part having button and date of creation. */}
        <div className="flex flex-col items-end justify-between w-[40%]">
          {/* For Date of creation */}
          <div>{note.createdAt}</div>

          {/* For Buttons */}
          <div className="flex gap-4">
            <button
              className="border-[1px] rounded text-sm px-[3px] p-[1px]"
            >
              <Link  to={`/?NoteID=${note._id}`}>
                Edit
              </Link>
            </button>
            <button
              className="border-[1px] rounded text-sm px-[3px] p-[1px]"
              onClick={() => handleDelete(note?._id)}
            >
              Delete
            </button>
            <button
              className="border-[1px] rounded text-sm px-[3px] p-[1px]"
              onClick={handleShare}
            >
              Share
            </button>
            <button
              className="border-[1px] rounded text-sm px-[3px] p-[1px]"
            >
              <Link to={`/notes/${note._id}`}>
                View
              </Link>
            </button>
            <button
              className="border-[1px] rounded text-sm px-[3px] p-[1px]"
              onClick={() => handleCopy(note.content)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Sharing Options */}
      <div
        className={`h-[50px] w-[880px] border-[1px] border-white rounded-full p-2 flex items-center justify-between ${isActive ? "block" : "hidden"}`}
      >

        {/* Share Icons */}
        <div className="flex gap-2">

          <TwitterShareButton url={shareURL} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          
          <EmailShareButton url={shareURL} title={title}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          
          <WhatsappShareButton url={shareURL} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        
        </div>

        {/* Share Link with Copy Button */}
        <div className="h-[30px] w-[300px] bg-black pl-3 rounded-full flex justify-between items-center">
          <input
            className="h-[30px]"
            type="text"
            value={`http://localhost:5173/notes/${note._id}`}
            disabled
          />
          <button
            className="size-[20px] bg-white rounded-full flex justify-center items-center"
            onClick={(e) => {
              e.preventDefault;
              navigator.clipboard.writeText(
                `http://localhost:5173/notes/${note._id}`
              );
              toast.success("Link copied to Clipboard");
            }}
          >
            <img
              src="https://img.icons8.com/?size=100&id=86216&format=png&color=000000"
              alt=""
              className="size-[15px]"
            />
          </button>
        </div>

        {/* Close Button */}
        <button onClick={() => setisActive(false)}>
          <img
            src="https://img.icons8.com/?size=100&id=79023&format=png&color=FFFFFF"
            className="size-[30px]"
          />
        </button>

      </div>

    </div>
  );
};

export default NoteBlock;
