import React, { Component } from 'react';

class Track extends Component {

    constructor(props) {
        super(props)
        this.state = {
            music: '',
        }
        this.onFavClick = this.onFavClick.bind(this);
    }

    onFavClick(music) {
        this.props.onFavClick(music);
    }


    render() {
        const music = this.props.music;
        const isFavorite = this.props.isFavorite;
        const favBtnClass = isFavorite ? 'btn-outline-danger' : 'btn-danger';



        return (

            <div>
                <div className="card w-50" style={{ flex: 'initial' }}>
                    <div className="card-body text-left">
                        <div className="media mb-2">
                            <img className="align-self-center mr-2 w-25" src={music.album.cover_xl} alt=""></img>
                            <div className="media-body">
                                <h5 className="card-title">{music.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{music.artist.name}</h6>
                            </div>
                        </div>
                        <audio src={music.preview} className="w-100" controls></audio><br />
                        <a href="#" onClick={() => this.onFavClick(music)} className={'btn btn-sm ' + favBtnClass} className="btn btn-sm btn-danger">
                            {isFavorite
                                ? <><i className="fas fa-heart-broken"></i> Retirer des favoris</>
                                : <><i className="fas fa-heart"></i> Ajouter aux favoris</>
                            }


                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Track;
