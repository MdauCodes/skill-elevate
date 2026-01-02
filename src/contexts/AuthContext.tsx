import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUser, User, courses } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
  completeCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  hasCompleted: (courseId: string) => boolean;
  getProgress: (courseId: string) => number;
  updateProgress: (courseId: string, lessonId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Store for course progress
const courseProgress: Record<string, { completed: string[]; total: number }> = {};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('mwanzo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password.length >= 6) {
      const loggedInUser = { ...mockUser, email };
      setUser(loggedInUser);
      localStorage.setItem('mwanzo_user', JSON.stringify(loggedInUser));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d9488&color=fff`,
        role: 'student',
        enrolledCourses: [],
        completedCourses: [],
        certificates: [],
      };
      setUser(newUser);
      localStorage.setItem('mwanzo_user', JSON.stringify(newUser));
      return { success: true };
    }
    
    return { success: false, error: 'Please fill all fields correctly' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mwanzo_user');
  };

  const enrollInCourse = (courseId: string) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId],
      };
      setUser(updatedUser);
      localStorage.setItem('mwanzo_user', JSON.stringify(updatedUser));
      
      // Initialize progress
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);
        courseProgress[courseId] = { completed: [], total: totalLessons };
      }
    }
  };

  const completeCourse = (courseId: string) => {
    if (user && !user.completedCourses.includes(courseId)) {
      const updatedUser = {
        ...user,
        completedCourses: [...user.completedCourses, courseId],
        certificates: [...user.certificates, courseId],
      };
      setUser(updatedUser);
      localStorage.setItem('mwanzo_user', JSON.stringify(updatedUser));
    }
  };

  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses.includes(courseId) || false;
  };

  const hasCompleted = (courseId: string) => {
    return user?.completedCourses.includes(courseId) || false;
  };

  const getProgress = (courseId: string) => {
    const progress = courseProgress[courseId];
    if (!progress || progress.total === 0) return 0;
    return Math.round((progress.completed.length / progress.total) * 100);
  };

  const updateProgress = (courseId: string, lessonId: string) => {
    if (!courseProgress[courseId]) {
      const course = courses.find(c => c.id === courseId);
      if (course) {
        const totalLessons = course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0);
        courseProgress[courseId] = { completed: [], total: totalLessons };
      }
    }
    
    if (courseProgress[courseId] && !courseProgress[courseId].completed.includes(lessonId)) {
      courseProgress[courseId].completed.push(lessonId);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        enrollInCourse,
        completeCourse,
        isEnrolled,
        hasCompleted,
        getProgress,
        updateProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
