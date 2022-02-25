import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import * as prismic from "@prismicio/client";

import styled from "./styles.module.scss";

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styled.container}>
                <div className={styled.posts}>
                    <a href="#">
                        <time>25 de fevereiro de 2022</time>
                        <strong>O que é NextJS?</strong>
                        <p>O NextJS também possibilita a criação de sites estáticos, que são aqueles sites sem muita interação com o usuário.</p>
                    </a>

                    <a href="#">
                        <time>25 de fevereiro de 2022</time>
                        <strong>O que é NextJS?</strong>
                        <p>O NextJS também possibilita a criação de sites estáticos, que são aqueles sites sem muita interação com o usuário.</p>
                    </a>

                    <a href="#">
                        <time>25 de fevereiro de 2022</time>
                        <strong>O que é NextJS?</strong>
                        <p>O NextJS também possibilita a criação de sites estáticos, que são aqueles sites sem muita interação com o usuário.</p>
                    </a>
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

    return {
        props: {}
    };
}