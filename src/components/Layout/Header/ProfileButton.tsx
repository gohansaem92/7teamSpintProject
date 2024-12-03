import Image from "next/image";
import Link from "next/link";
import { Group, Menu } from "@mantine/core";
import IcoProfile from "@/public/assets/ic_profile.svg";
import IcoBurger from "@/public/assets/ic_burger.svg";

type HandleLogoutProps = {
  handleLogout: () => void;
};

export default function ProfileButton({ handleLogout }: HandleLogoutProps) {
  return (
    <Menu width={120} position="bottom" radius="md" shadow="md" withinPortal>
      <Menu.Target>
        <Group>
          <Group hiddenFrom="sm">
            <Image
              src={IcoBurger}
              width={24}
              height={24}
              alt="메뉴"
              className="cursor-pointer"
            />
          </Group>
          <Group visibleFrom="sm">
            <Image
              src={IcoProfile}
              width={32}
              height={32}
              alt="프로필"
              className="cursor-pointer"
            />
          </Group>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item hiddenFrom="sm">
          <Link
            href="/wikilist"
            className="flex justify-center p-2 text-14 text-gray-800"
          >
            위키 목록
          </Link>
        </Menu.Item>
        <Menu.Item hiddenFrom="sm">
          <Link
            href="/boards"
            className="flex justify-center p-2 text-14 text-gray-800"
          >
            자유게시판
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            href="/mypage"
            className="flex justify-center p-2 text-14 text-gray-800"
          >
            마이페이지
          </Link>
        </Menu.Item>
        <Menu.Item onClick={handleLogout}>
          <Link
            href="/"
            className="flex justify-center p-2 text-14 text-gray-800"
          >
            로그아웃
          </Link>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
