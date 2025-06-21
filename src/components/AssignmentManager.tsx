import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FileText, Video, Code, Download, Link, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../hooks/useAuth';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableAssignmentItem from './SortableAssignmentItem';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AspectRatio } from './ui/aspect-ratio';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  file_url?: string;
  file_type?: string;
  course_code: string;
  type: 'assignment' | 'resource';
  created_at: Date;
  position?: number;
  screenshot_url?: string;
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
  const [linkUrl, setLinkUrl] = useState('');
  const [resourceType, setResourceType] = useState<'file' | 'link'>('file');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  }));

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
    if (fileType === 'link') return <Link className="h-4 w-4" />;
    if (fileType?.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (fileType?.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (fileType?.includes('pdf') || fileType?.includes('document')) return <FileText className="h-4 w-4" />;
    if (fileType?.includes('text/') || fileType?.includes('application/')) return <Code className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getResourcePreview = (assignment: Assignment) => {
    if (!assignment.file_url) return null;

    // Website link - use stored screenshot from database
    if (assignment.file_type === 'link') {
      // Check if it's a YouTube link and handle specially
      const isYouTube = assignment.file_url.includes('youtube.com/watch') || assignment.file_url.includes('youtu.be.');
      
      if (isYouTube) {
        // Extract video ID from YouTube URL
        const videoId = assignment.file_url.includes('youtube.com/watch') 
          ? assignment.file_url.split('v=')[1]?.split('&')[0]
          : assignment.file_url.split('youtu.be/')[1]?.split('?')[0];
        
        if (videoId) {
          return (
            <a 
              href={assignment.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block mt-3 border rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            >
              <AspectRatio ratio={16 / 9}>
                <div className="relative w-full h-full">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={assignment.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to standard thumbnail if maxres fails
                      e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </AspectRatio>
              <div className="p-2 bg-background border-t">
                <span className="text-sm text-primary hover:underline truncate block">
                  {assignment.file_url}
                </span>
              </div>
            </a>
          );
        }
      }

      // For other websites, use the stored screenshot from database with 16:9 ratio
      if (assignment.screenshot_url) {
        return (
          <a 
            href={assignment.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-3 border rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
          >
            <AspectRatio ratio={16 / 9}>
              <img
                src={assignment.screenshot_url}
                alt={`Preview of ${assignment.title}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to a placeholder if screenshot fails to load
                  const fallback = e.currentTarget.parentElement;
                  if (fallback) {
                    fallback.innerHTML = `
                      <div class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <div class="text-center">
                          <svg class="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                            <polyline points="14,2 14,8 20,8"/>
                          </svg>
                          <p class="text-sm text-gray-500">Preview unavailable</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </AspectRatio>
            <div className="p-2 bg-background border-t">
              <span className="text-sm text-primary hover:underline truncate block">
                {assignment.file_url}
              </span>
            </div>
          </a>
        );
      } else {
        // No screenshot available, show placeholder with 16:9 ratio
        return (
          <a 
            href={assignment.file_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-3 border rounded-lg overflow-hidden bg-muted hover:opacity-80 transition-opacity"
          >
            <AspectRatio ratio={16 / 9}>
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  <p className="text-sm text-gray-500">Preview generating...</p>
                </div>
              </div>
            </AspectRatio>
            <div className="p-2 bg-background border-t">
              <span className="text-sm text-primary hover:underline truncate block">
                {assignment.file_url}
              </span>
            </div>
          </a>
        );
      }
    }

    // All other file types (images, videos, PDFs) use 16:9 ratio and are clickable
    return (
      <a 
        href={assignment.file_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block mt-3 border rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
      >
        <AspectRatio ratio={16 / 9}>
          {assignment.file_type?.startsWith('image/') ? (
            <img 
              src={assignment.file_url} 
              alt={assignment.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : assignment.file_type?.startsWith('video/') ? (
            <div className="relative w-full h-full">
              <video 
                src={assignment.file_url}
                className="w-full h-full object-cover"
                preload="metadata"
                muted
                poster=""
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          ) : assignment.file_type?.includes('pdf') ? (
            <iframe
              src={`${assignment.file_url}#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=150`}
              className="w-full h-full"
              title={assignment.title}
              frameBorder="0"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                <p className="text-sm text-gray-500">File preview</p>
              </div>
            </div>
          )}
        </AspectRatio>
      </a>
    );
  };

  const handleSave = async () => {
    if (!title.trim() || !user) return;
    if (resourceType === 'link' && !linkUrl.trim()) return;
    if (resourceType === 'file' && !selectedFile && !editingAssignment?.file_url) return;

    setIsUploading(true);

    try {
      let fileUrl = editingAssignment?.file_url;
      let fileType = editingAssignment?.file_type;

      if (resourceType === 'link') {
        fileUrl = linkUrl.trim();
        fileType = 'link';
      } else if (selectedFile) {
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
    setLinkUrl(assignment.file_type === 'link' ? assignment.file_url || '' : '');
    setResourceType(assignment.file_type === 'link' ? 'link' : 'file');
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
    setLinkUrl('');
    setResourceType('file');
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

  const updateOrderInBackend = async (orderedIds: string[]) => {
    try {
      await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderedIds }),
      });
    } catch (error) {
      console.error('Error updating assignment order:', error);
      // Revert on error
      fetchAssignments();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAssignments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        const orderedIds = newOrder.map(item => item.id);
        updateOrderInBackend(orderedIds);

        return newOrder;
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {assignments.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={assignments.map(a => a.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <SortableAssignmentItem
                  key={assignment.id}
                  assignment={assignment}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  getFileIcon={getFileIcon}
                  getResourcePreview={getResourcePreview}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {assignments.length === 0 && (
        <div className="bg-accent border border-border rounded-lg p-6 text-center mb-4">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-4">
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
                className="w-12 h-12 rounded-full bg-card hover:bg-accent border text-muted-foreground shadow-sm"
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
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={`${type} description`}
                    className="h-20 resize-none"
                  />
                </div>

                <div>
                  <Label>Resource Type</Label>
                  <Select value={resourceType} onValueChange={(value: 'file' | 'link') => setResourceType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file">File Upload</SelectItem>
                      <SelectItem value="link">Website Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {resourceType === 'link' ? (
                  <div>
                    <Label htmlFor="link">Website URL</Label>
                    <Input
                      id="link"
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="file">Upload File</Label>
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileSelect}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      accept=".pdf,.docx,.doc,.mp4,.mov,.avi,.java,.c,.cpp,.py,.go,.rs,.sh,.js,.ts,.html,.css,.jpg,.jpeg,.png,.gif,.webp"
                    />
                    {selectedFile && (
                      <p className="text-xs text-gray-500 mt-1">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                    {editingAssignment?.file_url && !selectedFile && editingAssignment.file_type !== 'link' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Current file: <a href={editingAssignment.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View File</a>
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => handleDialogClose(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    disabled={!title.trim() || isUploading || (resourceType === 'link' && !linkUrl.trim()) || (resourceType === 'file' && !selectedFile && !editingAssignment?.file_url)}
                  >
                    {isUploading ? 'Saving...' : (editingAssignment ? 'Update' : 'Add')}
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
