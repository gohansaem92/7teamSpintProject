import axios, { isAxiosError } from "@/src/apis/axios";
import { loginSchema } from "@/src/schema/userFormSchema";
import { LoginFormData } from "@/src/types/userFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/src/contexts/AuthContext";
import getInputStyles from "@/src/utils/getInputStyles";
import showNotification from "@/src/utils/getNotification";
import NOTIFICATION_MESSAGES from "@/src/constants/notificationMessage";

export default function LogIn() {
  const router = useRouter();
  const { setLoggedIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post("auth/signIn", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setLoggedIn(true);
        router.push("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data.message || "알 수 없는 오류";
        if (error.response?.status === 400) {
          showNotification(NOTIFICATION_MESSAGES.signin.invalidCredentials);
        } else {
          showNotification(
            NOTIFICATION_MESSAGES.signin.genericError(errorMessage),
          );
        }
      } else {
        showNotification(NOTIFICATION_MESSAGES.signin.unexpectedError);
      }
    }
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
        로그인
      </Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-0 flex w-[335px] flex-col gap-[24px] md:w-[400px]"
      >
        <TextInput
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          {...register("email")}
          styles={(theme) =>
            getInputStyles("email", theme, errors, touchedFields)
          }
          error={errors.email?.message}
          required
          variant="filled"
        />
        <PasswordInput
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
          styles={(theme) =>
            getInputStyles("password", theme, errors, touchedFields)
          }
          error={errors.password?.message}
          required
          variant="filled"
        />
        <Button
          type="submit"
          disabled={!isValid}
          fullWidth
          mt={16}
          size="md"
          color="green.1"
          radius="md"
          c="white"
          className="button"
        >
          로그인
        </Button>
        <Flex justify="center" gap={10} mt={10}>
          <Link href="/signup" passHref>
            <Text size="sm" c="green.1" style={{ cursor: "pointer" }}>
              회원가입
            </Text>
          </Link>
        </Flex>
      </form>
    </div>
  );
}
