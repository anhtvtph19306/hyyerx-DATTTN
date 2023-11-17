import { useRoutes } from 'react-router-dom';
import DefaulLayout from './app/container/defaul-layout/defaul-layout.component';
import DefaultHome from './app/container/defaul-home/defaul-home.component'
import { clientRouter } from './app/modules/client/router';
import DefaulAdmin from './app/container/default-admin/default-admin.component';
import { AdminRouter } from './app/modules/admin/router';
import { CheckAuth } from './app/container/check-auth/check-auth.component';

function App() {
  let element: any = useRoutes([
    {
      path: '/',
      element: <DefaulLayout />,
      children: [
        {
          path: '',
          element: <DefaultHome />,
          children: clientRouter
        },
        {
          path: 'admin',
          element: (
            <CheckAuth>
              <DefaulAdmin />
            </CheckAuth>
          ),
          children: AdminRouter
        },
      ]
    }
  ])

  return element
}

export default App

