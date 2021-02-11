import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepository ] = useState([]);

  useEffect(() => {

    load();

  }, []);

  function load() {
    api.get('/repositories')
    .then( response => {
      setRepository( response.data );
    })
  }


  async function handleAddRepository() {
    
    const response = await api.post( '/repositories', {
      title: `Novo repositorio ${Date.now()}`,
      "url" : "www.hotmail.com",
      "techs" : "['delphi', 'java', 'React]"
    });

    const repo = response.data;
    setRepository( [...repositories, repo ]);
  }

  async function handleRemoveRepository(id) {

    const repoIndex = repositories.findIndex( repository => repository.id === id );

    if ( repoIndex >= 0 ) {

      const response = await api.delete(`/repositories/${id}`);
      const { status } = response;

      if ( status === 204 ) {

        repositories.splice( repoIndex, 1 );
        setRepository([ ...repositories ]);

      }

    }
   
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {  
          repositories.map( repo => {
              return <li key={repo.id}>
                      {repo.title}
                      <button onClick={() => handleRemoveRepository(repo.id)}>
                        Remover
                      </button>
                      </li>
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
