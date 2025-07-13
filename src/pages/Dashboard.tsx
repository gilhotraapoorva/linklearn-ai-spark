import Header from "@/components/Header";
import { useUser } from "../lib/UserContext";

const Dashboard = () => {
  const { user } = useUser();
  const username = user?.email ? user.email.split("@")[0] : "Guest";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome,{" "}
          <span className="font-semibold">{username}</span>! You are now logged
          in.
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
