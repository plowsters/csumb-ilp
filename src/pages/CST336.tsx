
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST336 = () => {
  return (
    <CourseTemplate
      courseCode="CST 336"
      courseName="Internet Programming"
      units={4}
      description="Provides students with dynamic web application development skills, focusing on the integration of server-side programming, database connectivity, and client-side scripting. Coverage includes the Internet architecture, responsive design, RESTful web services, and Web APIs."
      isCompleted={false}
    />
  );
};

export default CST336;
