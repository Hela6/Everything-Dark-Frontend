import React, { useState, useEffect } from 'react';
import spinner from '../assets/img/spinner.svg';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Article() {
  const [APIState, setAPIState] = useState({
    loading: false,
    error: false,
    data: undefined,
  });

  const { id } = useParams();

  useEffect(() => {
    console.log("Fetching article with ID:", id); // Log the ID
    setAPIState({ ...APIState, loading: true });
    fetch(`http://127.0.0.1:8000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAPIState({ loading: false, error: false, data });
      })
      .catch((error) => {
        console.error(error);
        setAPIState({ loading: false, error: true, data: null });
      });
  }, [id]);

  let content;
  if (APIState.loading) {
    content = <img className="mx-auto" src={spinner} alt="Loading icon" />;
  } else if (APIState.error) {
    content = <p className="text-center">An error has occurred...</p>;
  } else if (APIState.data) {
    const article = APIState.data;

    content = (
      <div>
        <div key={article.id} className="flex flex-col items-center lg:items-start p-3 lg:3/5 lg:flex-row">
          <img src={article.image} className="w-72 h-fit lg:mt-6 lg:w-64" alt="article image" />
          <div className="p-3 lg:w-fit">
            <p className="text-slate-400">
              {/* Conditional rendering based on category */}
              {article.category === '/api/categories/1' && <p>music</p>}
              {article.category === '/api/categories/2' && <p>fashion</p>}
              {article.category === '/api/categories/3' && <p>graphic arts</p>}
            </p>
            <h2 className="text-slate-100 text-2xl text-bold mb-3">{article.title}</h2>
            <p
              className="text-sm mb-10"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article.content), // Render sanitized HTML
              }}
            ></p>
            <Link to="/Category">
            <button className="text-slate-100 text-center text-l font-bold mb-3 border-2 border-slate-100 rounded-full px-3 pb-2 shadow-lg shadow-zinc-700">
              Back to categories
            </button></Link>
          </div>
        </div>
      </div>
    );
  } else {
    content = <p>No match was found for your request...</p>;
  }

  return (
    <>
      <div className="mt-40 lg:mx-auto lg:w-3/5">{content}</div>
    </>
  );
}
