import Image from "next/image";
import ic_bold from "@/public/icons/ic_bold.svg";
import ic_bullet_list from "@/public/icons/ic_bullet_list.svg";
import ic_italic from "@/public/icons/ic_italic.svg";
import ic_number_list from "@/public/icons/ic_number_list.svg";
import ic_picture from "@/public/icons/ic_picture.svg";
import ic_underline from "@/public/icons/ic_underline.svg";
import ic_video from "@/public/icons/ic_video.svg";
import ic_link from "@/public/icons/ic_link.svg";

type ButtonProps = {
  onClick: () => void;
  active: boolean;
  iconName: keyof typeof icons;
  alt: string;
};

const icons = {
  bold: ic_bold,
  bullet_list: ic_bullet_list,
  italic: ic_italic,
  number_list: ic_number_list,
  picture: ic_picture,
  underline: ic_underline,
  video: ic_video,
  link: ic_link,
};

export default function Button({
  onClick,
  active,
  iconName,
  alt,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-6 w-6 items-center justify-center rounded-[5px] hover:bg-gray-200 ${active ? "bg-gray-300" : ""}`}
    >
      <Image
        className="h-6 w-6"
        src={icons[iconName]}
        alt={alt}
        width={24}
        height={24}
      />
    </button>
  );
}
