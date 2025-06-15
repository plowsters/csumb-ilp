
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Assignment } from './AssignmentManager';
import { Button } from './ui/button';
import { Edit, Trash2, Download, GripVertical } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SortableAssignmentItemProps {
  assignment: Assignment;
  handleEdit: (assignment: Assignment) => void;
  handleDelete: (id: string) => void;
  getFileIcon: (fileType: string) => JSX.Element;
}

const SortableAssignmentItem = ({ assignment, handleEdit, handleDelete, getFileIcon }: SortableAssignmentItemProps) => {
  const { user } = useAuth();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: assignment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative' as 'relative',
  };

  const containerClasses = `border p-4 pl-4 bg-secondary text-card-foreground rounded-lg flex items-start border-l-4 border-l-white dark:border-l-border ${isDragging ? 'shadow-lg' : ''}`;

  return (
    <div ref={setNodeRef} style={style} {...attributes} className={containerClasses}>
      {user && (
        <button {...listeners} className="p-2 cursor-grab touch-none mr-2 text-muted-foreground hover:text-accent-foreground">
          <GripVertical className="h-5 w-5" />
        </button>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium mb-2">{assignment.title}</h4>
            <p className="text-muted-foreground text-sm mb-3">{assignment.description}</p>
            {assignment.file_url && (
              <div className="flex items-center space-x-2 text-sm text-primary hover:text-primary/90">
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
                onClick={() => handleEdit(assignment)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(assignment.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortableAssignmentItem;
