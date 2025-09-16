import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST499 = () => {
  const course = getCourseByCode('CST 499');
  
  return (
    <CourseTemplate
      courseCode="CST 499"
      courseName="Computer Science Capstone"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST499;