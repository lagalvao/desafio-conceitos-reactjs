import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: `https://github.com/${Date.now()}`,
      title: `Repositório ${Date.now()}`,
      techs: ["ReactJS", "NodeJS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      {repositories.map(repository => (
        <ul data-testid="repository-list" key={repository.id}>
          <li>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        </ul>
      ))}

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
