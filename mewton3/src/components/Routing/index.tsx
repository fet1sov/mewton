import { useEffect } from 'react';
import { useLocation, useRoutes } from 'react-router-dom';

import { routes } from '@/lib/constants/routes';

export const Routing = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const routing = useRoutes(routes);
  return routing;
};
