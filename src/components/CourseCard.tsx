
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen } from 'lucide-react';

interface CourseCardProps {
  code: string;
  name: string;
  units: number;
  path: string;
  description?: string;
}

const CourseCard = ({ code, name, units, path, description }: CourseCardProps) => {
  return (
    <div className="bg-accent rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-accent-foreground">{code}</h3>
          <p className="text-muted-foreground font-medium">{name}</p>
        </div>
        <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2.5 py-0.5 rounded">
          {units} Units
        </span>
      </div>
      
      {description && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>
      )}
      
      <div className="flex items-center justify-between">
        <Link
          to={path}
          className="inline-flex items-center text-primary hover:text-primary/90 font-medium text-sm transition-colors"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          View Course
        </Link>
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default CourseCard;
