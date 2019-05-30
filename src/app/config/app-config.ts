
export const Config = {
    "app-live-url":"http://live.adebiyipaul.com/api",//"http://versabackend.adebiyipaul.com/api"
    "cloudinary": {
        url:"https://api.cloudinary.com",
        uploadUrl:"v1_1/crystalbit-technology/image/upload",
        upload_preset: "vprr7erl",
        apiKey: "YOUR API KEY",
        databaseURL: "YOUR DATABASE URL",
        projectId: "YOUR PROJECT ID",
        storageBucket: "YOUR STORAGE BUCKET",
        messagingSenderId: "YOUR MESSAGING SENDER ID"
        },
    "google":{
        scope:"profile email",
        clientid:"104742513131-r6pnjt53en8akmt4pqt9d3i5ia5iln8a.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin'
    },
    "yahoo":{
        base_url:"https://api.login.yahoo.com",
        auth_code_path:"oauth2/request_auth",
        redirect_uri:"http://versa-ims.herokuapp.com",
        access_token_path:"oauth2/get_token",
        scope:"profile",
        clientid:"dj0yJmk9eHNIendLV2NJU2gwJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg5",
        secretkey:"74822b31d3242615561b84a5ece6020b9ef5d9a3",
        profil_base_url:"https://social.yahooapis.com"
        
        
    },
    "linkedin":{
        base_url:"https://www.linkedin.com",
        auth_code_path:"oauth/v2/authorization",
        redirect_uri:"http://127.0.0.1:4200",
        access_token_path:"oauth/v2/accessToken",
        scope:"r_liteprofile%20r_emailaddress%20w_member_social",
        clientid:"77pv3mo63oyixv",
        secretkey:'WXSct7I6waMjYI06',
        profile_email:"v2/me",
        response_type:"code",
        grant_type:"authorization_code",
        state:"fooobar",
        profile_base_url:'https://api.linkedin.com'
    }
        
}
