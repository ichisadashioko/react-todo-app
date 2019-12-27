import * as React from 'react';
import { render } from 'react-dom';

import './app.css';

interface TODORecord {
    id: number;
    content: string;
    done: boolean;
}

class TODODatabase {
    data: Array<TODORecord>;

    constructor() {
        this.data = [];
    }
}

let db = new TODODatabase();
db.data = [
    { id: 1, content: "Laundry", done: false },
    { id: 2, content: "Shopping", done: true },
    { id: 3, content: "Cleaning", done: false },
    { id: 4, content: "Dinner", done: false },
    { id: 5, content: "Take pet for a walking", done: false },
];

function updateTODOItem(id: number, done: boolean) {
    for (let i = 0; i < db.data.length; i++) {
        if (db.data[i].id === id) {
            db.data[i].done = done;
            return true;
        }
    }
    return false;
}

interface TODOTableProps {
    value: TODODatabase;
}

interface TODORowProps {
    value: TODORecord;
}

class TODORow extends React.Component<TODORowProps, {}> {

    state: TODORowProps;

    constructor(props: TODORowProps) {
        super(props);
        this.state = {
            ...props,
        };
    }

    onChange() {
        let newStatus = !this.state.value.done;

        let isUpdated = updateTODOItem(this.state.value.id, newStatus);

        if (isUpdated) {
            this.setState({
                value: {
                    done: newStatus,
                    ...this.state.value,
                },
                ...this.state,
            });
        }
    }

    render() {
        return <tr data-id={this.state.value.id}>
            <td>
                <input
                    type='checkbox'
                    checked={this.state.value.done}
                    onChange={this.onChange.bind(this)} />
            </td>
            <td className={this.state.value.done ? "done" : ""}>{this.state.value.content}</td>
        </tr>
    }
}

class TODOTable extends React.Component<TODOTableProps, {}> {
    render() {
        return <table>
            <thead>
                <tr>
                    <th>Done</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
                {this.props.value.data.map(r => <TODORow key={r.id} value={r} />)}
            </tbody>
        </table>
    }
}

render(
    <TODOTable value={db} />,
    document.getElementById('app'),
)