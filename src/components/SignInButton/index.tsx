import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi"
import { signIn, signOut, useSession } from "next-auth/react";

import styled from "./styles.module.scss";

export function SignInButton() {
    const { data: session } = useSession();

    return session ? (
        <button type="button" className={styled.signInButton} onClick={() => signOut()}>
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styled.closeIcon} />
        </button>
    ) : (
        <button
            type="button"
            className={styled.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    )
}