import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewExpense from "./pages/NewExpense";
import UpdateExpense from "./pages/UpdateExpense";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/new" element={<NewExpense />} />
        <Route path="/update/:id" element={<UpdateExpense />} />
      </Routes>
    </Router>
  );
}
export default App;
