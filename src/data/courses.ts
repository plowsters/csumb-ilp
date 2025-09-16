export interface Course {
  code: string;
  name: string;
  units: number;
  path: string;
  status: 'completed' | 'in-progress' | 'tbd';
  description?: string;
}

export const courses: Course[] = [
  { 
    code: 'CST 300', 
    name: 'Major ProSeminar', 
    units: 4, 
    path: '/cst300', 
    status: 'completed',
    description: "Students learn professional writing, presentation, research, and critical-thinking skills within the diversified fields of computer science and communication design. This class also helps students identify and articulate personal, professional, and social goals while further practicing their problem-solving, collaboration, and community-building skills. Students will demonstrate competence in writing skills at the upper division level."
  },
  { 
    code: 'CST 338', 
    name: 'Software Design', 
    units: 4, 
    path: '/cst338', 
    status: 'completed',
    description: "This is an intermediate-level programming course covering techniques for developing large-scale software systems using object-oriented programming. Coverage includes software development life cycle models, requirements analysis, and graphical user interface development."
  },
  { 
    code: 'CST 311', 
    name: 'Introduction to Computer Networks', 
    units: 4, 
    path: '/cst311', 
    status: 'tbd',
    description: "Survey of Telecommunication and Data Communication Technology Fundamentals, Local Area Network, Wide Area Network, Internet and internetworking protocols including TCP/IP, network security and performance, emerging industry trends such as voice over the network and high speed networking. Designed as a foundation for students who wish to pursue more advanced network studies including certificate programs. Includes hands-on networking labs that incorporate Cisco CCNA lab components."
  },
  { 
    code: 'CST 334', 
    name: 'Operating Systems', 
    units: 4, 
    path: '/cst334', 
    status: 'tbd',
    description: "Students in this course will learn about the use and design of modern operating systems, focusing on Linux. On the 'use' side, students will learn the Linux command line, to write shell scripts, and to build programs with GNU utilities like awk, sed, and make. On the 'design' side, students will develop a deep understanding of process management, memory management, file systems, and concurrency, and how they apply to modern technologies like virtualization and cloud computing."
  },
  { 
    code: 'CST 336', 
    name: 'Internet Programming', 
    units: 4, 
    path: '/cst336', 
    status: 'tbd',
    description: "Provides students with dynamic web application development skills, focusing on the integration of server-side programming, database connectivity, and client-side scripting. Coverage includes the Internet architecture, responsive design, RESTful web services, and Web APIs."
  },
  { 
    code: 'CST 363', 
    name: 'Introduction to Database Systems', 
    units: 4, 
    path: '/cst363', 
    status: 'in-progress',
    description: "This course provides balanced coverage of database use and design, focusing on relational databases. Students will learn to design relational schemas, write SQL queries, access a DB programmatically, and perform database administration. Students will gain a working knowledge of the algorithms and data structures used in query evaluation and transaction processing. Students will also learn to apply newer database technologies such as XML, NoSQL, and Hadoop."
  },
  { 
    code: 'CST 370', 
    name: 'Design and Analysis of Algorithms', 
    units: 4, 
    path: '/cst370', 
    status: 'tbd',
    description: "Students learn important data structures in computer science and acquire fundamental algorithm design techniques to get the efficient solutions to several computing problems from various disciplines. Topics include the analysis of algorithm efficiency, hash, heap, graph, tree, sorting and searching, brute force, divide-and-conquer, decrease-and-conquer, transform-and-conquer, dynamic programming, and greedy programming."
  },
  { 
    code: 'CST 438', 
    name: 'Software Engineering', 
    units: 4, 
    path: '/cst438', 
    status: 'tbd',
    description: "Prepares students for large-scale software development using software engineering principles and techniques. Coverage includes software process, requirements analysis and specification, software design, implementation, testing, and project management. Students are expected to work in teams to carry out a realistic software project."
  },
  { 
    code: 'CST 462S', 
    name: 'Race, Gender, Class in the Digital World', 
    units: 3, 
    path: '/cst462s', 
    status: 'tbd',
    description: "Provides students with key knowledge of race, gender, class and social justice especially in relation to technology in today's digital world. Students challenge the barriers of expertise, gender, race, class, and location that restrict wider access to and understanding of the production and usage of new technologies. Students will engage in a practical experience in the community via their service placements, which will provide depth and context for considering questions of justice, equality, social responsibilities and the complexities of technology and its societal impact."
  },
  { 
    code: 'CST 489', 
    name: 'Capstone Project Planning', 
    units: 1, 
    path: '/cst489', 
    status: 'tbd',
    description: "Students create a detailed proposal of a substantial, professional level project with an approval of the student's capstone advisor. Students learn and practice project planning, collaboration and writing skills required in the industry."
  },
  { 
    code: 'CST 499', 
    name: 'Computer Science Capstone', 
    units: 4, 
    path: '/cst499', 
    status: 'tbd',
    description: "Students will work on a project in large groups (up to 5 students in each group), developing requirements specification, a solution plan followed by design and implementation of the solution. The problem statement for the projects will be selected by the faculty. Faculty will also play the role of a project manager directing the schedule and deliverables for these projects."
  },
];

export const getCourseByPath = (path: string): Course | undefined => {
  return courses.find(course => course.path === path);
};

export const getCourseByCode = (code: string): Course | undefined => {
  return courses.find(course => course.code === code);
};