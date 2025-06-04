
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST370 = () => {
  return (
    <CourseTemplate
      courseCode="CST 370"
      courseName="Design and Analysis of Algorithms"
      units={4}
      description="Students learn important data structures in computer science and acquire fundamental algorithm design techniques to get the efficient solutions to several computing problems from various disciplines. Topics include the analysis of algorithm efficiency, hash, heap, graph, tree, sorting and searching, brute force, divide-and-conquer, decrease-and-conquer, transform-and-conquer, dynamic programming, and greedy programming."
      isCompleted={false}
    />
  );
};

export default CST370;
