import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from './AdminLogin';
import { Button } from './ui/button';
import { LogIn, LogOut, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const courses = [
    { code: 'CST 300', name: 'Major ProSeminar', path: '/cst300' },
    { code: 'CST 338', name: 'Software Design', path: '/cst338' },
    { code: 'CST 311', name: 'Intro to Computer Networks', path: '/cst311' },
    { code: 'CST 334', name: 'Operating Systems', path: '/cst334' },
    { code: 'CST 336', name: 'Internet Programming', path: '/cst336' },
    { code: 'CST 363', name: 'Intro to Database Systems', path: '/cst363' },
    { code: 'CST 370', name: 'Design and Analysis of Algorithms', path: '/cst370' },
    { code: 'CST 438', name: 'Software Engineering', path: '/cst438' },
    { code: 'CST 462S', name: 'Race, Gender, Class in the Digital World', path: '/cst462s' },
    { code: 'CST 489', name: 'Capstone Project Planning', path: '/cst489' },
    { code: 'CST 499', name: 'Computer Science Capstone', path: '/cst499' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
            >
              ILP Portfolio
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === "/" 
                  ? "bg-blue-100 text-blue-900" 
                  : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
              )}
            >
              Home
            </Link>
            
            <div className="relative group">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                Courses
              </button>
              
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {courses.map((course) => (
                    <Link
                      key={course.path}
                      to={course.path}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors",
                        location.pathname === course.path
                          ? "bg-blue-100 text-blue-900"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-900"
                      )}
                    >
                      <div className="font-medium">{course.code}</div>
                      <div className="text-xs text-gray-500">{course.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Admin Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-1" />
                  {user.username}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogin(true)}
                className="flex items-center"
              >
                <LogIn className="h-4 w-4 mr-1" />
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <AdminLogin isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
};

export default Navigation;
