
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  code: string;
  name: string;
  units: number;
  path: string;
  description?: string;
  isCompleted?: boolean;
}

const CourseCard = ({ code, name, units, path, description, isCompleted }: CourseCardProps) => {
  return (
    <div className={cn(
      "rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200",
      isCompleted 
        ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50" 
        : "bg-accent"
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "text-lg font-semibold",
                isCompleted 
                  ? "text-green-900 dark:text-green-100" 
                  : "text-accent-foreground"
              )}>{code}</h3>
              {isCompleted && <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />}
            </div>
            <p className={cn(
              "font-medium",
              isCompleted 
                ? "text-green-700 dark:text-green-200" 
                : "text-muted-foreground"
            )}>{name}</p>
          </div>
          <span className={cn(
            "text-xs font-medium px-2.5 py-0.5 rounded",
            isCompleted
              ? "bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-200"
              : "bg-secondary text-secondary-foreground"
          )}>
            {units} Units
          </span>
        </div>
        
        {description && (
          <p className={cn(
            "text-sm mb-4 line-clamp-3",
            isCompleted 
              ? "text-green-600 dark:text-green-300" 
              : "text-muted-foreground"
          )}>{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            to={path}
            className={cn(
              "inline-flex items-center font-medium text-sm transition-colors",
              isCompleted
                ? "text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200"
                : "text-primary hover:text-primary/90"
            )}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Course
          </Link>
          <ExternalLink className={cn(
            "h-4 w-4",
            isCompleted 
              ? "text-green-500 dark:text-green-400" 
              : "text-muted-foreground"
          )} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
