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

//3:29:17 stopped there because token generation had an issue
// so I had to put a stop and user-details indicated that user is not logged in while signin indicated that user signed in sucessfully