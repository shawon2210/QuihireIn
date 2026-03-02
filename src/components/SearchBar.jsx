export default function SearchBar({
  onSearch,
  onCategoryChange,
  onLocationChange,
}) {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white mb-8">
      <h2 className="text-3xl font-bold mb-6">Find Your Next Opportunity</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search by title, company..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div>
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="">All Categories</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Mobile">Mobile</option>
            <option value="DevOps">DevOps</option>
            <option value="Design">Design</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by location..."
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>
    </div>
  );
}
