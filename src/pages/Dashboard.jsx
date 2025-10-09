import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const Dashboard = () => {

  const {user} = useContext(AuthContext);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard