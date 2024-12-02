import { z } from "zod";
import {
  loginSchema,
  signUpSchema,
  accountSettingSchema,
  wikiCreateSchema,
} from "@/src/schema/userFormSchema";

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type AccountSettingFormData = z.infer<typeof accountSettingSchema>;
export type WikiCreateFormData = z.infer<typeof wikiCreateSchema>;
