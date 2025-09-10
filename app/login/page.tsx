"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="mx-auto w-full max-w-[400px] rounded-xl border bg-card p-8 shadow-lg">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Welcome to CyberTraining blablabla.....
                </h1>
                <p className="text-sm text-muted-foreground">
                    Please sign in with CILogon to access protected content
                </p>
            </div>

            <div className="mt-6 grid gap-6">
                <Button 
                    className="w-full" 
                    onClick={() => signIn("cilogon", { callbackUrl })}
                >
                    Sign in with CILogon
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                </div>
                <Link href="/" className="text-sm text-center text-muted-foreground hover:text-primary">
                    Return to Home
                </Link>
            </div>
        </div>
    </div>
  )
}
