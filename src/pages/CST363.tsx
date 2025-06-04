
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST363 = () => {
  return (
    <CourseTemplate
      courseCode="CST 363"
      courseName="Introduction to Database Systems"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST363;
