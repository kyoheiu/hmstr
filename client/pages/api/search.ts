import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const searchArticles = async (query: string | string[]) => {
  const target = `http://${process.env.NEXT_PUBLIC_HOST}:8000/search?q=${query}`;
  const response = await fetch(target);
  const data = await response.json();
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session || req.method !== "POST") {
    res.status(404).end();
  } else {
    const query = req.query;
    if (!query.q) {
      res.status(404).end();
    } else {
      const data = await searchArticles(query.q);
      return res.json(data);
    }
  }
}