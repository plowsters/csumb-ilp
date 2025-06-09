
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import AssignmentManager, { Assignment } from './AssignmentManager';
import { BookOpen, FileText, Calendar } from 'lucide-react';

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
  isCompleted = false 
}: CourseTemplateProps) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courseResources, setCourseResources] = useState<Assignment[]>([]);

  // Load assignments from localStorage on component mount
  useEffect(() => {
    const assignmentsKey = `assignments_${courseCode.replace(' ', '_')}`;
    const resourcesKey = `resources_${courseCode.replace(' ', '_')}`;
    
    const savedAssignments = localStorage.getItem(assignmentsKey);
    if (savedAssignments) {
      try {
        const parsed = JSON.parse(savedAssignments);
        setAssignments(parsed.map((a: any) => ({
          ...a,
          createdAt: new Date(a.createdAt)
        })));
      } catch (error) {
        console.error('Error loading assignments:', error);
      }
    }

    const savedResources = localStorage.getItem(resourcesKey);
    if (savedResources) {
      try {
        const parsed = JSON.parse(savedResources);
        setCourseResources(parsed.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt)
        })));
      } catch (error) {
        console.error('Error loading course resources:', error);
      }
    }
  }, [courseCode]);

  // Save assignments to localStorage whenever they change
  const handleAssignmentsChange = (newAssignments: Assignment[]) => {
    setAssignments(newAssignments);
    const storageKey = `assignments_${courseCode.replace(' ', '_')}`;
    localStorage.setItem(storageKey, JSON.stringify(newAssignments));
  };

  // Save course resources to localStorage whenever they change
  const handleResourcesChange = (newResources: Assignment[]) => {
    setCourseResources(newResources);
    const storageKey = `resources_${courseCode.replace(' ', '_')}`;
    localStorage.setItem(storageKey, JSON.stringify(newResources));
  };

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

        {/* Projects & Assignments Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Projects & Assignments
          </h3>
          
          <AssignmentManager 
            assignments={assignments}
            onAssignmentsChange={handleAssignmentsChange}
          />
        </div>

        {/* Course Resources */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Course Resources
          </h3>
          
          <AssignmentManager 
            assignments={courseResources}
            onAssignmentsChange={handleResourcesChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CourseTemplate;
