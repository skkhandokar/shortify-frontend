'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { useAuth } from "../context/AuthContext"

export default function AuthForm({ type = "signin" }) {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const endpoint = type === "signup" ? "/api/register/" : "/api/login/"
    const body =
      type === "signup"
        ? formData
        : { username: formData.username, password: formData.password }

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.username) throw new Error(data.username[0])
        else if (data.email) throw new Error(data.email[0])
        else if (data.error) throw new Error(data.error)
        else throw new Error("Something went wrong")
      }

      localStorage.setItem("token", data.token)
      login(data.username)

      router.push("/")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-10 mt-20 bg-gradient-to-br from-violet-200 via-cyan-100 to-emerald-100 shadow-2xl rounded-3xl border border-gray-200 animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-8 text-center capitalize text-gray-800 tracking-wide">
        {type === "signup" ? "Create an account" : "Welcome Back!"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          required
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
        />

        {type === "signup" && (
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email address"
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
          />
        )}

        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          required
          className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition shadow-sm"
        />

        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        <button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-semibold tracking-wide shadow-md hover:shadow-lg transition-all duration-300"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {/* Switch between signin/signup */}
      <div className="mt-8 text-center">
        {type === "signup" ? (
          <p className="text-sm text-gray-600">
            Already have an account?
            <a
              href="/signin"
              className="ml-2 inline-flex items-center font-semibold text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-200 group"
            >
              Sign In
              <ArrowForwardIcon
                fontSize="small"
                className="ml-1 transform group-hover:translate-x-1 transition-transform"
              />
            </a>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Don't have an account?
            <a
              href="/signup"
              className="ml-2 inline-flex items-center font-semibold text-emerald-500 hover:text-emerald-600 hover:underline transition-all duration-200 group"
            >
              Sign Up
              <ArrowForwardIcon
                fontSize="small"
                className="ml-1 transform group-hover:translate-x-1 transition-transform"
              />
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
