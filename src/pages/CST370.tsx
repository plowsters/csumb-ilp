
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST370 = () => {
  return (
    <CourseTemplate
      courseCode="CST 370"
      courseName="Design and Analysis of Algorithms"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST370;
