"use client"

import { useSession } from "next-auth/react"
import { SignInButton } from "./SignInButton"
import { UserMenu } from "./UserMenu"

export function AuthButton() {
  const { data: session } = useSession()

  if (session?.user) {
    return <UserMenu user={session.user} />
  }

  return <SignInButton />
}