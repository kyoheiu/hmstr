import {
	Articles,
	ArticleData,
	ElementKind,
	WrappedData,
} from "../types/types";
import ArticleElement from "../components/ArticleElement";
import { Header } from "../components/Header";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { getArticles } from "./api/articles";
import Button from "@mui/material/Button";
import { Footer } from "../components/Footer";

type Data = Articles;

export const getServerSideProps: GetServerSideProps<{
	data: Data;
}> = async (context) => {
	const data = await getArticles();
	return { props: { data } };
};

export default function Home({
	data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [list, setList] = useState<ArticleData[]>(data.data);
	const [isLast, setIsLast] = useState(data.is_last);

	const reload = async () => {
		if (list.length !== 0) {
			const res = await fetch(`/api/articles?reload=${list.slice(-1)[0].id}`);
			const j = await res.json();
			if (j.is_last) {
				setIsLast(true);
			}
			setList((arr) => arr.concat(j.data));
		}
	};

	if (!data) {
		return <h1>No article found.</h1>;
	}

	const wrapped: WrappedData[] = list.map((x) => ({
		visible: true,
		data: x,
	}))!;

	return (
		<>
			<Header />
			<Stack className="articles-list" spacing={5}>
				{wrapped.map((e, index) => {
					return (
						<ArticleElement
							key={`index-element${index.toString()}`}
							element={e}
							kind={ElementKind.Top}
						/>
					);
				})}
				{Footer(isLast, reload)}
			</Stack>
		</>
	);
}
