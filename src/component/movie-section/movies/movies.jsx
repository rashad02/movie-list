import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './movies.scss';
import MovieDetail from '../movie-details/movie-details.jsx';


const Movies = ({search}) => {
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(false);

    useEffect(() => {
        axios.get('https://www.omdbapi.com/',{
            params: {
                apiKey: '7897c31d',
                s: search || "Batman",
                type:"movie",
                page:"4"
            }
        }).then(res=> {
            setMovies(res.data.Search || []);
        });
    }, [movies])
    return (
        <div className="movies-section">
            <div className="movie-header">
                <div className="header-text">Movies</div>
            </div>
            <div className="movie-body col-md-12">
                {movies && movies.length > 0 ? movies.map((movie, index) => <span key={index} className="movie-image col-md-3">
                    <img src={movie.Poster} height="300" width="400" data-toggle="modal" data-target="#movieDetailModal" onClick={e=> {
                        setSelectedId(movie.imdbID);
                        setShowModal(true)}}/>
                        <MovieDetail id ={selectedId} show= {showModal} movie={movie} onCancel={() => setSelectedId(null)}/>
                </span>
                ): <div className="nothing-found">Nothing found. Please search with another title!!</div>}
            </div>
            
        </div>
    )
}

export default Movies;