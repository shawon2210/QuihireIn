import Link from "next/link";

export default function JobCard({ job }) {
  return (
    <Link href={`/jobs/${job._id}`}>
      <a>
        <div className="card p-6 cursor-pointer">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm">{job.company}</p>
            </div>
            <span className="badge-secondary">{job.category}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span>📍 {job.location}</span>
            <span>💼 {job.jobType}</span>
          </div>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {job.description}
          </p>

          {job.salary && (
            <p className="text-primary font-semibold text-sm mb-3">
              {job.salary}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500">
              {job.applicationsCount}{" "}
              {job.applicationsCount === 1 ? "application" : "applications"}
            </span>
            <span className="text-primary font-semibold text-sm">
              View Details →
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
