//variables that contains the currentlyLoggedIn user
export const useAuth = () => useState("auth", () => "")

export const useToken = () => useState("token", () => "")