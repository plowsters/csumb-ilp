
import React from 'react';
import { Edit, Trash2, FileText, Video, Code, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Assignment } from '../../types/assignments';
import { User } from '../../hooks/useAuth';

interface AssignmentItemProps {
  assignment: Assignment;
  user: User | null;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
  if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="h-4 w-4" />;
  if (fileType.includes('text/') || fileType.includes('application/')) return <Code className="h-4 w-4" />;
  return <FileText className="h-4 w-4" />;
};

export const AssignmentItem = ({ assignment, user, onEdit, onDelete }: AssignmentItemProps) => {
  return (
    <div className="border-l-4 border-blue-500 pl-4 bg-white rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-2">{assignment.title}</h4>
          <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
          
          {assignment.file_url && (
            <div className="flex items-center space-x-2 text-sm text-blue-600">
              {getFileIcon(assignment.file_type || '')}
              <button 
                onClick={() => window.open(assignment.file_url, '_blank')}
                className="hover:underline"
              >
                View File
              </button>
              <Download className="h-3 w-3" />
            </div>
          )}
        </div>
        
        {user && (
          <div className="flex space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(assignment)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(assignment.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
