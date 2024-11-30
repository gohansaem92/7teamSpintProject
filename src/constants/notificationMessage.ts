const NOTIFICATION_MESSAGES = {
  signup: {
    success: {
      title: "회원가입 성공!",
      message: "가입이 완료되었습니다! 😊",
      color: "green.2",
    },
    emailExists: {
      title: "회원가입 실패!",
      message: "이미 존재하는 이메일입니다! 🤥",
      color: "red.1",
    },
    error: (message: string) => ({
      title: "회원가입 실패!",
      message: `오류가 발생했습니다: ${message}`,
      color: "red.1",
    }),
    unexpectedError: {
      title: "회원가입 실패!",
      message: "예기치 않은 오류가 발생했습니다. 다시 시도해주세요.🤥",
      color: "red.1",
    },
  },
  signin: {
    invalidCredentials: {
      title: "로그인 실패!",
      message: "이메일 또는 비밀번호가 일치하지 않습니다. 🤥",
      color: "red.1",
    },
    genericError: (message: string) => ({
      title: "로그인 실패!",
      message: `오류가 발생했습니다: ${message}`,
      color: "red.1",
    }),
    unexpectedError: {
      title: "로그인 실패!",
      message: "예기치 않은 오류가 발생했습니다. 다시 시도해주세요. 🤥",
      color: "red.1",
    },
  },
};

export default NOTIFICATION_MESSAGES;
