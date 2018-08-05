import React, { Component } from 'react';
import './App.css';
import Todoform from './Todoform';
import Todo from './Todo';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todo: [],
      value: '',
      dis: true,
    }
  }

componentDidMount(){
  axios.get('http://localhost:8080/todo')
         .then(result=>{
               this.setState ({
                todo: result.data,
              });
         })
         .catch(error=>{
           console.log(error);
         })
}
    // Using arrow function so i dont have to bind them to this
  addTodo = (title) =>{
    let newTodo = {
      title : title,
      chkbox : false,
    };
    axios.post('http://localhost:8080/todo', newTodo)
         .then(result=>{
               this.setState ({
                todo: result.data,
              });
         })
         .catch(error=>{
           console.log(error);
         })
  }
    // checking the element clicked by checking the id of the clicked todo and comparing it with the id of todo
    
  handlechecked = (idCheck) =>{
    let copy = Array.from(this.state.todo);
    copy.map((element, index) => {
      if(idCheck === element._id){
        element.chkbox = !element.chkbox;
        axios.put('http://localhost:8080/todo', {data:{element}})
             .then(results=>{
              this.setState({
                todo: results.data,
                dis: false,
              })
             })
             .catch(error=>{
              console.log(error);
             })
      }
    });
    // console.log("checked function was run");
    // this.setState ({
    //   todo : copy,
    //   dis: false,
    // });
  };

  optionhandler = (option) =>{
    let newvalue = this.refs.value.value;
    this.setState({
      value: newvalue,
    })
  }

  clearComplete = () =>{
    let copy = Array.from(this.state.todo);
    let cleartodo = copy.filter(ncopy=>{
      return(ncopy.chkbox);
    })
    axios.delete('http://localhost:8080/todo', {data:{cleartodo}})
         .then(results=>{
           this.setState({
             todo: results.data,
             dis: true
           })
         })
         .catch(error=>{
           console.log(error);
         })
  }

  render() {

    let c = 0 ;
    let inc = 0;
    this.state.todo.map((element) => {
      { element.chkbox ? c = c + 1 : inc = inc + 1 };
    });
    return (
      <div class="container">
      <div class ="container-2 container mb-4 mt-4 pt-4 rounded myshdo">
      <h1 class="text-center">ToDo's</h1>
        <div class="container-2 container mt-4 mb-4">
        <div class="mb-2">
        <Todoform addTodo = {this.addTodo} 
                  todo={this.state.todo} 
                  handlechecked = {this.handlechecked} 
                  chkbox={this.state.todo.chkbox}/>
        </div>


        <div class="mb-2">
        <Todo todo={this.state.todo} 
              handlechecked = {this.handlechecked} 
              chkbox={this.state.todo.chkbox} 
              option={this.state.value}/>
        </div>

        <div class="dropdown show text-center mt-4 mb-4">
          <select onChange={this.optionhandler} ref='value' class="custom-select h3em">
              <option value="all" > all</option>
              <option value="active" >active</option>
              <option value="complete">complete</option>
          </select>
        </div>
        <div class="text-center mt-5">
        <button class="pull-right btn btn-default myshdor" onClick={this.clearComplete} disabled={this.state.dis}>Clear Complete</button>
        </div>
        <div class="text-center mt-5">
          <h5 class='m-2'>Incomplete: {inc}</h5>
          <h5 class='m-2'>Total: {c+inc}</h5>
          <h5 class='m-2'>Complete: {c}</h5>
        </div>
      </div>
      </div>
      </div>
    )
  }
}
export default App;
