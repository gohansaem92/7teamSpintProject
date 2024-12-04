import UserCard from "@/src/components/WikiList/UserCard";
import instance from "@/src/apis/axios";
import Image from "next/image";
import { useState } from "react";
import { Article } from "@/src/types/wikiListTypes";
import Pagination from "@/src/components/Pagination";
import NoSearchImage from "@/public/img_no_search.webp";
import SearchForm from "@/src/components/WikiList/SearchForm";
import useDebounce from "@/src/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

async function fetchArticles(name: string, page: number) {
  const response = await instance.get(`/profiles`, {
    params: { name, page },
  });
  return response.data;
}

export default function WikiList() {
  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedValue = useDebounce(value, 500);

  const { data } = useQuery({
    queryKey: ["articles", debouncedValue, page],
    queryFn: () => fetchArticles(debouncedValue, page),
  });

  const articles: Article[] = data?.list || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / 3);

  return (
    <div className="m-auto mt-[40px] w-[350px] md:mt-[60px] md:w-[700px] lg:mt-[80px] lg:w-[860px]">
      <main>
        <div>
          <SearchForm
            value={value}
            setValue={setValue}
            page={page}
            setPage={setPage}
          />
          <section className="m-auto my-4 w-[340px] px-4 text-[16px] font-[400] text-gray-400 md:w-[700px] lg:w-[860px]">
            {debouncedValue && articles.length > 0 ? (
              <p>
                &quot;{debouncedValue}&quot;님을 총
                <span className="text-green-200">&nbsp;{articles.length}</span>
                명 찾았습니다.
              </p>
            ) : (
              <br />
            )}
          </section>
        </div>
        <section className="my-20 h-[470px]">
          {articles.length > 0 ? (
            articles.map((article) => (
              <UserCard key={article.id} articles={[article]} />
            ))
          ) : (
            <div>
              <div className="flex justify-center py-[32px] text-[18px] font-[500] text-gray-400 md:text-[20px] lg:text-[20px]">
                <div className="flex-none">&quot;</div>
                <div className="max-w-[100px] flex-none truncate md:max-w-[200px] lg:max-w-[350px]">
                  {debouncedValue}
                </div>
                <div className="flex-none">
                  &quot;과&#47;와 일치하는 검색 결과가 없어요.
                </div>
              </div>
              <div className="m-auto w-[100px] md:w-[144px] lg:w-[144px]">
                <Image
                  src={NoSearchImage}
                  alt="검색 결과 없음 이미지"
                  draggable="false"
                />
              </div>
            </div>
          )}
        </section>
        <footer>
          {articles.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          ) : (
            <br />
          )}
        </footer>
      </main>
    </div>
  );
}
