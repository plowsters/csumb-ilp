import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST462S = () => {
  const course = getCourseByCode('CST 462S');
  
  return (
    <CourseTemplate
      courseCode="CST 462S"
      courseName="Race, Gender, Class in the Digital World"
      units={3}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST462S;