
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAssignments } from '../hooks/useAssignments';
import { Assignment } from '../types/assignments';
import { AssignmentList } from './assignments/AssignmentList';
import { AssignmentFormDialog } from './assignments/AssignmentFormDialog';

interface AssignmentManagerProps {
  courseCode: string;
  type: 'assignment' | 'resource';
}

const AssignmentManager = ({ courseCode, type }: AssignmentManagerProps) => {
  const { user } = useAuth();
  const {
    assignments,
    isLoading,
    addAssignment,
    isAdding,
    updateAssignment,
    isUpdating,
    deleteAssignment,
  } = useAssignments(courseCode, type);

  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {assignments.length > 0 ? (
        <AssignmentList
          assignments={assignments}
          user={user}
          onEdit={setEditingAssignment}
          onDelete={deleteAssignment}
        />
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-4">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">
            No {type}s added yet. {user ? "Click the + button to add your first " + type + "." : "Please be patient."}
          </p>
        </div>
      )}

      {user && (
        <AssignmentFormDialog
          type={type}
          editingAssignment={editingAssignment}
          setEditingAssignment={setEditingAssignment}
          addAssignment={addAssignment}
          isAdding={isAdding}
          updateAssignment={updateAssignment}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default AssignmentManager;
