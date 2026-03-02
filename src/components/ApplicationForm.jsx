import { useState } from "react";
import axios from "axios";

export default function ApplicationForm({ jobId, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/applications", {
        jobId,
        ...formData,
      });

      if (response.data.success) {
        setMessage("✅ Application submitted successfully!");
        setFormData({ name: "", email: "", resumeLink: "", coverNote: "" });
        setTimeout(() => {
          if (onSubmit) {
            onSubmit();
          }
        }, 1500);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to submit application";
      setError(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Apply for this job
      </h3>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resume Link *
          </label>
          <input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="https://example.com/resume.pdf"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must start with http:// or https://
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cover Note *
          </label>
          <textarea
            name="coverNote"
            value={formData.coverNote}
            onChange={handleChange}
            required
            className="input-field resize-none"
            rows="5"
            placeholder="Tell us why you're a great fit for this role..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.coverNote.length}/2000 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </form>
  );
}
