
import React from 'react';
import { AssignmentItem } from './AssignmentItem';
import { Assignment } from '../../types/assignments';
import { User } from '../../hooks/useAuth';

interface AssignmentListProps {
  assignments: Assignment[];
  user: User | null;
  onEdit: (assignment: Assignment) => void;
  onDelete: (id: string) => void;
}

export const AssignmentList = ({ assignments, user, onEdit, onDelete }: AssignmentListProps) => {
  return (
    <div className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentItem
          key={assignment.id}
          assignment={assignment}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
