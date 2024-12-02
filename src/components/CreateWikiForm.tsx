import { useForm } from "react-hook-form";
import { TextInput, Button, Flex } from "@mantine/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { wikiCreateSchema } from "@/src/schema/userFormSchema";
import { WikiCreateFormData } from "@/src/types/userFormData";
import axios, { isAxiosError } from "@/src/apis/axios";
import { notifications } from "@mantine/notifications";

export default function CreateWikiForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<WikiCreateFormData>({
    resolver: zodResolver(wikiCreateSchema),
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

  const onSubmit = async (data: WikiCreateFormData) => {
    try {
      await axios.post("profiles", {
        securityQuestion: data.securityQuestion,
        securityAnswer: data.securityAnswer,
      });
      showNotification(
        "위키 생성 완료",
        "나만의 위키가 생성 되었습니다!",
        "green.2",
      );
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          showNotification(
            "위키 생성 실패",
            `${error.response?.data.message}`,
            "red.1",
          );
        } else {
          showNotification("위키 생성 실패", "알 수 없는 오류", "red.1");
        }
      } else {
        showNotification(
          "위키 생성 실패",
          "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥",
          "red.1",
        );
      }
    }
  };

  const getInputStyles = (fieldName: keyof WikiCreateFormData) => {
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
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-0 flex w-[335px] flex-col gap-[8px] border-t-2 border-gray-200 py-[32px] md:w-[400px]"
      >
        <TextInput
          id="securityQuestion"
          label="위키 생성하기"
          placeholder="질문을 입력해주세요"
          {...register("securityQuestion")}
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
              ...getInputStyles("securityQuestion"),
            },
          })}
          error={errors.securityQuestion?.message}
          variant="filled"
        />
        <TextInput
          id="securityAnswer"
          placeholder="답을 입력해주세요"
          {...register("securityAnswer")}
          styles={(theme) => ({
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("securityAnswer"),
            },
          })}
          error={errors.securityAnswer?.message}
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
            생성하기
          </Button>
        </Flex>
      </form>
    </div>
  );
}
