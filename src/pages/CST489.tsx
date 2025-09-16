import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST489 = () => {
  const course = getCourseByCode('CST 489');
  
  return (
    <CourseTemplate
      courseCode="CST 489"
      courseName="Capstone Project Planning"
      units={1}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST489;