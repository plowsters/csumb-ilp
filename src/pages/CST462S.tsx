
import React from 'react';
import CourseTemplate from '../components/CourseTemplate';

const CST462S = () => {
  return (
    <CourseTemplate
      courseCode="CST 462S"
      courseName="Race, Gender, Class in the Digital World"
      units={3}
      description="Provides students with key knowledge of race, gender, class and social justice especially in relation to technology in today's digital world. Students challenge the barriers of expertise, gender, race, class, and location that restrict wider access to and understanding of the production and usage of new technologies. Students will engage in a practical experience in the community via their service placements, which will provide depth and context for considering questions of justice, equality, social responsibilities and the complexities of technology and its societal impact."
      isCompleted={false}
    />
  );
};

export default CST462S;
