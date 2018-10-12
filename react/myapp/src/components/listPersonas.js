import React from 'react';


function ListItem(props) {
    return <li>{props.value}</li>;
}
export class ListPersonas extends React.Component {
    render() { 
        const listItem = this.props.personas.map((p,i) => <ListItem key={i} value={p}/>);
        if(!listItem) return null; 
        return (
            <div>
                <ul>
                    {listItem}
                </ul>
            </div>
        );
    }
}