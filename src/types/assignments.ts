
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
