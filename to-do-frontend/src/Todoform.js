import React, { Component } from 'react';

class Todoform extends Component {
    constructor(){
        super();
        this.state = {
            textdisable : true
        }
    } 
    submit = (e) =>{
        e.preventDefault();
        console.log("YEEEEEEE");
        let title = this.refs.title.value;
        this.refs.title.value = '';
        this.props.addTodo(title);
        this.setState({textdisable : true})
    }
    textdis = () =>{
        this.refs.title.value ? this.setState({textdisable : false}) : this.setState({textdisable : true})
    }


    render() {
        return (
        <div>
            <form value ={this.value} onChange={this.textdis} onSubmit={this.submit}>
            <div class="input-group">
                <span class="input-group-btn">
                    <button class="btn btn-dark fs15" type="submit" disabled={this.state.textdisable}>Add</button>
                </span>
                <input class="form-control fs15" placeholder="add a todo" ref="title"/>
            </div>
            </form>
            <ul class="list-group">
            </ul>
        </div>
        );
    }
}

export default Todoform;