import React from 'react';
import Tag from './Tag';

const cStyle={
    position: "relative",
    display:"inline-block",
    width: "300px",
    border: "1px solid pink",
    overflow:"auto",
};

const iStyle ={
    display: "inline-block",
    fontSize: "0.9em",
    margin: "5px",
    width: "90%",
    border: "0"
}
export default class InputTag extends React.Component {
    state = {
        tags: []
    }
    onKeyUp = (e) => {
        console.log(e.which);
        if (e.which === 32 || e.which ===13) {
            let input = e.target.value.trim().split(" ");
            console.log("Input: ",input);

            if (input.length === 0 || input[0] === "") return;  // empty tags

            this.setState({
                tags: [...this.state.tags, input]
            });
            e.target.value="";
        }
    }

    onDeleteTag = (tag) => {
        //var tags = this.state.tags.concat();
        var tags = this.state.tags.filter((t) =>{
            return (t !== tag) ;
        });
        this.updateState(tags);
    }

    updateState(nextState) {
        console.log("NextState: ", nextState);
        this.setState({
            tags:nextState
        })
    }

    render() {
        var tags = this.state.tags.map((tag) => {
            return <Tag onDeleteTag={this.onDeleteTag} key={tag} value={tag} />
        })
        return (
            <div style={cStyle}>
              {tags}
              <input style={iStyle} onKeyUp={(e) => this.onKeyUp(e)} type="text" placeholder={this.props.placeholder} />
            </div>
        )
    }
}
