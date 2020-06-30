import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Table from './Table';

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/todo/GetToDo')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // todoList() {
    //     return this.state.todos.map(function (currentTodo, i) {
    //         return <Table obj={currentTodo} key={i} onSubmitMessage={() => this.onSubmitMessage()} parentCallback={() => this.callbackFunction} />;
    //     })
    // }

    deleteTodo(productId) {
        let r = window.confirm("Do you want to delete this item");
        if (r === true) {
            axios.delete('http://localhost:3001/todo/Delete/' + productId)
                .then(response => {
                    debugger;
                    this.setState({
                        todos: this.state.todos.filter(product => product.id !== productId)
                    });
                    toast.success("ToDo deleted Successfully!");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-11 col-12">
                        <h3 id="quote">Todos List</h3>
                    </div>
                    <div className="col-sm-1 col-12">
                        <Link to="/create" className="btn btn-primary pull-right">Add</Link>
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Is Completed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {this.todoList()}
                    </tbody> */}

                    <tbody>
                        {this.state.todos.map(product => (
                            <tr key={product.id}>
                                <td>{product.description}</td>
                                <td>{product.priority}</td>
                                <td>{product.isCompleted ? 'Yes' : 'No'}</td>
                                <td>
                                    <Link to={"/edit/" + product.id} className="btn btn-success">Edit</Link>&nbsp;&nbsp;&nbsp;
                                    <button type="button" onClick={() => this.deleteTodo(product.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}


// export default TodosList;