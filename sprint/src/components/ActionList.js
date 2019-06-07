import React from 'react';

class ActionList extends React.Component {
    render(){
        return(
            <div>
                {this.props.actionProps.map(action =>
                    <div key={action.id}>
                        <h4>{action.notes}</h4>
                        <h4>{action.description}</h4>
                    </div>)}
            </div>
        )
    }
}

export default ActionList;