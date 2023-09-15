import { useState, useEffect } from 'react'
import spinner from '../assets/img/spinner.svg'
import DOMPurify from 'dompurify'
import { Link, useParams } from 'react-router-dom';


export default function Category() {
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
     data: undefined
  })

  const { id } = useParams();

  const [ desiredCategory, setDesiredCategory ] = useState(id ? `/api/categories/${id}` : '/api/categories/1');

  useEffect(() => {
      setAPIState({...APIState, loading: true})
      fetch("http://127.0.0.1:8000/api/articles?page=1")
      .then(res => {
        console.log(res);
        return res.json()
      })
      .then(data => {
        console.log(data);
        setAPIState({loading: false, error: false, data: data['hydra:member']})
      })
    }, [])


  let content;
  if(APIState.loading) content = <img className="mx-auto" src={spinner} alt="icône de chargement" />
  else if(APIState.error) content = <p className="text-center">an error has occured...</p>
  else if(APIState.data?.length > 0){ 
    
      const filteredArticles = APIState.data.filter((article) => article.category === desiredCategory);

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
else if(APIState.data?.length === 0){
  content = <p>not match was found for your request...</p>
}


  return (
    <>
    
      <nav className="flex justify-center w-full shadow-[0_35px_60px_-35px_rgba(0,0,0,0.3)] shadow-zinc-700 p-6 fixed top-28 bg-[#0b0c0e]">
       
        <Link
          className={`text-slate-100 text-center text-l lg:text-xl text-bold mb-3 rounded-full px-3 pb-2 ${
            desiredCategory === '/api/categories/1' ? 'bg-slate-300 text-slate-900' : 'bg-slate-500'
          } lg:mx-12 mx-2`}
          onClick={() => setDesiredCategory('/api/categories/1')}
        >
          music
        </Link>
        <Link
          className={`text-slate-100 text-center text-l lg:text-xl text-bold mb-3 rounded-full px-3 pb-2 ${
            desiredCategory === '/api/categories/2' ? 'bg-slate-300 text-slate-900' : 'bg-slate-500'
          } lg:mx-12 mx-2`}
          onClick={() => setDesiredCategory('/api/categories/2')}
        >
          fashion
        </Link>
        <Link
          className={`text-slate-100 text-center text-l lg:text-xl text-bold mb-3 rounded-full px-3 pb-2 ${
            desiredCategory === '/api/categories/3' ? 'bg-slate-300 text-slate-900' : 'bg-slate-500'
          } lg:mx-12 mx-2`}
          onClick={() => setDesiredCategory('/api/categories/3')}
        >
          graphic arts
        </Link>
      </nav>
       <div className="mt-60 lg:mx-auto lg:w-2/5">
      {content}
      </div>
    </>
  );
}
