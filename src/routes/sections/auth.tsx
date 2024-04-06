import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// AMPLIFY

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));

// FIREBASE
const FirebaseLoginPage = lazy(() => import('src/pages/auth/firebase/login'));
const FirebaseRegisterPage = lazy(() => import('src/pages/auth/firebase/register'));
const FirebaseVerifyPage = lazy(() => import('src/pages/auth/firebase/verify'));
const FirebaseForgotPasswordPage = lazy(() => import('src/pages/auth/firebase/forgot-password'));

// SUPABASE
const SupabaseLoginPage = lazy(() => import('src/pages/auth/supabase/login'));
const SupabaseVerifyPage = lazy(() => import('src/pages/auth/supabase/verify'));
const SupabaseRegisterPage = lazy(() => import('src/pages/auth/supabase/register'));
const SupabaseNewPasswordPage = lazy(() => import('src/pages/auth/supabase/new-password'));
const SupabaseForgotPasswordPage = lazy(() => import('src/pages/auth/supabase/forgot-password'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <JwtRegisterPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
  ],
};

const authFirebase = {
  path: 'firebase',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthModernCompactLayout>
            <FirebaseLoginPage />
          </AuthModernCompactLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthModernCompactLayout>
            <FirebaseRegisterPage />
          </AuthModernCompactLayout>
        </GuestGuard>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <FirebaseVerifyPage /> },
        { path: 'forgot-password', element: <FirebaseForgotPasswordPage /> },
      ],
    },
  ],
};

const authSupabase = {
  path: 'supabase',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthClassicLayout>
            <SupabaseLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <SupabaseRegisterPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <SupabaseVerifyPage /> },
        {
          path: 'forgot-password',
          element: <SupabaseForgotPasswordPage />,
        },
        { path: 'new-password', element: <SupabaseNewPasswordPage /> },
      ],
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authFirebase, authJwt, authSupabase],
  },
];
