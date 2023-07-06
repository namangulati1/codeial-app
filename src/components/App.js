import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return auth.user ? <Element {...rest} /> : <Navigate to="/login" />;
};

const Page404 = () => {
  return <h1>Page not Found</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={[]} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route
            path="/settings"
            element={<PrivateRoute element={Settings} />}
          />
          <Route
            path="/user/:userId"
            element={<PrivateRoute element={UserProfile} />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
