"use client";
import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ReactPaginate from "react-paginate";

export function Pagination({
  handlePageClick,
  handleCountChange,
  totalPageCount,
}: {
  handlePageClick: (e: any) => void;
  handleCountChange: (e: any) => void;
  totalPageCount: number;
}) {
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") as string;
  const page = searchParams.get("page") as string;

  return (
    <div className="flex flex-row-reverse gap-10 mt-10 items-center justify-between">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <IoIosArrowForward strokeWidth={2} className="h-4 w-4 ml-4" />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPageCount}
        previousLabel={
          <IoIosArrowBack strokeWidth={2} className="h-4 w-4 mr-4" />
        }
        renderOnZeroPageCount={null}
        className="flex flex-row w-fit items-center"
        pageClassName=" font-semibold"
        pageLinkClassName="!py-2 !px-3.5 hover:bg-gray-200 rounded-md"
        activeLinkClassName="bg-primary hover:!bg-primary text-white rounded-md"
        activeClassName="bg-primary"
        // initialPage={parseInt(page) - 1 || 0}
        forcePage={parseInt(page || "1") - 1}
      />
      {/* result per page selector */}
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-semibold">Result Per Page</p>
        <div className="relative inline-block">
          <select
            name="resultPerPage"
            defaultValue={parseInt(limit)}
            className="px-2 py-0.5 pr-8 rounded-md appearance-none bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleCountChange}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
        </div>
      </div>
    </div>
  );
}
