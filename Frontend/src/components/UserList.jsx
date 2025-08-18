import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            console.log("Fetching users from API...");
            const response = await axios.get("http://localhost:5000/users");
            console.log("API Response:", response);
            console.log("Response Data:", response.data);
            
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    console.log("Current users state:", users);
    console.log("Users length:", users.length);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-4xl">User List</h1>
            <div className="columns pt-5">
                <div className="head flex gap-20 col-auto border-4">
                    <div>No.</div>
                    <div>Name</div>
                    <div>Email</div>
                    <div>Gender</div>
                    <div>Action</div>
                </div>
                
                {users.length === 0 ? (
                    <div>No users found</div>
                ) : (
                    users.map((user, index) => (
                        <div key={user._id} className="flex  justify-between gap-10 border-2 p-2">
                            <div>{index + 1}</div>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                            <div>{user.gender}</div>
                            <div>
                                <button className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</button>
                                <button className="bg-red-500 text-white px-2 py-1">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}