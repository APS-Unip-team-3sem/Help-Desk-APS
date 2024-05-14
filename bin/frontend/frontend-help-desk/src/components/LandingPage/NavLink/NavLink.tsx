import { Link } from "react-router-dom";

interface NavLinkProps {
    children: React.ReactNode;
    to: string;
    className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, to, className, ...props }) => (
    <Link to={to} className={`py-2.5 px-4 text-center rounded-full duration-150 ${className || ""}`} {...props}>
        {children}
    </Link>
);

export default NavLink;