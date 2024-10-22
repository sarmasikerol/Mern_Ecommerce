import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { openModalFunc } from '../redux/generalSlice';
import Button from './Button';


const Modal = ({title,content,onClick,btnName}) => {
    const dispatch = useDispatch();
  return (
    <div className='w-full h-full fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
        <div className='w-[500px] bg-white border p-4  rounded-md'>
        <div className='flex items-center justify-between'>
        <div className='text-xl'>{title}</div>
       <div onClick={() => dispatch(openModalFunc())}>
       <IoIosCloseCircle size={25} />
       </div>
      </div>
      {content}
      <Button text={btnName} onClick={onClick} />
        </div>
      
       
    </div>
  )
}

export default Modal