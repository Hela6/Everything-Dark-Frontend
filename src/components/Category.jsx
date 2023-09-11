import { useState, useEffect } from 'react'
import spinner from '../assets/img/spinner.svg'
import DOMPurify from 'dompurify'

export default function Category() {
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
     data: undefined
  })

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

    //add a switch statement here to create links that display the category's articles when clicking on a category link 
    //create links for each category and dynamically change the const param depending on the desired category
    

     const desiredCategory = '/api/categories/2'; // Replace with your desired category URL

     

  let content;
  if(APIState.loading) content = <img src={spinner} alt="icône de chargement" />
  else if(APIState.error) content = <p className="text-center">an error has occured...</p>
  else if(APIState.data?.length > 0){ 
    
      const filteredArticles = APIState.data.filter((article) => article.category === desiredCategory);

      content = <div className="flex flex-col items-center mb-12 lg:flex-row lg:justify-start">
         {filteredArticles.map((article) => (
          <div  key={article.id}>
           
          <img src={article.image} className="w-80 mx-auto" alt="article image" /> 
          <div>
              <h2 className="text-white text-2xl text-center text-bold mb-3">{article.title}</h2>
                <p
              className="p-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content) // Render sanitized HTML
              }}
            ></p>
          </div>
        
          </div>
        ))}
      </div>
  }
else if(APIState.data?.length === 0){
  content = <p>not match was found for your request...</p>
}
  return (
    <div className="mx-auto lg:w-2/3">
      <h1 className="text-2xl text-white text-center p-10 mt-36">Articles</h1>

      {content}
    </div>
  )
}
