import React from "react";
import Image from "next/image";
import leftArrow from "@/public/ic_left_arrow.svg";
import rightArrow from "@/public/ic_right_arrow.svg";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageButtons = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`h-[45px] w-[45px] rounded-[10px] text-gray-400 shadow-lg focus:text-green-200 ${currentPage === i ? "font-[700] text-green-200" : ""}`}
        type="button"
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="mt-4 flex justify-center gap-3">
      <div className="relative h-[45px] w-[45px]">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="h-[45px] w-[45px] rounded-[10px] text-gray-400 shadow-lg focus:text-green-200"
          type="button"
        >
          <div className="absolute left-2 top-3">
            <Image
              src={leftArrow}
              alt="이전 화살표"
              width={24}
              height={24}
              draggable="false"
            />
          </div>
        </button>
      </div>
      {pageButtons}
      <div className="relative h-[45px] w-[45px]">
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="h-[45px] w-[45px] rounded-[10px] text-gray-400 shadow-lg focus:text-green-200"
          type="button"
        >
          <div className="absolute right-2 top-3">
            <Image
              src={rightArrow}
              alt="다음 화살표"
              width={24}
              height={24}
              draggable="false"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
