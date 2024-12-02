import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import UnderLine from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Button, Divider, Flex, Input, useMatches } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
import MenuBar from "@/src/components/AddBoard/Menubar";

const INITIAL_VALUES = {
  title: "",
  content: "",
  writer: "",
  updatedAt: "",
};

export const WriteBoardType = {
  Create: "create",
  Edit: "edit",
};

type WriteBoardProps = {
  onSubmit: (data: {
    title: string;
    content: string;
    image?: string;
  }) => Promise<void>;
  type: (typeof WriteBoardType)[keyof typeof WriteBoardType];
  initialValues: {
    title: string;
    content: string;
    writer: string;
    updatedAt: Date | string;
  };
};

function extractTextFromHTML(htmlString: string | undefined) {
  const regex = /<[^>]*>/g;
  const pureText = htmlString?.replace(regex, "");
  return pureText ?? "";
}

export default function WriteBoard({
  onSubmit,
  type = WriteBoardType.Create,
  initialValues = INITIAL_VALUES,
}: WriteBoardProps) {
  const [values, setValues] = useState({
    title: initialValues.title,
    content: initialValues.content,
    writer: initialValues.writer,
    updatedAt: initialValues.updatedAt,
  });
  const [titleImage, setTitleImage] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(
    initialValues.title === "" && initialValues.content === "",
  );
  const [length, setLength] = useState<number | undefined>(
    extractTextFromHTML(initialValues.content).length ?? 0,
  );
  const [lengthExceptSpace, setLengthExceptSpace] = useState<
    number | undefined
  >(extractTextFromHTML(initialValues.content).replace(/ /g, "").length);
  const inputSize = useMatches({
    base: "md",
    sm: "xl",
  });
  const editor = useEditor({
    extensions: [
      Image,
      UnderLine,
      TextStyle,
      Link.configure({
        openOnClick: true,
        autolink: true,
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "본문을 입력해주세요.",
      }),
    ],
    content: values.content,
    onUpdate: () => {
      setLength(extractTextFromHTML(editor?.getHTML()).length);
      setLengthExceptSpace(
        extractTextFromHTML(editor?.getHTML()).replace(/ /g, "").length,
      );
      setSubmitDisabled(editor?.getText() === "" || values.title.length === 0);
      setValues((prevValues) => ({
        ...prevValues,
        content: editor?.getHTML() || "",
      }));
    },
  });

  if (!editor) {
    return null;
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({ ...prevValues, title: e.target.value }));
    setSubmitDisabled(
      values.content.length === 0 || e.target.value.length === 0,
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit({
      title: values.title,
      content: values.content,
      image: titleImage === "" ? undefined : titleImage,
    });

    setValues({
      title: INITIAL_VALUES.title,
      content: INITIAL_VALUES.content,
      writer: INITIAL_VALUES.writer,
      updatedAt: INITIAL_VALUES.updatedAt,
    });
    editor.commands.clearContent();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center align-middle">
        <Flex
          direction="column"
          w={{ base: "100%", lg: 1060 }}
          mih={{ base: "calc(100vh - 130px)", sm: "calc(89vh - 130px)" }}
          pt={46}
          pb={30}
          px={30}
          mx={{ base: 0, sm: 60, lg: 0 }}
          my={{ base: 0, sm: "5.5vh" }}
          className="rounded-[10px] bg-white md:drop-shadow-md"
        >
          <h2 className="order-1 text-16 font-semibold text-gray-800 md:text-20 lg:text-24">
            {type === "edit" ? "게시물 수정하기" : "게시물 등록하기"}
          </h2>
          <Box my={24} className="order-3">
            <p className="text-12 text-gray-400 md:text-16">
              <strong className="mr-2 font-normal">{values.writer}</strong>
              <strong className="font-normal">
                {values.updatedAt instanceof Date
                  ? values.updatedAt.toLocaleDateString()
                  : new Date(values.updatedAt).toLocaleDateString()}
              </strong>
            </p>
          </Box>
          <Divider color="#E4E5F0" className="order-4" />
          <Flex align="center" className="order-5">
            <Input
              variant="unstyled"
              size={inputSize}
              value={values.title}
              maxLength={30}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요."
              className="flex-shrink flex-grow text-16 placeholder-gray-400 md:text-20"
            />
            <Flex className="flex-shrink-0 flex-grow-0">
              <span>{values.title.length}</span>
              <span>/</span>
              <span className="text-green-600">30</span>
            </Flex>
          </Flex>
          <Divider color="#E4E5F0" className="order-6" />
          <Flex
            direction="column"
            py={{ base: 16, sm: 20 }}
            flex="auto"
            className="order-7"
          >
            <p className="flex-shrink-0 flex-grow-0 text-gray-900">
              <span>공백포함 : 총 {length}자</span>
              <span aria-hidden="true"> | </span>
              <span>공백제외 : 총 {lengthExceptSpace}자</span>
            </p>
            <Flex
              direction="column"
              pt={{ base: 16, sm: 20 }}
              className="flex-shrink flex-grow"
            >
              <Flex className="flex-shrink flex-grow">
                <EditorContent
                  editor={editor}
                  content={values.content}
                  placeholder="본문을 입력해주세요."
                  className="w-full"
                />
              </Flex>
              <Flex
                bg="white"
                justify={{ base: "center", sm: "flex-start" }}
                className="sticky bottom-8 flex-shrink-0 flex-grow-0 rounded-full border"
              >
                <MenuBar editor={editor} setTitleImage={setTitleImage} />
              </Flex>
            </Flex>
          </Flex>
          <Flex className="order-2 self-end">
            <Button
              type="submit"
              className="button"
              w={{ base: 90, sm: 140 }}
              h={{ base: 40, sm: 45 }}
              color="#4CBFA4"
              mt={-31}
              disabled={submitDisabled}
            >
              {type === WriteBoardType.Edit ? "수정하기" : "등록하기"}
            </Button>
          </Flex>
        </Flex>
      </div>
    </form>
  );
}
