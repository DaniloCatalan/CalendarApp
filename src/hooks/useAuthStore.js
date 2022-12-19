// Another alternative to implement redux, this way is without use the thunks(extra layer) files

import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth', { email, password });
      setToken(data.token, data.name, data.uid);
    } catch (error) {
      handleError('Creadenciales incorrectas');
    }
  };

  const starRegister = async ({ name, email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await calendarApi.post('/auth/new', {
        name,
        email,
        password,
      });
      setToken(data.token, data.name, data.uid);
    } catch (error) {
      handleError(error.response.data?.msg || 'error');
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) return dispatch(onLogout());
    try {
      const { data } = await calendarApi.get('auth/renew');
      setToken(data.token, data.name, data.uid);
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const handleError = (message) => {
    dispatch(onLogout(message));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 10);
  };

  const setToken = (token, name, uid) => {
    localStorage.setItem('token', token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(onLogin({ name: name, uid: uid }));
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    starRegister,
    checkAuthToken,
  };
};
