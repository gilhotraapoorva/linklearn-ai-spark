import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, logOut } from "../lib/authActions";
import { useUser } from "../lib/UserContext";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const AuthDemo = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    setIsLoading(true);
    try {
      const u = await signUp(email, password);
      setUser(u);
      navigate("/"); // Redirect to main dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      const u = await signIn(email, password);
      setUser(u);
      navigate("/"); // Redirect to main dashboard
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await logOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* LinkedIn Logo */}
        <div className="flex justify-center mb-8">
          <img src="/linkedin.svg" alt="LinkedIn Logo" className="h-16 w-16" />
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {user ? "Your Account" : (isSignUp ? "Create an Account" : "Welcome Back")}
            </CardTitle>
            <CardDescription className="text-center">
              {user 
                ? `Logged in as ${user.email}` 
                : (isSignUp 
                    ? "Create your LinkLearn account to start your learning journey" 
                    : "Sign in to your LinkLearn account")}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {!user && (
              <>
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                {error && (
                  <div className="p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
                    {error}
                  </div>
                )}
              </>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            {user ? (
              <div className="w-full space-y-4">
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleLogOut}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging out..." : "Log Out"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => navigate("/")}
                >
                  Return to Dashboard
                </Button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                <Button 
                  variant="default" 
                  className="w-full bg-[#0077B5] hover:bg-[#0077B5]/90" 
                  onClick={isSignUp ? handleSignUp : handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isSignUp ? "Creating Account..." : "Signing In...") 
                    : (isSignUp ? "Create Account" : "Sign In")}
                </Button>
                
                <div className="text-center">
                  <button 
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={isLoading}
                  >
                    {isSignUp 
                      ? "Already have an account? Sign in" 
                      : "Don't have an account? Create one"}
                  </button>
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          LinkLearn - A Learning Platform for Developers
        </div>
      </div>
    </div>
  );
};

export default AuthDemo;
