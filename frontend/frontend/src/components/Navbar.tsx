import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white px-8 py-4 flex justify-between items-center shadow-lg">
            <h1 className="font-bold text-2xl !text-gray-200 tracking-tight">
                User Post Manager
            </h1>
            <div className="space-x-6">
                <Link
                    to="/"
                    className="text-lg !text-gray-300 hover:underline transition-colors px-4 py-2 rounded-md font-medium"
                >
                    Home
                </Link>
                <Link
                    to="/users"
                    className="text-lg !text-gray-300 hover:underline transition-colors px-4 py-2 rounded-md font-medium"
                >
                    Users
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;