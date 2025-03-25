import { auth } from "@/lib/auth";
import LoginGoogle from "./components/login-google";
import SplitContainer from "./components/split-container";
import prisma from "@/lib/prisma";
import { User, ProjectInfo } from "@prisma/client";

const fetchProjectInfo = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const dbUser: User | null = await prisma.user.findUnique({
      where: {
          email: session.user.email!,
      },
  });

  const masterId = await prisma.listInfo.findFirst({
      where: {
        userId: dbUser!.id,
        type: "master",
      },
      orderBy: {
        date: 'desc'
      }
  }).then((list) => list?.id);

  const master = await prisma.projectInfo.findMany({
    where: {
      listId: masterId
    }
  });

  const dailyId = await prisma.listInfo.findFirst({
    where: {
      userId: dbUser!.id,
      type: "daily",
      date: new Date()
    }
  }).then((list) => list?.id);

  const daily = await prisma.projectInfo.findMany({
    where: {
      listId: dailyId
    }
  });
  
  return [master, daily];
};

const Page = async () => {
    const lists = await fetchProjectInfo();
    if (lists === null) {
      return <div className="w-full h-full flex flex-col items-center justify-center">
        <LoginGoogle/>
      </div>
    } else {
      return <SplitContainer lists={lists}/>
    }
};

export default Page;