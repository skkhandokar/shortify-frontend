'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, Typography, Link as MuiLink, Avatar, Button } from '@mui/material'
import Link from 'next/link'

export default function MyURLs() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const urlsPerPage = 10  

  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/signin')
      return
    }

    fetch('http://localhost:8000/api/custom-urls/', {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setUrls(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [router])

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch (error) {
      return '/default-favicon.png'
    }
  }

  // Pagination logic
  const indexOfLastUrl = currentPage * urlsPerPage
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage
  const currentUrls = urls.slice(indexOfFirstUrl, indexOfLastUrl)
  const totalPages = Math.ceil(urls.length / urlsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-red-700 mb-10 text-center">
        🚀 My Custom Short Links
      </h2>

      <div className="bg-gradient-to-r from-emerald-400 via-teal-400   py-12 mb-10 text-center text-white rounded-2xl shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🎯 Your Custom Short URLs</h1>
        <p className="text-lg md:text-xl text-indigo-100">Manage and track your shortened links in one place.</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">Loading...</p>
      ) : urls.length === 0 ? (
        
          
            <p className="text-center text-gray-500 text-lg">
            No URLs found.{' '}
            <Link 
              href="/" 
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
            >
              Create one!
            </Link>
          </p>

      ) : (
        <>
          <div className="grid gap-6">
            {currentUrls.map(url => {
              const shortUrl = `${window.location.origin}/${url.custom_shortcodes}`
              return (
                <Card
                  key={url.id}
                  className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="flex flex-col sm:flex-row sm:items-center gap-6">

                    {/* Favicon */}
                    <div className="flex-shrink-0">
                      <Avatar
                        src={getFavicon(url.original_url)}
                        alt="Site Icon"
                        sx={{ width: 48, height: 48 }}
                        variant="rounded"
                      />
                    </div>

                    {/* URL Details */}
                    <div className="flex-1">
                      {/* Short URL */}
                      <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
                        Short URL
                      </Typography>
                      <MuiLink
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 font-bold text-lg break-words mb-4 block"
                      >
                        {shortUrl}
                      </MuiLink>

                      {/* Original URL */}
                      <Typography variant="subtitle2" className="text-gray-500 uppercase tracking-wider mb-1">
                        Original URL
                      </Typography>
                      <Typography variant="body2" className="text-gray-400 break-words text-sm">
                        {url.original_url}
                      </Typography>

                      {/* Click Count */}
                      <Typography variant="body2" className="mt-4 text-sm text-gray-500">
                        📊 Clicks: <span className="text-indigo-700 font-bold">{url.clicks}</span>
                      </Typography>
                    </div>

                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
