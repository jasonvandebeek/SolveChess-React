
import React, { Children, HTMLAttributes, ReactNode, cloneElement, isValidElement, useEffect, useState } from "react";

interface SearchTerms {
    [key: string]: any;
}

interface Props {
    handleSearchChange: (filteredObjects: any[]) => void;
    searchableObjects: any[];
    children?: ReactNode;
}

export default function SearchHandler({ handleSearchChange, searchableObjects, children }: Props) {
    const [searchTerms, setSearchTerms] = useState<SearchTerms>({});

    const updateSearchTerms = (property: string, value: any) => {
        const newSearchTerms: SearchTerms = { ...searchTerms };

        if (value === null || value === undefined || value === '') {
            delete newSearchTerms[property];
        } else {
            newSearchTerms[property] = value;
        }

        setSearchTerms(newSearchTerms);
    };

    useEffect(() => {
        let filteredObjects = searchableObjects;

        Object.keys(searchTerms).forEach((key) => {
            const value = searchTerms[key];
            filteredObjects = filteredObjects.filter(object => object[key].toLowerCase().includes(value.toLowerCase()));
        });

        handleSearchChange(filteredObjects);
    }, [searchableObjects, searchTerms]);

    const GetOptions = (property: string) => {
        return Array.from(new Set(searchableObjects.map((object) => object[property])));
    }

    return (
        <>
            {Children.map(children, (child: ReactNode) => {
                if (isValidElement(child)) {
                    return cloneElement(child, {
                        onInputChange: (property: string, value: any) => updateSearchTerms(property, value),
                        options: GetOptions(child.props["property"])
                    } as HTMLAttributes<HTMLElement>);
                }
                return child;
            })}
        </>
    );
}
