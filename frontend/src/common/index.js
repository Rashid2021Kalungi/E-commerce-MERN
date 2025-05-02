const backendDomain = "http://localhost:8080";

const summeryApi={
    signUp: {
        url:`${backendDomain}/api/signup`,
        method: "post"
    },
    signIn:{
        url: `${backendDomain}/api/signin`,
        method: "post"
        
    },
    currentUser:{
        url: `${backendDomain}/api/user-details`,
        method: "get"
    }
}
export default summeryApi