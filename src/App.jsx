import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/**import all components */
import { PageNotFound } from './Components/PageNotFound'
import { Recovery } from './Components/Recovery'
import { Reset } from './Components/Reset'
import { Profile } from './Components/Profile'
import { Password } from './Components/Password'
import { Register } from './Components/Register'
import { Username } from './Components/Username'

/**auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth'

/**root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/password',
    element: <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path: '/profile',
    element: <AuthorizeUser><Profile/></AuthorizeUser>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  }
])
function App() {
  return (
    <main>
      <RouterProvider router={router}>

      </RouterProvider>
    </main>
  );
}

export default App;
