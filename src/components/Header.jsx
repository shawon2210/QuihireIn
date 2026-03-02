export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">QuickHire</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Jobs
            </a>
            <a
              href="/admin"
              className="text-gray-700 hover:text-primary font-medium"
            >
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
