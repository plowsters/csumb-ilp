
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, Video, Code, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../hooks/useAuth';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  file_url?: string;
  file_type?: string;
  course_code: string;
  type: 'assignment' | 'resource';
  created_at: Date;
}

interface AssignmentManagerProps {
  courseCode: string;
  type: 'assignment' | 'resource';
}

const API_BASE_URL = 'https://csumb-ilp.vercel.app';

const AssignmentManager = ({ courseCode, type }: AssignmentManagerProps) => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Load assignments from API
  useEffect(() => {
    fetchAssignments();
  }, [courseCode, type]);

  const fetchAssignments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.filter((item: Assignment) => item.type === type);
        setAssignments(filteredData);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="h-4 w-4" />;
    if (fileType.includes('text/') || fileType.includes('application/')) return <Code className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleSave = async () => {
    if (!title.trim() || !user) return;
    setIsUploading(true);

    try {
      let fileUrl = editingAssignment?.file_url;
      let fileType = editingAssignment?.file_type;

      if (selectedFile) {
        const response = await fetch(`${API_BASE_URL}/api/upload?filename=${encodeURIComponent(selectedFile.name)}`, {
          method: 'POST',
          body: selectedFile,
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('File upload failed:', errorData);
          throw new Error(errorData.error || 'File upload failed');
        }
        
        const newBlob = await response.json();
        fileUrl = newBlob.url;
        fileType = selectedFile.type;
      }

      const assignmentData = {
        title: title.trim(),
        description: description.trim(),
        fileUrl,
        fileType,
        type,
      };

      if (editingAssignment) {
        const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...assignmentData, id: editingAssignment.id }),
        });
        
        if (response.ok) {
          fetchAssignments();
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(assignmentData),
        });
        
        if (response.ok) {
          fetchAssignments();
        }
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving assignment:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!user) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        fetchAssignments();
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

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
          ))}
        </div>
      )}

      {assignments.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center mb-4">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 mb-4">
            No {type}s added yet. {user ? "Click the + button to add your first " + type + "." : "Please be patient."}
          </p>
        </div>
      )}

      {user && (
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
                  {editingAssignment ? `Edit ${type}` : `Add New ${type}`}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={`${type} title`}
                  />
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
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    accept=".pdf,.docx,.doc,.mp4,.mov,.avi,.java,.c,.cpp,.py,.go,.rs,.sh,.js,.ts,.html,.css"
                  />
                  {selectedFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Selected: {selectedFile.name}
                    </p>
                  )}
                  {editingAssignment?.file_url && !selectedFile && (
                    <p className="text-xs text-gray-500 mt-1">
                      Current file: <a href={editingAssignment.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View File</a>
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleDialogClose(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={!title.trim() || isUploading}>
                    {isUploading ? 'Uploading...' : (editingAssignment ? 'Update' : 'Add')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AssignmentManager;
