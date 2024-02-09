import { useEffect, useRef, useState } from 'react';
import './App.css';
import BookCard from './BookCard';

interface BookData {
  items: {
    volumeInfo: {
      title: string;
      imageLinks: {
        thumbnail: string;
      };
    };
  }[];
}

function App() {
  const [books, setBooks] = useState<BookData['items']>([]);
  const inputName = useRef<HTMLInputElement>(null);

  const getBookDetails = async () => {
    try {
      const inputValue = inputName.current?.value;
  
      // Check if the input value is valid
      if (!inputValue) {
        console.log('Input value is empty');
        
        return;
      }
  
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(inputValue)}`);
      const data: BookData = await response.json();
      setBooks(data.items || []);
  
      if (data.items && data.items.length > 0) {
        console.log(data.items[0].volumeInfo.title);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };
  

  useEffect(() => {
    getBookDetails();
  }, []);

  return (
    <>
      <div className='flex flex-col items-center text-white'>
        <div>
          <input
            className='bg-white border border-black text-black p-4 m-7 w-44 md:w-64 lg:w-96 rounded-3xl text-2xl'
            type="text"
            ref={inputName}
            placeholder='Search for the book....'
          />
          <button
            className='shadow-2xl bg-white p-4 rounded-full text-xl hover:bg-gray-200 hover:p-5'
            onClick={getBookDetails}
          >
            🔍
          </button>
        </div>
        <div className='flex flex-wrap justify-evenly'>
          {
          books.map((book, index) => (
            <div key={index} className="m-4 lg:w-1/6">
              <BookCard
                key={index}
                link={book.volumeInfo.imageLinks.thumbnail}
                title={book.volumeInfo.title}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
