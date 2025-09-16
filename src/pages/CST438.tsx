import React from 'react';
import CourseTemplate from '../components/CourseTemplate';
import { getCourseByCode } from '../data/courses';

const CST438 = () => {
  const course = getCourseByCode('CST 438');
  
  return (
    <CourseTemplate
      courseCode="CST 438"
      courseName="Software Engineering"
      units={4}
      description={course?.description}
      status={course?.status || 'tbd'}
    />
  );
};

export default CST438;