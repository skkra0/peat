'use server'
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ProjectInfo, User, ListInfo } from "@prisma/client";

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
  
    let masterList = await prisma.listInfo.findFirst({
        where: {
          userId: dbUser!.id,
          type: "master",
        },
        orderBy: {
          date: 'desc'
        }
    });
    
    if (!masterList) {
      masterList = await addListInfo({
        id: -1,
        type: "master",
        userId: dbUser!.id,
        date: new Date()
      });
    }
  
    const masterId = masterList!.id;

    const master = await prisma.projectInfo.findMany({
      where: {
        listId: masterId
      }
    });
  
    let dailyList = await prisma.listInfo.findFirst({
      where: {
        userId: dbUser!.id,
        type: "daily",
      },
      orderBy: {
        date: 'desc'
      }
    });

    if (!dailyList) {
      dailyList = await addListInfo({
        id: -1,
        type: "daily",
        userId: dbUser!.id,
        date: new Date()
      });
    }
    const dailyId = dailyList!.id;
  
    const daily = await prisma.projectInfo.findMany({
      where: {
        listId: dailyId
      }
    });
    
    return [{
      id: masterId,
      list: master
    },
    {
      id: dailyId,
      list: daily
    }];
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

    if (project.key) {
      const linkedProjectInfo = await prisma.projectInfo.findUnique({
        where: {
          id: project.key,
        }
      });
      if (!linkedProjectInfo) {
        throw new Error("Linked project not found");
      }

      const foundUserId = await prisma.listInfo.findUnique({
        where: {
          id: linkedProjectInfo.listId,
        },
      }).then((list) => list?.userId);

      if (foundUserId !== dbUser.id) {
        throw new Error("Unauthorized");
      }

      await prisma.projectInfo.update({
        where: {
          id: project.key,
        },
        data: {
          title: project.title,
          items: [...project.items],
          finished: [...project.finished],
        }
      });
    }
}

export const addProjectInfo = async (project: ProjectInfo) => {
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

  const projectInfo = await prisma.projectInfo.create({
    data: {
      title: project.title,
      items: [...project.items],
      finished: [...project.finished],
      listId: project.listId,
    }
  });
  return projectInfo;
}

export const addListInfo = async (list: ListInfo) => {
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

  const listInfo = await prisma.listInfo.create({
    data: {
      type: list.type,
      userId: dbUser.id,
      date: list.date,
    }
  });
  return listInfo;
}

export const deleteProjectInfo = async (project: ProjectInfo) => {
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

  if (project.key) {
    const linkedProjectInfo = await prisma.projectInfo.findUnique({
      where: {
        id: project.key,
      }
    });
    if (!linkedProjectInfo) {
      throw new Error("Linked project not found");
    }
    const foundUserId = await prisma.listInfo.findUnique({
      where: {
        id: linkedProjectInfo.listId,
      },
    }).then((list) => list?.userId);
    if (foundUserId !== dbUser.id) {
      throw new Error("Unauthorized");
    }

    await prisma.projectInfo.update({
        where: {
            id: project.key,
        },
        data: {
            key: null,
        }
    });
  }


  await prisma.projectInfo.delete({
      where: {
          id: project.id,
      },
  });
}

export const createLinkedProjectInfo = async (project: ProjectInfo, listId: number) => {
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

  const existingProject = await prisma.projectInfo.findUnique({
      where: {
          id: project.id,
      },
  });
  
  if (!existingProject) {
      throw new Error("Project not found");
  } else if (existingProject.key) {
      throw new Error("Project already linked");
  } else if (existingProject.listId === listId) {
      throw new Error("Project already in this list");
  }

  const foundUserId = await prisma.listInfo.findUnique({
      where: {
          id: existingProject.listId,
      },
  }).then((list) => list?.userId);

  if (foundUserId !== dbUser.id) {
      throw new Error("Unauthorized");
  }

  const foundUserId2 = await prisma.listInfo.findUnique({
      where: {
          id: listId,
      },
  }).then((list) => list?.userId);
  if (foundUserId2 !== dbUser.id) {
      throw new Error("Unauthorized");
  }

  const linkedProjectInfo = await prisma.projectInfo.create({
      data: {
          key: project.id,
          title: project.title,
          items: [...project.items],
          finished: [...project.finished],
          listId
      }
  });

  await prisma.projectInfo.update({
      where: {
          id: project.id,
      },
      data: {
          key: linkedProjectInfo.id,
      }
  });

  return linkedProjectInfo;
}