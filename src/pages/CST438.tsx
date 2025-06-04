
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST438 = () => {
  return (
    <CourseTemplate
      courseCode="CST 438"
      courseName="Software Engineering"
      units={4}
      description="Prepares students for large-scale software development using software engineering principles and techniques. Coverage includes software process, requirements analysis and specification, software design, implementation, testing, and project management. Students are expected to work in teams to carry out a realistic software project."
      isCompleted={false}
    />
  );
};

export default CST438;
