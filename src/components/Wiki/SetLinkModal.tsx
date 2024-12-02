import { Button, Modal, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

type SetLinkModalProps = {
  opened: boolean;
  onClose: () => void;
  setLink: (value: string) => void;
};

export default function SetLinkModal({
  opened,
  onClose,
  setLink,
}: SetLinkModalProps) {
  const [url, setUrl] = useState<string>("");

  const handleSetUrl = () => {
    if (url) {
      setLink(url);
      onClose();
      setLink("");
    } else {
      notifications.show({
        title: "정보없음",
        message: "링크를 입력해주세요",
        color: "yellow",
      });
    }
  };
  return (
    <Modal
      title="링크를 입력해주세요"
      opened={opened}
      onClose={onClose}
      size="sm"
      centered
      padding={20}
      radius={10}
      transitionProps={{
        transition: "fade",
        duration: 200,
        timingFunction: "linear",
      }}
    >
      <TextInput
        onChange={(event) => setUrl(event.currentTarget.value)}
        value={url}
        placeholder="www.example.com"
        styles={(theme) => ({
          input: {
            borderRadius: "10px",
            borderWidth: "1px",
            height: "34px",
            backgroundColor: theme.colors.gray[0],
            "--input-bd-focus": theme.colors.green[2],
            "--input-placeholder-color": theme.colors.gray[3],
            marginTop: "4px",
          },
        })}
        variant="filled"
        data-autofocus
      />
      <div className="mt-4 flex justify-center gap-2">
        <Button
          type="button"
          onClick={handleSetUrl}
          color="green.1"
          style={(theme) => ({
            width: "65px",
            height: "40px",
            border: "solid",
            borderWidth: "1px",
            borderColor: theme.colors.green[1],
          })}
        >
          확인
        </Button>
        <Button
          type="button"
          onClick={onClose}
          color="white"
          style={(theme) => ({
            width: "65px",
            height: "40px",
            border: "solid",
            borderWidth: "1px",
            borderColor: theme.colors.green[1],
            color: theme.colors.green[1],
            "--button-hover": theme.colors.green[0],
          })}
        >
          취소
        </Button>
      </div>
    </Modal>
  );
}
