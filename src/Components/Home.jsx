import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { AddnewNotes, UpdateNotes, ResetAllNotes } from "../redux/noteslice";

const Home = () => {
    
    const [title,settitle] = useState('');
    const [Text, setText] = useState('');
    const [searchParam, setsearchParam] = useSearchParams();
    const NoteID = searchParam.get('NoteID')

    const dispatch = useDispatch();

    // When new Note is created.
    const createNotes =()=>{
        if(title){
            const note={
                title:title,
                content:Text ,
                _id:NoteID || Date.now().toString(36),
                createdAt:new Date().toISOString()
            }
        
            if(NoteID){
                // UPDATE
                dispatch(UpdateNotes(note));
            }else{
                // CREATE
                dispatch(AddnewNotes(note));
            }
            
            // cleaning after submitting
            setText('');
            settitle('');
            setsearchParam({});
        }else{
            alert("Note must have Title")
        }
    }

    // When Exsisting note is being edited.
        // Step1. take out all notes.
        const allNotes = useSelector((state) => state.note.notes)
    
    useEffect(()=>{
        // console.log(allNotes)
        if(NoteID){
            // finding the specific note
            const note = allNotes.find((n) => n._id === NoteID)
            // console.log(note);
            settitle(note.title);
            setText(note.content)
        }
    },[NoteID])


    const DeleteAllNotes = () => {
        dispatch(ResetAllNotes())
    }
    

    return(

        <div className="p-5 flex flex-col gap-10">
            <div className="flex gap-4">
                <input type="text"
                    placeholder="Write your Title here"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    className="h-10 min-w-[350px] px-3 bg-neutral-950 rounded-xl"
                />

                <button 
                    onClick={createNotes}
                    className="min-w-[150px] rounded-full px-2 bg-amber-900"
                >
                    {
                        NoteID?'Update existing Note' : 'Create new Notes'
                    }
                </button>
            </div>

            <div className="flex justify-center">
                <textarea 
                    value={Text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your Notes"
                    className="w-[100%] max-w-5xl bg-black rounded-2xl p-3"
                    rows={20}
                />
            </div>

            <div className="flex justify-center">
                <button 
                        onClick={DeleteAllNotes}
                        className="w-[150px] h-10 rounded-full px-2 bg-amber-900"
                        >
                        Delete All Notes
                </button>
            </div>
            
        </div>

    )
}

export default Home