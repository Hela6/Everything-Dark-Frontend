import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {

const [query, setQuery] = useState(''); // State to store the search query
const navigate = useNavigate();

 
// Handle input change and navigate to search results
const handleInputChange = (event) => {
const inputValue = event.target.value;
setQuery(inputValue);
navigate(`/SearchResults?q=${inputValue}`);

  // Clear the query after 5 seconds
    setTimeout(() => {
      setQuery('');
    }, 7000); // 5000 milliseconds = 5 seconds
  };




// Render the search bar input and submit button
return (
    <div>
      <input
        type="text"
        placeholder="search..."
        className="text-sm lg:text-lg text-bold text-slate-100 w-56 border-2 border-slate-100 rounded-full px-3 pb-1 bg-transparent lg:ml-8 mt-2 focus:outline-none"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
}

