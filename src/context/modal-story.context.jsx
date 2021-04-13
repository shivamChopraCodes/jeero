import React, { createContext, useState } from 'react';

export const ModalStoryContext = createContext();

export const ModalStoryContextProvider = props =>{
    const [modalStory, setModalStory] = useState(null);

    return (
        <ModalStoryContext.Provider value={[modalStory, setModalStory]} >
            {props.children}
        </ModalStoryContext.Provider>
    )
}