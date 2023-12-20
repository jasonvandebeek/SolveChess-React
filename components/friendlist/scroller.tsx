"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
    children?: ReactNode;
}

export default function Scroller({ children }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isScrollable, setIsScrollable] = useState({
        left: false,
        right: false,
    });

    useEffect(() => {
        const container = containerRef.current;

        const updateScrollability = () => {
            if (container) {
                const canScrollLeft = container.scrollLeft > 0;
                const canScrollRight = container.scrollWidth > container.clientWidth + container.scrollLeft;

                setIsScrollable({
                    left: canScrollLeft,
                    right: canScrollRight,
                });
            }
        };

        updateScrollability();
        container?.addEventListener('scroll', updateScrollability);

        return () => {
            container?.removeEventListener('scroll', updateScrollability);
        };
    }, [children]);

    const handleScroll = (direction: 'left' | 'right') => {
        const container = containerRef.current;

        if (container) {
            const currentScroll = container.scrollLeft;

            if (direction === 'left') {
                container.scrollTo({
                    left: currentScroll - container.clientWidth,
                    behavior: 'smooth',
                });
            } else if (direction === 'right') {
                container.scrollTo({
                    left: currentScroll + container.clientWidth,
                    behavior: 'smooth',
                });
            }
        }
    };

    return (
        <div className="group/row relative flex flex-row gap-[2rem]">
            {(isScrollable.left || isScrollable.right) && (
                <div className={`transition duration-[0.3s] opacity-[0%] ${isScrollable.left ? 'group-hover/row:opacity-[100%] cursor-pointer' : ''} absolute left-[-4rem] h-[100%] rotate-[180deg] text-text text-[2rem] flex items-center`} onClick={() => handleScroll('left')}>
                    <i className="fi fi-br-angle-small-right flex h-fit" />
                </div>
            )}

            <div className="flex flex-row gap-[1.5rem] w-[100%] overflow-hidden p-[2px]" ref={containerRef}>
                {children}
            </div>

            {(isScrollable.left || isScrollable.right) && (
                <div className={`transition duration-[0.3s] opacity-[0%] ${isScrollable.right ? 'group-hover/row:opacity-[100%] cursor-pointer' : ''} absolute right-[-4rem] h-[100%] text-text text-[2rem] flex items-center`} onClick={() => handleScroll('right')}>
                    <i className="fi fi-br-angle-small-right flex h-fit" />
                </div>
            )}
        </div>
    )
}