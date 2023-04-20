import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

//get the user

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  //TODO: because of server and client render this is not working find a way to get arount this

  if (!userId) return res.status(200).json([]);

  if (req.method === "GET") {
    const todos = await db.todo
      .findMany({
        where: {
          owner: userId,
        },
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json(todos);
    return;
  } else if (req.method === "PUT") {
    //append owner to each todo
    req.body.forEach((todo: any) => {
      todo.owner = userId;
    });

    const todos = await db.todo.createMany({ data: req.body });
    res.status(200).json(todos);
    return;
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
