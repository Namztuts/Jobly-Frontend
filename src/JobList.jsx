import { useState, useEffect } from 'react';
import JoblyAPI from './api';
import JobCard from './JobCard';
import SearchTemplate from './SearchTemplate';
import { useUser } from './UserContext';

function JobList() {
   const [jobs, setJobs] = useState([]);
   const { isLoading, setIsLoading } = useUser();
   const [searchTerm, setSearchTerm] = useState('');

   // useEffect to keep an eye on the companies state and update when it changes
   useEffect(() => {
      async function getJobs() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let jobs = await JoblyAPI.getJobs();
            setJobs(jobs);
         } catch (error) {
            console.error('Error fetching jobs:', error);
         } finally {
            setIsLoading(false); // finally runs regardless of wether try or catch succeed
         }
      }
      getJobs();
   }, []);

   const filteredJobs = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
   );

   // when loading, show loading...
   if (isLoading) {
      return <p>Loading &hellip;</p>;
   }

   return (
      <>
         <h1>Jobs</h1>
         <SearchTemplate
            isLoading={isLoading} // Whether the jobs are still loading
            data={filteredJobs} // The list of filtered jobs
            renderItem={(job) => <JobCard job={job} />} // Render each job as a `JobCard`
            onSearch={setSearchTerm} // Callback to update search term
            searchBy="Search by job title..." // Placeholder for the search bar
         />
      </>
   );
}

export default JobList;
