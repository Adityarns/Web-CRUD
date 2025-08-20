import AddUser from "./AddUser";
import UserList from "./UserList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<UserList></UserList>}></Route>
          <Route path="add" element={<AddUser></AddUser>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
