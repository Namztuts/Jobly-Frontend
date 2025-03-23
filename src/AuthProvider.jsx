import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from './UserContext';
import JoblyAPI from './api';

function AuthProvider({ children }) {
   // const [token, setToken] = useState(localStorage.getItem('token'));
   //allows the function to only run once on initial render vs the above
   const [token, setToken] = useState(
      () => localStorage.getItem('token') || null
   );
   const [currentUser, setCurrentUser] = useState(null);

   const [isLoading, setIsLoading] = useState(true); //global loading state since it is used multiple times
   const toggleLoading = () => {
      setIsLoading((loading) => !loading);
   }; //setting the opposite of the current state (for a boolean)

   useEffect(() => {
      function handleToken() {
         //set token and add to local storage
         if (token) {
            localStorage.setItem('token', token);
            JoblyAPI.token = token;
         } else {
            localStorage.removeItem('token');
            setCurrentUser(null);
         }
      }

      async function fetchUser() {
         //if there is no token, return
         if (!token) {
            setIsLoading(false);
            return;
         }

         setIsLoading(true);
         try {
            setIsLoading(true);

            const { username } = jwtDecode(token); // decode with jwt
            const user = await JoblyAPI.getUser(username); // fetch user data
            setCurrentUser(user);
         } catch (error) {
            console.error('Invalid token:', error);
            setCurrentUser(null);
         } finally {
            setIsLoading(false);
         }
      }

      handleToken();
      fetchUser();
   }, [token]); // runs whenever token changes

   const login = (newToken) => {
      setToken(newToken); //add the token to state
   };

   const logout = () => {
      setToken(null); //clears the token
      setCurrentUser(null); //removes user from state
      localStorage.removeItem('token'); //removes user from localstorage
   };

   return (
      <UserContext.Provider
         value={{
            currentUser,
            token,
            isLoading,
            setIsLoading,
            toggleLoading,
            login,
            logout,
            setCurrentUser,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export default AuthProvider;
