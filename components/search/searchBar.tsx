interface Props {
    property: string;
    onInputChange?: (property: string, value: any) => void;
}

export default function SearchBar({ property, onInputChange }:Props)  {
    return (
        <div className="grow h-[2.5rem] bg-container shadow-small flex flex-row items-center rounded-sm shrink-0 pl-[2px] text-text font-normal">
            <i className="fi fi-br-search p-[0.625rem] text-[1.25rem] flex items-center "></i>
            <input
                className="h-[100%] grow border-none outline-none bg-transparent placeholder:text-text select-none"
                type="text"
                placeholder={`Search...`}
                onChange={(e) => onInputChange!(property, e.target.value)}
            />
        </div>
    )
}
