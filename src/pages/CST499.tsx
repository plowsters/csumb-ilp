
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST499 = () => {
  return (
    <CourseTemplate
      courseCode="CST 499"
      courseName="Computer Science Capstone"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST499;
