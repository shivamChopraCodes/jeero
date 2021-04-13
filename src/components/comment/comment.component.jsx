import React, { useContext, useState } from 'react';
import { ModalStoryContext } from '../../context/modal-story.context';
import EditComment from '../edit-comment/edit-comment.component';

const CommentComponent = ({ comment,index }) => {
    let { commentBy, message, time  } = comment;
    const [isEditing,setisEditing] = useState(false);
    const [modalStory,setModalStory] = useContext(ModalStoryContext);
    let date = time.toDate().toDateString();
    const handleDelete = () =>{
        let comments = modalStory.comments.filter((comment, i)=> i !== index && comment )
        setModalStory(prev=>({
            ...prev,
            comments : [...comments]
        }))
    }
    return (
        <div className='flex flex-col px-4 my-4' >
            <div className='flex flex-row justify-between my-2' >
                <p className='font-medium text-base' >{commentBy}</p>
                <p className='px-3 font-medium text-base' > {date} </p>
            </div>
           { 
               !isEditing
               ?
               <div className='text-left ' >
                <p>{message}</p>
            </div>
            :
            <EditComment comment={comment} index={index} setIsEditing={setisEditing} />
            }
            <div className='flex flex-row my-2' >
                <p className=' text-gray-700 text-sm cursor-pointer mr-2'
                onClick={()=>setisEditing(true)}
                >Edit</p>
                <p className=' text-gray-700 text-sm cursor-pointer'
                onClick={handleDelete}
                >Delete </p>
            </div>
        </div>
    )
}

export default CommentComponent;