export default function Register() {
    return (
        <form className="space-y-4 p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Register</h2>

            <div>
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue"
                    placeholder="********"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-customBlue text-white rounded-lg font-semibold hover:bg-blueHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blueHover"
                >
                    Register
                </button>
            </div>
        </form>
    );
}
