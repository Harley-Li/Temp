import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './nav.scss';

const Nav: React.FC = () => {
    const [active, setActive] = React.useState<string>('');
    const location = useLocation();

    const navLinks = [
        {
            path: '/dashboard',
            text: 'Dashboard',
            src: '/chatbot/icons/payment.svg',
        },
    ];

    useEffect(() => {
        const currentPath = location.pathname;
        const activeLink = navLinks.find((link) => currentPath.includes(link.path));
        if (activeLink) {
            setActive(activeLink.text);
        }
    }, [location.pathname]);

    return (
        <nav className={`left-panel panel`}>
            <img
                src="/chatbot/icons/person.png"
                alt="user"
                className="user-photo"
            />

            {navLinks.map((item: { path: string; text: string; src: string }) => {
                return (
                    <NavLink to={item.path} key={item.text} className={'active'} onClick={() => setActive(item.text)}>
                        <span className="icon">
                            <img src={item.src} alt="icon" className={item.text.toLowerCase()} />
                        </span>
                        <span className="title">{item.text}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default Nav;
