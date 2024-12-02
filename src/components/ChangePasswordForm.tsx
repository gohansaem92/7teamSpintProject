import { useForm } from "react-hook-form";
import { PasswordInput, Button, Title, Flex } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSettingSchema } from "@/src/schema/userFormSchema";
import { AccountSettingFormData } from "@/src/types/userFormData";
import axios, { isAxiosError } from "@/src/apis/axios";
import { notifications } from "@mantine/notifications";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<AccountSettingFormData>({
    resolver: zodResolver(accountSettingSchema),
    mode: "all",
  });

  const showNotification = (title: string, message: string, color: string) => {
    notifications.show({
      color,
      title,
      message,
      autoClose: 1500,
      withCloseButton: true,
    });
  };

  const onSubmit = async (data: AccountSettingFormData) => {
    try {
      await axios.patch("users/me/password", {
        currentPassword: data.currentPassword,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      showNotification("변경 완료", "비밀번호가 변경되었습니다", "green.2");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          showNotification(
            "변경 실패",
            `${error.response?.data.message}`,
            "red.1",
          );
        } else {
          showNotification("변경 실패", "알 수 없는 오류", "red.1");
        }
      } else {
        showNotification(
          "변경 실패",
          "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥",
          "red.1",
        );
      }
    }
  };

  const getInputStyles = (fieldName: keyof AccountSettingFormData) => {
    if (errors[fieldName]) {
      return {
        borderColor: "#D14343",
        backgroundColor: "#ffcdd2",
        "--input-placeholder-color": "#D14343",
      };
    }
    if (touchedFields[fieldName]) {
      return {
        borderColor: "#4CBFA4",
        backgroundColor: "#EEF9F6",
        "--input-placeholder-color": "#4CBFA4",
      };
    }
    return {
      "--input-placeholder-color": "#8F95B2",
    };
  };

  return (
    <div className="mt-[100px] flex flex-col items-center">
      <Title order={1} mb={32} size={24} c="gray.4">
        계정 설정
      </Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-0 flex w-[335px] flex-col gap-[8px] py-[32px] md:w-[400px]"
      >
        <PasswordInput
          id="currentPassword"
          label="기존 비밀번호"
          placeholder="기존 비밀번호"
          {...register("currentPassword")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[4],
              marginBottom: 10,
            },
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("currentPassword"),
            },
          })}
          error={errors.currentPassword?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="password"
          placeholder="새 비밀번호"
          {...register("password")}
          styles={(theme) => ({
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("password"),
            },
          })}
          error={errors.password?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="passwordConfirmation"
          placeholder="새 비밀번호 확인"
          {...register("passwordConfirmation")}
          styles={(theme) => ({
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("passwordConfirmation"),
            },
          })}
          error={errors.passwordConfirmation?.message}
          required
          variant="filled"
        />
        <Flex justify="flex-end">
          <Button
            type="submit"
            disabled={!isValid}
            w="89"
            color="green.1"
            radius="md"
            c="white"
          >
            변경하기
          </Button>
        </Flex>
      </form>
    </div>
  );
}
