
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST338 = () => {
  return (
    <CourseTemplate
      courseCode="CST 338"
      courseName="Software Design"
      units={4}
      isCompleted={false}
    />
  );
};

export default CST338;
