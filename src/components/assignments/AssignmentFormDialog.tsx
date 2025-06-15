
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Assignment } from '../../types/assignments';

interface AssignmentFormDialogProps {
  type: 'assignment' | 'resource';
  editingAssignment: Assignment | null;
  setEditingAssignment: (assignment: Assignment | null) => void;
  addAssignment: (variables: any, options: { onSuccess: () => void }) => void;
  isAdding: boolean;
  updateAssignment: (variables: any, options: { onSuccess: () => void }) => void;
  isUpdating: boolean;
}

export const AssignmentFormDialog = ({
  type,
  editingAssignment,
  setEditingAssignment,
  addAssignment,
  isAdding,
  updateAssignment,
  isUpdating,
}: AssignmentFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editingAssignment) {
      setTitle(editingAssignment.title);
      setDescription(editingAssignment.description);
      setSelectedFile(null);
      setIsOpen(true);
    }
  }, [editingAssignment]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setEditingAssignment(null);
  };

  const handleDialogClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleSave = () => {
    const onSaveSuccess = () => {
      handleDialogClose(false);
    };

    if (editingAssignment) {
      updateAssignment({
        id: editingAssignment.id,
        title: title.trim(),
        description: description.trim(),
        selectedFile,
        currentFileUrl: editingAssignment.file_url,
        currentFileType: editingAssignment.file_type,
      }, { onSuccess: onSaveSuccess });
    } else {
      addAssignment({
        title: title.trim(),
        description: description.trim(),
        selectedFile,
      }, { onSuccess: onSaveSuccess });
    }
  };

  const isSaving = isAdding || isUpdating;

  return (
    <div className="flex justify-center mt-6">
      <Dialog open={isOpen} onOpenChange={handleDialogClose}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-600 shadow-sm"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAssignment ? `Edit ${type}` : `Add New ${type}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`${type} title`} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`${type} description`}
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="file">Upload File</Label>
              <input
                id="file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                accept=".pdf,.docx,.doc,.mp4,.mov,.avi,.java,.c,.cpp,.py,.go,.rs,.sh,.js,.ts,.html,.css"
              />
              {selectedFile && <p className="text-xs text-gray-500 mt-1">Selected: {selectedFile.name}</p>}
              {editingAssignment?.file_url && !selectedFile && (
                <p className="text-xs text-gray-500 mt-1">
                  Current file: <a href={editingAssignment.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View File</a>
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => handleDialogClose(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!title.trim() || isSaving}>
                {isSaving ? 'Saving...' : (editingAssignment ? 'Update' : 'Add')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
