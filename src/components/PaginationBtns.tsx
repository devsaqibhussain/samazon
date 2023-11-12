"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PaginationBtnsProps {
  currentPage: number;
  NumberOfPages: number;
}

const PaginationBtns = ({
  currentPage,
  NumberOfPages,
}: PaginationBtnsProps) => {
  const router = useRouter();

  const PageBtns: JSX.Element[] = [];
  for (let i = 1; i <= NumberOfPages; i++) {
    PageBtns.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return (
    <div className=" mt-10 flex w-full justify-center">

      <div className="join ">
        <Link
          href={`?page=${currentPage - 1}`}
          className={`btn join-item bg-base-100 ${
            currentPage === 1 && "btn-disabled"
          }`}
        >
          «
        </Link>
        <button className="btn join-item bg-base-100">Page # {currentPage}</button>
        <select
          defaultValue={currentPage}
          className=" rounded-none w-4 bg-base-100"
          onChange={(e) => {
            router.push(`?page=${parseInt(e.target.value)}`);
          }}
        >
          {PageBtns}
        </select>
        <Link
          href={`?page=${currentPage + 1}`}
          className={`btn join-item bg-base-100 ${
            currentPage === NumberOfPages && "btn-disabled"
          }`}
        >
          »
        </Link>
      </div>
    </div>
  );
};

export default PaginationBtns;
