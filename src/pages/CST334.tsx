
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST334 = () => {
  return (
    <CourseTemplate
      courseCode="CST 334"
      courseName="Operating Systems"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST334;
