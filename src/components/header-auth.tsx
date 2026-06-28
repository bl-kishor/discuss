"use client";

import {
  NavbarItem,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = "";
  } else {
    if (session?.data?.user) {
      authContent = (
        <NavbarItem>
          <Popover placement="left">
            <PopoverTrigger>
              <Avatar src={session.data.user.image || ""} />
            </PopoverTrigger>
            <PopoverContent>
              <div className="p-4">
                <form action={actions.signOut}>
                  <Button type="submit">Sign Out</Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
      );
    } else {
      authContent = (
        <>
          <NavbarItem>
            <form action={actions.signIn}>
              <Button color="secondary" type="submit" variant="bordered">
                Sign In
              </Button>
            </form>
          </NavbarItem>
          <NavbarItem>
            <form action={actions.signIn}>
              <Button color="primary" type="submit" variant="flat">
                Sign Up
              </Button>
            </form>
          </NavbarItem>
        </>
      );
    }
  }
  return authContent;
}
