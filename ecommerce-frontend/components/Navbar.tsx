export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-wide text-blue-400">
          🛒 LazyShop
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <a
            href="/"
            className="hover:text-blue-400 transition duration-200"
          >
            Trang chủ
          </a>
        </div>
      </div>
    </nav>
  );
}
