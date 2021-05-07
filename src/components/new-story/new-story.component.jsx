import React, { useRef, useState } from 'react';
import { firestore } from '../../firebase/firebase.utils';
import { createFirebaseTimestamp } from '../new-comment/new-comment.component';

const NewStory = ({ boardId, setCreatingStory }) => {
    const modalRef = useRef();
    const [newStory, setNewStory] = useState(null);

    const closeModal = (e) => {
        // modalRef.current === e.target
        
    }
    const handleSave = async () => {
        if( !newStory || !newStory.name || !newStory.description || !newStory.createdBy || !newStory.assignedTo ) return alert('Please fill all details');
        let date = createFirebaseTimestamp();
        await firestore.collection(`dashboards/${boardId}/stories`).add({
            ...newStory,
            status : 'new',
            createdOn : date,
            comments : []
        })
        handleCancel();
    }

    const handleCancel = () => {
        setNewStory(null);
        setCreatingStory(null)
    }

    return (
        <div
            class="justify-center bg-indigo-600 py-16 bg-opacity-25 h-screen w-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none "
            onClick={closeModal} ref={modalRef}
        >
            <div class="relative text-left py-10 px-10 w-8/12 space-y-8 m-auto flex-col rounded-sm shadow-lg flex  bg-white border-solid" >
                <div className='name flex flex-col space-y-2' >
                    <p className='text-xl  font-medium capitalize' >name</p>
                    <input className=' border-gray-400 bg-gray-100'
                        onChange={(e) => {
                            setNewStory(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} />
                </div>
                <div className='description flex flex-col space-y-2' >
                    <p className='text-xl font-medium capitalize' >description</p>
                    <textarea rows='5' cols='50'
                        className='focus:bg-white focus:border-blue-700  bg-gray-100'
                        onChange={(e) => {
                            setNewStory(prev => ({
                                ...prev,
                                description: e.target.value
                            }))
                        }}
                    />
                </div>
                <div className='flex flex-col space-y-8' >
                    <div className='flex flex-col space-y-2' >
                        <p className='text-xl font-medium capitalize' >Reporter</p>
                        <input className='bg-gray-100'
                            onChange={(e) => {
                                setNewStory(prev => ({
                                    ...prev,
                                    createdBy: e.target.value
                                }))
                            }} />
                    </div>
                    <div className='flex flex-col space-y-2' >
                        <p className='text-xl font-medium capitalize' >Assignee</p>
                        <input className='bg-gray-100'
                            onChange={(e) => {
                                setNewStory(prev => ({
                                    ...prev,
                                    assignedTo: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className='flex flex-row' >
                        <button className='bg-blue-700 px-2 py-1 text-gray-100 my-2 rounded-sm' onClick={handleSave} >Save</button>
                        <button className='text-gray-700 px-2 py-1 hover:bg-gray-100 mx-2 my-2 rounded-sm' onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewStory;