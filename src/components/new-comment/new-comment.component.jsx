import React, { useContext, useEffect, useState } from 'react';
import { ModalStoryContext } from '../../context/modal-story.context';
import firebase,{ firestore } from '../../firebase/firebase.utils';


export const createFirebaseTimestamp = () => {
    return firebase.firestore.Timestamp.fromDate(new Date())
}

const NewComment = ({updateModalStory}) =>{
    const [modalStory, setModalStory] = useContext(ModalStoryContext);
    const [isFocused, setIsFocused] = useState(false);
    const [newComment, setNewComment] = useState({
        createdBy : '',
        message : '',
        time : ''
    });


    const handleSave = () =>{
        setModalStory(prev=>({
            ...prev,
            comments : [newComment,...prev.comments]
        }))
        setNewComment({
            createdBy : '',
            message : '',
            time : ''
        })
        setIsFocused(prev => !prev)
        console.log(modalStory);
        // updateModalStory(modalStory)

    }

    const handleCancel = () =>{
        
        setNewComment({
            createdBy : '',
            message : '',
            time : ''
        })
        setIsFocused(false)
    }
    let time = createFirebaseTimestamp();

    return (
        <div className='new-comment flex flex-col px-4 py-2' >
            <textarea placeholder='Add comment here' rows='2' cols='10'
            className='focus:bg-white focus:border-blue-700 bg-gray-100' onFocus={()=>setIsFocused(true)}
            value = {newComment.message} onChange={(e)=>setNewComment(prev => ({
              commentBy : 'User',
               message : e.target.value,
               time
                }))}
              ></textarea>
              {
                  isFocused
                  ?
                  (
                      <div className='flex flex-row' >
                        <button className='bg-blue-700 px-2 py-1 text-gray-100 my-2 rounded-sm' onClick={handleSave} >Save</button>
                        <button  className='text-gray-700 px-2 py-1 hover:bg-gray-100 mx-2 my-2 rounded-sm' onClick={handleCancel}>Cancel</button>
                      </div>
                  )
                  :
                  null
              }
        </div>
    )
}

export default NewComment;