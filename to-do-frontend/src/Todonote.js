import React, { Component } from 'react';


class Todonote extends Component {
    
    render() {
        let chkclass;
        console.log(this.props.chkbox);
        if(this.props.chkbox){
            chkclass = 'strike';
        }
        else{
            chkclass = 'pending';
        }
        return (
            <button class='hiddenbutton mt-3 myshdob' type="checkbox" checked={this.props.chkbox} onClick= {()=>{this.props.handlechecked(this.props.position)}}>
                <li class="list-group-item text-center rounded">
                <div className={chkclass}>
                        <lable>{this.props.title}</lable>
                </div>
                </li>
            </button>
        )
}
};



export default Todonote;