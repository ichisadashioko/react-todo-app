import * as React from 'react'
import { render } from 'react-dom'


interface TODORecord {
    id: number
    content: string
    done: boolean
}

class TODODatabase {
    data: Array<TODORecord>

    constructor() {
        this.data = []
    }
}

interface TODORowProps {
    value: TODORecord
}

class TODORow extends React.Component<TODORowProps, {}> {
    render() {
        return <tr data-id={this.props.value.id}>
            <td><input type='checkbox' checked={this.props.value.done} /></td>
            <td>{this.props.value.content}</td>
        </tr>
    }
}

interface TODOTableProps {
    value: TODODatabase
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



let db = new TODODatabase()
db.data = [
    { id: 1, content: "Laundry", done: false },
    { id: 2, content: "Shopping", done: true },
    { id: 3, content: "Cleaning", done: false },
    { id: 4, content: "Dinner", done: false },
    { id: 5, content: "Take pet for a walking", done: false },
]

render(
    <TODOTable value={db} />,
    document.getElementById('app'),
)