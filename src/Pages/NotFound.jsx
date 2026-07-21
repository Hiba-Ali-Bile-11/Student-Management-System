import { Link } from "react-router-dom";

function NotFound() {
  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-900 px-6">

      <div className="text-center">

        <h1 className="text-8xl font-bold text-white">
          404
        </h1>

        <h2 className="text-3xl font-semibold text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-200 mt-4">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;