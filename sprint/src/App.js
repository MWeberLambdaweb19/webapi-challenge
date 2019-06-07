import React from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import ProjectList from './components/ProjectList';
import './App.css';

class App extends React.Component {
  state = {
    projects: [],
    message: "",
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/projects')
    .then(res => {
      this.setState({
        projects: res.data,
        message: "Projects retrieved"
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render(){
  return (
    <div className="App">
      <h1>Sprint Challenge Webapi!</h1>
      <h4>{this.state.message}</h4>
      <Link to ="/">Home</Link>
      <Route exact path="/"
      render={
        props => (
          <ProjectList
          {...props}
          projectProps={this.state.projects}
        />)}
      />
    </div>
  )
};
}

export default App;
