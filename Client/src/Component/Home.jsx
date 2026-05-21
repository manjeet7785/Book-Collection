import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { BookbaseURL } from './Axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {

  const [bookName, setBookName] = useState({
    BookName: '',
    Description: '',
    Author: '',
    Price: '',
    PublishedDate: ''
  });
  const [bookLists, setBookLists] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookName((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  console.log("BookName", bookName);

  const handleSubmit = async () => {
    try {
      if (!bookName.BookName || !bookName.Description || !bookName.Author || !bookName.Price || !bookName.PublishedDate) {
        toast('Please fill in all fields');
        return;
      }
      const payload = {
        ...bookName,
        Price: Number(bookName.Price)
      };

      const request = editingBookId
        ? BookbaseURL.put(`/book/${editingBookId}`, payload)
        : BookbaseURL.post('/addbook', payload);

      const { data } = await request;
      if (data?.Success) {
        toast(editingBookId ? 'Book updated successfully' : 'Book added successfully');
        setBookName({
          BookName: '',
          Description: '',
          Author: '',
          Price: '',
          PublishedDate: ''
        });
        setEditingBookId(null);
        await ListOfBook();
        console.log('Data', data);
      } else {
        toast(editingBookId ? 'Failed to update book' : 'Failed to add book');
      }
    } catch (error) {
      console.error(editingBookId ? 'Error updating book:' : 'Error adding book:', error);
      console.error('Server response:', error?.response?.data);
    }
  };

  const ListOfBook = async () => {
    try {
      const { data } = await BookbaseURL.get('/booklist');
      console.log('Book Lists:', data);
      setBookLists(Array.isArray(data?.books) ? data.books : []);

    } catch (error) {
      console.error('Error fetching book lists:', error);
    }
  };

  useEffect(() => {
    ListOfBook();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await BookbaseURL.delete(`/book/${id}`);
      if (data?.Success) {
        toast('Book deleted successfully');
        await ListOfBook();
      } else {
        toast('Failed to delete book');
      }
    } catch (error) {
      toast('Error deleting book');
    }
  };

  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setBookName({
      BookName: book.BookName || '',
      Description: book.Description || '',
      Author: book.Author || '',
      Price: book.Price?.toString() || '',
      PublishedDate: book.PublishedDate ? new Date(book.PublishedDate).toISOString().split('T')[0] : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setBookName({
      BookName: '',
      Description: '',
      Author: '',
      Price: '',
      PublishedDate: ''
    });
  };


  return (
    <div className='w-full px-6 py-6 min-h-[calc(100vh-64px)] bg-gray-50'>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        className="!top-1/2 !-translate-y-1/2"
        toastClassName="!bg-red-600 !text-white !font-bold !rounded-lg !shadow-xl !text-center !min-w-[300px] !p-4"
        bodyClassName="!text-white !text-center !font-medium"
        progressClassName="!bg-white"
        closeButton={false}
      />

      <div className='w-full bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          {editingBookId ? 'Update Book' : 'Add New Book'}
        </h2>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="bookName" className='text-sm font-semibold text-gray-700'>Book Name</label>
            <input
              type="text"
              name='BookName'
              value={bookName.BookName}
              id="bookName"
              placeholder='Enter book name...'
              className='w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none px-3 py-2 transition duration-200'
              onChange={handleChange}
            />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="description" className='text-sm font-semibold text-gray-700'>Description</label>
            <input
              type="text"
              name='Description'
              value={bookName.Description}
              id="description"
              placeholder='Enter book description...'
              className='w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none px-3 py-2 transition duration-200'
              onChange={handleChange}
            />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="author" className='text-sm font-semibold text-gray-700'>Author</label>
            <input
              type="text"
              name='Author'
              value={bookName.Author}
              id="author"
              placeholder='Enter author name...'
              className='w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none px-3 py-2 transition duration-200'
              onChange={handleChange}
            />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="price" className='text-sm font-semibold text-gray-700'>Selling Price</label>
            <input
              type="number"
              name='Price'
              value={bookName.Price}
              id="price"
              placeholder='Enter price...'
              className='w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none px-3 py-2 transition duration-200'
              onChange={handleChange}
            />
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label htmlFor="publishedDate" className='text-sm font-semibold text-gray-700'>Published Date</label>
            <input
              type="date"
              name='PublishedDate'
              value={bookName.PublishedDate}
              id="publishedDate"
              className='w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none px-3 py-2 transition duration-200'
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='mt-6'>
          <button
            className='bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 font-semibold shadow-sm'
            onClick={handleSubmit}
          >
            {editingBookId ? 'Update Book' : 'Add Book'}
          </button>
          {editingBookId && (
            <button
              className='ml-3 bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md hover:bg-gray-300 transition duration-200 font-semibold shadow-sm'
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </div>


      <div className='w-full bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='px-6 py-4 bg-gray-50 border-b border-gray-200'>
          <h2 className='text-2xl font-bold text-gray-800'>Book Collection</h2>
          <p className='text-sm text-gray-600 mt-1'>Manage your book inventory</p>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Book Name</th>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Description</th>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Author</th>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Price</th>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Published Date</th>
                <th className='border-b border-gray-200 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
              </tr>

            </thead>
            <tbody className='divide-y divide-gray-200'>
              {bookLists.length > 0 ? (
                bookLists.map((book, index) => (
                  <tr key={index} className='hover:bg-gray-50 transition duration-150'>
                    <td className='px-6 py-4 text-sm text-gray-900'>{book.BookName}</td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{book.Description}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{book.Author}</td>
                    <td className='px-6 py-4 text-sm font-semibold text-green-600'>${book.Price?.toFixed(2)}</td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{new Date(book.PublishedDate).toLocaleDateString()}</td>
                    <td className='px-6 py-4 text-sm'>
                      <button onClick={() => handleEdit(book)} className='text-blue-600 bold hover:text-blue-800 transition duration-150'>
                        <MdEdit />
                      </button>
                      <button onClick={() => handleDelete(book._id)} className='text-red-600 bold hover:text-red-800 transition duration-150 ml-4'>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className='px-6 py-8 text-center text-gray-500'>
                    No books found. Add your first book above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home;