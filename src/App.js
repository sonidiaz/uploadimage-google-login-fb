import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';
import FileUpload from './fileUpload';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      user: null,
      pictures: []
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.hundleunUpload = this.hundleunUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged( user => {
      this.setState( {user} );
    });
  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then( result => console.log(`${result.user.email} he iniciado sesion`))
    .catch( error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogOut(){
    firebase.auth().signOut()
    .then( result => console.log(`${result.user.email} ha salido`))
    .catch( error => console.log(`Error ${error.code}: ${error.message}`));
  }

  hundleunUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message);
    }, () => {
      this.setState({
        uploadValue: 100,
        picture: task.snapshot.downloadURL
      })
    });
  }

  renderLoginButton(){
    if(this.state.user){
      return(
        <div>
          <img src={ this.state.user.photoURL } alt={ this.state.user.displayName}/>
          <p> HOla { this.state.user.displayName }</p>
          <button onClick={ this.handleLogOut } > Salir </button>
          <FileUpload onUpload = { this.hundleunUpload }/>

          {
            this.state.pictures.map( picture => {
              <div>
                <img src= { picture.image }/>
                <br/>
                <img src= { picture.photoURL}/>
                <br/>
                <span> { picture.displayName } </span>
              </div>
            })
          }
        </div>
      )
    }else{
      return(
        <button onClick={this.handleAuth}> Login con Goolge </button>
      )
    }
  }



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Pseudogram</h2>
        </div>
        <p className="App-intro">
          { this.renderLoginButton() }
        </p>
      </div>
    );
  }
}

export default App;
