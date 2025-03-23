import SearchForm from './SearchForm';

/**
 * A reusable template for displaying paginated or searchable lists.
 * It handles loading states, displays a search bar if needed, and renders a list of items.
 */

const SearchTemplate = ({
   isLoading, // Boolean: determines if the loading state is active.
   data, // Array: data to be displayed in the list.
   renderItem, // Function: custom renderer for list items.
   onSearch, // Function: callback to handle search queries.
   searchBy, // String: search field identifier.
   searchForm = true, // Boolean: determines whether to show the search bar (default is true).
}) => {
   return (
      <div className="container">
         <div>
            {/* Conditionally render the SearchBar if the `searchBar` prop is true */}
            {searchForm ? (
               <SearchForm
                  onSearch={onSearch}
                  searchBy={searchBy}
                  data={data}
               />
            ) : null}

            {/* Show a loading indicator if data is being fetched */}
            {isLoading ? (
               <p>Loading...</p>
            ) : (
               <ul className="SearchTemplate-ul">
                  {data.map((item) => (
                     // Use either `handle` or `id` as the unique key for each list item.
                     <li key={item.handle ? item.handle : item.id}>
                        {renderItem(item)}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};

export default SearchTemplate;
