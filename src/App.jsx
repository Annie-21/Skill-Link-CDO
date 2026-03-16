import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage          from "./pages/LoginPage";
import WorkerDashboard    from "./pages/WorkerDashboard";
import ResidentDashboard  from "./pages/ResidentDashboard";
import AdminDashboard     from "./pages/AdminDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function handleLogin(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    setCurrentUser(null);
  }

  // Redirect logged-in user to their role dashboard
  function DefaultRedirect() {
    if (!currentUser) return <Navigate to="/login" replace />;
    if (currentUser.role === "worker")   return <Navigate to="/worker"   replace />;
    if (currentUser.role === "resident") return <Navigate to="/resident" replace />;
    if (currentUser.role === "admin")    return <Navigate to="/admin"    replace />;
    return <Navigate to="/login" replace />;
  }

  // Protect routes — redirect to login if not authenticated
  function ProtectedRoute({ children, allowedRole }) {
    if (!currentUser) return <Navigate to="/login" replace />;
    if (currentUser.role !== allowedRole) return <Navigate to="/" replace />;
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          currentUser
            ? <DefaultRedirect />
            : <LoginPage onLogin={handleLogin} />
        } />

        <Route path="/worker" element={
          <ProtectedRoute allowedRole="worker">
            <WorkerDashboard
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="/resident" element={
          <ProtectedRoute allowedRole="resident">
            <ResidentDashboard
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        } />

        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
