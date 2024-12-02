import React, { useState } from "react";
import { Button, Text } from "@mantine/core";
import Image from "next/image";
import bottomArrow from "../../../public/assets/ic_bottom_arrow.svg";
import upArrow from "../../../public/assets/ic_up_arrow.svg";

interface SortDropdownProps {
  onSort: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sortBy: string;
}

function SortDropdown({ onSort, sortBy }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenToggle();
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleOpenToggle}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className="flex h-[45px] w-full items-center justify-between rounded-md border border-none bg-gray-100 px-5 py-[14px] text-center text-14 font-normal leading-[24px] text-gray-500 md:w-[140px]"
      >
        <Text>{sortBy === "recent" ? "최신순" : "좋아요순"}</Text>
        {!isOpen ? (
          <Image src={bottomArrow} alt="검색" width={22} height={22} />
        ) : (
          <Image src={upArrow} alt="검색" width={22} height={22} />
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-[140px] rounded-md border border-none bg-gray-100 p-1 text-14">
          <Button
            variant="transparent"
            data-sort="recent"
            onClick={(event) => {
              onSort(event);
              handleOpenToggle();
            }}
            className="h-[45px] w-[100%] rounded-md border border-none bg-gray-100 text-center text-14 font-normal text-gray-500 hover:text-green-200"
          >
            최신순
          </Button>
          <Button
            variant="transparent"
            data-sort="like"
            onClick={(event) => {
              onSort(event);
              handleOpenToggle();
            }}
            className="h-[45px] w-[100%] rounded-md border border-none bg-gray-100 text-center text-14 font-normal text-gray-500 hover:text-green-200"
          >
            좋아요순
          </Button>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
