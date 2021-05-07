import { fireEvent } from '@testing-library/dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import StoryModal from '../../components/story-modal/story-modal.component';
import StoryPreview from '../../components/story-preview/story-preview.component';
import { ModalStoryContext } from '../../context/modal-story.context';
import { firestore, getStories, setUpData } from '../../firebase/firebase.utils';

import {GrAdd} from 'react-icons/gr';
import NewStory from '../../components/new-story/new-story.component';

const StoriesPage = ({ match, history }) => {
    const [currentBoard, setCurrentBoard] = useState(null)
    const [stories, setStories] = useState([]);
    const [modalStory, setModalStory] = useContext(ModalStoryContext);
    const [creatingStory, setCreatingStory] = useState(false)


    
    
    

    function allowDrop(allowdropevent) {
        allowdropevent.preventDefault();
    }

    function drop(dropevent, newStatus) {
        dropevent.preventDefault();
        let id = dropevent.dataTransfer.getData("id");
        let storiesClone = [...stories];
        storiesClone.forEach(story=>{
            if(story.id === id){ 
                story.status = newStatus;
                updateModalStory(story)
            };
        })
        setStories(storiesClone)
    }
    //    if(stories.length < 8) currentBoard && setUpData(currentBoard.id);
    const updateModalStory = async (story) => {
        if (!currentBoard) return;
        let { id, ...storyData } = story
        
        
        await firestore.doc(`dashboards/${currentBoard.id}/stories/${id}`).set({ ...storyData })
    }

    const deleteModalStory = async () =>{
        if (!currentBoard) return;
        await firestore.doc(`dashboards/${currentBoard.id}/stories/${modalStory.id}`).delete()
    }



    useEffect(() => {
        
        let dashboardNameRef = firestore.doc(`dashboards/${match.params.id}`);
        dashboardNameRef.get().then(async data => setCurrentBoard(() => ({
            id: match.params.id,
            data: data.data()
        })))
        let storiesref = firestore.collection(`dashboards/${match.params.id}/stories`);
        storiesref.get().then(async snapshot => setStories(() => getStories(snapshot)));



        modalStory && updateModalStory(modalStory);
    }, [modalStory,creatingStory])

    return (
        <div className='stories-page items-center py-10 ' >
            <div className='px-14 flex flex-row justify-between' >
                <p className='text-3xl capitalize '>{currentBoard && currentBoard.data.name}</p>
               <section className='flex flex-row pt-2 space-x-2 rounded-sm hover:bg-gray-200 px-2 py-2 cursor-pointer ' onClick={()=>setCreatingStory(true)}  >
               <GrAdd size={25} className='align-middle' /> <p className='text-xl capitalize align-middle'> new story</p>
               </section> 
            </div>
            <div className='stories-overview flex flex-row px-12 py-10' >

                   <div className=' flex flex-col bg-gray-300 w-1/4 mx-2 py-2 px-2 items-center' >
                     <p className='text-lg text-gray-700 font-medium text-center w-full' >New</p>
                    <div className='w-full min-h-full ' onDragOver={(even) => allowDrop(even)} onDrop={(even) => drop(even,'new')}  
                    >
                    {
                        stories.filter(story=> story.status === 'new').map(story =>
                            <StoryPreview key={story.id} story={story} setModalStory={setModalStory} />

                        )
                    }
                   </div> 
                </div>
                <div className=' flex flex-col bg-gray-300 w-1/4  mx-2 py-2 px-2 items-center' >
                     <p className='text-lg text-gray-700 font-medium text-center w-full' >In Progress</p>
                    <div className='w-full min-h-full ' onDragOver={(even) => allowDrop(even)} onDrop={(even) => drop(even,'in progress')} >
                    {
                        stories.filter(story=> story.status ==='in progress').map(story =>
                            <StoryPreview key={story.id} story={story} setModalStory={setModalStory} />

                        )
                    }
                    </div>
                </div>
                <div className=' flex flex-col bg-gray-300 w-1/4 mx-2 py-2 px-2 items-center ' >
                     <p className='text-lg text-gray-700 font-medium text-center w-full' >Blocked</p>
                    <div className='w-full min-h-full ' onDragOver={(even) => allowDrop(even)} onDrop={(even) => drop(even,'blocked')}  
                    >
                    {
                        stories.filter(story=> story.status ==='blocked').map(story =>
                            <StoryPreview key={story.id} story={story} setModalStory={setModalStory} />

                        )
                    }
                    </div>
                </div>
                <div className=' flex flex-col max-h-screen bg-gray-300 w-1/4 mx-2 py-2 px-2 items-center' >
                     <p className='text-lg text-gray-700 font-medium text-center w-full' >Completed</p>
                    <div className='w-full min-h-full ' onDragOver={(even) => allowDrop(even)} onDrop={(even) => drop(even,'completed')}  
                    >
                    {
                        stories.filter(story=> story.status ==='completed').map(story =>
                            <StoryPreview key={story.id} story={story} setModalStory={setModalStory} />

                        )
                    }
                    </div>
                </div>
            </div>
            {
                modalStory
                    ?

                    <StoryModal modalStory={modalStory} setModalStory={setModalStory} updateModalStory={updateModalStory} deleteModalStory={deleteModalStory} />

                    :
                    null
            }
            {
                creatingStory && <NewStory boardId={currentBoard.id} setCreatingStory={setCreatingStory} />
            }
        </div>
    )
}

export default StoriesPage;