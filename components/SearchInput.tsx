import React from 'react';

interface SearchInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Search domains..."
            value={value}
            onChange={onChange}
            className="mb-4 p-2 border rounded"
        />
    );
};

export default SearchInput;
