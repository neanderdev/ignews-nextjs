import Link from "next/link";
import { SignInButton } from "../SignInButton";

import styled from "./styles.module.scss";

export function Header() {
    return (
        <header className={styled.headerContainer}>
            <div className={styled.HeaderContent}>
                <img src="/images/logo.svg" alt="ig.news" />

                <nav>
                    <Link href="/">
                        <a className={styled.active}>Home</a>
                    </Link>

                    <Link href="/posts" prefetch>
                        <a>Posts</a>
                    </Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}