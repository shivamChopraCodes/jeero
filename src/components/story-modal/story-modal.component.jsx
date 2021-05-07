import React, { useEffect, useRef, useState } from 'react';
import CommentComponent from '../comment/comment.component';
import NewComment from '../new-comment/new-comment.component';

import { BiTrash } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'

const StoryModal = ({ modalStory, setModalStory, updateModalStory, deleteModalStory}) => {
    const [colorsClass, setColorClass] = useState({})
    const [dropdownHidden, setDropdownHidden] = useState(true);
    const { id, name, description, comments, createdBy, createdOn, status, assignedTo } = modalStory
    const modalRef = useRef();
    const dropdownRef = useRef();
    const closeModal = (e) => {
        modalRef.current === e.target && setModalStory(null);
    }

    const colorPicker = (currentStatus) =>{
        if(currentStatus === 'in progress'){
            setColorClass({
                bgColor : 'bg-blue-700',
                color   : 'gray-100'
            })
        } else if(currentStatus === 'completed'){
            setColorClass({
                bgColor : 'bg-green-500',
                color   : 'gray-100'
            })
        } else {
            setColorClass({
                bgColor : 'bg-gray-300',
                color   : 'gray-700'
            })
        }
    }

    const handleDelete = async () =>{
        await deleteModalStory();
        setModalStory(null);

    }

    const handleStatusChange = async (e) => {
        let newStatus = e.target.innerText.toLowerCase();
        setModalStory(prev =>
        ({
            ...prev,
            status: newStatus
        }))
        setDropdownHidden(prev => !prev)
        colorPicker(newStatus)
        await updateModalStory(modalStory)
    }

    const handleDropdownRef = (e) =>{
        if(dropdownRef.current !== e.target.parentElement || dropdownRef.current !== e.target.parentElement.parentElement || dropdownRef.current !== e.target.parentElement.parentElement.parentElement ){
           !dropdownHidden && setDropdownHidden(prev => !prev);
        }
    }
    let dropdownStatus = [
        <li className='hover:bg-blue-100 my-1 py-2' onClick={handleStatusChange}><span className='text-sm font-medium rounded-sm uppercase text-gray-700 px-2 py-1 bg-gray-300 mx-2' >new</span></li>,
        <li className='hover:bg-blue-100 my-1 py-2' onClick={handleStatusChange}><span className='text-sm font-medium rounded-sm uppercase text-gray-700 px-2 py-1 bg-gray-300 mx-2' >blocked</span></li>,
        <li className='hover:bg-blue-100 my-1 py-2' onClick={handleStatusChange}><span className='text-sm font-medium rounded-sm uppercase text-gray-100 px-2 py-1 bg-blue-700 mx-2' >in progress</span></li>,
        <li className='hover:bg-blue-100 my-1 py-2' onClick={handleStatusChange}><span className='text-sm font-medium rounded-sm uppercase text-gray-100 px-2 py-1 bg-green-500 mx-2' >completed</span></li>
    ]

    useEffect(()=>{
        colorPicker(status)
    },[status])

    return (
        <div
            class="justify-center bg-indigo-600 py-16 bg-opacity-25 h-screen w-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none "
            onClick={closeModal} ref={modalRef}
        >
            <div class="relative py-10 w-8/12  m-auto flex-col rounded-sm shadow-lg flex text-center bg-white border-solid" onClick={handleDropdownRef} >
                <div className='modal-head flex flex-row justify-end space-x-7 px-10' >
                   <BiTrash className='cursor-pointer hover:bg-gray-300 ' onClick={handleDelete} size={20}/>
                   <GrClose className='cursor-pointer hover:bg-gray-300 ' size={20} onClick={()=>setModalStory(null)} />
                </div>
                <div className='modal-body flex flex-row ' >
                    <div className='story-data1 w-2/3 px-10' >
                        <p className='text-3xl text-left px-4 my-4 font-semibold' >{name}</p>
                        <div className='text-left flex flex-col px-4 pr-14 '  >
                            <p className='text-xl my-2 font-medium ' >Description</p>
                            <p className='text-xm'>{description}</p>
                        </div>
                        <div className='comments flex flex-col py-5 ' >
                            <p className='text-lg text-left px-4 font-medium ' >Comments</p>
                            <NewComment updateModalStory={updateModalStory}/>
                            {
                               !!comments.length && comments.map((comment, i) => <CommentComponent key={i} comment={comment} index={i} updateModalStory={updateModalStory} />)
                            }
                        </div>
                    </div>
                    <div className='story-data2 py-6 flex flex-col' >
                        <div className='status text-left w-full ' >
                            <p className='text-base font-medium ' >STATUS</p>
                            <div className='dropdown my-2' >
                                <span onClick={() => setDropdownHidden(prev => !prev)} className={`text-sm font-medium rounded-sm uppercase text-${colorsClass.color} px-3 py-2 ${colorsClass.bgColor}`} >{status}<i className={`border-${colorsClass.color} arrow down mb-0.5 ml-2`} ></i> </span>

                                {!dropdownHidden
                                    ?
                                    <div className='dropdown-content absolute rounded-sm z-20 shadow-md bg-white mt-2 ' ref={dropdownRef} >
                                        <ul className='w-56 py-1'  >
                                            {
                                                dropdownStatus.filter(option => option.props.children.props.children !== status)
                                            }
                                        </ul>
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <div className='users flex flex-col my-6 ' >
                            <div className='assignees text-left py-3' >
                                <p className='text-base font-medium ' >ASSIGNEES</p>
                                <p className='my-2 text-center text-sm font-medium rounded-sm capitalize text-gray-700 px-2 py-1 bg-gray-300' >{assignedTo}</p>
                            </div>
                            <div className='reporter text-left py-3' >
                                <p className='text-base font-medium ' >REPORTER</p>
                                <p className='my-2 text-center text-sm font-medium rounded-sm capitalize text-gray-700 px-2 py-1 bg-gray-300' >{createdBy}</p>
                            </div>
                            <div className='date text-left py-3' >
                                <p className='text-base font-medium ' >CREATED ON</p>
                                <p className='my-2 text-center text-sm font-medium rounded-sm capitalize text-gray-700 px-2 py-1 bg-gray-300' >{createdOn.toDate().toDateString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default StoryModal;