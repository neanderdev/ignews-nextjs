import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import * as prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import styled from "./styles.module.scss";

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
};

interface PostsProps {
    posts: Post[];
};

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styled.container}>
                <div className={styled.posts}>
                    {posts.map(post => (
                        <a key={post.slug} href="#">
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismicClient = getPrismicClient();

    const response = await prismicClient.get({
        predicates: prismic.predicate.at('document.type', 'publicatio'),
        fetch: ['publicatio.title', 'publicatio.content'],
        pageSize: 100,
    });

    // console.log(JSON.stringify(response, null, 2));

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        };
    });

    return {
        props: {
            posts,
        }
    };
}