"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const useActiveRoute = (pathname:string) => {
  const [isActive, setIsActive] = useState(false);

  const currentPathname = usePathname();

  useMemo(
    () =>
      currentPathname?.startsWith(pathname) || currentPathname?.includes(pathname)
        ? setIsActive(true)
        : setIsActive(false),
    [currentPathname, pathname]
  );

  return isActive;
};

export default useActiveRoute;
