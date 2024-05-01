import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from '../src/views/auth/SignIn';

const App = () => {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Routes>
        <Route 
          path="/login" 
          element={
            <>
              <PageTitle title="Login | DeskTail" />
              <SignIn />
            </>
          } 
        />
      </Routes>
    </div>
  );
};

export default App;