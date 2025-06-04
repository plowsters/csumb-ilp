
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST489 = () => {
  return (
    <CourseTemplate
      courseCode="CST 489"
      courseName="Capstone Project Planning"
      units={1}
      description="Students create a detailed proposal of a substantial, professional level project with an approval of the student's capstone advisor. Students learn and practice project planning, collaboration and writing skills required in the industry."
      isCompleted={false}
    />
  );
};

export default CST489;
