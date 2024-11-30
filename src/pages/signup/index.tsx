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
import { SignUpFormData } from "@/src/types/userFormData";
import { signUpSchema } from "@/src/schema/userFormSchema";
import axios, { isAxiosError } from "@/src/apis/axios";
import { useAuth } from "@/src/contexts/AuthContext";
import getInputStyles from "@/src/utils/getInputStyles";
import NOTIFICATION_MESSAGES from "@/src/constants/signupMessage";
import showNotification from "@/src/utils/getNotification";

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

      showNotification(NOTIFICATION_MESSAGES.success);
      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = error.response?.data.message || "알 수 없는 오류";
        if (error.response?.status === 400) {
          showNotification(NOTIFICATION_MESSAGES.emailExists);
        } else {
          showNotification(NOTIFICATION_MESSAGES.error(errorMessage));
        }
      } else {
        showNotification(NOTIFICATION_MESSAGES.unexpectedError);
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
        회원가입
      </Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-0 flex w-[335px] flex-col gap-[24px] md:w-[400px]"
      >
        <TextInput
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          styles={(theme) =>
            getInputStyles("name", theme, errors, touchedFields)
          }
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
        <PasswordInput
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          {...register("passwordConfirmation")}
          styles={(theme) =>
            getInputStyles("passwordConfirmation", theme, errors, touchedFields)
          }
          error={errors.passwordConfirmation?.message}
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
