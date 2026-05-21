const Book = require('../Model/BookModal');


const allBooks = async () => {
  try {
    const books = await Book.find({});
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};


const handlebook = async (req, res) => {
  try {
    const body = req.body;
    const parsedPrice = Number(body.Price);
    const parsedPublishedDate = new Date(body.PublishedDate);

    if (
      !body.BookName ||
      !body.Description ||
      !body.Author ||
      !body.Price ||
      !body.PublishedDate
    ) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const Addbook = await Book.create({
      ...body,
      Price: parsedPrice,
      PublishedDate: parsedPublishedDate
    });
    console.log('AddBook', Addbook);

    if (Addbook) {
      res.status(201).json({ message: 'Book added successfully', Success: true, Id: Addbook?._id });
    } else {
      res.status(500).json({ error: 'Failed to add book' });
    }
  } catch (error) {
    console.error('Error in handlebook:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
};

const handlebookLists = async (req, res) => {
  try {
    const bookLists = await Book.find({});
    // Success field aur keys ko lowercase standards ke sath send kiya
    res.status(200).json({
      message: 'Book lists retrieved successfully',
      Success: true,
      books: bookLists, // Changed 'Books' to 'books' to match frontend state
      TotalBooks: bookLists?.length || 0
    });
  } catch (error) {
    console.error('Error in handlebookLists:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
};

const handlebookDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(200).json({ message: 'Book deleted successfully', Success: true });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error in handlebookDelete:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
};

const handlebookUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const parsedPrice = Number(body.Price);
    const parsedPublishedDate = new Date(body.PublishedDate);

    if (
      !body.BookName ||
      !body.Description ||
      !body.Author ||
      !body.Price ||
      !body.PublishedDate
    ) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, {
      ...body,
      Price: parsedPrice,
      PublishedDate: parsedPublishedDate
    }, { new: true });

    if (updatedBook) {
      res.status(200).json({ message: 'Book updated successfully', Success: true, book: updatedBook });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error in handlebookUpdate:', error);
    res.status(500).json({ error: error.message || 'An error occurred' });
  }
};

module.exports = {
  allBooks,
  handlebook,
  handlebookLists,
  handlebookDelete,
  handlebookUpdate
};