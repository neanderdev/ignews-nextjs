import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getPrismicClient } from "../../../services/prismic";
import * as prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import styled from "../post.module.scss";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session, post.slug, router]);

    return (
        <>
            <Head>
                <title>{post.title} | ig.news</title>
            </Head>

            <main className={styled.container}>
                <article className={styled.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={`${styled.postContent} ${styled.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styled.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>Subscribe now 👊</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const prismicClient = getPrismicClient();

    const response = await prismicClient.get({
        predicates: prismic.predicate.at('document.type', 'publication'),
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    });

    const pathsPosts = response.results.map(post => {
        return {
            params: { slug: post.uid },
        };
    });

    return {
        paths: pathsPosts,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismicClient = getPrismicClient();

    const response = await prismicClient.getByUID('publication', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }),
    }

    return {
        props: {
            post,
        },
        revalidate: 60 * 30, // 30 minutos
    }
}