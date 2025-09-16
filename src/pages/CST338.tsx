
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST338 = () => {
  const course = getCourseByCode('CST 338');
  
  return (
    <CourseTemplate
      courseCode="CST 338"
      courseName="Software Design"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST338;
