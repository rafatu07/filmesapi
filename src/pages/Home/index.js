import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./home.css";

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "da8beefd8d201a2224d0bed08815c4f3",
                    language: "pt-BR",
                    page: 1,
                },
            })

            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadFilmes();

        }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                <h1>Filmes em Cartaz:</h1>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                    );
                })}
            </div>
            
        </div>
    );
}

export default Home;