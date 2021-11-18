import { signIn, signOut, useSession } from "next-auth/client";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {loading ? (
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
