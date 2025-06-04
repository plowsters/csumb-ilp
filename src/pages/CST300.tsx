
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST300 = () => {
  return (
    <CourseTemplate
      courseCode="CST 300"
      courseName="Major ProSeminar"
      units={4}
      description="Prepares students for upper-division computer science coursework and professional development. Covers academic success strategies, career planning, and introduces students to the field of computer science."
      assignments={[
        {
          title: "Ethics Argument Essay",
          description: "A comprehensive essay analyzing ethical considerations in computer science and technology.",
        }
      ]}
      isCompleted={false}
    />
  );
};

export default CST300;
