import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import Track from './Track';
import FavService from '../FavService'


class Home extends Component {



    constructor(props) {
        super(props)
        this.state = {
            title: '',
            orderBy: '',
            musics: [],
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeOrderBy = this.onChangeOrderBy.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onFavorites = this.onFavorites.bind(this);
        
    }

    onFavorites(music) {
        console.log("home click")
        FavService.toggleFavorite(music)
        this.setState((currentState) => ({
            ...currentState.musics
        }))
     }
     


    onSearch(event) {
        event.preventDefault(); // Empêche le navigateur de recharger la page

        const title = encodeURIComponent(this.state.title);
        const order = this.state.orderBy;

        fetchJsonp(
            `https://api.deezer.com/search?q=${title}&order=${order}&output=jsonp`
        )
            .then(res => res.json())
            .then(data => data.data)
            .then(musics => {
                this.setState({ musics: musics });
            });
    }


    onChangeTitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangeOrderBy(event) {
        this.setState({ orderBy: event.target.value });
    }




    render() {
        return (
            <main className="container mt-3">
                <h1>Recherche</h1>
                <p>Recherchez un titre sur Deezer en utilisant le formulaire suivant :</p>
                <hr />
                <form onSubmit={this.onSearch}>
                    <div className="row">
                        <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Titre&nbsp;:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" id="searchText"
                                placeholder="Eminem, Armin Van Buuren, Rihanna, ..." onChange={this.onChangeTitle} />
                        </div>
                        <label htmlFor="searchText" className="col-sm-2 col-form-label text-right">Trier par :</label>
                        <div className="col-sm-2">
                            <select id="order" className="custom-select" onChange={this.onChangeOrderBy}>
                                <option value="ALBUM_ASC">Album</option>
                                <option value="ARTIST_ASC">Artiste</option>
                                <option value="TRACK_ASC">Musique</option>
                                <option value="RANKING">Les plus populaires</option>
                                <option value="RATING_ASC">Les mieux notés</option>
                            </select>
                            <div>{this.state.title}</div>
                            <div>{this.state.orderBy}</div>
                        </div>
                        <div className="col-sm-2 text-right">
                            <input type="submit" className="btn btn-primary" value="Go" />
                        </div>
                    </div>
                </form>
                <hr />
                {/* <h3>Aucun résultat pour cette recherche ...</h3> */}
                <h2>Résultats</h2>


                <div className="card-group search-results">
                    <div className="card-group search-results">
                        {this.state.musics.map(music => (
                            <Track key={music.id} music={music} onFavClick={this.onFavorites} isFavorite={FavService.isFavorite(music)}/>
                        ))}
                    </div>

                </div>

            </main>
        );
    }
}

export default Home;