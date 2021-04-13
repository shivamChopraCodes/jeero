import React from 'react';


const StoryPreview = ({story,setModalStory}) =>{
  const {name, id} = story;
  
  function drag(dragevent) {
    dragevent.dataTransfer.setData("id", id);
}
    return (
        <div className='storey-preview text-center w-full py-3 my-2 shadow-md bg-blue-50' draggable onDragStart={(even) => drag(even)} >
          <p className='text-3xl cursor-pointer' onClick={()=>setModalStory(story)}  >{name}</p>
        </div>
    )
}

export default StoryPreview;             