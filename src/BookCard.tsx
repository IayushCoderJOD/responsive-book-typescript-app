import React from 'react'

interface BookCardProps{
    link:string
}

const BookCard:React.FC<BookCardProps> = ({link}) => {
  return (
    <div>
        <img src={link} alt="" />
    </div>
  )
}

export default BookCard