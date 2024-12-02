import Image from "next/image";
import userImageNull from "@/public/ic_image_null.svg";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import icCopy from "@/public/ic_copy.svg";
import Link from "next/link";
import { UserCardProps } from "../types/wikiListTypes";

export default function UserCard({ articles }: UserCardProps) {
  return (
    <div>
      {articles.map((article) => (
        <div className="relative" key={article.name}>
          <Link href={`/wiki/${article.name}`}>
            <article className="m-auto my-[24px] h-[150px] w-[340px] flex-col justify-between rounded-[25px] bg-[#fff] py-[24px] shadow-lg sm:flex md:h-[140px] md:w-[700px] md:flex-row lg:h-[140px] lg:w-[860px] lg:flex-row">
              <div className="flex">
                <Image
                  src={article.image ? article.image : userImageNull}
                  alt={article.image ? "유저 이미지" : "기본 유저 이미지"}
                  className="mx-[32px] rounded-full"
                  width={85}
                  height={85}
                  draggable="false"
                />
                <div>
                  <span className="gap-[14px] text-[24px] font-[600]">
                    {article.name}
                  </span>
                  <div className="text-[14px] font-[400] text-gray-400">
                    <span>{article.city}</span>
                    {article.city && article.nationality && (
                      <span>,&nbsp;</span>
                    )}
                    <span>{article.nationality}</span>
                    <br />
                    <span>{article.job}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
          <div className="absolute bottom-4 right-6">
            <CopyButton
              value={`${window.location.origin}/wiki/${article.name}`}
              timeout={2000}
            >
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "복사됨" : "복사"}
                  withArrow
                  position="right"
                  onClick={copy}
                >
                  <div
                    className="flex w-[150px] items-center rounded-[10px] bg-green-100 font-[400] text-green-200 md:w-[220px] md:text-14 lg:w-[220px] lg:text-14"
                    style={{ cursor: "pointer" }}
                  >
                    <ActionIcon
                      variant="gradient"
                      size="md"
                      aria-label="위키 복사 버튼"
                      gradient={{ from: "#EEF9F6", to: "#EEF9F6", deg: 90 }}
                    >
                      {copied ? (
                        <IconCheck style={{ width: 20, color: "#4CBFA4" }} />
                      ) : (
                        <Image
                          src={icCopy}
                          alt="링크 복사 아이콘"
                          style={{ width: 20 }}
                        />
                      )}
                    </ActionIcon>
                    <span className="truncate">{`${window.location.origin}/wiki/${article.name}`}</span>
                  </div>
                </Tooltip>
              )}
            </CopyButton>
          </div>
        </div>
      ))}
    </div>
  );
}
