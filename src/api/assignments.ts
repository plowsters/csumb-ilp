
import { Assignment } from '../types/assignments';

const API_BASE_URL = 'https://csumb-ilp.vercel.app';

export const fetchAssignmentsAPI = async (courseCode: string): Promise<Assignment[]> => {
  const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch assignments');
  }
  return response.json();
};

export const uploadFileAPI = async (file: File): Promise<{ url: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/upload?filename=${encodeURIComponent(file.name)}`, {
    method: 'POST',
    body: file,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'File upload failed');
  }
  return response.json();
};

type AssignmentPayload = {
    title: string;
    description: string;
    file_url?: string;
    file_type?: string;
    type: 'assignment' | 'resource';
};

export const addAssignmentAPI = async (courseCode: string, assignmentData: AssignmentPayload) => {
  const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(assignmentData),
  });
  if (!response.ok) {
    throw new Error('Failed to add assignment');
  }
  return response.json();
};

export const updateAssignmentAPI = async (courseCode: string, assignmentData: Partial<AssignmentPayload> & { id: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(assignmentData),
  });
  if (!response.ok) {
    throw new Error('Failed to update assignment');
  }
  return response.json();
};

export const deleteAssignmentAPI = async (courseCode: string, id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/assignments/${courseCode}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete assignment');
  }
  return response.json();
};
