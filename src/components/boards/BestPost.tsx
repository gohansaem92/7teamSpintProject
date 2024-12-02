import React from "react";
import { Card, Group, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import indexImage from "@/public/assets/img_card_section.png";
import heart from "@/public/assets/ic_heart.svg";
import { Post } from "@/src/types/boardTypes";
import formatDateToCustom from "@/src/utils/formatDate";
import "@mantine/carousel/styles.css";

interface Props {
  bestPosts: Post[];
}

function BestPosts({ bestPosts }: Props) {
  return (
    <div className="mb-8">
      {/* Desktop view */}
      <div className="hidden grid-cols-2 gap-4 md:grid lg:grid-cols-4">
        {bestPosts.map((post) => (
          <Card
            key={post.id}
            shadow="sm"
            radius="md"
            className="h-[200px] w-full md:aspect-[3/2] md:h-full lg:h-[200px] lg:w-[250px]"
            component="a"
            href={`/boards/${post.id}`}
            target="_self"
            style={{ boxShadow: " 0px 4px 20px 0px #00000014" }}
          >
            <Card.Section className="relative h-full">
              <div className="flex h-full items-center justify-center">
                <div className="relative h-[131px] w-[250px] md:h-full md:w-full lg:h-[131px] lg:w-[250px]">
                  <Image
                    src={post.image ? post.image.src : indexImage}
                    alt={post.image ? post.image.alt : "기본 이미지"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-md"
                  />
                </div>
              </div>
            </Card.Section>
            <Text fw={600} mt={11} className="text-16 leading-6 text-gray-800">
              {" "}
              {post.title}
            </Text>
            <Group justify="space-between">
              <Group justify="space-between" gap={8}>
                <Text fw={500} className="text-12 text-gray-400">
                  {post.writer.name}
                </Text>
                <Text fw={500} className="text-12 text-gray-400">
                  {formatDateToCustom(post.createdAt)}
                </Text>
              </Group>
              <Text fw={500} className="flex gap-1 text-12 text-gray-400">
                <Image src={heart} alt="좋아요" width={18} height={18} />{" "}
                {post.likeCount}개
              </Text>
            </Group>
          </Card>
        ))}
      </div>

      {/* Mobile view */}

      <Carousel
        slideSize={250}
        height={200}
        align="start"
        slideGap="md"
        withControls={false}
        className="md:hidden lg:hidden"
      >
        {bestPosts.map((post) => (
          <Carousel.Slide key={post.id}>
            <Card
              shadow="sm"
              radius="md"
              className="h-[200px] w-[250px]"
              component="a"
              href="/boards"
              target="_self"
              style={{ boxShadow: " 0px 4px 20px 0px #00000014" }}
            >
              <Card.Section className="relative h-[131px]">
                <div className="flex h-full items-center justify-center">
                  <div className="relative h-[131px] w-[250px] sm:h-[131px] sm:w-[302px] md:h-[131px] md:w-[250px]">
                    <Image
                      src={post.image ? post.image.src : indexImage}
                      alt={post.image ? post.image.alt : "기본 이미지"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-md"
                    />
                  </div>
                </div>
              </Card.Section>
              <Text
                fw={600}
                mt={11}
                className="text-16 leading-6 text-gray-800"
              >
                {" "}
                {post.title}
              </Text>
              <Group justify="space-between">
                <Group justify="space-between" gap={8}>
                  <Text fw={500} className="text-12 text-gray-400">
                    {post.writer.name}
                  </Text>
                  <Text fw={500} className="text-12 text-gray-400">
                    {formatDateToCustom(post.createdAt)}
                  </Text>
                </Group>
                <Text fw={500} className="flex gap-1 text-12 text-gray-400">
                  <Image src={heart} alt="좋아요" width={18} height={18} />{" "}
                  {post.likeCount}개
                </Text>
              </Group>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default BestPosts;
