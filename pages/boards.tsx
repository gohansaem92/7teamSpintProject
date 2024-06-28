import React, { useEffect, useState } from "react";
import { Container, Title, Button } from "@mantine/core";
import Pagination from "@/src/components/boards/Pagination";
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
        // NOTE: 데이터 전송 확인
        // eslint-disable-next-line no-console
        console.log(response.data);
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
        // NOTE: 데이터 전송 확인
        // eslint-disable-next-line no-console
        console.log("Best posts response:", response.data);
        if (Array.isArray(response.data.list)) {
<<<<<<< HEAD
          setBestPosts(
            response.data.list.map((post: Post) => ({
              ...post,
              image: { src: post.image || indexImage, alt: post.image ? "업로드 이미지" : "기본 이미지" },
            })),
          );
=======
          setBestPosts(response.data.list);
>>>>>>> epic/post-list-page
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

  const handleSortLatest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSortBy("recent");
  };

  const handleSortPopular = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSortBy("like");
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalCount / 10);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
<<<<<<< HEAD
    <Container className="align-center mx-[20px] min-w-[335px] max-w-screen-lg flex-col sm:mx-[60px] lg:mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <Title className="text-left text-[24px] font-semibold leading-40 text-gray-800 sm:text-32">베스트 게시글</Title>
        <Button className="h-[45px] w-[130px] rounded-md bg-green-200 text-14 text-white sm:w-[145px]" onClick={() => {}}>
=======
    <Container className="min-w-screen-sm align-center mx-auto max-w-screen-lg flex-col">
      <div className="mb-10 flex items-center justify-between">
        <Title className="text-left text-32 font-semibold leading-40 text-gray-800">베스트 게시글</Title>
        <Button className="h-[45px] w-[160px] rounded-md bg-green-200 text-14 text-white" onClick={() => {}}>
>>>>>>> epic/post-list-page
          게시물 등록하기
        </Button>
      </div>
      {bestLoading ? <div>Loading best posts...</div> : <BestPosts bestPosts={bestPosts} />}
<<<<<<< HEAD
      <div className="mb-8 gap-2.5 sm:flex">
=======
      <div className="mb-8 flex w-full justify-between gap-2.5">
>>>>>>> epic/post-list-page
        <SearchBar onSearch={handleSearch} />
        <SortDropdown sortBy={sortBy} onSortLatest={handleSortLatest} onSortPopular={handleSortPopular} />
      </div>
      <PostListTable posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
    </Container>
  );
}

export default PostPage;
