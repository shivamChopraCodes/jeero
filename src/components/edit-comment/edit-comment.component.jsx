import React, { useContext, useState } from 'react';
import { ModalStoryContext } from '../../context/modal-story.context';
import firebase,{ firestore } from '../../firebase/firebase.utils';

const EditComment = ({ comment, index, setIsEditing }) => {
    const [editedComment, setEditedComment] = useState({
        message : comment.message
    });
    const [modalStory, setModalStory] = useContext(ModalStoryContext);
    const createFirebaseTimestamp = () => {
        return firebase.firestore.Timestamp.fromDate(new Date())
    }
    const handleSave = () =>{
        let comments = modalStory.comments;
        comments[index] = editedComment;
        setModalStory(prev=>({
            ...prev,
            comments : [...comments]
        }))
        setIsEditing(false)
    }
        const handleCancel = ( ) => {
        setIsEditing(false);
        setEditedComment(null);
        }

let time = createFirebaseTimestamp();
    return (
        <div className='new-comment flex flex-col px-4 py-2'>
            <textarea  rows='2' cols='10'
                className='focus:bg-white focus:border-blue-700 bg-gray-100'
                value={editedComment.message} onChange={(e) => setEditedComment(prev => ({
                    commentBy: 'User',
                    message: e.target.value,
                    time
                }))}
            ></textarea>
              <div className='flex flex-row' >
                        <button className='bg-blue-700 px-2 py-1 text-gray-100 my-2 rounded-sm' onClick={handleSave} >Save</button>
                        <button  className='text-gray-700 px-2 py-1 hover:bg-gray-100 mx-2 my-2 rounded-sm' onClick={handleCancel}>Cancel</button>
                      </div>
        </div>
    )

}

export default EditComment