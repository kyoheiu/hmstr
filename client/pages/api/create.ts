import { NextApiRequest, NextApiResponse } from "next";
import { createArticle } from "./articles";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		if (req.headers.authorization !== process.env.WEB_API_TOKEN) {
			res.status(404).end();
		} else {
			const response = await createArticle(req.body.url);
			if (!response.ok) {
				res.send(response.body);
			} else {
				res.status(200).end();
			}
		}
	} else {
		res.status(404).end();
	}
}
