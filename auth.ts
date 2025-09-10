import NextAuth from "next-auth"


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [{
        id: "cilogon", // signIn("my-provider") and will be part of the callback URL
        name: "CILogon", // optional, used on the default login page as the button text.
        type: "oidc", // or "oauth" for OAuth 2 providers
        issuer:  "https://cilogon.org", // to infer the .well-known/openid-configuration URL
        clientId: process.env.CILOGON_CLIENT_ID, // from the provider's dashboard
        clientSecret: process.env.CILOGON_CLIENT_SECRET, // from the provider's dashboard
        authorization: {
            params: {
            scope: "openid email profile org.cilogon.userinfo",
            },
        },
        profile(profile) {
            console.log('User logged in', { userId: profile.sub });
            return {
                // openid
                id: profile.sub,
                // email
                email: profile.email,
                // profile
                name: profile.name,
                // org.cilogon.userinfo
                idp: profile.idp,
                idp_name: profile.idp_name,
                eppn: profile.eppn,
                eptid: profile.eptid,
                affiliation: profile.affiliation,
            }
        },
    }],
    callbacks: {
        jwt({token, profile}){
            if(profile){
                token.idp = profile.idp;
                token.idp_name = profile.idp_name;
                token.eppn = profile.eppn;
                token.eptid = profile.eptid;
                token.affiliation = profile.affiliation;
            }
            return token;
        },
        async session({session, token, user}){
            session.user.name = token.name as string;
            session.user.idp = token.idp as string;
            session.user.idp_name = token.idp_name as string;
            session.user.eppn = token.eppn as string;
            session.user.affiliation = token.affiliation as string;
            return session;
        }
    }
  });