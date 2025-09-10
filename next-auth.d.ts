import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      // CILogon specific fields
      idp?: string
      idp_name?: string
      eppn?: string
      affiliation?: string
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    // CILogon specific fields
    idp?: string
    idp_name?: string
    eppn?: string
    affiliation?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idp?: string
    idp_name?: string
    eppn?: string
    affiliation?: string
  }
}