
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST300 = () => {
  return (
    <CourseTemplate
      courseCode="CST 300"
      courseName="Major ProSeminar"
      units={4}
      description="A comprehensive orientation course for the School of Computing and Design's undergraduate degree BS Computer Science. Students develop online collaboration, study, and presentation skills; research history and trends in computer science; analyze information; set educational and career goals; develop an Individual Learning Plan (ILP); understand portfolio and capstone processes; and demonstrate professional presentation and problem-solving skills. The course includes both lecture and writing lab components, with students completing portfolio pieces, learning journals, and major papers including an Industry Analysis and Ethics Argument essay."
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
