import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import EditForm from './EditForm';
import NotFound from './NotFound';

function RouteList() {
   return (
      <BrowserRouter>
         <NavBar />
         <Routes>
            <Route
               path="/"
               element={<Home />}
            />

            <Route
               path="/companies"
               element={<CompanyList />}
            />

            <Route
               path="/companies/:handle"
               element={<CompanyDetail />}
            />

            <Route
               path="/jobs"
               element={<JobList />}
            />

            <Route
               path="/login"
               element={<LoginForm />}
            />

            <Route
               path="/signup"
               element={<SignupForm />}
            />

            <Route
               path="/profile"
               element={<EditForm />}
            />

            <Route
               path="*"
               element={<NotFound />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default RouteList;
