"use client";

import Image from "next/image";
import { RoundedButton } from "./Buttons.client";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import Link from "next/link";
import useActiveRoute from "@/hooks/useActiveRoute";

interface IProps {
  session: Session | null;
  children: React.ReactNode;
}

const Sidebar: React.FC<IProps> = ({ session, children }) => {
  const usersRouteActive = useActiveRoute("/users");
  const chatsRouteActive = useActiveRoute("/chats");

  return (
    <aside className="relative h-full w-[88px] border-r border-gray-200 px-2 py-2 md:w-[360px]">
      <div className="flex flex-col gap-3 md:px-2">
        <div className="flex justify-between md:gap-2">
          <Link
            href={"/users"}
            className={`${
              usersRouteActive
                ? "bg-gray-100 [&>svg]:fill-black"
                : "[&>svg]:fill-gray-600"
            } rounded-lg px-2 py-1 transition-colors hover:bg-gray-200 md:flex-1 [&>svg]:h-4 [&>svg]:hover:fill-black md:[&>svg]:mx-auto md:[&>svg]:h-6 `}
          >
            <svg
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="https://vecta.io/nano"
              fill="currentColor"
            >
              <path d="M7.25 12.305C7.25 16.207 9.446 18 12 18s4.75-1.793 4.75-5.695C16.75 9.123 14.75 7 12 7s-4.75 2.123-4.75 5.305zM15.082 21.607c.39-.423.262-1.13-.296-1.269A11.576 11.576 0 0012 20c-4.835 0-9 2.985-9 6.665C3 27.405 3.37 28 4.06 28h7.81c.66 0 1.13-.675 1.13-1.335 0-1.97.83-3.697 2.082-5.058zM19.25 12.305C19.25 16.207 21.446 18 24 18s4.75-1.793 4.75-5.695C28.75 9.123 26.75 7 24 7s-4.75 2.123-4.75 5.305zM33 26.665c0 .74-.37 1.335-1.06 1.335H16.06c-.69 0-1.06-.595-1.06-1.335C15 22.985 19.165 20 24 20s9 2.985 9 6.665z"></path>
            </svg>
          </Link>
          <Link
            href={"/chats"}
            className={`${
              chatsRouteActive
                ? "bg-gray-100 [&>svg]:fill-black"
                : "[&>svg]:fill-gray-600"
            } rounded-lg px-2 py-1 transition-colors hover:bg-gray-200 md:flex-1 [&>svg]:h-4 [&>svg]:hover:fill-black md:[&>svg]:mx-auto md:[&>svg]:h-6 `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="https://vecta.io/nano"
              viewBox="0 0 36 36"
            >
              <path
                clipRule="evenodd"
                d="M29 17.504c0 6.103-4.606 10.57-11 10.57-1.065 0-2.08-.095-3.032-.327a4.26 4.26 0 00-2.39.09L8.91 28.962c-.59.202-1.164-.372-.964-.985l.729-2.411a3.007 3.007 0 00-.291-2.5C7.414 21.484 7 19.596 7 17.504v-.002c0-6.103 4.607-10.498 11-10.498s11 4.395 11 10.498v.002z"
                fillRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="https://vecta.io/nano"
            viewBox="0 0 16 16"
            width={16}
            height={16}
          >
            <g fillRule="evenodd" transform="translate(-448 -544)">
              <g fillRule="nonzero">
                <path
                  d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                  transform="translate(448 544)"
                ></path>
                <path
                  d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                  transform="translate(448 544)"
                ></path>
              </g>
            </g>
          </svg>
          <input
            className="w-full bg-inherit placeholder:text-[#777]"
            placeholder="Search.."
          />
        </div>
      </div>

      {children}

      <div className="absolute inset-x-0 bottom-0 flex h-16 w-full items-center justify-center border-t bg-white p-5 shadow-md md:justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={session?.user.image ?? "/user.png"}
            alt={`${session?.user.name}'s picture`}
            width={40}
            height={40}
            className="mx-auto rounded-full md:m-0"
          />
          <div className="hidden flex-col text-sm md:flex ">
            <span>{session?.user.name}</span>
            <span className="text-gray-400">{session?.user.email}</span>
          </div>
        </div>
        <RoundedButton
          onClick={() => signOut()}
          title="Sign out"
          className="hidden md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="https://vecta.io/nano"
            viewBox="0 0 36 36"
            fill="currentColor"
            height={32}
            width={32}
          >
            <path d="M21.498 14.75a1 1 0 001-1V12a4 4 0 00-4-4h-6.5a4 4 0 00-4 4v12a4 4 0 004 4h6.5a4 4 0 004-4v-1.75a1 1 0 00-1-1h-.5a1 1 0 00-1 1V24a1.5 1.5 0 01-1.5 1.5h-6.5a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h6.5a1.5 1.5 0 011.5 1.5v1.75a1 1 0 001 1h.5z"></path>
            <path d="M14.498 16.75h9.752a.25.25 0 00.25-.25v-1.858a1 1 0 011.642-.766l4.002 3.356a1 1 0 010 1.532l-4.002 3.357a1 1 0 01-1.642-.767V19.5a.25.25 0 00-.25-.25h-9.752a1 1 0 01-1-1v-.5a1 1 0 011-1z"></path>
          </svg>
        </RoundedButton>
      </div>
    </aside>
  );
};

export default Sidebar;
