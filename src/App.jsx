/* eslint-disable prettier/prettier */
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

// project imports
import ThemeCustomization from 'themes'

import ScrollTop from 'components/ScrollTop'

// project imports
import Loadable from 'components/Loadable'
import React, { lazy, Suspense, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Backdrop, CircularProgress } from '@mui/material'
import { SuspenseLoader } from './components/suspense_loader'
import { AuthRoute } from './routes/AuthRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import DashboardLayout from './layout/Dashboard'
import APIService from './service/api-service'
import { setAuth, setProfile } from './redux/reducers/auth'
import { ToastContainer } from 'react-toastify'

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')))
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')))
const HomePage = Loadable(lazy(() => import('pages/dashboard/default.jsx')))
const ApplicationPage = Loadable(lazy(() => import('pages/dashboard/applications.jsx')))



// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App () {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.loader)
  // const { isAuth, profile } = useSelector(state => state.auth)

  // const accessToken = localStorage.getItem('accessToken') ?? ''

  const initializr = useCallback(async() => {
    try {
      const resp = await APIService.getProfile();
      if (resp.status >= 200 && resp.status <= 299) {
        // Operation was successful
        dispatch(setProfile(resp.data));
        dispatch(setAuth(true))
      }
    } catch (error) {
      console.log(error);
      
    }
  }, [dispatch])

  useEffect(() => {
    initializr();
  }, [initializr])

  return (
    <ThemeCustomization>
      <Backdrop open={isLoading} sx={{ zIndex: 10000 }}>
        <CircularProgress size={48} />
      </Backdrop>
      <ToastContainer position='top-right' />
      <ScrollTop>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route
              path='/'
              element={
                <AuthRoute>
                  <React.Fragment>
                    <Suspense fallback={<SuspenseLoader />}>
                      <Outlet />
                    </Suspense>
                  </React.Fragment>
                </AuthRoute>
              }
            >
              <Route index element={<LoginPage />} />
              <Route path='forgot-password' element={<div />} />
              <Route path='verify-otp' element={<div />} />
              <Route path='/signup' element={<RegisterPage />} />
              <Route path='reset-password' element={<div />} />
            </Route>

            {/* Dashboard Routes */}
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              {/* Application Routes */}
              <Route path='applications'>
                <Route index element={<ApplicationPage />} />
                <Route path=':id' element={<div />} />
              </Route>
              {/* Application Routes */}
              <Route path='email-phone'>
                <Route index element={<p>Lorem email and phone contacts ...</p>} />
              </Route>
              {/* Application Routes */}
              <Route path='admins'>
                <Route index element={<p>Lorem admins contacts ...</p>} />
              </Route>
              {/* Application Routes */}
              <Route path='profile'>
                <Route index element={<p>Lorem profile contacts ...</p>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ScrollTop>
    </ThemeCustomization>
  )
}
