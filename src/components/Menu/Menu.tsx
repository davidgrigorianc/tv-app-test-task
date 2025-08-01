import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import searchIcon from '../../assets/icons/search.png';
import homeIcon from '../../assets/icons/home.png';
import tvShowsIcon from '../../assets/icons/tv-shows.png';
import moviesIcon from '../../assets/icons/movies.png';
import genresIcon from '../../assets/icons/genres.png';
import watchLaterIcon from '../../assets/icons/watch-later.png';

const menuItems = [
    { name: 'Search', icon: searchIcon, href: '#search' },
    { name: 'Home', icon: homeIcon, href: '#home' },
    { name: 'TV Shows', icon: tvShowsIcon, href: '#tv-shows' },
    { name: 'Movies', icon: moviesIcon, href: '#movies' },
    { name: 'Genres', icon: genresIcon, href: '#genres' },
    { name: 'Watch Later', icon: watchLaterIcon, href: '#watch-later' },
];

const bottomMenuItems = [
    { name: 'Language', href: '#language' },
    { name: 'Get Help', href: '#get-help' },
    { name: 'Exit', href: '#exit' },
];

const Menu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState('Home');

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.toLowerCase().replace('#', '');
            const matchedItem = menuItems.find(
                (item) => item.href.toLowerCase().replace('#', '') === hash,
            );
            if (matchedItem) {
                setSelectedItem(matchedItem.name);
            }
        };

        window.addEventListener('hashchange', handleHashChange);

        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const onSelect = (name: string, href: string) => {
        setSelectedItem(name);
        window.history.pushState(null, '', href);
    };

    return (
        <motion.nav
            className="pointer-events-none fixed top-0 left-0 z-30 flex h-screen w-full"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <motion.div
                className="pointer-events-auto absolute top-0 left-0 h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                    pointerEvents: isOpen ? 'auto' : 'none',
                    background: isOpen
                        ? 'transparent linear-gradient(90deg, #040404 0%, #040404FA 21%, #04040400 100%) 0% 0% no-repeat padding-box'
                        : 'none',
                }}
            />

            <motion.div
                className={clsx(
                    'pointer-events-auto relative z-10 flex h-full flex-col justify-between bg-[#040404] pl-[40px] text-white shadow-lg',
                    isOpen ? 'w-[350px]' : 'w-[157px]',
                )}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                transition={{ duration: 0.3 }}
            >
                <div className="flex h-[200px] shrink-0 items-center p-4">
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3"
                        >
                            <img
                                src="/assets/profile.webp"
                                alt="Profile"
                                className="h-[48px] w-[48px] rounded-full object-cover md:h-[56px] md:w-[56px] xl:h-[64px] xl:w-[64px] 2xl:h-[82px] 2xl:w-[82px]"
                            />
                            <span className="font-[Tajawal] text-[18px] leading-[30px] font-bold tracking-[-0.32px] text-[#F1F1F1] md:text-[20px] xl:text-[24px] 2xl:text-[32px]">
                                Daniel
                            </span>
                        </motion.div>
                    )}
                </div>

                <div className="flex-1 pt-2">
                    <ul className="space-y-2 px-2">
                        {menuItems.map(({ name, icon, href }) => {
                            const isSelected = selectedItem === name;
                            return (
                                <li
                                    key={name}
                                    onClick={() => onSelect(name, href)}
                                    className={clsx(
                                        'flex cursor-pointer items-center gap-4 px-3 py-2',
                                        'transition-all duration-300 ease-in-out',
                                        !isOpen && 'rounded-[12px] hover:bg-[#1f1f1f]',
                                        isOpen && isSelected
                                            ? 'rounded-[12px] bg-[#3B486D]'
                                            : isOpen && 'rounded-[12px] hover:bg-[#1f1f1f]',
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            'flex h-[48px] w-[48px] shrink-0 items-center justify-center',
                                            !isOpen && isSelected
                                                ? 'rounded-full bg-[#3B486D]'
                                                : '',
                                        )}
                                    >
                                        <img src={icon} alt={name} className="h-[24px] w-[24px]" />
                                    </div>

                                    <div className="overflow-hidden">
                                        <motion.span
                                            initial={false}
                                            animate={{
                                                opacity: isOpen ? 1 : 0,
                                                x: isOpen ? 0 : -20,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="block text-[18px] leading-[43px] whitespace-nowrap md:text-[20px] xl:text-[24px] 2xl:text-[36px]"
                                        >
                                            {name}
                                        </motion.span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="shrink-0 px-3 pb-6">
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isOpen ? 1 : 0,
                            y: isOpen ? 0 : 10,
                            height: isOpen ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden text-gray-400"
                    >
                        {bottomMenuItems.map(({ name }) => (
                            <button
                                key={name}
                                className="block h-[18px] w-full cursor-pointer text-left text-[14px] leading-[42px] font-bold tracking-[4.8px] text-[#858688] uppercase hover:text-white md:h-[21px] md:text-[16px] xl:h-[30px] xl:text-[20px] 2xl:h-[42px] 2xl:text-[24px]"
                                type="button"
                            >
                                {name}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Menu;
