import React, { Component } from 'react';
import FavService from '../FavService';
import Track from './Track';

class Favorite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            musics : FavService.getFavoritesFromStorage()
        }
             
    }

    onFavorites(music) {
        console.log("favorite click")
        FavService.toggleFavorite(music)
        this.setState((currentState) => ({
            musics: FavService.getFavoritesFromStorage()
        }))
     }
     

    render() {

        return (
            <main className="container mt-3">
            <h1>Mes favoris</h1>
            <hr />
            {this.state.musics.map(music => (
              <Track
                key={music.id}
                music={music}
                onFavClick={(music) => this.onFavorites(music)}
                isFavorite={FavService.isFavorite(music)}
              />
            ))}
           </main>
           

        );

    }
}

export default Favorite;
