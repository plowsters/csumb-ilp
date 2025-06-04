
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST363 = () => {
  return (
    <CourseTemplate
      courseCode="CST 363"
      courseName="Introduction to Database Systems"
      units={4}
      description="This course provides balanced coverage of database use and design, focusing on relational databases. Students will learn to design relational schemas, write SQL queries, access a DB programmatically, and perform database administration. Students will gain a working knowledge of the algorithms and data structures used in query evaluation and transaction processing. Students will also learn to apply newer database technologies such as XML, NoSQL, and Hadoop."
      isCompleted={false}
    />
  );
};

export default CST363;
