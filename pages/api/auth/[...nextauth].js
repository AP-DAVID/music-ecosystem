import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";



   const providers = [
        Providers.Credentials({
            id: "email-login", 
            name : "Credentials",
            credentials:{
                email:{label : "Email", type : "text", placeholder: "Johndoe@gmail.com"},
                password:{label : "Password", type : "Password"}
            },
            async authorize(credentials){
                try{
                    const config = {
                        headers: {
                            "Accept" : "application/json",
                            'Content-type' : "application/json"
                        }
                    }
                    const baseUrl = "https://muscotest5a.vercel.app";
                    const res = await fetch(baseUrl + '/api/login2', {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                    })

                     const user = await res.json();
                                        
                    if(user){
                        return user
                    }
                    
                    

                }catch(error){
                    console.log(err0r)
                }
            }

        })
       
    ]

    const callbacks =  {
        async signIn(user) {
          return user._id;
        },
        async session(session, token) {
          session.user = token.user;
          return session;
        },
        async jwt(token, user) {
          if (user) token.user = user;
          return token;
        },
    }



  const options = {
    providers,
    callbacks,
   
  }

    

export default (req, res) => NextAuth(req, res, options);