import { Button, Flex, Textarea } from "@mantine/core";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import instance from "@/src/apis/axios";

interface WriteReplyProps {
  type: string;
  onUpdate: () => void;
  initialValue?: string;
  replyId?: number;
}

export default function WriteReply({
  type,
  onUpdate,
  replyId = 0,
  initialValue = "",
}: WriteReplyProps) {
  const [content, setContent] = useState(initialValue);
  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "edit") {
      await instance.patch(`/comments/${replyId}`, { content });
    }
    if (type === "submit") {
      await instance.post(`/articles/${id}/comments`, { content });
    }
    setContent("");
    onUpdate();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Flex className="relative">
        <Textarea
          name="content"
          variant="unstyled"
          size="md"
          mih={133}
          py={13}
          px={15}
          value={content}
          maxLength={500}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
          className="w-full rounded-[10px] bg-gray-50"
          styles={() => ({ input: { "--input-placeholder-color": "#8F95B2" } })}
        />
        <Flex
          justify="space-between"
          align="flex-end"
          className="absolute bottom-0 w-full px-[15px] py-[13px]"
        >
          <p className="text-14 text-gray-300">{content?.length} / 500</p>
          <Button
            type="submit"
            color="#4CBFA4"
            disabled={!content?.length}
            className="button"
          >
            댓글 등록
          </Button>
        </Flex>
      </Flex>
    </form>
  );
}

WriteReply.defaultProps = {
  initialValue: "",
  replyId: 0,
};
