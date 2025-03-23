import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoblyAPI from './api';
import CompanyCard from './CompanyCard';
import SearchTemplate from './SearchTemplate';
import { useUser } from './UserContext';

function CompanyList() {
   const [companies, setCompanies] = useState([]);
   const { isLoading, setIsLoading } = useUser();
   const [searchTerm, setSearchTerm] = useState('');

   // useEffect to keep an eye on the companies state and update when it changes
   useEffect(() => {
      async function getCompanies() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let companies = await JoblyAPI.getCompanies();
            setCompanies(companies);
         } catch (error) {
            console.error('Error fetching companies:', error);
         } finally {
            setIsLoading(false); // finally runs regardless of wether try or catch succeed
         }
      }
      getCompanies();
   }, []);

   const filteredCompanies = companies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   // when loading, show loading...
   if (isLoading) {
      return <p>Loading &hellip;</p>;
   }

   return (
      <>
         <h1>Companies</h1>
         <SearchTemplate
            isLoading={isLoading} // Pass loading state to `PagesTemplate`
            data={filteredCompanies} // Pass the filtered list of companies
            renderItem={(company) => <CompanyCard company={company} />} // Render each company using `CompanyCard`
            onSearch={setSearchTerm} // Pass the search term setter to `PagesTemplate`
            searchBy="Search by company..." // Placeholder text for the search bar
         />
      </>
   );
}

export default CompanyList;
