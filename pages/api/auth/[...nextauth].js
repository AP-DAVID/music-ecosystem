import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";


const options ={
    providers: [
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
                    const baseUrl = "http://localhost:3000";
                    const response = await axios.post(baseUrl + '/api/login', credentials, config)
                    
                    return response.data

                }catch(error){
                    console.log(err0r)
                }
            }

        }),
        Providers.GitHub({
            id: "github", 
            clientId: process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECRET

        }),
        Providers.Auth0({
            id: "auth0", 
            clientId : process.env.AUTH0_CLIENT_ID,
            clientSecret : process.env.AUTH0_CLIENT_SECRET,
            domain : process.env.AUTH0_DOMAIN,
            
        })
       
    ],
    session :{
        jwt : true
    }
}
export default (req, res) => NextAuth(req, res, options);