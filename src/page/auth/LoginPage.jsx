import { LoadingButton } from "@mui/lab";
import { Paper, TextField } from "@mui/material";
import { useState } from "react";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    loginService(data)
      .then(() => {
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-100 h-screen flex justify-center items-center">
      <Paper
        className="flex flex-col gap-3 w-[400px] p-5"
        component={"form"}
        onSubmit={handleLogin}
      >
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Password" name="password" type="password" required />
        <LoadingButton type="submit" loading={isLoading} variant="outlined">
          Login
        </LoadingButton>
      </Paper>
    </div>
  );
};

export default LoginPage;
