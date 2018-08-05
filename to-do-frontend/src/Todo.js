import React, { Component } from 'react';
import Todonote from './Todonote';


class Todo extends Component {
    
    render() {
        let copy = Array.from(this.props.todo);
        let todoJSX= [];
        let crtodo;
        if(this.props.option === 'active'){
              crtodo = copy.filter(ncopy=>{
                    return (!ncopy.chkbox);
                });
      
              }
        else if(this.props.option === 'complete'){
                crtodo = copy.filter(ncopy=>{
                return (ncopy.chkbox);
              });
            }
        else{
            crtodo = copy;
        }

        for(let i=0; i<crtodo.length; i++){
        
            let cr2todo = crtodo[i]; 

            todoJSX.push(<Todonote title={cr2todo.title} 
                                handlechecked= {this.props.handlechecked}
                                optionhandler={this.props.optionhandler} 
                                chkbox={cr2todo.chkbox}
                                position={cr2todo._id}
                                />)
        }
        return (
            <ul class="list-group list-group-flush blk">
                {todoJSX}
            </ul>
        )
}
};



export default Todo;