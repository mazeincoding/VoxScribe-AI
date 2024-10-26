import { admin } from "@/firebase/admin";

export async function POST(req: Request) {
  const { token } = await req.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await admin
    .auth()
    .createSessionCookie(token, { expiresIn });
  return new Response(null, {
    headers: {
      "Set-Cookie": `session=${sessionCookie}; Path=/; HttpOnly; Secure`,
    },
  });
}
