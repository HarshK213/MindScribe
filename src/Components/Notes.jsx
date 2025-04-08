import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFromNotes } from "../redux/noteslice";
import NoteBlock from "./NoteBlock";
import { ResetAllNotes } from "../redux/noteslice";

const Notes = () => {

    const notes = useSelector((states) => states.note.notes);
    // console.log(notes);
    const [searchQuery, setsearchQuery] = useState('');
    const dispatch = useDispatch();
    const DeleteAllNotes = () => {
        dispatch(ResetAllNotes())
    }

    const filteredData = notes.filter(
            (note) => typeof note.title === "string" ? note.title.toLowerCase().includes(searchQuery.toLowerCase()):console.log(note.title)
    )

    const [ShareActive, setShareActive] = useState(true);
    return(
        <div className="p-5 flex flex-col gap-10">
            <div className="flex items-center gap-4">
                <input 
                    className="h-10 min-w-[350px] max-w-[600px] px-3 bg-neutral-950 rounded-xl text-white"
                    type="search"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={(e) => setsearchQuery(e.target.value)}
                />      
                <button 
                    onClick={DeleteAllNotes}
                    className="px-4 py-2 rounded-full bg-amber-900 text-white font-medium hover:bg-amber-800 transition-all"
                >
                    Delete All Notes
                </button>
            </div>    

            <div>
                {
                    filteredData.length > 0 &&
                    filteredData.map(
                        (note) => {
                            return(
                                <div key={note._id}> {/*make sure to use _id as key*/}
                                    <NoteBlock note={note} ShareActive={ShareActive} setShareActive={setShareActive}/>
                                </div>
                            )
                        }
                    )
                }
                
            </div>  
        </div>
    )
} 
export default Notes