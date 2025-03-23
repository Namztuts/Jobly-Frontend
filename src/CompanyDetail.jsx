import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyAPI from './api';
import JobCard from './JobCard';
import { useUser } from './UserContext';

function CompanyDetail() {
   const { handle } = useParams(); //grabbing handle from the url
   const [company, setCompany] = useState(null);
   const { isLoading, setIsLoading } = useUser();

   useEffect(() => {
      async function getCompany() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let company = await JoblyAPI.getCompany(handle);
            setCompany(company);
         } catch (error) {
            console.error('Error fetching company details:', error);
         } finally {
            setIsLoading(false); // finally runs regardless of wether try or catch succeed
         }
      }
      getCompany();
   }, [handle]); //anytime the handle changes, get a refresh of the company

   if (isLoading) return <p>Loading...</p>;
   if (!company) return <p>Company not found?!</p>;

   return (
      <div className="CompanyDetail">
         <h1>{company.name}</h1>
         <p>{company.description}</p>
         <h3>Available Jobs</h3>
         <ul>
            {company.jobs.map((job) => (
               <li key={job.id}>
                  <JobCard job={job} />
                  {/* {job.title} -{' '}
                  {job.salary ? `$${job.salary}` : 'Salary not listed'} */}
               </li>
            ))}
         </ul>
      </div>
   );
}

export default CompanyDetail;
