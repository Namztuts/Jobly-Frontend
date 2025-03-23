import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import JoblyAPI from './api';

function EditForm() {
   const navigate = useNavigate();
   const { currentUser, setCurrentUser } = useUser();
   const loggedInUser = currentUser?.user;

   //initialize form state with the current user's data
   const [formData, setFormData] = useState({
      username: loggedInUser?.username || '',
      firstName: loggedInUser?.firstName || '',
      lastName: loggedInUser?.lastName || '',
      email: loggedInUser?.email || '',
   });

   //state for error and success messages
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   function handleChange(event) {
      const { name, value } = event.target;
      setFormData((formData) => ({
         ...formData,
         [name]: value,
      }));
   }

   const handleSubmit = async (event) => {
      event.preventDefault();

      const { username, ...updatedData } = formData; //take username out of formData (username is not editable)

      try {
         const updatedUser = await JoblyAPI.editUser(updatedData, username); //send the updated user data to the API

         //update the currentUser in the context with the new user data
         setCurrentUser((prevState) => ({
            ...prevState,
            user: updatedUser,
         }));

         //set success and clear error state
         setError(null);
         setSuccess('Profile successfully updated!');

         setTimeout(() => navigate('/'), 2000); //NOTE: redirect to the profile page. Delay needed for render
      } catch (error) {
         //set error and clear success state
         console.error('Error during profile update:', error);
         setError(error);
         setSuccess(null);
      }
   };

   //clear the success message after 3 seconds
   useEffect(() => {
      if (success) {
         const timer = setTimeout(() => setSuccess(null), 3000);
         return () => clearTimeout(timer);
      }
   }, [success]);
   console.log('error state', error);
   console.log('success state', success);

   return (
      <div className="EditForm">
         <h2>Profile</h2>
         <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
               id="username"
               name="username"
               value={formData.username}
               onChange={handleChange}
               disabled //disables the ability to edit this field
            />
            {/* <label htmlFor="password">Password: </label>
            <input
               id='password'
               name="password"
               value={formData.password}
               onChange={handleChange}
            /> */}
            <label htmlFor="firstName">First Name: </label>
            <input
               id="firstName"
               name="firstName"
               value={formData.firstName}
               onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name: </label>
            <input
               id="lastName"
               name="lastName"
               value={formData.lastName}
               onChange={handleChange}
            />
            <label htmlFor="email">Email: </label>
            <input
               id="email"
               name="email"
               value={formData.email}
               onChange={handleChange}
            />

            <button type="submit">Submit Edit</button>
            {/* display errors */}
            {error && <div className="EditForm-error">{error}</div>}
            {success && <div className="EditForm-success">{success}</div>}
         </form>
      </div>
   );
}

export default EditForm;
