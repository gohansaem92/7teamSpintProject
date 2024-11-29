// NotificationContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axiosInstance from "@/src/apis/axios";
import { NotiData } from "@/src/types/NotificationResponse";
import { useAuth } from "@/src/contexts/AuthContext";

type NotificationContextType = {
  notiData: NotiData;
  fetchNotifications: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notiData, setNotiData] = useState<NotiData>({
    totalCount: 0,
    list: [],
  });
  const { loggedIn } = useAuth();

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("notifications?pageSize=3");
      if (res.status === 200) {
        setNotiData(res.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      fetchNotifications();
    }
  }, [loggedIn]);

  const value = useMemo(() => ({ notiData, fetchNotifications }), [notiData]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within a NotificationProvider");
  return context;
};
