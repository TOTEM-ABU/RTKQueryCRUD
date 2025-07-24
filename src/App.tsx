import { Route, Routes } from "react-router";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId" element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default App;