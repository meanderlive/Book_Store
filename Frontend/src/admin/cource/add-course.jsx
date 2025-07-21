// import React, { useState } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');
// const res = await axios.POST("http://localhost:4001/book");
// function AddCourseModal({ show, hide, addCourse }) {
//   const [course, setCourse] = useState({
//     name: '', 
//     description: '',
//     duration: '',
//     dateCreated: '',
//     instructor: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCourse({ ...course, [name]: value });
//   };

//   const handleSave = () => {
//     if (course.name && course.description) {
//       addCourse(course);
//       hide();
//       setCourse({ name: '', description: '', duration: '', dateCreated: '', instructor: '' });
//     }
//   };

//   return (
//     <Modal
//       isOpen={show}
//       onRequestClose={hide}
//       overlay={'fade'}
//       style={{
//         content: {
//           top: '50%',
//           left: '50%',
//           right: 'auto',
//           bottom: 'auto',
//           transform: 'translate(-50%, -50%)',
//           width: '60%',
//         },
//       }}
//     >
//       <h2>Add Course</h2>
//       <form>
//         <div className="mb-3">
//           <label className="form-label">Course Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={course.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             name="description"
//             value={course.description}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Duration</label>
//           <input
//             type="text"
//             className="form-control"
//             name="duration"
//             value={course.duration}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Date Created</label>
//           <input
//             type="date"
//             className="form-control"
//             name="dateCreated"
//             value={course.dateCreated}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Instructor</label>
//           <input
//             type="text"
//             className="form-control"
//             name="instructor"
//             value={course.instructor}
//             onChange={handleChange}
//           />
//         </div>
//       </form>
//       <div>
//         <button className="btn btn-secondary" onClick={hide}>
//           Close
//         </button>
//         <button className="btn btn-primary" onClick={handleSave}>
//           Save Changes
//         </button>
//       </div>
//     </Modal>
//   );
// }

// export default AddCourseModal;
// // 

import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

function AddBookModal({ show, hide, onBookAdded }) {
  const [book, setBook] = useState({
    name: '',
    price: '',
    category: '',
    title: '',
  });
  const [avatarFile, setAvatarFile] = useState(null); // File upload (optional)
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value }); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const { name, price, category, title } = book;

      if (!name || !price || !category || !title) {
        alert('Please fill all required fields.');
        return;
      }

      // Step 1: Create book (without avatar)
      const res = await axios.post('http://localhost:4001/book/create', {
        ...book,
        price: Number(price),
        avatar: '' // avatar will be updated later if image is uploaded
      });

      const createdBook = res.data;

      // Step 2: Upload avatar if image is selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        await axios.post(
          `http://localhost:4001/book/upload-avatar/${createdBook._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      if (onBookAdded) onBookAdded(createdBook);

      // Reset form
      hide();
      setBook({ name: '', price: '', category: '', title: '' });
      setAvatarFile(null);
      setAvatarPreview('');
    } catch (err) {
      console.error('Failed to save book:', err);
      alert('Something went wrong while saving the book.');
    }
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={hide}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: '60%',
        },
      }}
    >
      <h2>Add New Book</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Book Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={book.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={book.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={book.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Avatar</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Preview"
              style={{ width: '100px', marginTop: '10px' }}
            />
          )}
        </div>
      </form>
      <div>
        <button className="btn btn-secondary" onClick={hide}>
          Close
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Book
        </button>
      </div>
    </Modal>
  );
}

export default AddBookModal;
