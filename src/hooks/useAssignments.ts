
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAssignmentsAPI, addAssignmentAPI, updateAssignmentAPI, deleteAssignmentAPI, uploadFileAPI } from '../api/assignments';
import { Assignment } from '../types/assignments';

export const useAssignments = (courseCode: string, type: 'assignment' | 'resource') => {
  const queryClient = useQueryClient();
  const queryKey = ['assignments', courseCode, type];

  const { data: assignments = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const data = await fetchAssignmentsAPI(courseCode);
      return data.filter((item: Assignment) => item.type === type);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (variables: { title: string; description: string; selectedFile: File | null }) => {
      let file_url: string | undefined;
      let file_type: string | undefined;

      if (variables.selectedFile) {
        const newBlob = await uploadFileAPI(variables.selectedFile);
        file_url = newBlob.url;
        file_type = variables.selectedFile.type;
      }
      
      const assignmentData = {
        title: variables.title,
        description: variables.description,
        file_url,
        file_type,
        type,
      };

      return addAssignmentAPI(courseCode, assignmentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (variables: { id: string; title: string; description: string; selectedFile: File | null; currentFileUrl?: string; currentFileType?: string; }) => {
      let file_url = variables.currentFileUrl;
      let file_type = variables.currentFileType;

      if (variables.selectedFile) {
        const newBlob = await uploadFileAPI(variables.selectedFile);
        file_url = newBlob.url;
        file_type = variables.selectedFile.type;
      }

      const assignmentData = {
        id: variables.id,
        title: variables.title,
        description: variables.description,
        file_url,
        file_type,
      };

      return updateAssignmentAPI(courseCode, assignmentData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAssignmentAPI(courseCode, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    assignments,
    isLoading,
    addAssignment: addMutation.mutate,
    isAdding: addMutation.isPending,
    updateAssignment: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteAssignment: deleteMutation.mutate,
  };
};
