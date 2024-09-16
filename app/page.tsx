"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DomainTable from '../components/DomainTable';
import SearchInput from '../components/SearchInput';

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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_PAGE_METRICS_COLLECTOR_API_URL}`, {
        params: { page, search },
        headers: { Authorization: `${process.env.NEXT_PUBLIC_PAGE_METRICS_COLLECTOR_API_KEY}`},
      });
      setDomains(response.data.data);
      setTotalPages(response.data.meta.last_page);
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
      <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] justify-center">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Page Rank Metrics Collector
            </h1>
            <SearchInput
                value={searchTerm}
                onChange={handleSearch}
            />
          {loading ? (
              <p>Loading...</p>
          ) : domains.length === 0 ? (
              <p>No data available.</p>
            ) : (
              <>
                <DomainTable domains={domains} />

                <div className="page-btns-wrapper mt-4 flex gap-4 justify-center w-full items-center">
                  <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-gray-200 rounded min-w-32"
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-gray-200 rounded min-w-32"
                  >
                    Next
                  </button>
                </div>
              </>
          )}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <p>&copy; {new Date().getFullYear()} Evaldas Vaitonis</p>
        </footer>
      </div>
  );
}