import { Readability } from "@mozilla/readability";
import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser } from "puppeteer";
import jsdom from "jsdom";

interface Content {
	url: string;
	html: string;
	title: string;
	plain: string;
	og: string | null | undefined;
}

export const getArticles = async () => {
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_HOST}:8000/articles`,
	);
	const data = await response.json();
	return data;
};

const reloadArticles = async (id: string) => {
	const response = await fetch(
		`http://${process.env.NEXT_PUBLIC_HOST}:8000/articles?reload=${id}`,
	);
	const data = await response.json();
	return data;
};

export const createArticle = async (url: string) => {
	const { JSDOM } = jsdom;

	const browser = await puppeteer.launch({
		executablePath: "chromium",
		headless: true,
		args: [
			"--disable-gpu",
			"--disable-dev-shm-usage",
			"--disable-setuid-sandbox",
			"--no-sandbox",
		],
	});
	const crawled = await crawl(url, browser);
	await browser.close();

	const dom = new JSDOM(crawled, { url: url });
	const document = dom.window.document;
	const parsed = new Readability(document).parse()!;

	const og = document
		.querySelector("[property='og:image']")
		?.getAttribute("content");

	const content: Content = {
		url: url,
		title: parsed.title,
		html: parsed.content,
		plain: parsed.textContent,
		og: og,
	};
	const body = JSON.stringify(content);
	return await fetch(`http://${process.env.NEXT_PUBLIC_HOST}:8000/articles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
};

const crawl = async (url: string, browser: Browser): Promise<string> => {
	const page = await browser.newPage();
	await page.goto(url);
	const text = await page.content();
	await page.close();
	return text;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "GET") {
		const query = req.query;
		if (!query.reload) {
			const data = await getArticles();
			return res.json(data);
		} else {
			const data = await reloadArticles(query.reload as string);
			return res.json(data);
		}
	} else if (req.method === "POST") {
		let url: string = req.body;
		const response = await createArticle(url);
		if (!response.ok) {
			res.send(response.body);
		} else {
			res.status(303).setHeader("Location", "/").end();
		}
	} else {
		res.status(404).end();
	}
}
