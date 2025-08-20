import AddUser from "./AddUser";
import EditUser from "./EditUser";
import UserList from "./UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<UserList></UserList>}></Route>
          <Route path="add" element={<AddUser></AddUser>}></Route>
          <Route path="edit/:id" element={<EditUser></EditUser>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
