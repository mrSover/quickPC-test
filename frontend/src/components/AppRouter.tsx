import { FC } from 'react'

import { publicRoutes } from '../router/router';
import { Navigate, Route, Routes } from 'react-router-dom';


const AppRouter: FC = () => {

  return (
    <div>
      <Routes>
        {
          publicRoutes.map(route =>
            <Route key={route.path} path={route.path} element={<route.component />} />
          )
        }
        <Route path={"*"} element={<Navigate to="/events" />} />
      </Routes >
    </div>
  )
}


export default AppRouter;