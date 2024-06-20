import { AuthForm } from "./components";

export default function Home() {
    return (
        <article className="flex flex-col min-h-screen justify-center items-center p-24">
            <section>
                <h1 className="font-bold text-4xl tracking-wide">Sign up to begin</h1>
            </section>
            <section>
                <AuthForm />
            </section>
        </article>
    );
}
