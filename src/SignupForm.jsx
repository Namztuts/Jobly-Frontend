import { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import JoblyAPI from './api';

function SignUpForm() {
   const navigate = useNavigate();
   const { login, isLoading } = useUser();

   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
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
         const token = await JoblyAPI.registerUser(formData); //call API to register the user with the provided form data

         login(token, { username: formData.username }); //if registration is successful, log in user using the login function from context
         navigate('/'); //navigate to home page
      } catch (error) {
         setError(error);
         console.error('Error during signup:', error);
      }
   }

   if (isLoading) {
      return <p>Loading...</p>;
   }

   return (
      <div className="SignupForm">
         <h2>Sign-up for Jobly!</h2>
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
            <input
               type="text"
               name="firstName"
               value={formData.firstName}
               onChange={handleChange}
               placeholder="Enter first name"
            />
            <input
               type="text"
               name="lastName"
               value={formData.lastName}
               onChange={handleChange}
               placeholder="Enter last name"
            />
            <input
               type="text"
               name="email"
               value={formData.email}
               onChange={handleChange}
               placeholder="Enter email"
            />

            {/* display errors */}
            {error && <div className="SignupForm-error">{error}</div>}
            <button type="submit">Signup</button>
         </form>
      </div>
   );
}

export default SignUpForm;
