'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function LogoutPage() {
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    logout()
    setTimeout(() => {
      router.push('/HomePage')
    }, 100) 
  }, [logout, router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Logging out...</p>
    </div>
  )
}
