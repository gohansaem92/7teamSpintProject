import WriteBoard from "@/src/components/WriteBoard";
import { Button, Flex, Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "@/src/apis/axios";

export default function AddBoard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [values, setValues] = useState({
    title: "",
    content: "",
    writer: "",
    updatedAt: "",
  });

  const handleLoad = async () => {
    setLoading(true);
    try {
      const userRes = await instance.get("/users/me");
      setValues((prevValue) => ({
        ...prevValue,
        writer: userRes.data.name,
        updatedAt: new Date().toLocaleDateString(),
      }));
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("알 수 없는 에러가 발생했습니다."));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    content: string;
    image?: string;
  }) => {
    setLoading(true);
    try {
      await instance.post("/articles", data);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("알 수 없는 에러가 발생했습니다."));
      }
    } finally {
      setLoading(false);
      router.push("/boards");
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  if (loading) {
    return (
      <Flex
        justify="center"
        align="center"
        mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}
      >
        <Loader size="md" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        direction="column"
        justify="center"
        align="center"
        mih={{ base: "calc(100vh - 60px)", sm: "calc(100vh - 80px)" }}
      >
        <p className="text-red-200">{error?.message}</p>
        <Button
          href="/boards"
          component={Link}
          variant="outline"
          color="#4CBFA4"
          mt={4}
        >
          목록으로
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <WriteBoard
        type="create"
        initialValues={values}
        onSubmit={handleSubmit}
      />
      <Flex justify="center" h={50}>
        <Button
          href="/boards"
          component={Link}
          variant="outline"
          w={140}
          h={{ base: 40, sm: 45 }}
          color="#4CBFA4"
          px={40}
        >
          목록으로
        </Button>
      </Flex>
    </Flex>
  );
}
