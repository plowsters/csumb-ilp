
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST338 = () => {
  return (
    <CourseTemplate
      courseCode="CST 338"
      courseName="Software Design"
      units={4}
      description="This is an intermediate-level programming course covering techniques for developing large-scale software systems using object-oriented programming. Coverage includes software development life cycle models, requirements analysis, and graphical user interface development."
      isCompleted={false}
    />
  );
};

export default CST338;
