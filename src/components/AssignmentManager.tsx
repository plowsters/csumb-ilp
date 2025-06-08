
import React, { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Video, Code, Link, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  file?: File;
  fileUrl?: string;
  fileType?: string;
  createdAt: Date;
}

interface AssignmentManagerProps {
  assignments: Assignment[];
  onAssignmentsChange: (assignments: Assignment[]) => void;
}

const AssignmentManager = ({ assignments, onAssignmentsChange }: AssignmentManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="h-4 w-4" />;
    if (fileType.includes('text/') || fileType.includes('application/')) return <Code className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleSave = () => {
    if (!title.trim()) return;

    const newAssignment: Assignment = {
      id: editingAssignment?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      file: selectedFile || editingAssignment?.file,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : editingAssignment?.fileUrl,
      fileType: selectedFile?.type || editingAssignment?.fileType,
      createdAt: editingAssignment?.createdAt || new Date(),
    };

    if (editingAssignment) {
      const updatedAssignments = assignments.map(a => 
        a.id === editingAssignment.id ? newAssignment : a
      );
      onAssignmentsChange(updatedAssignments);
    } else {
      onAssignmentsChange([...assignments, newAssignment]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedAssignments = assignments.filter(a => a.id !== id);
    onAssignmentsChange(updatedAssignments);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedFile(null);
    setEditingAssignment(null);
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleAddClick = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {assignments.length > 0 && (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border-l-4 border-blue-500 pl-4 bg-white rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{assignment.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                  
                  {assignment.file && (
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      {getFileIcon(assignment.fileType || '')}
                      <button 
                        onClick={() => assignment.fileUrl && window.open(assignment.fileUrl, '_blank')}
                        className="hover:underline"
                      >
                        {assignment.file.name}
                      </button>
                      <Download className="h-3 w-3" />
                    </div>
                  )}
                </div>
                
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
              </div>
            </div>
          ))}
        </div>
      )}

      {assignments.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-4">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">
            No assignments added yet. Click the + button to add your first assignment.
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddClick}
              className="w-12 h-12 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-600 shadow-sm"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAssignment ? 'Edit Assignment' : 'Add New Assignment'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Assignment title"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Assignment description"
                  className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <Label htmlFor="file">Upload File</Label>
                <input
                  id="file"
                  type="file"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  accept=".pdf,.docx,.doc,.mp4,.mov,.avi,.java,.c,.cpp,.py,.go,.rs,.sh,.js,.ts,.html,.css"
                />
                {selectedFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleDialogClose(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={!title.trim()}>
                  {editingAssignment ? 'Update' : 'Add'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AssignmentManager;
