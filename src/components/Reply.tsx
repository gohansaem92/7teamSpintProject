import { ActionIcon, Button, Flex, Modal } from "@mantine/core";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ImgUser from "@/public/assets/user.svg";
import IcoPencil from "@/public/assets/ic_pencil.svg";
import IcoBin from "@/public/assets/ic_bin.svg";
import instance from "../apis/axios";
import WriteReply from "./WriteReply";

export interface ReplyType {
  writer: {
    image: string;
    name: string;
    id: number;
  };
  updatedAt: Date;
  content: string;
  id: number;
}

export default function Reply({
  reply,
  isMine,
  onUpdate,
}: {
  reply: ReplyType;
  isMine: boolean;
  onUpdate: () => void;
}) {
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [onEdit, setOnEdit] = useState(false);
  const [replyContent] = useState(reply?.content);

  const handleDelete = async () => {
    await instance.delete(`/comments/${reply.id}`);
    onUpdate();
    closeDeleteModal();
  };

  return (
    <>
      <Flex
        w="100%"
        gap={{ base: 15, sm: 20 }}
        px={{ base: 20, sm: 30 }}
        py={{ base: 16, sm: 22 }}
        className="rounded-[10px] bg-white drop-shadow-md"
      >
        <Flex align="flex-start">
          <Flex w={{ base: 40, sm: 50 }} h={{ base: 40, sm: 50 }}>
            <Image
              src={ImgUser}
              overrideSrc={reply?.writer?.image}
              style={{
                width: "100%",
              }}
              className="rounded-full"
              alt="유저 프로필"
            />
          </Flex>
        </Flex>
        <Flex
          direction="column"
          gap={{ base: 0, sm: 6 }}
          className="flex-shrink flex-grow"
        >
          <Flex justify="space-between">
            <strong className="text-16 text-gray-800 md:text-18">
              {reply?.writer?.name}
            </strong>
            <Flex gap={{ base: 15, sm: 20 }}>
              {isMine && (
                <>
                  <ActionIcon variant="transparent" aria-label="수정하기">
                    <Image
                      src={IcoPencil}
                      width={24}
                      height={24}
                      alt="아이콘"
                      aria-hidden="true"
                      onClick={() => {
                        setOnEdit(!onEdit);
                      }}
                    />
                  </ActionIcon>
                  <ActionIcon
                    variant="transparent"
                    aria-label="삭제하기"
                    onClick={openDeleteModal}
                  >
                    <Image
                      src={IcoBin}
                      width={24}
                      height={24}
                      alt="아이콘"
                      aria-hidden="true"
                    />
                  </ActionIcon>
                </>
              )}
            </Flex>
          </Flex>
          {onEdit ? (
            <WriteReply
              type="edit"
              replyId={reply.id}
              onUpdate={onUpdate}
              initialValue={replyContent}
            />
          ) : (
            <p className="text-14 text-gray-800 md:text-16">{reply?.content}</p>
          )}
          <span className="mt-[4px] text-12 text-gray-400 md:text-14">
            {new Date(reply?.updatedAt).toLocaleDateString()}
          </span>
        </Flex>
      </Flex>
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        size="xs"
        centered
      >
        <Flex direction="column" align="center" gap={40}>
          <p>정말 삭제하시겠습니까?</p>
          <Flex gap={10}>
            <Button
              type="submit"
              color="#4CBFA4"
              className="button"
              onClick={handleDelete}
            >
              삭제하기
            </Button>
            <Button
              variant="outline"
              color="#4CBFA4"
              onClick={closeDeleteModal}
            >
              취소하기
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
