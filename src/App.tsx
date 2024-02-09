import { useEffect, useState } from 'react';
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
  const [name, setName] = useState("barbie");
  const [books, setBooks] = useState<BookData['items']>([]);
  const [img, setImg] = useState("");

  const getBookDetails = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${name}`);
      const data: BookData = await response.json();
      setBooks(data.items || []);
      if (data.items && data.items.length > 0) {
        console.log(data.items[0].volumeInfo.title);
        setImg(data.items[0].volumeInfo.imageLinks.thumbnail);
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
      <div className='flex flex-col items-center  text-white '>
        <div>
          <input
            className='bg-white border border-black text-black p-4 m-7 w-96 rounded-3xl text-2xl'
            type="text"
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
          {books.map((book, index) => (
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
