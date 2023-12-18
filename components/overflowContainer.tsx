import { ReactNode, useEffect, useState } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
}

export default function OverflowContainer({ className, children }:Props) {
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {

            const observer = new MutationObserver(checkHeight);
            const config = { childList: true, subtree: true };
        
            const element = document.querySelector('.overflow-y-auto');
            if (element) {
                setIsOverflowing(element.scrollHeight > element.clientHeight);
            }

            var parent = element?.parentElement;
            if(parent) {
                observer.observe(parent, config);
            }

            function checkHeight() {
                if (element) {
                    setIsOverflowing(element.scrollHeight > element.clientHeight);
                }
            }
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, [children]);

    return (
        <div className={`${className} pl-[2px] ${isOverflowing ? 'pr-[0.5rem]' : 'pr-[2px]'}`}>
            {children}
        </div>
    )
}
