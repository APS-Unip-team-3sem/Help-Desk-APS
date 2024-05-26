import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ButtonCreateTicket = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);
    
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
        if (!dropdown.current) return;
        if (
            !dropdownOpen ||
            dropdown.current.contains(target) ||
            trigger.current.contains(target)
        )
            return;
        setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });
    
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
        if (!dropdownOpen || keyCode !== 27) return;
        setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });
    
    return (
        <div className="relative">
        <Link
            ref={trigger}
            onClick={() => {
            setDropdownOpen(!dropdownOpen);
            }}
            to="/ticket/create"
            className="border border-color-indigo text-color-indigo py-3 px-4 rounded-xl transition-colors hover:bg-primary hover:text-white duration-300"
        >
            Enviar Ticket
        </Link>
        
        </div>
    );
}

export default ButtonCreateTicket;