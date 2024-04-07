import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomeLayout, Login, Register, Landing, Error } from './pages';
// import { ErrorElement } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'login',
        element: <Login />,
        // action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        // action: registerAction,
      },
    ],
  },
  // {
  //   path: '/dashboard',
  //   element: <DashboardLayout queryClient={queryClient} />,
  //   loader: dashboardLoader(queryClient),
  //   children: [],
  // },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
