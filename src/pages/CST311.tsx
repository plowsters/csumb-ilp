
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST311 = () => {
  return (
    <CourseTemplate
      courseCode="CST 311"
      courseName="Introduction to Computer Networks"
      units={4}
      description="Survey of Telecommunication and Data Communication Technology Fundamentals, Local Area Network, Wide Area Network, Internet and internetworking protocols including TCP/IP, network security and performance, emerging industry trends such as voice over the network and high speed networking. Designed as a foundation for students who wish to pursue more advanced network studies including certificate programs. Includes hands-on networking labs that incorporate Cisco CCNA lab components."
      isCompleted={false}
    />
  );
};

export default CST311;
