import IcoBurger from "@/public/assets/ic_burger.svg";
import ImgLogo from "@/public/assets/img_logo.webp";
import { Group, Menu } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import { notifications } from "@mantine/notifications";
import { useAuth } from "@/src/contexts/AuthContext";
import EditNotification from "@/src/components/Layout/Header/NotificationButton";
import ProfileButton from "@/src/components/Layout/Header/ProfileButton";

export default function Header() {
  const queryClient = useQueryClient();
  const { loggedIn, setLoggedIn } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
    notifications.show({
      color: "green.2",
      title: "로그아웃",
      message: "",
      autoClose: 2000,
      withCloseButton: true,
    });
    queryClient.removeQueries();
  };

  return (
    <div className="h-[60px] md:h-[80px]">
      <header className="fixed z-10 h-[60px] w-full bg-white px-[20px] drop-shadow-md md:h-[80px] md:px-[80px]">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image
                src={ImgLogo}
                width={107}
                height={30}
                alt="로고"
                priority
              />
            </Link>
            <Group h="100%" gap={40} visibleFrom="sm">
              <Link href="/wikilist" className="text-14 text-gray-800">
                위키목록
              </Link>
              <Link href="/boards" className="text-14 text-gray-800">
                자유게시판
              </Link>
            </Group>
          </Group>

          {loggedIn ? (
            <Group>
              <EditNotification />
              <ProfileButton handleLogout={handleLogout} />
            </Group>
          ) : (
            <>
              <Group visibleFrom="sm">
                <Link href="/login" className="text-sm text-gray-400">
                  로그인
                </Link>
              </Group>
              <Group hiddenFrom="sm">
                <Menu
                  width={120}
                  position="bottom"
                  radius="md"
                  shadow="md"
                  withinPortal
                >
                  <Menu.Target>
                    <Image
                      src={IcoBurger}
                      width={24}
                      height={24}
                      alt="메뉴"
                      className="cursor-pointer"
                    />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Link
                        href="/wikilist"
                        className="flex justify-center p-2 text-14 text-gray-800"
                      >
                        위키 목록
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="/boards"
                        className="flex justify-center p-2 text-14 text-gray-800"
                      >
                        자유게시판
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link
                        href="/login"
                        className="flex justify-center p-2 text-14 text-gray-800"
                      >
                        로그인
                      </Link>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </>
          )}
        </Group>
      </header>
    </div>
  );
}
