import styled from "./styles.module.scss"

export function Header() {
    return (
        <header className={styled.headerContainer}>
            <div className={styled.HeaderContent}>
                <img src="/images/logo.svg" alt="ig.news" />

                <nav>
                    <a className={styled.active}>Home</a>
                    <a>Posts</a>
                </nav>
            </div>
        </header>
    );
}