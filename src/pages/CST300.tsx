
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST300 = () => {
  return (
    <CourseTemplate
      courseCode="CST 300"
      courseName="Major ProSeminar"
      units={4}
      description="Students learn professional writing, presentation, research, and critical-thinking skills within the diversified fields of computer science and communication design. This class also helps students identify and articulate personal, professional, and social goals while further practicing their problem-solving, collaboration, and community-building skills. Students will demonstrate competence in writing skills at the upper division level."
      isCompleted={true}
    />
  );
};

export default CST300;
