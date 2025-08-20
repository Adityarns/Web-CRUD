import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
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
        <div className="head flex gap-20 border-4 px-10">
          <div>No.</div>
          <div>Name</div>
          <div>Email</div>
          <div>Gender</div>
          <div>Action</div>
        </div>

        {users.length === 0 ? (
          <div>No users found</div>
        ) : (
          <div className="space-y-3 ">
            {users.map((user, index) => (
              <div
                key={user._id}
                className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 flex-1">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-gray-600 min-w-[30px]">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 md:flex-1">
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {user.gender}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`edit/${user._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="add"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Add User
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
