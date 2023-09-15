import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import spinner from '../assets/img/spinner.svg'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom';


export default function SearchResults() {

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

// fetch the API
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
     data: undefined
  })

    useEffect(() => {
  setAPIState({ ...APIState, loading: true });
  fetch(`http://127.0.0.1:8000/api/articles?page=1&title=${query}`)
    .then((res) => res.json())
    .then((data) => {
      setAPIState({
        loading: false,
        error: false,
        data: data['hydra:member'],
      });
    });
}, [query]);

 // Function to filter articles based on the search query
  const filteredArticles = APIState.data?.filter(article => {
    return article.title.toLowerCase().includes(query.toLowerCase());
  });

  let content;
  if(APIState.loading) content = <img className="mx-auto" src={spinner} alt="icône de chargement" />
  else if(APIState.error) content = <p className="text-center">an error has occured...</p>
  else if(APIState.data?.length > 0){ 
    
      content = <div>
         {filteredArticles.map((article) => (
          <div key={article.id} className="flex flex-row items-center p-3 lg:3/5">
           
            <img src={article.image} className="w-40 h-fit lg:w-64" alt="article image" /> 

            <div className="p-3 lg:w-fit">
              <p className="text-slate-400">  {/* Conditional rendering based on category */}
              {article.category === '/api/categories/1' && (<p>music</p>)}
              {article.category === '/api/categories/2' && (<p>fashion</p>)}
              {article.category === '/api/categories/3' && (<p>graphic arts</p>)}
              </p>
              <h2 className="text-slate-100 text-2xl text-bold mb-3">{article.title}</h2>
                <p className="text-sm mb-3"
                dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.intro) // Render sanitized HTML
                }}
                ></p>
            <button className="text-slate-100 text-center text-sm font-bold mb-3 border-2 border-slate-100 rounded-full px-3 pb-1 shadow-lg shadow-zinc-700">
            <Link to={`/article/${article.id}`}>Read</Link>
            </button>
           
          </div>
          </div>
        ))}
      </div>
  }
else if(APIState.data?.length === 0 && query){
  content = <p className="text-center- text-slate-100 text-xl">not match was found for your request...</p>
} else {
  content = <p className="text-center- text-slate-100 text-xl">Enter a search query to get started...</p>;
}

  return (
    <>
       <div className="mt-60 lg:mx-auto lg:w-2/5">
      {content}
      </div>
    </>
  );
}
