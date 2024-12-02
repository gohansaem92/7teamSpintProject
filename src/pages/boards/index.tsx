import React, { useEffect, useState } from "react";
import { Container, Title, Button, Flex, Loader } from "@mantine/core";
import Pagination from "@/src/components/Pagination";
import PostListTable from "@/src/components/boards/PostListTable";
import BestPosts from "@/src/components/boards/BestPost";
import SearchBar from "@/src/components/boards/SearchBar";
import SortDropdown from "@/src/components/boards/SortDropdown";
import indexImage from "@/public/assets/img_card_section.png";
import instance from "@/src/apis/axios";
import { Post } from "@/src/types/boardTypes";

function PostPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [bestLoading, setBestLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await instance.get(`/articles`, {
          params: {
            page: currentPage,
            pageSize: 10,
            orderBy: sortBy,
            keyword: searchTerm,
          },
        });
        if (Array.isArray(response.data.list)) {
          setPosts(response.data.list);
          setTotalCount(response.data.totalCount);
        } else {
          // NOTE: 배열이 아닐시 에러 출력
          // eslint-disable-next-line no-console
          console.error("API did not return an array");
        }
      } catch (error) {
        // NOTE: API 응답 실패시 에러 출력
        // eslint-disable-next-line no-console
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [currentPage, sortBy, searchTerm]);

  useEffect(() => {
    async function fetchBestPosts() {
      try {
        const response = await instance.get(`/articles`, {
          params: {
            page: 1,
            pageSize: 4,
            orderBy: "like",
          },
        });
        if (Array.isArray(response.data.list)) {
          setBestPosts(
            response.data.list.map((post: Post) => ({
              ...post,
              image: {
                src: post.image || indexImage,
                alt: post.image ? "업로드 이미지" : "기본 이미지",
              },
            })),
          );
        } else {
          // NOTE: 배열이 아닐시 에러 출력
          // eslint-disable-next-line no-console
          console.error("API did not return an array");
        }
      } catch (error) {
        // NOTE: API 응답 실패시 에러 출력
        // eslint-disable-next-line no-console
        console.error("Error fetching best posts:", error);
      } finally {
        setBestLoading(false);
      }
    }
    fetchBestPosts();
  }, []);

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const sortType = event.currentTarget.getAttribute("data-sort");

    if (sortType) {
      setSortBy(sortType);
      setCurrentPage(1);
    }
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / 10);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <Flex
        justify="center"
        align="center"
        mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}
      >
        <Loader size="md" />
      </Flex>
    );
  }
  return (
    <Container className="align-center mx-[20px] mb-[120px] mt-[40px] min-w-[335px] max-w-screen-lg flex-col px-0 md:mx-[60px] md:mt-[60px] lg:mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <Title className="text-left text-[24px] font-semibold leading-[32px] text-gray-800 md:text-32">
          베스트 게시글
        </Title>
        <Button
          className="h-[45px] w-[130px] rounded-md bg-green-200 text-14 text-white hover:bg-green-300 md:w-[145px]"
          onClick={() => {
            window.location.href = "/addboard";
          }}
        >
          게시물 등록하기
        </Button>
      </div>
      {bestLoading ? (
        <div>Loading best posts...</div>
      ) : (
        <BestPosts bestPosts={bestPosts} />
      )}
      <div className="mb-8 gap-2.5 md:flex">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown sortBy={sortBy} onSort={handleSort} />
      </div>
      <PostListTable posts={posts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </Container>
  );
}

export default PostPage;
