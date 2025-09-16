
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST363 = () => {
  const course = getCourseByCode('CST 363');
  
  return (
    <CourseTemplate
      courseCode="CST 363"
      courseName="Introduction to Database Systems"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST363;
