import { Editor } from "@tiptap/react";
import { v4 as uuidv4 } from "uuid";
import axios from "@/src/apis/axios";
import { notifications } from "@mantine/notifications";
import { useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import Button from "./WikiEditorButton";
import Dropdown from "./HeadingsDropdown";
import SetLinkModal from "./SetLinkModal";

type EditorMenuProps = {
  editor: Editor;
  title: string;
};

export default function EditorMenu({ editor, title }: EditorMenuProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [opened, { open: openLinkModal, close: closeLinkModal }] = useDisclosure(false);

  if (!editor) {
    return null;
  }

  const headingOptions = [
    { id: uuidv4(), label: "본문", action: () => editor.chain().focus().setParagraph().run(), active: editor.isActive("paragraph") },
    { id: uuidv4(), label: "인용구", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
    { id: uuidv4(), label: "제목1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
    { id: uuidv4(), label: "제목2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { id: uuidv4(), label: "제목3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
    { id: uuidv4(), label: "제목4", action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), active: editor.isActive("heading", { level: 4 }) },
  ];

  const handleInputImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(`/images/upload`, formData);
        if (response) {
          editor.chain().focus().setImage({ src: response.data.url }).run();
        } else {
          notifications.show({
            title: "이미지 업로드 실패",
            message: "이미지 저장 중 오류가 발생했습니다.",
            color: "red",
          });
        }
      } catch (error) {
        notifications.show({
          title: "이미지 업로드 실패",
          message: "이미지 저장 중 오류가 발생했습니다.",
          color: "red",
        });
      }
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSetLink = (url: string) => {
    if (url) {
      const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
      editor.chain().focus().extendMarkRange("link").setLink({ href: validUrl }).run();
    }
  };

  return (
    <div className="scrollbar-hide relative flex h-[60px] items-center justify-between gap-5 overflow-y-hidden overflow-x-scroll rounded-[20px] bg-gray-100 px-5 py-[18px] shadow-lg shadow-gray-200">
      <div className="hidden min-w-[60px] truncate leading-none xl:block xl:text-20 xl:font-semibold">{title}</div>
      <div className="flex w-[1120px] items-center gap-5">
        {/* note 글자모양 */}
        <Button onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} iconName="bold" alt="글자굵게" />
        <Button onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} iconName="italic" alt="글자기울임꼴" />
        <Button onClick={() => editor.chain().focus().toggleMark("underline").run()} active={editor.isActive("underline")} iconName="underline" alt="글자밑줄" />
        <div className="h-6 w-0 border-[1px] border-gray-200" />
        {/* note 단락 */}
        <Dropdown title="단락" options={headingOptions} />
        <Button onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} iconName="bullet_list" alt="글머리기호" />
        <Button onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} iconName="number_list" alt="글머리번호" />
        <Button onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} iconName="justify" alt="일반정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} iconName="left" alt="왼쪽정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} iconName="center" alt="가운데정렬" />
        <Button onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} iconName="right" alt="오른쪽정렬" />
        <div className="h-6 w-0 border-[1px] border-gray-200" />
        {/* note 기타기능 */}
        <label htmlFor="image">
          <Button onClick={openFileInput} active={false} iconName="picture" alt="이미지삽입" />
          <input ref={fileInputRef} id="image" name="image" type="file" accept="image/*" className="hidden" onChange={handleInputImage} />
        </label>
        {/* <Button onClick={() => {}} active={false} iconName="video" alt="비디오삽입" /> */}
        <Button onClick={openLinkModal} active={false} iconName="link" alt="링크삽입" />
      </div>
      <SetLinkModal opened={opened} onClose={closeLinkModal} setLink={handleSetLink} />
    </div>
  );
}
