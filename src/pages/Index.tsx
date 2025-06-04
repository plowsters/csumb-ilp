
import React from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import { GraduationCap, Target, User } from 'lucide-react';

const Index = () => {
  const courses = [
    { code: 'CST 300', name: 'Major ProSeminar', units: 4, path: '/cst300' },
    { code: 'CST 338', name: 'Software Design', units: 4, path: '/cst338' },
    { code: 'CST 311', name: 'Introduction to Computer Networks', units: 4, path: '/cst311' },
    { code: 'CST 334', name: 'Operating Systems', units: 4, path: '/cst334' },
    { code: 'CST 336', name: 'Internet Programming', units: 4, path: '/cst336' },
    { code: 'CST 363', name: 'Introduction to Database Systems', units: 4, path: '/cst363' },
    { code: 'CST 370', name: 'Design and Analysis of Algorithms', units: 4, path: '/cst370' },
    { code: 'CST 438', name: 'Software Engineering', units: 4, path: '/cst438' },
    { code: 'CST 462S', name: 'Race, Gender, Class in the Digital World', units: 3, path: '/cst462s' },
    { code: 'CST 489', name: 'Capstone Project Planning', units: 1, path: '/cst489' },
    { code: 'CST 499', name: 'Computer Science Capstone', units: 4, path: '/cst499' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-white rounded-full mx-auto mb-6 overflow-hidden">
                <img 
                  src="/lovable-uploads/2f83aaf7-4dcd-4bb1-8c92-a40a1c70e174.png" 
                  alt="Bug Plowman"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl font-bold mb-4">Bug Plowman</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                CS Online Summer '25 Cohort | California State University, Monterey Bay
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSUMB Logo Section */}
      <div className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="/lovable-uploads/d0c46ee8-8723-4c37-9484-4d52fb32b0ef.png" 
            alt="CSUMB Logo"
            className="h-16 mx-auto"
          />
        </div>
      </div>

      {/* Bio Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="h-6 w-6 mr-3 text-blue-600" />
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to my Individual Learning Plan (ILP) Portfolio. I am a Computer Science student in the 
              CS Online Summer '25 Cohort at California State University, Monterey Bay, passionate about 
              technology and innovation. This portfolio showcases my academic journey and the projects I've 
              completed throughout the program.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Target className="h-6 w-6 mr-3 text-blue-600" />
              My Goals
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Develop strong software engineering and reverse engineering skills</li>
              <li>• Master computer science, distributed systems, large networks, and malware analysis fundamentals</li>
              <li>• Build a portfolio of meaningful projects</li>
              <li>• Prepare for a successful career in technology</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <GraduationCap className="h-8 w-8 mr-3 text-blue-600" />
              CS Online Program
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The CS Online degree completion program from California State University, Monterey Bay (CSUMB) 
              offers both solid computer science theories and hands-on software development practice.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Preparation</h3>
            <p className="text-gray-600 mb-4">
              This combination equips graduates with the skills needed to excel in the fast-paced information 
              economy, preparing them for careers such as:
            </p>
            <ul className="text-gray-600 space-y-1 ml-6">
              <li>• Software engineer</li>
              <li>• Mobile app developer</li>
              <li>• Technology project manager</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Program Highlights</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Complete the program in 24 months, fully online</li>
                <li>• Cohorts limited to about 35 students for personalized guidance</li>
                <li>• Interactive learning with faculty and industry professionals</li>
                <li>• Individualized, socially connected learning experience</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Academic Excellence</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>• Curriculum updated with industry advisory board input</li>
                <li>• Comprehensive portfolio and capstone project required</li>
                <li>• Taught by tenure-track faculty and industry professionals</li>
                <li>• Hands-on, real-world collaborative projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Portfolio</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the courses I've completed as part of my Computer Science program. 
            Each course page contains project work, assignments, and reflections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.code}
              code={course.code}
              name={course.name}
              units={course.units}
              path={course.path}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
