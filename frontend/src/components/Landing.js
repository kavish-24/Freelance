"use client"

import { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import {
  FaHome,
  FaUser,
  FaPlus,
  FaSearch,
  FaTimes,
  FaHeart,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa"
import "./Landing.css"

export default function ClientLandingPage() {
  const [jobs, setJobs] = useState([])
  const [user, setUser] = useState({ name: "" })
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [isLoading, setIsLoading] = useState({ user: false, jobs: false })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch user data
  const fetchUser = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, user: true }))
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")
      const decoded = jwtDecode(token)
      const userId = decoded.id
      const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        setUser({ name: data.name || "Guest" })
      } else {
        throw new Error(data.message || "Failed to fetch user profile")
      }
    } catch (err) {
      console.error("Failed to fetch user:", err)
      setUser({ name: "Guest" })
      setError(err.message)
      if (err.message === "No token found" || err.message.includes("Invalid")) {
        localStorage.removeItem("token")
        navigate("/login")
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, user: false }))
    }
  }, [navigate])

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    setIsLoading((prev) => ({ ...prev, jobs: true }))
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) setJobs(data)
      else throw new Error(data.message)
    } catch (err) {
      console.error("Failed to fetch jobs:", err)
      setJobs([])
      setError(err.message)
    } finally {
      setIsLoading((prev) => ({ ...prev, jobs: false }))
    }
  }, [])

  useEffect(() => {
    fetchUser()
    fetchJobs()
  }, [fetchUser, fetchJobs])

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    setSearchText(e.target.value)
  }, [])

  // Clear search input
  const clearSearch = useCallback(() => {
    setSearchText("")
    setSearchVisible(false)
  }, [])

  // Get status badge class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-badge status-active"
      case "in progress":
        return "status-badge status-progress"
      case "completed":
        return "status-badge status-completed"
      default:
        return "status-badge status-default"
    }
  }

  // Filter jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchText.toLowerCase()),
  )

  // Job Card Component
  const JobCard = ({ job }) => (
    <div className="job-card">
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.title}</h3>
          <span className={getStatusClass(job.status)}>{job.status}</span>
        </div>
        {job.budget && (
          <div className="job-budget">
            <FaDollarSign />
            <span>{job.budget}</span>
          </div>
        )}
      </div>

      <div className="job-card-content">
        <p className="job-description">{job.description?.slice(0, 120)}...</p>

        <div className="job-meta">
          <div className="job-meta-item">
            <FaCalendarAlt />
            <span>{new Date(job.date).toLocaleDateString()}</span>
          </div>
          {job.location && (
            <div className="job-meta-item">
              <FaMapMarkerAlt />
              <span>{job.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Loading Skeleton Component
  const JobSkeleton = () => (
    <div className="job-card skeleton">
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-badge"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
        <div className="skeleton-meta">
          <div className="skeleton-meta-item"></div>
          <div className="skeleton-meta-item"></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button
            onClick={() => navigate("/profile/client/:id")}
            className="profile-button"
            aria-label={`Go to ${user.name}'s profile`}
          >
            <div className="avatar">{isLoading.user ? "..." : user.name ? user.name[0].toUpperCase() : "?"}</div>
            <span className="profile-name">{isLoading.user ? "Loading..." : user.name || "Guest"}</span>
          </button>

          <div className="header-actions">
            <button className="likes-button">
              <FaHeart />
              <span>100</span>
            </button>

            {searchVisible ? (
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="search-input"
                  aria-label="Search jobs"
                  autoFocus
                />
                {searchText && (
                  <button onClick={clearSearch} className="clear-button" aria-label="Clear search">
                    <FaTimes />
                  </button>
                )}
              </div>
            ) : (
              <button onClick={() => setSearchVisible(true)} className="search-button" aria-label="Open search">
                <FaSearch />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-background">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
            alt="Earth"
            className="welcome-image"
          />
          <div className="welcome-overlay"></div>
        </div>
        <div className="welcome-content">
          <h1 className="welcome-title">WELCOME, {isLoading.user ? "LOADING..." : user.name.toUpperCase()}</h1>
          <p className="welcome-subtitle">
            Find help for your short-term tasks quickly and securely. Connect with talented professionals worldwide.
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <main className="jobs-section">
        <div className="jobs-header">
          <div className="jobs-title-section">
            <h2 className="jobs-title">MY POSTED JOBS</h2>
            <p className="jobs-subtitle">Your latest job listings and their current status</p>
          </div>
          <button onClick={() => navigate("/post-job")} className="post-job-button">
            <FaPlus />
            <span>Post Job</span>
          </button>
        </div>

        {error && (
          <div className="error-alert">
            <p>{error}</p>
          </div>
        )}

        <div className="jobs-content">
          {isLoading.jobs ? (
            <div className="jobs-grid">
              {[...Array(6)].map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaClock />
              </div>
              <h3 className="empty-title">{searchText ? "No jobs found" : "No jobs posted yet"}</h3>
              <p className="empty-description">
                {searchText
                  ? `No jobs match "${searchText}". Try a different search term.`
                  : "Start by posting your first job to find talented professionals."}
              </p>
              {!searchText && (
                <button onClick={() => navigate("/post-job")} className="empty-cta-button">
                  <FaPlus />
                  <span>Post Your First Job</span>
                </button>
              )}
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Navbar */}
      <nav className="navbar">
        <button onClick={() => navigate("/home")} className="nav-button" aria-label="Go to Home">
          <FaHome />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate(`/profile/client/${jwtDecode(localStorage.getItem("token"))?.id}`)}
          className="nav-button"
          aria-label="Go to Profile"
        >
          <FaUser />
          <span>Profile</span>
        </button>
        <button onClick={() => navigate("/post-job")} className="nav-button" aria-label="Post a Job">
          <FaPlus />
          <span>Post Job</span>
        </button>
      </nav>

      {/* Bottom padding for fixed navbar */}
      <div className="navbar-spacer"></div>
    </div>
  )
}
