import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import MyTickets from './pages/MyTickets';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Home from './pages/HomePage/Home';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
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
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Home | DeskTail" />
              <Home />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Login | DeskTail" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Cadastro | DeskTail" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | DeskTail" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Perfil | DeskTail" />
              <Profile />
            </>
          }
        />
        <Route
          path="/my-tickets"
          element={
            <>
              <PageTitle title="Meus tickets | DeskTail" />
              <MyTickets />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Configurações | DeskTail" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Dashboard Admin | DeskTail" />
              <Chart />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tabelas | DeskTail" />
              <Tables />
            </>
          }
        />
        {/* <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendario | DeskTail - Dashboard" />
              <Calendar />
            </>
          }
        />
        
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | DeskTail - Dashboard" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | DeskTail - Dashboard" />
              <FormLayout />
            </>
          }
        />
        
        
        
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts  DeskTail - Dashboard" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons  DeskTail - Dashboard" />
              <Buttons />
            </>
          }
        /> */}
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | DeskTail - Dashboard" />
              <SignIn />
            </>
          }
        />
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | DeskTail - Dashboard" />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
    </>
  );
}

export default App;
