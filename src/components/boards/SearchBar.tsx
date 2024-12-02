import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button, TextInput } from "@mantine/core";
import Image from "next/image";
import searchIcon from "@/public/assets/ic_search.svg";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch(searchValue);
  };

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="mb-5 w-full rounded-md">
      <form className="flex flex-row items-center gap-[15px]">
        <TextInput
          leftSectionPointerEvents="none"
          leftSection={
            <Image src={searchIcon} alt="검색" width={22} height={22} />
          }
          variant="filled"
          placeholder="제목을 검색해주세요"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyPress={handleSearchEnter}
          size="md"
          className="w-full"
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[0],
              "--input-placeholder-color": theme.colors.gray[3],
            },
          })}
        />

        <Button
          className="h-[45px] w-[80px] rounded-md bg-green-200 text-[14px] text-white hover:bg-green-300"
          onClick={handleSearchClick}
        >
          검색
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
