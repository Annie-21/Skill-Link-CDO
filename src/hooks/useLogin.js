import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleAccounts } from "../data/auth.data";

export function useLogin(onLogin) {
  const navigate = useNavigate();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [isLoading, setIsLoading]       = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const account = sampleAccounts.find(
        (a) => a.email === email && a.password === password
      );

      if (!account) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      onLogin(account);
      setIsLoading(false);

      if (account.role === "worker")   navigate("/worker");
      if (account.role === "resident") navigate("/resident");
      if (account.role === "admin")    navigate("/admin");
    }, 600);
  }

  function clearError() {
    setError("");
  }

  return {
    email,        setEmail,
    password,     setPassword,
    showPassword, setShowPassword,
    error,
    isLoading,
    clearError,
    handleSubmit,
  };
}
