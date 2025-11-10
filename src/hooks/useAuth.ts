import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setCredentials, logout } from '../slices/authSlice';
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../services/api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);
  
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [logoutApi] = useLogoutMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      navigate('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Login failed' 
      };
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const result = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(result));
      navigate('/dashboard');
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || 'Registration failed' 
      };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      dispatch(logout());
      navigate('/');
    }
  };

  const isAuthenticated = !!userInfo;
  const isAdmin = userInfo?.role === 'admin';
  const isCounselor = userInfo?.role === 'counselor';

  return {
    user: userInfo,
    isAuthenticated,
    isAdmin,
    isCounselor,
    isLoginLoading,
    isRegisterLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}; 