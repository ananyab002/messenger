import { useNavigate } from "react-router-dom";
import "./login.scss";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/messenger");
  };
  return (
    <div className="login">
      <h2>Welcome Back Kevin!</h2>
      <button onClick={handleLogin}>Go to Messenger</button>
    </div>
  );
};

export default Login;
