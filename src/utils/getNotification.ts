import { notifications } from "@mantine/notifications";

type NotificationData = {
  color: string;
  title: string;
  message: string;
};

const showNotification = ({ color, title, message }: NotificationData) => {
  notifications.show({
    color,
    title,
    message,
    autoClose: 1500,
    withCloseButton: true,
  });
};

export default showNotification;
