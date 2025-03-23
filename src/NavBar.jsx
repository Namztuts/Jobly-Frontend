import './NavBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { useUser } from './UserContext';

function NavBar() {
   const navigate = useNavigate();
   const { currentUser, logout } = useUser();
   const loggedInUser = currentUser?.user; //? is used here to access property of an object without causing error if the object is null or underfined

   const handleLogout = async () => {
      await logout(); //call logout function to clear the user and token | wait for logout to finish before navigating
      navigate('/');
   };

   console.log('Current User', currentUser);
   return (
      <nav>
         <Navbar expand="md">
            <NavLink
               to="/"
               className="navbar-brand"
            >
               Jobly
            </NavLink>

            <Nav
               className="ml-auto"
               navbar
            >
               {/* if there is a currentUser, show the jobs/company/profile and logout options */}
               {currentUser ? (
                  <div className="logged-in">
                     <NavItem>
                        <NavLink to="/companies">Companies</NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/jobs">Jobs</NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/profile">Profile</NavLink>
                     </NavItem>
                     {/* Logout will be just a route that takes back to the main page | main page will be login */}
                     <NavItem>
                        <NavLink onClick={handleLogout}>
                           Logout {loggedInUser.username}
                        </NavLink>
                     </NavItem>
                  </div>
               ) : (
                  // if no currentUser, show login and signup options
                  <div className="logged-out">
                     <NavItem>
                        <NavLink to="/login">Login</NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink to="/signup">Sign Up</NavLink>
                     </NavItem>
                  </div>
               )}
            </Nav>
         </Navbar>
      </nav>
   );
}

export default NavBar;
