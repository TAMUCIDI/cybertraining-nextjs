"use client"

import { useRouter } from "next/navigation"
import { buttonVariants } from "../ui/button"
import { LogIn } from "lucide-react"

export function SignInButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.push("/login")}
      className={buttonVariants()}
    >
      <LogIn className="h-4 w-4" />
      Sign in
    </button>
  )
}