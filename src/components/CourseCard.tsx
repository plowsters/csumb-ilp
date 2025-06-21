
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen, CheckCircle, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  code: string;
  name: string;
  units: number;
  path: string;
  description?: string;
  status?: 'completed' | 'in-progress' | 'tbd';
}

const CourseCard = ({ code, name, units, path, description, status = 'tbd' }: CourseCardProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          card: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800/50",
          title: "text-green-900 dark:text-green-100",
          name: "text-green-700 dark:text-green-200",
          description: "text-green-600 dark:text-green-300",
          badge: "bg-green-200 dark:bg-green-800/50 text-green-800 dark:text-green-200",
          link: "text-green-700 dark:text-green-300 hover:text-green-600 dark:hover:text-green-200",
          icon: "text-green-500 dark:text-green-400"
        };
      case 'in-progress':
        return {
          card: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/50",
          title: "text-blue-900 dark:text-blue-100",
          name: "text-blue-700 dark:text-blue-200",
          description: "text-blue-600 dark:text-blue-300",
          badge: "bg-blue-200 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200",
          link: "text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200",
          icon: "text-blue-500 dark:text-blue-400"
        };
      default: // 'tbd'
        return {
          card: "bg-accent",
          title: "text-accent-foreground",
          name: "text-muted-foreground",
          description: "text-muted-foreground",
          badge: "bg-secondary text-secondary-foreground",
          link: "text-primary hover:text-primary/90",
          icon: "text-muted-foreground"
        };
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-400" />;
    }
  };

  const styles = getStatusStyles();

  return (
    <div className={cn(
      "rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200",
      styles.card
    )}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn("text-lg font-semibold", styles.title)}>{code}</h3>
              {getStatusIcon()}
            </div>
            <p className={cn("font-medium", styles.name)}>{name}</p>
          </div>
          <span className={cn(
            "text-xs font-medium px-2.5 py-0.5 rounded",
            styles.badge
          )}>
            {units} Units
          </span>
        </div>
        
        {description && (
          <p className={cn("text-sm mb-4 line-clamp-3", styles.description)}>{description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <Link
            to={path}
            className={cn(
              "inline-flex items-center font-medium text-sm transition-colors",
              styles.link
            )}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            View Course
          </Link>
          <ExternalLink className={cn("h-4 w-4", styles.icon)} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
