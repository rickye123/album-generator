import React, { useState } from 'react';
import darkStyles from '../styles/modules/CollapsibleSection-dark.module.css';
import lightStyles from '../styles/modules/CollapsibleSection-light.module.css';

interface CollapsibleSectionProps {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, defaultOpen = false, children }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [theme] = useState<'light' | 'dark'>(() => {
        // Load theme preference from localStorage or default to 'light'
        return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    });

    // Use the appropriate styles based on the current theme
    const styles = theme === 'dark' ? darkStyles : lightStyles;
    return (
        <div className={`${styles['collapsible-section']} ${isOpen ? styles['open'] : styles['closed']}`}>
            <h2 className={`${styles['toggle-header']}`} onClick={() => setIsOpen((prev) => !prev)}>
                {title}
                <span className={`${styles['arrow']} ${isOpen ? styles['down'] : styles['right']}`}></span>
            </h2>
            {isOpen && <div className={styles['section-content']}>{children}</div>}
        </div>
    );
};

export default CollapsibleSection;
