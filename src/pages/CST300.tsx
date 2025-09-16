import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST300 = () => {
  const course = getCourseByCode('CST 300');
  
  return (
    <CourseTemplate
      courseCode="CST 300"
      courseName="Major ProSeminar"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST300;