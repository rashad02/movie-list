import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Header from './component/header/header-section.jsx';
import Home from './component/movie-section/slider/slider.jsx';
import Movies from "./component/movie-section/movies/movies.jsx";
import TvShows from "./component/movie-section/tv-shows/tv-shows.jsx";
import NewReleased from "./component/movie-section/new-released/new-released.jsx";
import Login from './component/common-component/login.jsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

const Index = props => {
    const [search, setSearch] = useState("");
    const [activepage, setActivepage] = useState('home');

    const pathName = window.location.pathname;
    const token = document.cookie || '';

  return <div className="container-fluid">
       <BrowserRouter>
       <Header search={setSearch} selectActivePage={setActivepage} activepage={pathName && pathName!== '/' ? pathName.replace('/', '') : activepage}/>
      <Switch>
        {!token ? <Route path='/signin'  render={() => <Login /> }/> :
        <><Route exact path='/' render={() =>token ? <Home  search={search}/> : <Login  /> }/>
        <Route path={`/movies`} render={() => token ? <Movies  search={search}/> : <Login /> }/>
        <Route path='/tv-shows'  render={() =>token ? <TvShows  search={search}/> : <Login />}/>
        <Route exact path='/new-released' render={() => token ? <NewReleased  search={search}/> : <Login /> }/></>}
      </Switch>
      </BrowserRouter>
  </div>;
};
ReactDOM.render(<Index />, document.getElementById('root'));