import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";

const ViewNote = () => {

    const {id} = useParams();
    const allNotes = useSelector((state) => state.note.notes)
    const note = allNotes.find((n) => n._id === id)
    console.log(note)
    const title = note.title
    const Text = note.content

    return(
        <div className="p-5 flex flex-col gap-10">
           
            <div className="flex gap-4">
                <input type="text"
                    placeholder="Write your Title here"
                    value={title}
                    className="h-10 min-w-[350px] px-3 bg-neutral-950 rounded-xl"
                    disabled
                />

                <button>
                    <Link  to={`/?NoteID=${note._id}`}>
                        Edit
                    </Link>
                </button>
            </div>

            <div className="flex justify-center">
                <textarea 
                    value={Text}
                    placeholder="Write your Notes"
                    className="w-[100%] max-w-5xl bg-black rounded-2xl p-3"
                    rows={20}
                    disabled
                />
            </div>
            
        </div>
    )
}

export default ViewNote