import IcoBurger from "@/public/assets/ic_burger.svg";
import ImgLogo from "@/public/assets/img_logo.webp";
import { Box, Group, Menu, ThemeIcon } from "@mantine/core";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import IcoProfile from "@/public/assets/ic_profile.svg";
import IcoAlarm from "@/public/assets/ic_alarm.svg";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { isAxiosError } from "axios";
import axiosInstance from "@/src/apis/axios";
import { NotiData } from "@/src/types/NotificationResponse";
import WikiEditNotification from "@/src/components/WikiEditNotification";
import { useAuth } from "@/src/contexts/AuthContext";

export default function Header() {
  const { loggedIn, setLoggedIn } = useAuth();
  const [notiData, setNotiData] = useState<NotiData>({
    totalCount: 0,
    list: [
      {
        createdAt: "",
        content: "",
        id: 0,
      },
    ],
  });
  const [opened, { open: openNoti, close: closeNoti }] = useDisclosure(false);

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
  };

  const activeNoti = () => {
    if (opened) {
      closeNoti();
    } else {
      openNoti();
    }
  };

  useEffect(() => {
    // Noti 데이터를 가져오는 함수
    const getNotiData = async () => {
      try {
        const res = await axiosInstance.get("notifications?pageSize=3");
        if (res.status === 200) {
          setNotiData(res.data);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            window.location.href = "/";
          } else if (error.response?.status === 401) {
            window.location.href = "/";
          }
        }
      }
    };

    // 로그인 상태 여부를 확인하는 과정
    const accessToken = localStorage.getItem("accessToken");
    // 1. 로컬 스토리지에 엑세스 토큰을 가져와 할당
    if (accessToken) {
      // 2. 엑세스 토큰이 존재하면 로그인 상태를 true로 변경
      setLoggedIn(true);
      getNotiData();
      // 2.2 엑세스 토큰이 존재하면 Noti 데이터 가져오는 함수 호출
    } else {
      // 3. 엑세스 토큰이 존재하지 않으면 로그인 상태를 false로 변경
      setLoggedIn(false);
    }
  }, [loggedIn, setLoggedIn]);

  // eslint-disable-next-line no-console
  console.log(loggedIn);

  return (
    <div className="h-[60px] md:h-[80px]">
      <header className="fixed z-10 h-[60px] w-full bg-white px-[20px] drop-shadow-md md:h-[80px] md:px-[80px]">
        <Group justify="space-between" h="100%">
          <Group justify="space-between" gap={40} h="100%">
            <Link href="/">
              <Image src={ImgLogo} width={107} height={30} alt="로고" priority />
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
            <Menu width={120} position="bottom" radius="md" shadow="md" withinPortal>
              <Group>
                <Group>
                  <Box style={{ position: "relative" }} onClick={activeNoti}>
                    <Image src={IcoAlarm} width={32} height={32} alt="알림" className="cursor-pointer" />
                    <Box>
                      {notiData.totalCount > 0 ? (
                        <ThemeIcon radius="xl" size="xs" color="red" style={{ position: "absolute", top: 0, left: 15, fontSize: 12 }}>
                          {notiData.totalCount}
                        </ThemeIcon>
                      ) : null}
                    </Box>
                  </Box>
                </Group>
                <Menu.Target>
                  <Group>
                    <Group hiddenFrom="sm">
                      <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                    </Group>
                    <Group visibleFrom="sm">
                      <Image src={IcoProfile} width={32} height={32} alt="프로필" className="cursor-pointer" />
                    </Group>
                  </Group>
                </Menu.Target>
              </Group>

              <Menu.Dropdown>
                <Menu.Item hiddenFrom="sm">
                  <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                    위키 목록
                  </Link>
                </Menu.Item>
                <Menu.Item hiddenFrom="sm">
                  <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                    자유게시판
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/mypage" className="flex justify-center p-2 text-14 text-gray-800">
                    마이페이지
                  </Link>
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>
                  <Link href="/" className="flex justify-center p-2 text-14 text-gray-800">
                    로그아웃
                  </Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <>
              <Group visibleFrom="sm">
                <Link href="/login" className="text-sm text-gray-400">
                  로그인
                </Link>
              </Group>
              <Group hiddenFrom="sm">
                <Menu width={120} position="bottom" radius="md" shadow="md" withinPortal>
                  <Menu.Target>
                    <Image src={IcoBurger} width={24} height={24} alt="메뉴" className="cursor-pointer" />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>
                      <Link href="/wikilist" className="flex justify-center p-2 text-14 text-gray-800">
                        위키 목록
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link href="/boards" className="flex justify-center p-2 text-14 text-gray-800">
                        자유게시판
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <Link href="/login" className="flex justify-center p-2 text-14 text-gray-800">
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
      <WikiEditNotification opened={opened} notiData={notiData} />
    </div>
  );
}
