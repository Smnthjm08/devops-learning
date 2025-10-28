import { Button } from "@workspace/ui/components/button";
import prisma from "@workspace/db";

export default async function Page() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  const data = await prisma.user.findMany();
  console.log("User data:", data);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
        <Button size="sm">Get started</Button>
      </div>
    </div>
  );
}
