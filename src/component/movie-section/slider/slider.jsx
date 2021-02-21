import React, {Component} from 'react';
import {Carousel} from 'react-responsive-carousel';
import axios from 'axios';

import Movies from "../movies/movies.jsx";
import TvShows from "../tv-shows/tv-shows.jsx";
import NewReleased from "../new-released/new-released.jsx";

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import './slider.scss';

class Home extends Component {
    constructor(props) {
        super();
        this.state= {
            latestMovies: []
        }
    }
    async componentDidMount() {
        await axios.get('https://www.omdbapi.com/',{
            params: {
                apiKey: '7897c31d',
                y: 2021,
                s: 'game'
            }
        }).then(res=> {
            this.setState({latestMovies: res.data.Search || []});
        });
      }
        render(){
            let {latestMovies}= this.state;
            let search = this?.props?.search || 'latest';

            return (
                <div className="home-page">
                    <Carousel autoPlay showArrows={true} onChange={()=> console.log("evebt fired")} onClickItem={()=> console.log("item fired")} onClickThumb={()=>console.log("thumb fired")}>
                        {
                            latestMovies && latestMovies.length > 0 ? latestMovies.map((movie, index) => 
                            <div key={index} className='poster-image'>
                                <img src={movie.Poster} height={500}/>
                                <p className="legend">{movie.Title}</p>
                            </div>   
                            ): ""
                        }
                    </Carousel>
                    <Movies search={search}/>
                    <TvShows search={search}/>
                    <NewReleased search={search}/>
                </div>
            )
        }
};


    export default Home; 