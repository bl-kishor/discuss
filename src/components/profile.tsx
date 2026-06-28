"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  if (session?.data) {
    return <div>User Logged in client{JSON.stringify(session.data.user)}</div>;
  } else {
    return <div>User logged out in client</div>;
  }
}
