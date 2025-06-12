const USER_ROLE = {
    STUDNET : "student",
    FACULTY : "faculty",
    ADMIN : "admin"
} as const; 


type TUserRole = keyof typeof USER_ROLE