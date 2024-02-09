import React from 'react'

interface BookCardProps{
    link:string,
    title:string,
}

const BookCard:React.FC<BookCardProps> = ({link,title}) => {
  return (
    <>
    <div className='p-5 m-3'>
        <img src={link}  alt={title} className='  rounded-3xl shadow-2xl border-2 border-black h-64 w-52' />
        <p className='text-sm' >{title}</p>
    </div>
    
    </>
  )
}

export default BookCard