import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }
  // componentDidMount() {
  //   axios.get('http://localhost:2218/repos')
  //   .then(res => {
  //     console.log(res)
  //     this.setState({repos: res.data})
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }


  search (term) {
    console.log(`${term} was searched`);
    $.post('/repos', {term})
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));