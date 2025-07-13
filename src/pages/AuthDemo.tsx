import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, logOut } from "../lib/authActions";
import { useUser } from "../lib/UserContext";

const AuthDemo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    try {
      const u = await signUp(email, password);
      setUser(u);
      alert("Sign up successful!");
      navigate("/"); // Redirect to main dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignIn = async () => {
    setError("");
    try {
      const u = await signIn(email, password);
      setUser(u);
      alert("Sign in successful!");
      navigate("/"); // Redirect to main dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    setUser(null);
    alert("Logged out!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-background">
      <h2 className="text-xl font-bold mb-4">Firebase Auth Demo</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <div className="flex gap-2 mb-4">
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={handleSignUp}>Sign Up</button>
        <button className="bg-accent text-white px-4 py-2 rounded" onClick={handleSignIn}>Sign In</button>
        <button className="bg-muted text-black px-4 py-2 rounded" onClick={handleLogOut}>Log Out</button>
      </div>
      {user && <div className="mb-2 text-success">Logged in as: {user.email}</div>}
      {error && <div className="mb-2 text-destructive">Error: {error}</div>}
    </div>
  );
};

export default AuthDemo;
