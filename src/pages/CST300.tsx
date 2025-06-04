
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST300 = () => {
  return (
    <CourseTemplate
      courseCode="CST 300"
      courseName="Major ProSeminar"
      units={4}
      description="Students learn professional writing, presentation, research, and critical-thinking skills within the diversified fields of computer science and communication design. This class also helps students identify and articulate personal, professional, and social goals while further practicing their problem-solving, collaboration, and community-building skills. Students will demonstrate competence in writing skills at the upper division level."
      assignments={[
        {
          title: "Ethics Argument Essay",
          description: "A comprehensive essay analyzing ethical considerations in computer science and technology, requiring students to examine multiple perspectives and take a stance on a technology-related issue.",
        },
        {
          title: "Industry Analysis Paper",
          description: "Research paper designed to familiarize students with the tech industry, academic writing & research, and degree study.",
        },
        {
          title: "Individual Learning Plan (ILP)",
          description: "A comprehensive plan outlining educational and career goals, time management strategies, and learning objectives for the CS program.",
        },
        {
          title: "ILP Portfolio Website Shell",
          description: "Creation of a professional portfolio website to showcase coursework and projects throughout the CS Online program.",
        }
      ]}
      isCompleted={false}
    />
  );
};

export default CST300;
