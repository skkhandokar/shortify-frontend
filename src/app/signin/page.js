

import AuthForm from "../components/AuthForm"

export default function SigninPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-violet-100 py-10">
      <AuthForm type="signin" />
    </main>
  )
}

