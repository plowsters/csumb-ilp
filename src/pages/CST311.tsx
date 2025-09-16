import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST311 = () => {
  const course = getCourseByCode('CST 311');
  
  return (
    <CourseTemplate
      courseCode="CST 311"
      courseName="Introduction to Computer Networks"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST311;