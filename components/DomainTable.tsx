import React from 'react';

interface Domain {
    id: number;
    name: string;
    rank: number;
}

interface DomainTableProps {
    domains: Domain[];
}

const DomainTable: React.FC<DomainTableProps> = ({ domains }) => {
    return (
        <table className="table-auto border-collapse">
            <thead>
            <tr>
                <th className="border px-4 py-2">Domain Name</th>
                <th className="border px-4 py-2">Rank</th>
            </tr>
            </thead>
            <tbody>
            {domains.map((domain) => (
                <tr key={domain.id}>
                    <td className="border px-4 py-2">{domain.name}</td>
                    <td className="border px-4 py-2">{domain.rank}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DomainTable;
