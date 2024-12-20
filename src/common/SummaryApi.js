export const baseUrl ="http://localhost:8000"

const SummaryApi ={
    register: {
        url:"/api/v1/user/register/",
        method:"post"
    },
    login: {
        url:"/api/v1/user/login/",
        method:"post"
    },
    forgot_password: {
        url:"/api/v1/user/forgot-password/",
        method:"put"
    },
    verify_forgot_password_otp: {
        url:"/api/v1/user/verify-forgot-password-otp/",
        method:"put"
    },
    reset_password: {
        url:"/api/v1/user/reset-password/",
        method:"put"
    },
    refreshToken: {
        url:"/api/v1/user/refresh-token",
        method:"post"
    },
    userDetails: {
        url:"/api/v1/user/user-details/ ",
        method:"get"
    },
    logout: {
        url:"/api/v1/user/logout/ ",
        method:"get"
    },
    uploadAvatar: {
        url:"/api/v1/user/upload-avatar/ ",
        method:"put"
    },
    updateUserprofile: {
        url:"/api/v1/user/update-user-profile/ ",
        method:"put"
    },
    
}

export default SummaryApi;