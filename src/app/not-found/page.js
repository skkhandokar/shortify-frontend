export default function NotFound() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
        <h1 className="text-5xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-700 mb-6">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <a
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </a>
      </div>
    );
  }
  