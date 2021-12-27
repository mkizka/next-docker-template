import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      {status == "loading" ? (
        <p>読み込み中...</p>
      ) : !session ? (
        <>
          サインインしてください。 <br />
          <Button onClick={() => signIn("google")}>Sign in</Button>
        </>
      ) : (
        <>
          サインイン完了。 email: {session.user?.email} <br />
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      )}
    </>
  );
}
