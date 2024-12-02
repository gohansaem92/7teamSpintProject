import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .min(2, "이름을 입력해주세요")
    .max(10, "10자 이하로 작성해주세요")
    .regex(
      /^[^\d!@#$%^&*(),.?":{}|<>]*$/,
      "이름에 숫자나 특수문자가 포함될 수 없습니다",
    ),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("이메일 형식으로 작성해 주세요"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "8자 이상 입력해주세요"),
  passwordConfirmation: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "8자 이상 입력해주세요"),
  currentPassword: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(8, "8자 이상 입력해주세요"),
  securityQuestion: z.string().min(1, "질문을 입력해주세요"),
  securityAnswer: z.string().min(1, "답변을 입력해주세요"),
});

const loginSchema = baseSchema.pick({ email: true, password: true });

const signUpSchema = baseSchema
  .pick({ name: true, email: true, password: true, passwordConfirmation: true })
  .refine((data) => data.passwordConfirmation === data.password, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });

const accountSettingSchema = baseSchema
  .pick({ password: true, passwordConfirmation: true, currentPassword: true })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });

const wikiCreateSchema = baseSchema.pick({
  securityQuestion: true,
  securityAnswer: true,
});

export { loginSchema, signUpSchema, accountSettingSchema, wikiCreateSchema };
