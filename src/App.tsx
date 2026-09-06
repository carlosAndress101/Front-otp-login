import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PageNotFound } from './Components/PageNotFound';
import { Recovery } from './Components/Recovery';
import { Reset } from './Components/Reset';
import { Profile } from './Components/Profile';
import { Password } from './Components/Password';
import { Register } from './Components/Register';
import { Username } from './Components/Username';

import { AuthorizeUser, ProtectRoute } from './middleware/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Username />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/password',
    element: (
      <ProtectRoute>
        <Password />
      </ProtectRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: '/recovery',
    element: <Recovery />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
