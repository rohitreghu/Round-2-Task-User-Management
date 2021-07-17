import { logDOM } from "@testing-library/react";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [assignedUser, setAssignedUser] = useState("");
    const [users, setUsers] = useState([]);
    const [todo, setTodo] = useState([]);

    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();

    useEffect(() => {
        if (localStorage.getItem("todoRound2")) {
            setUsers(JSON.parse(localStorage.getItem("todoRound2")))
        }
    }, [])

    const handlesubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            heading: heading,
            description: description,
            targetDate: targetDate,
            assignedUser: assignedUser,
            status: false
        }

        setTodo(prevValue => [...prevValue, newTodo]);
        setHeading("");
        setDescription("");
        setAssignedUser("");
    }

    const handleDelete = (taskHeading) => {
        setTodo(prevValue => {
            return prevValue.filter(task => task.heading !== taskHeading)
        });
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-6">
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Heading</label>
                                    <input className="form-control" type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Target Date</label>
                                    <input className="form-control" min={`${date.getFullYear()}-${month}-${day}`} type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Assigned User</label>
                                    <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} className="form-control">
                                        <option value="" disabled>-Select-</option>
                                        {users.map((user, index) => {
                                            return (
                                                <option value={user.name} key={index}>{user.name}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <button className="btn btn-primary" type="submit">Add</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-6">
                    {todo.map((task, index) => {
                        return (
                            <div key={index} className="card my-2">
                                <div className="card-body">
                                    <div><strong>{task.heading}:</strong> {task.description}</div>
                                    <div>Target Date: {task.targetDate}</div>
                                    <div>Assigned to: {task.assignedUser}</div>
                                    <div>
                                        <button onClick={() => handleDelete(task.heading)} className="btn btn-sm btn-danger mr-5">Delete</button>
                                        Completed <input type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;