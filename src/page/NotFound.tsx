
import { Link } from "react-router-dom";
import { Button } from "../shared";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-8xl font-bold text-indigo-700">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link to="/home" className="mt-6">
        <Button variant="primary">Back to Home</Button>
      </Link>
    </div>
  );
}

export default NotFound;
