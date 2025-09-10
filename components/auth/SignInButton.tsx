"use client"

import { signIn } from "next-auth/react"

import { buttonVariants } from "../ui/button"
import { LogIn } from "lucide-react"

export function SignInButton() {
  return (
    <button 
      onClick={() => signIn("cilogon")}
      className= {buttonVariants()}
    >
      <LogIn className="h-4 w-4" />
      Sign in
    </button>
  )
}