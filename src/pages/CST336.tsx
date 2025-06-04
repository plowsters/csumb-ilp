
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST336 = () => {
  return (
    <CourseTemplate
      courseCode="CST 336"
      courseName="Internet Programming"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST336;
