import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import JoblyAPI from './api';

function LoginForm() {
   const navigate = useNavigate();
   const { login, isLoading } = useUser();
   const [error, setError] = useState('');

   const [formData, setFormData] = useState({
      username: '',
      password: '',
   });

   function handleChange(event) {
      const { name, value } = event.target;
      setFormData((formData) => ({
         ...formData,
         [name]: value,
      }));
   }

   async function handleSubmit(event) {
      event.preventDefault();
      try {
         //call API to authenticate the user with the provided username and password
         const { token } = await JoblyAPI.authenticateUser(
            formData.username,
            formData.password
         );

         login(token); //if auth is successful, login the user

         navigate('/'); //navigate back home
      } catch (error) {
         console.error('Login failed:', error);
         setError('Invalid username or password.');
      }
   }

   if (isLoading) {
      return <p>Loading...</p>;
   }

   return (
      <div className="LoginForm">
         <h2>Login to your existing Jobly account!</h2>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               name="username"
               value={formData.username}
               onChange={handleChange}
               placeholder="Enter Username"
            />
            <input
               type="text"
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="Enter Password"
            />

            {/* display errors */}
            {error && <div className="LoginForm-error">{error}</div>}
            <button type="submit">Login</button>
         </form>
         <h4>
            Don't have an account? Sign-up <Link to={'/signup'}>here</Link>
         </h4>
      </div>
   );
}

export default LoginForm;
