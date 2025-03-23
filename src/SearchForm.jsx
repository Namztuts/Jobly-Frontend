import { useState } from 'react';

const SearchForm = ({ onSearch, searchBy, data }) => {
   const [searchInput, setSearchInput] = useState(''); //stores the search input value

   const handleChange = (event) => {
      setSearchInput(event.target.value); //update the local state with the current value of the input
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      //only perform the search if the search input is not empty
      if (searchInput !== '') {
         onSearch(searchInput.trim()); //call the onSearch function with the trimmed search input

         setSearchInput(''); //clear the search input field after search
      }
   };

   return (
      <div className="SearchForm">
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder={searchBy} // Placeholder text provided via the searchBy prop
               value={searchInput} // Bind the input value to the searchInput state
               onChange={handleChange} // Update the searchInput state whenever the user types
            />
            <button type="submit">Search</button>
            {/* clear the search term on click */}
            <button
               type="submit"
               onClick={() => onSearch('')}
            >
               Clear
            </button>
         </form>
         <p>Search results: {data.length}</p>
      </div>
   );
};

export default SearchForm;
