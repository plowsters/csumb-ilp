
import React from 'react';
import Layout from './Layout';
import { BookOpen, FileText, ExternalLink, Calendar } from 'lucide-react';

interface CourseTemplateProps {
  courseCode: string;
  courseName: string;
  units: number;
  description?: string;
  projects?: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
  assignments?: Array<{
    title: string;
    description: string;
    link?: string;
  }>;
  isCompleted?: boolean;
}

const CourseTemplate = ({ 
  courseCode, 
  courseName, 
  units, 
  description,
  projects = [],
  assignments = [],
  isCompleted = false 
}: CourseTemplateProps) => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseCode}</h1>
              <h2 className="text-xl text-gray-600 font-medium mb-4">{courseName}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{units} Units</span>
                {isCompleted && (
                  <>
                    <span className="mx-2">•</span>
                    <span className="text-green-600 font-medium">Completed</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {description ? (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Course Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ) : (
            <div className="border-t pt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  Course description will be added when the course is completed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Projects & Assignments
          </h3>
          
          {projects.length > 0 || assignments.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 ml-4"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
              
              {assignments.map((assignment, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{assignment.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{assignment.description}</p>
                    </div>
                    {assignment.link && (
                      <a
                        href={assignment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 ml-4"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                Projects and assignments will be added as the course progresses.
              </p>
            </div>
          )}
        </div>

        {/* Course Resources */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Resources</h3>
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              Additional course resources and materials will be added here.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseTemplate;
