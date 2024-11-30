import { FieldErrors, FieldValues } from "react-hook-form";

export default function getInputStyles<T extends FieldValues>(
  fieldName: keyof T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any,
  errors: FieldErrors<T>,
  touchedFields: Partial<Record<keyof T, boolean>>,
) {
  let borderColor = theme.colors.gray[0];
  let backgroundColor = theme.colors.gray[0];
  let placeholderColor = "#8F95B2";

  if (errors[fieldName]) {
    borderColor = "#D14343";
    backgroundColor = "#ffcdd2";
    placeholderColor = "#D14343";
  } else if (touchedFields[fieldName]) {
    borderColor = "#4CBFA4";
    backgroundColor = "#EEF9F6";
    placeholderColor = "#4CBFA4";
  }

  return {
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
      backgroundColor,
      borderColor,
      "--input-placeholder-color": placeholderColor,
      "--input-bd-focus": theme.colors.green[1],
    },
  };
}
