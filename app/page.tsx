"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Domain {
  id: number;
  name: string;
  rank: number;
}

export default function Home() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);

  // Fetch domain data from API
  const fetchDomains = async (page: number, search: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/domains", {
        params: { page, search },
        headers: { Authorization: `12345` },
      });
      setDomains(response.data.data); // Assuming API response has data object
      setTotalPages(response.data.meta.last_page); // Assuming total pages in meta
      console.log(response);
    } catch (error) {
      console.error("Error fetching domains", error);
    }
    setLoading(false);
  };

  // Fetch domains when the page or search term changes
  useEffect(() => {
    fetchDomains(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
              className="dark:invert"
              src="https://nextjs.org/icons/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
          />

          <input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4 p-2 border rounded"
          />

          {loading ? (
              <p>Loading...</p>
          ) : (
              <>
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

                <div className="mt-4 flex gap-4">
                  <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-gray-200 rounded"
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-gray-200 rounded"
                  >
                    Next
                  </button>
                </div>
              </>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="https://nextjs.org/icons/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Learn
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="https://nextjs.org/icons/window.svg"
                alt="Window icon"
                width={16}
                height={16}
            />
            Examples
          </a>
        </footer>
      </div>
  );
}
