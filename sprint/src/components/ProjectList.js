import React from 'react';
import axios from 'axios';
import ActionList from './ActionList';

class ProjectList extends React.Component {
    state = {
        actions: [],
        message: "",
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/actions')
        .then(res => {
            this.setState({
                actions: res.data,
                message: "Actions retrieved"
            })
        })
    }

    render(){
        return(
            <div>
                {this.props.projectProps.map(project =>
                <div key={project.id}>
                    <h1>{project.name}</h1>
                    <h2>{project.description}</h2>
                    <ActionList actionProps={this.state.actions} />
                </div>
                )}
            </div>
        )
    }
}

export default ProjectList;