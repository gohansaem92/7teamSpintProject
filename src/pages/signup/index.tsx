import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, TextInput, PasswordInput, Button, Title, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData } from "@/src/types/userFormData";
import { signUpSchema } from "@/src/schema/userFormSchema";
import axios, { isAxiosError } from "@/src/apis/axios";
import { useAuth } from "@/src/contexts/AuthContext";

export default function SignUp() {
  const router = useRouter();
  const { setLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
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

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await axios.post("auth/signUp", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });

      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      setLoggedIn(true);

      showNotification("회원가입 성공!", "가입이 완료되었습니다! 😊", "green.2");
      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 400) {
          showNotification("회원가입 실패!", "이미 존재하는 이메일입니다! 🤥", "red.1");
        } else {
          showNotification("회원가입 실패!", `오류가 발생했습니다: ${error.response?.data.message || "알 수 없는 오류"}`, "red.1");
        }
      } else {
        showNotification("회원가입 실패!", "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥", "red.1");
      }
    }
  };

  const getInputStyles = (fieldName: keyof SignUpFormData) => {
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="mt-[100px] flex flex-col items-center">
      <Title order={1} mb={32} size={24} c="gray.4">
        회원가입
      </Title>
      <form onSubmit={handleSubmit(onSubmit)} className="my-0 flex w-[335px] flex-col gap-[24px] md:w-[400px]">
        <TextInput
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("name"),
            },
          })}
          error={errors.name?.message}
          required
          variant="filled"
        />
        <TextInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
            input: {
              height: "45px",
              borderRadius: "10px",
              marginBottom: 10,
              backgroundColor: theme.colors.gray[0],
              "--input-bd-focus": theme.colors.green[1],
              ...getInputStyles("email"),
            },
          })}
          error={errors.email?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
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
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordConfirmation")}
          styles={(theme) => ({
            label: {
              fontSize: 14,
              fontWeight: 400,
              color: theme.colors.gray[3],
              marginBottom: 10,
            },
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
        <Button type="submit" disabled={!isValid} fullWidth mt={16} size="md" color="green.1" radius="md" c="white" className="button">
          가입하기
        </Button>
        <Flex justify="center" gap={10} mt={10}>
          <Text size="sm" c="gray.3">
            이미 회원이신가요?
          </Text>
          <Link href="/login" passHref>
            <Text size="sm" c="green.1" style={{ cursor: "pointer" }}>
              로그인하기
            </Text>
          </Link>
        </Flex>
      </form>
    </div>
  );
}
