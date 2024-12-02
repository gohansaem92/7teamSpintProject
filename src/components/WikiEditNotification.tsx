import {
  Box,
  Text,
  Dialog,
  Flex,
  CloseButton,
  ScrollArea,
} from "@mantine/core";
import { NotiData } from "@/src/types/NotificationResponse";
import { isAxiosError } from "axios";
import axiosInstance from "@/src/apis/axios";
import formatTimeAgo from "@/src/utils/formatTimeAgo";

type EditNotificationProps = {
  opened: boolean;
  notiData: NotiData;
};

export default function EditNotification({
  opened,
  notiData,
}: EditNotificationProps) {
  const deleteNotiData = async (id: number) => {
    try {
      const res = await axiosInstance.delete(`notifications/${id}`);
      if (res.status === 200) {
        // TODO: 테스트용 추후 삭제 예정
        // eslint-disable-next-line no-console
        console.log("noti 삭제 성공");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          // TODO: 테스트용 추후 삭제 예정
          // eslint-disable-next-line no-console
          console.log(error.response?.data.message);
        } else if (error.response?.status === 401) {
          // TODO: 테스트용 추후 삭제 예정
          // eslint-disable-next-line no-console
          console.log(error.response.data.message);
        } else if (error.response?.status === 403) {
          // TODO: 테스트용 추후 삭제 예정
          // eslint-disable-next-line no-console
          console.log(error.response.data.message);
        } else if (error.response?.status === 404) {
          // TODO: 테스트용 추후 삭제 예정
          // eslint-disable-next-line no-console
          console.log(error.response?.data.message);
        }
      }
    }
  };

  return (
    <Dialog
      opened={opened}
      position={{ top: "8%", right: "8%" }}
      style={{ backgroundColor: "#CBC9CF", padding: 20 }}
    >
      <Flex justify="space-between" align="center">
        <Text>알림 {notiData.totalCount}개</Text>
      </Flex>
      <ScrollArea
        h={notiData.totalCount === 1 ? 100 : 205}
        offsetScrollbars
        scrollbars="y"
      >
        <Flex direction="column" align="center" gap="8">
          {notiData.totalCount > 0 ? (
            notiData.list.map((list) => (
              <Box
                key={list.id}
                className="relative flex h-[98px] w-full flex-col items-start justify-around rounded-[5px] bg-white px-[12px] py-[16px]"
              >
                <CloseButton
                  size="sm"
                  style={{ position: "absolute", top: 5, right: 5 }}
                  onClick={() => {
                    deleteNotiData(list.id);
                  }}
                />
                <Text
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "22px",
                    color: "#1B1B1B",
                  }}
                >
                  {list.content}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    lineHeight: "16px",
                    color: "#A4A1AA",
                  }}
                >
                  {formatTimeAgo(list.createdAt)}
                </Text>
              </Box>
            ))
          ) : (
            <Box className="flex h-[200px] w-full flex-col items-center justify-center">
              <Text>알림이 없습니다</Text>
            </Box>
          )}
        </Flex>
      </ScrollArea>
    </Dialog>
  );
}
