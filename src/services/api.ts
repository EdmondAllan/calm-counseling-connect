// Re-export all API hooks for easy importing
export {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '../slices/usersApiSlice';

export {
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from '../slices/servicesApiSlice';

export {
  useGetCounselorsQuery,
  useGetCounselorQuery,
  useCreateCounselorMutation,
  useUpdateCounselorMutation,
  useDeleteCounselorMutation,
} from '../slices/counselorsApiSlice';

export {
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useGetUserAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useCancelAppointmentMutation,
} from '../slices/appointmentsApiSlice';

// API configuration
export const API_CONFIG = {
  baseURL: '/api',
  timeout: 10000,
};

// Common API error types
export interface ApiError {
  status: number;
  data: {
    message: string;
    errors?: string[];
  };
}

// Common response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'counselor';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Service types
export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Counselor types
export interface Counselor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  bio: string;
  experience: number;
  rating: number;
  isAvailable: boolean;
  services: string[];
  createdAt: string;
  updatedAt: string;
}

// Appointment types
export interface Appointment {
  _id: string;
  user: string | User;
  counselor: string | Counselor;
  service: string | Service;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentRequest {
  counselorId: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
} 