import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST334 = () => {
  const course = getCourseByCode('CST 334');
  
  return (
    <CourseTemplate
      courseCode="CST 334"
      courseName="Operating Systems"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST334;