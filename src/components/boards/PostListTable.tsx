import React from "react";
import { Post } from "@/src/types/boardTypes";
import formatDateToCustom from "@/src/utils/formatDate";
import Image from "next/image";
import heart from "@/public/assets/ic_heart.svg";

interface Props {
  posts: Post[];
}

function PostListTable({ posts }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="mb-8 min-w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <thead className="hidden border-b border-gray-200 bg-gray-100 md:table-header-group">
          <tr className="text-16 font-normal text-gray-400">
            <th className="w-12 px-2 py-3 text-center font-normal md:w-[100px]">
              번호
            </th>
            <th className="w-64 px-4 py-3 text-center font-normal">제목</th>
            <th className="w-16 px-2 py-3 text-center font-normal md:w-[110px]">
              작성자
            </th>
            <th className="px-2 py-3 text-center font-normal md:w-[100px]">
              좋아요
            </th>
            <th className="w-24 px-2 py-3 text-center font-normal">작성일자</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-16 font-normal text-gray-800">
          {posts.map((post) => (
            <tr
              key={post.id}
              onClick={() => {
                window.location.href = `/boards/${post.id}`;
              }}
              className="cursor-pointer"
            >
              <td className="hidden px-3 py-3 text-center md:table-cell">
                {post.id}
              </td>
              <td className="px-3 py-3">
                <div className="md:text-center">{post.title}</div>
                <div className="mt-1 flex justify-between text-sm text-gray-600 md:hidden">
                  <div className="flex gap-2">
                    <span>{post.writer.name}</span>
                    <span>{formatDateToCustom(post.createdAt)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Image src={heart} alt="좋아요" width={18} height={18} />
                    <span>{post.likeCount}</span>
                  </div>
                </div>
              </td>
              <td className="hidden px-3 py-3 text-center md:table-cell">
                {post.writer.name}
              </td>
              <td className="hidden px-3 py-3 text-center md:table-cell">
                {post.likeCount}
              </td>
              <td className="hidden px-3 py-3 text-center md:table-cell">
                {formatDateToCustom(post.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostListTable;
