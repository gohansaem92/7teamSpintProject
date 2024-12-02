import searchIcon from "@/public/ic_search.svg";
import Image from "next/image";
import { SearchPros } from "../../types/wikiListTypes";

export default function SearchForm({
  value,
  setValue,
  page,
  setPage,
}: SearchPros) {
  return (
    <section className="align-center mx-[20px] flex justify-center">
      <div className="relative w-[340px] md:w-[700px] lg:w-[860px]">
        <input
          type="text"
          name="위키 검색"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (page > 1) {
              setPage(1);
            }
          }}
          placeholder="이름으로 위키 찾기"
          className="m-auto h-[45px] w-full rounded-[20px] bg-gray-100 py-[20px] pl-[50px] pr-[15px] outline-none"
        />
        <div className="absolute left-[20px] top-1/2 -translate-y-1/2 transform">
          <Image
            src={searchIcon}
            alt="검색 아이콘"
            width={22}
            height={22}
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
