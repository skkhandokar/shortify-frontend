'use client'

import Link from 'next/link'
import Head from 'next/head'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { username, logout } = useAuth()

  return (
    <>
      <Head>
        <title>{username ? `Welcome, ${username} | Shortify` : 'Shortify ✨ - Shorten your links'}</title>
        <meta name="description" content="A smart URL shortener for everyone." />
        <link rel="icon" href="/favicon.ico" />
        <script type='text/javascript' src='//pl26716472.profitableratecpm.com/1c/c9/f5/1cc9f58c866698492f57b2a5845644dc.js'></script>
      </Head>

      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-orange-300 text-white p-4 shadow-lg backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <Link href="/" className="text-2xl font-extrabold tracking-wide hover:text-white transition-all duration-300">
            Shortify ✨
          </Link>

          <div className="space-x-6 text-sm sm:text-base flex items-center">
            {username ? (
              <>
                <span className="font-semibold hidden sm:inline">👋 Hello, {username}</span>
                <Link href="/my-urls" className="hover:underline hover:text-orange-100 transition-all">
                  My URLs
                </Link>
                <Link href="/custom-urls" className="hover:underline hover:text-orange-100 transition-all">
                  Custom URLs
                </Link>
                <button
                  onClick={logout}
                  className="hover:underline text-red-100 hover:text-red-300 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="hover:underline hover:text-orange-100 transition-all">
                  Login
                </Link>
                <Link href="/signup" className="hover:underline hover:text-orange-100 transition-all">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
