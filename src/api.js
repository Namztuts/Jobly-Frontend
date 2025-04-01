import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001'; //for Vite

// const BASE_URL = 'http://localhost:3001';
/* API Class
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyAPI {
   static token; //the token for interactivity with the API will be stored here

   static async request(endpoint, data = {}, method = 'get') {
      console.debug('API Call:', endpoint, data, method);

      //there are multiple ways to pass an authorization token, this is how you pass it in the header
      //this has been provided to show you another way to pass the token. You are only expected to read this code for this project
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${JoblyAPI.token}` };
      const params = method === 'get' ? data : {};

      try {
         return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
         console.error('API Error:', err.response);
         let message = err.response.data.error.message;
         throw Array.isArray(message) ? message : [message];
      }
   }

   //****** GET routes ******

   //Get a list of all companies
   static async getCompanies() {
      try {
         let response = await this.request('companies');
         return response.companies;
      } catch (error) {
         console.error('Error getting companies:', error);
         throw error;
      }
   }

   //Get details on a company via handle
   static async getCompany(handle) {
      try {
         let response = await this.request(`companies/${handle}`);
         return response.company;
      } catch (error) {
         console.error('Error getting company:', error);
         throw error;
      }
   }

   //Get a list of all jobs
   static async getJobs() {
      try {
         let response = await this.request('jobs');
         return response.jobs;
      } catch (error) {
         console.error('Error getting jobs:', error);
         throw error;
      }
   }

   //Get details about a user via username
   static async getUser(username) {
      if (!this.token) {
         console.error('No token available. Cannot fetch user.');
         return null;
      }

      if (!username) {
         console.error('Username was not found.');
         return null;
      }

      try {
         const response = await this.request(`users/${username}`);
         return response;
      } catch (error) {
         console.error('Error fetching user:', error);
         return null;
      }
   }

   //****** POST routes ******

   //Register a new user | userData object { username, first_name, last_name, email }
   static async registerUser(userData) {
      try {
         let response = await this.request('auth/register', userData, 'post');
         return response.token;
      } catch (error) {
         console.error('Error registering user:', error);
         throw error;
      }
   }

   //Authenticate a user
   static async authenticateUser(username, password) {
      try {
         let response = await this.request(
            'auth/token',
            { username, password },
            'post'
         );
         const { token } = response; // Extract the token from the response
         return { token }; // Only return the token
      } catch (error) {
         console.error('Error authenticating user:', error);
         throw error;
      }
   }

   //Apply to a job
   static async applyToJob(username, jobID) {
      try {
         // second arg, data, is set to an empty object since nothing needs to be sent
         let response = await this.request(
            `/users/${username}/jobs/${jobID}`,
            {},
            'post'
         );

         return response;
      } catch (error) {
         console.error('Error applying for job:', error);
         throw error;
      }
   }

   //****** PATCH routes ******

   //Edit a user profile | userData object { firstName, lastName, email }
   static async editUser(userData, username) {
      try {
         // Make the API request to update user data
         let response = await this.request(
            `users/${username}`,
            userData,
            'patch'
         );

         // Save the updated token to localStorage (if available)
         if (response.token) {
            localStorage.setItem('token', response.token);
         }

         return response.user;
      } catch (error) {
         console.error('Error editing user:', error);
         throw error;
      }
   }
}

// username: testuser
// password: password

export default JoblyAPI;
