import React, {useEffect, useState} from 'react';
import axios from 'axios';

import MovieDetail from '../movie-details/movie-details.jsx';

import '../movies/movies.scss';

const NewReleased = ({search}) => {
    const [newRelaseMovie, setNewRelaseMovie] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(false);

    useEffect(() => {
        axios.get('https://www.omdbapi.com/',{
            params: {
                apiKey: '7897c31d',
                s: search || "saw",
                year:"2021",
                page:"3"
            }
        }).then(res=> {
            setNewRelaseMovie(res.data.Search || []);
        });
    }, [newRelaseMovie])
    return (
        <div className="movies-section">
            <div className="movie-header">
                <div className="header-text">New Released</div>
            </div>
            <div className="movie-body col-md-12">
                {newRelaseMovie && newRelaseMovie.length > 0 ? newRelaseMovie.map((movie, index) => <span key={index} className="movie-image col-md-3">
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

export default NewReleased;