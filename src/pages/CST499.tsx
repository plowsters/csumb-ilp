
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST499 = () => {
  return (
    <CourseTemplate
      courseCode="CST 499"
      courseName="Computer Science Capstone"
      units={4}
      description="Students will work on a project in large groups (up to 5 students in each group), developing requirements specification, a solution plan followed by design and implementation of the solution. The problem statement for the projects will be selected by the faculty. Faculty will also play the role of a project manager directing the schedule and deliverables for these projects."
      isCompleted={false}
    />
  );
};

export default CST499;
