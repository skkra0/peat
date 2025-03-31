'use server'
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProjectInfo, User } from "@prisma/client";

export const fetchProjectInfo = async () => {
    const session = await auth();
    if (!session?.user) {
      throw new Error("Not authenticated");
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
  
    const master = masterId !== undefined ? await prisma.projectInfo.findMany({
      where: {
        listId: masterId
      }
    }) : [];
  
    const dailyId = await prisma.listInfo.findFirst({
      where: {
        userId: dbUser!.id,
        type: "daily",
        // date: new Date()
      }
    }).then((list) => list?.id);
  
    const daily = dailyId !== undefined ? await prisma.projectInfo.findMany({
      where: {
        listId: dailyId
      }
    }) : [];
    
    return [master, daily];
};
  
export const updateProjectInfo = async (project: ProjectInfo) => {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const dbUser: User | null = await prisma.user.findUnique({
        where: {
            email: session.user.email!,
        },
    });

    if (!dbUser) {
        throw new Error("User not found");
    }

    const projectInfo = await prisma.projectInfo.findUnique({
        where: {
            id: project.id,
        },
    });

    if (!projectInfo) {
        throw new Error("Project not found");
    }

    const foundUserId = await prisma.listInfo.findUnique({
        where: {
            id: projectInfo.listId,
        },
    }).then((list) => list?.userId);

    if (foundUserId !== dbUser.id) {
        throw new Error("Unauthorized");
    }
    await prisma.projectInfo.update({
        where: {
            id: project.id,
        },
        data: {
            title: project.title,
            items: [...project.items],
            finished: [...project.finished],
        }
    });
}