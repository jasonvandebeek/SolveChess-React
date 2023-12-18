import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface Props {
    onInputChange?: (value: string) => void;
    onEnterPress?: (value: string) => void;
}

export default function SearchBar({ onInputChange = () => {}, onEnterPress = () => {} }:Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onInputChange!(searchTerm);
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onEnterPress(searchTerm);
        }
    }

    return (
        <div className="grow h-[2.5rem] bg-container shadow-small flex flex-row items-center rounded-sm shrink-0 pl-[2px] text-text font-normal">
            <i className="fi fi-br-search p-[0.625rem] text-[1.25rem] flex items-center "></i>
            <input
                className="h-[100%] grow border-none outline-none bg-transparent placeholder:text-text select-none"
                type="text"
                placeholder={`Search...`}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    )
}
