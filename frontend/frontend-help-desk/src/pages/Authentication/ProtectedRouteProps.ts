export interface ProtectedRouteProps {
    isAuthenticated: boolean;
    authenticationPath: string;
    element: React.ReactNode;
}