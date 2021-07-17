import React, { useEffect, useState } from "react";

const Users = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDOB] = useState("");
    const [users, setUsers] = useState([]);
    const [emailError, setEmailError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (localStorage.getItem("todoRound2")) {
            setUsers(JSON.parse(localStorage.getItem("todoRound2")))
        }
    }, [])

    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth();

    const handleSubmit = (e) => {
        e.preventDefault();

        var duplicate = false;

        if (users.length > 0) {
            for (let i = 0; i < users.length; i++) {
                if (users[i]["email"] === email) {
                    setEmailError("Email already registered");
                    duplicate = true;
                    break
                }
            }
        }

        if (!duplicate) {
            users.push({ name: name, email: email, dob: dob });
            localStorage.setItem("todoRound2", JSON.stringify(users));
            setSuccess("User registered successfully");
            setName("");
            setEmail("");
        }
    }

    return (
        <div className="conatiner">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="card mt-4">
                            <div className="card-body">
                                {emailError && (
                                    <div className="text-danger">{emailError}</div>
                                )}
                                {success && (
                                    <div className="text-success">{success}</div>
                                )}

                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>DOB</label>
                                    <input className="form-control" type="date" max={`${date.getFullYear()}-${month}-${day}`} value={dob} onChange={(e) => setDOB(e.target.value)} />
                                </div>
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Users;