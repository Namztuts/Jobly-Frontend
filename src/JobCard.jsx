// id | title | salary | equity | company_handle
import { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import JoblyAPI from './api';

function JobCard({ job }) {
   const { title, salary, equity, id } = job;
   const { setIsLoading, currentUser, setCurrentUser } = useUser();
   const [appliedJobs, setAppliedJobs] = useState(
      new Set(currentUser?.user?.applications || [])
   );

   //NOTE: getting error can't read data | need to send a token with the request
   // console.log('username', currentUser.user.username);
   // console.log('ID', id);

   //formats to proper dollar format if there is a salary | else put 'salary not listed'
   const setJobSalary = salary
      ? salary.toLocaleString('en-US', {
           style: 'currency', //format as currency
           currency: 'USD', //US Dollars
           minimumFractionDigits: 0, //no decimal places
           maximumFractionDigits: 0,
        })
      : 'salary not listed';

   //shows equity if there is one | else put 'equity not listed'
   const setJobEquity = equity ? equity : 'equity not listed';

   // TODO: cannot get this to function
   // async function applyToJob() {
   //    if (!currentUser || !currentUser.user) {
   //       console.error('User is not logged in.');
   //       return;
   //    }
   //    if (appliedJobs.has(id)) return;

   //    setIsLoading(true); //loading while the data is being fetched and shown on page
   //    try {
   //       await JoblyAPI.applyToJob(currentUser.user.username, id);
   //       setAppliedJobs(new Set([...appliedJobs, id]));
   //       setCurrentUser((prevUser) => ({
   //          ...prevUser,
   //          user: {
   //             ...prevUser.user,
   //             applications: [...prevUser.user.applications, id],
   //          },
   //       }));
   //    } catch (error) {
   //       console.error('Error fetching jobs:', error);
   //       // doesn't break the app when testing the apply to job NOTE: delete when done with testing
   //       if (error.response && error.response.status === 401) {
   //          alert('You are not authorized to apply for this job.');
   //       } else {
   //          alert('An unexpected error occurred. Please try again.');
   //       }
   //    } finally {
   //       setIsLoading(false); // finally runs regardless of wether try or catch succeed
   //    }
   // }

   const disableBtn = (event) => {
      event.target.textContent = 'APPLIED';
      event.target.className = 'disabled';
      event.target.disabled = true;
   };

   return (
      <div className="JobCard">
         <h4>{title}</h4>
         <p>{`Salary: ${setJobSalary}`}</p>
         <p>{`Equity: ${setJobEquity}`}</p>
         <button
            type="button"
            onClick={disableBtn}
         >
            Apply
         </button>
         {/* TODO: goes with the above applyToJob */}
         {/* <button
            onClick={applyToJob}
            disabled={appliedJobs.has(id)}
         >
            {appliedJobs.has(id) ? 'APPLIED' : 'Apply'}
         </button> */}
      </div>
   );
}

export default JobCard;
