import { useEffect, useState } from 'react';
import './App.css'
import BookCard from './BookCard';

function App() {
  const [name,setName]=useState("Harry")
  const [books, setBooks] = useState([]);
  const [img,setImg]=useState("")

  const getBookDetails = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`);
      const data = await response.json();
      setBooks(data.items || []);
      // console.log(data.items[0].volumeInfo.imageLinks.thumbnail)
      setImg(data.items[0].volumeInfo.imageLinks.thumbnail);
    }
  useEffect(()=>{
    getBookDetails();
  },[])

  return (
    <>
    <div className='flex flex-col items-center  text-white '>
      <div>
        <input className='bg-white border border-black text-black p-4 m-7 w-96 rounded-3xl text-2xl' type="text" placeholder='Search for the book....'  />
        <button className='shadow-2xl bg-white p-4 rounded-full text-xl hover:bg-gray-200 hover:p-5' >🔍</button>
      </div>
      <div className='flex justify-between space-x-4' >
        {
          books.map((book,index)=>(
            <BookCard key={index} link={book.volumeInfo.imageLinks.thumbnail} />
          ))
        }
      </div>
    </div>
    </>
  )
}

export default App
