import React,{useState, useEffect} from 'react';
import axios from 'axios';

import './movie-details.scss';

const MovieDetail = ({show, id, onCancel}) => {

    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get('http://www.omdbapi.com/',{
            params: {
                apiKey: '7897c31d',
                i:id,
            }
        }).then(res=> {
            setMovie(res.data);
        });
    }, [movie])

    return (
            <>
            {
                show && movie && id === movie.imdbID ? 
                    <div className="modal fade backdrop" id="movieDetailModal" tabIndex="-1" role="dialog" aria-labelledby="movieDetailModal">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                            {movie ? <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{movie.Title}</h5>
                                    <button type="button" className="close" onClick={onCancel} data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <div className="movie-image-section"> 
                                        <div className="movie-image"><img src={movie.Poster} height="350" width="280"/></div>
                                        <span className="user-rating-star">User Rating: <div class="user-rating star-ratings-sprite"><span className="star-ratings-sprite-rating" style={{width: (parseFloat(movie.imdbRating)/10)  * 100 + '%' }}></span></div></span>
                                        <span className="user-rating-star">Meta Score: <div class="user-rating star-ratings-sprite"><span className="star-ratings-sprite-rating" style={{width:(parseFloat(movie.Metascore) || 0 /10 * 100)+ '%'}}></span></div></span>
                                    </div>
                                    <div className="movie-detail-section">
                                        <h2 className="movie-title movie-info">{movie.Title}</h2>
                                        <div className="movie-info">{movie.Plot}</div>
                                        <div className="movie-info"><label>Directed by: </label><span>{movie.Director}</span></div>
                                        
                                        <div className="movie-info"><label>Cast: </label><span>{movie.Actors}</span></div>
                                        <div className="movie-info"><label>Writer: </label><span>{movie.Writer}</span></div>
                                        <div className="movie-info"><label>Language: </label><span>{movie.Language}</span></div>
                                        <div className="movie-info"><label>Release Date: </label><span>{movie.Released}</span></div>
                                        <div className="movie-info"><label>Country: </label><span>{movie.Country}</span></div>
     
                                        <div><span className="movie-time">{movie.Runtime}</span><span className="movie-genre">{movie.Genre}</span></div>
                                    </div>
                                </div>
                            </div> : ''}
                        </div>
                    </div>
                : null
            }
        </>
    )
}

export default MovieDetail;