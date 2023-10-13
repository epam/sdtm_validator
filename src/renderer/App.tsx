import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@components';
import { AppConnector } from '@connectors';
import { ADDITIONAL_ROUTES, ROUTE_PATHS, ROUTES } from '@constants';

export const App = () => (
  <Router>
    <AppLayout>
      <AppConnector>
        <Routes>
          <Route element={<Navigate to={ROUTE_PATHS.validation} replace />} path={ROUTE_PATHS.default} />
          {[...ROUTES, ...ADDITIONAL_ROUTES].map(({ path, element }) => (
            <Route key={path} element={element} path={path} />
          ))}
        </Routes>
      </AppConnector>
    </AppLayout>
  </Router>
);
