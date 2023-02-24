import { Component } from 'react';
import CardList from './Components/Card-list/card-list.component'
import SearchBox from './Components/search-box/search-box.component';

import './App.css'

class App extends Component {
  constructor(){
    super()
    this.state = {
      monsters:[],
      searchField:""
    }
  }

  componentDidMount(){
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(json=>this.setState(
      ()=>{
        return {
          monsters:json,
          filteredMonsters:Object.assign([],json)
        }},
        ()=>{
      }
      ))
  }

  onSearchChange = (event)=>{
    const searchField = event.target.value.toLocaleLowerCase()
    this.setState(()=>{
      return {searchField}
    })  
  }

  render(){
    const {searchField, monsters} = this.state
    const {onSearchChange} = this

    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    return (
      <div className="App">        
      <h1 className='app-title'>Monsters rolodex</h1>
        <SearchBox placeholder = "Search for monsters" onChangeHandler={onSearchChange} className = "monsters-search-box"/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );  
  }
}

export default App;
