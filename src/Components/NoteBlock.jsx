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
    setisActive(!isActive);
  };

  return (
    <div className="w-full mb-4 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-neutral-900 p-4 relative">
        {/* Note Header with timestamp */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold break-words max-w-[70%]">{note.title}</h2>
          <span className="text-xs text-gray-400">{note.createdAt}</span>
        </div>

        {/* Note Content with overflow handling */}
        <div className="text-sm text-gray-300 break-words overflow-hidden">
          <p className="whitespace-pre-wrap">
            {note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 bg-neutral-800 text-sm rounded hover:bg-neutral-700">
            <Link to={`/?NoteID=${note._id}`}>Edit</Link>
          </button>
          <button
            className="px-3 py-1 bg-neutral-800 text-sm rounded hover:bg-neutral-700"
            onClick={() => handleDelete(note._id)}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 bg-neutral-800 text-sm rounded hover:bg-neutral-700"
            onClick={handleShare}
          >
            Share
          </button>
          <button className="px-3 py-1 bg-neutral-800 text-sm rounded hover:bg-neutral-700">
            <Link to={`/notes/${note._id}`}>View</Link>
          </button>
          <button
            className="px-3 py-1 bg-neutral-800 text-sm rounded hover:bg-neutral-700"
            onClick={() => handleCopy(note.content)}
          >
            Copy
          </button>
        </div>
      </div>

      {/* Sharing Options */}
      {isActive && (
        <div className="h-[50px] w-full border-t border-gray-700 p-2 flex items-center justify-between">
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
              className="h-[30px] bg-transparent text-white"
              type="text"
              value={shareURL}
              disabled
            />
            <button
              className="size-[20px] bg-white rounded-full flex justify-center items-center"
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(shareURL);
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
      )}
    </div>
  );
};

export default NoteBlock;
