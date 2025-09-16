import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST336 = () => {
  const course = getCourseByCode('CST 336');
  
  return (
    <CourseTemplate
      courseCode="CST 336"
      courseName="Internet Programming"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST336;