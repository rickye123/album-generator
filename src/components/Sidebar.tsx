import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import lightStyles from '../styles/modules/Sidebar.module.css';

interface SidebarProps {
    user: { username?: string; userId?: string };
    signOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, signOut }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMediaOpen, setIsMediaOpen] = useState(false); // State for Media dropdown
    const [showBurgerButton, setShowBurgerButton] = useState(true);
    const [theme] = useState<'light' | 'dark'>(() => {
        // Load theme preference from localStorage or default to 'light'
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    // Use the appropriate styles based on the current theme
    const styles = theme === 'dark' ? lightStyles : lightStyles;
    let lastScrollPosition = 0;

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleMediaDropdown = () => {
        setIsMediaOpen(!isMediaOpen);
    };

    const handleScroll = () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition < lastScrollPosition) {
            // Scrolling up
            setShowBurgerButton(true);
        } else if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            setShowBurgerButton(false);
        }

        lastScrollPosition = currentScrollPosition;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Burger Button */}
            {showBurgerButton && (
                <button
                    className={`${styles['burger-button']} ${isOpen ? styles['open'] : ''}`}
                    onClick={toggleSidebar}
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            )}

            {/* Sidebar */}
            <div className={`${styles['sidebar']} ${isOpen ? styles['open'] : ''}`}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/" onClick={toggleSidebar}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/albums" onClick={toggleSidebar}>
                                Albums
                            </Link>
                        </li>
                        <li>
                            <Link to="/lists" onClick={toggleSidebar}>
                                Collections
                            </Link>
                        </li>
                        <li>
                            <Link to="/queue" onClick={toggleSidebar}>
                                Queue
                            </Link>
                        </li>
                        {/* Media Dropdown */}
                        <li className={styles['dropdown']}>
                            <button className={styles['dropdown-toggle']} onClick={toggleMediaDropdown}>
                                Media {isMediaOpen ? '▲' : '▼'}
                            </button>
                            <ul className={`${styles['submenu']} ${isMediaOpen ? styles['open'] : ''}`}>
                                <li><Link to="/artists" onClick={toggleSidebar}>Artists</Link></li>
                                <li><Link to="/years" onClick={toggleSidebar}>Years</Link></li>
                                <li><Link to="/genres" onClick={toggleSidebar}>Genres</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/add-album" onClick={toggleSidebar}>
                                Add Album
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" onClick={toggleSidebar}>
                                Settings
                            </Link>
                        </li>
                    </ul>
                    {/* Display user info and sign out */}
                    {user && (
                        <div className={styles['user-info']}>
                            <br />
                            <br />
                            <span>Welcome, {user.username || user.userId}</span> {/* Display username or id */}
                            <>
                                <br />
                                <button
                                    onClick={async () => {
                                        if (signOut) {
                                            signOut();
                                        }
                                        navigate('/'); // Redirect to login page after signing out
                                    }}
                                    className={styles['sign-out-button']}
                                >
                                    Sign Out
                                </button>
                            </>
                        </div>
                    )}
                </nav>
            </div>

            {/* Overlay */}
            {isOpen && <div className={styles['overlay']} onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
