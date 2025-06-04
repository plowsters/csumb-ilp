
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST334 = () => {
  return (
    <CourseTemplate
      courseCode="CST 334"
      courseName="Operating Systems"
      units={4}
      description="Students in this course will learn about the use and design of modern operating systems, focusing on Linux. On the 'use' side, students will learn the Linux command line, to write shell scripts, and to build programs with GNU utilities like awk, sed, and make. On the 'design' side, students will develop a deep understanding of process management, memory management, file systems, and concurrency, and how they apply to modern technologies like virtualization and cloud computing."
      isCompleted={false}
    />
  );
};

export default CST334;
