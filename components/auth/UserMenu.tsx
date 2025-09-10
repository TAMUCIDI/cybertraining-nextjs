"use client"

import { signOut } from "next-auth/react"
import { buttonVariants } from "../ui/button"

interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    idp_name?: string | null
  }
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <span className="hidden sm:inline truncate max-w-[150px]">{user.name}</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
        <li>
          <div className="flex flex-col items-start px-2 py-1">
            <span className="font-medium truncate w-full">{user.name}</span>
            <span className="text-sm text-muted-foreground truncate w-full  text-primary">{user.email}</span>
            {user.idp_name && (
              <span className="text-xs text-muted-foreground truncate w-full">via {user.idp_name}</span>
            )}
          </div>
        </li>
        <li>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className={buttonVariants({variant: 'secondary'})}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  )
}