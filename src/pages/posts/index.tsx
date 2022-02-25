import Head from "next/head";
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