import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);

  //TODO: because of server and client render this is not working find a way to get arount this

  if (!userId) return res.status(500).json([]);

  if (req.method === "POST") {
    const todos = await db.todo.update({
      where: {
        id_owner: { id: req.query.todoId?.toString()!, owner: userId },
      },

      data: {
        completed: req.body.action === "complete" ? true : false,
      },
    });

    res.status(200).json(todos);
    return;
  } else if (req.method === "PUT") {
    const todos = await db.todo.create({
      data: {
        title: req.body.title,
        body: req.body.description,
        id: req.body.todoId,
        owner: userId,
      },
    });
    res.status(200).json(todos);
    return;
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
