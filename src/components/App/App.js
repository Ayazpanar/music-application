import React from "react";
import "./App.css";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults."; 
import Spotify from "../../util/Spotify";

class App extends React.Component { 
  constructor(props) {
    super(props);
    
    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      PlaylistTracks: [],
    };
    
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }
  
  search(term) {
    Spotify.search(term).then((SearchResults) => {
      this.setState({ SearchResults: SearchResults });
    });
  }
  
  addTrack(track) {
    let tracks = this.state.PlaylistTracks.slice(); 
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ PlaylistTracks: tracks });
  }
  
  removeTrack(track) {
    let tracks = this.state.PlaylistTracks.slice(); 
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ PlaylistTracks: tracks });
  }
  
  removeTrackSearch(track) {
    let tracks = this.state.SearchResults.slice(); 
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }
  
  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }
  
  updatePlaylistName(name) {
    this.setState({ playlistName: name }); 
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist", 
        PlaylistTracks: [],
      });
    });
  }
  
  render() { 
    return (
      <div>
        <h1>
          <a href="http://localhost:3000">A/P Music</a>
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              SearchResults={this.state.SearchResults}
              onAdd={this.doThese}
              />
            <Playlist
              PlaylistTracks={this.state.PlaylistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack} 
              onSave={this.savePlaylist} 
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App; 








