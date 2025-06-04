
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST311 = () => {
  return (
    <CourseTemplate
      courseCode="CST 311"
      courseName="Introduction to Computer Networks"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST311;
