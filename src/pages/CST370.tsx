import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST370 = () => {
  const course = getCourseByCode('CST 370');
  
  return (
    <CourseTemplate
      courseCode="CST 370"
      courseName="Design and Analysis of Algorithms"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST370;