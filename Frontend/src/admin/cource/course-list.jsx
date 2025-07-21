import React, { useState } from 'react';
import './CourseList.css';
import AddCourseModal from './add-course';

const CourseList = () => {

    const [addModal, setAddModal] = useState(false)
  const [courses, setCourses] = useState([
    { id: 1, name: 'Course 1', description: 'Description for Course 1', duration: '3 weeks', dateCreated: '2023-10-01', instructor: 'John Doe' },
    { id: 2, name: 'Course 2', description: 'Description for Course 2', duration: '4 weeks', dateCreated: '2023-09-15', instructor: 'Jane Smith' },
  ]);

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mt-4 bg-dark">
      <h2 className="text-center mb-4">Course List</h2>
      <div className="mb-3">
        <button className="btn btn-primary mt-2" onClick={() => setAddModal(true)}>
          Add Course
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date Created</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.dateCreated}</td>
              <td>{course.instructor}</td>
              <td>
                <button className="btn btn-warning" onClick={() => editCourse(course.id)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-danger ml-2" onClick={() => deleteCourse(course.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCourseModal show={addModal} hide={() => setAddModal(false)} />
    </div>
  );
};

export default CourseList;
