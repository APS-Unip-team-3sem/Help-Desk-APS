import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import ToDo from './pages/ToDo';
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
import CreateTicket from './components/Ticket/CreateTicket';
import TicketDetails from './components/Ticket/TicketDetails';
import DropdownUser from './components/Header/DropdownUser';
import TicketCard from './pages/TicketCard';
import Base from './components/Base/Base';


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
          path="/ticket/create" 
          element={
            <>
              <PageTitle title="Criar Ticket | DeskTail" />
              <CreateTicket />
            </>
          } 
          />
          {/* Ticket (id do ticket)  */}
          <Route 
          path="/ticket/:id"
          element={
            <>
              <PageTitle title="Ticket | DeskTail" />
              <TicketDetails />
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
        <Route
          path="/usuario/:nome"
          element={
            <>
              <PageTitle title="Usuario | DeskTail" />
              <DropdownUser />
            </>
          }
        />
        <Route
          path="/calendario"
          element={
            <>
              <PageTitle title="Calendário | DeskTail" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/to-do-list"
          element={
            <>
              <PageTitle title="To Do List | DeskTail" />
              <ToDo />
            </>
          }
        />
        <Route 
          path="ticket/:id"
          element={
            <>
              <PageTitle title="To Do List | DeskTail" />
              <TicketCard />
            </>
          }
        />
        <Route 
          path="/base-conhecimento"
          element={
            <>
              <PageTitle title=" Dashboard | DeskTail" />
              <Base />
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
              <PageTitle title="Alerts |  DeskTail - Dashboard" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons |  DeskTail - Dashboard" />
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
