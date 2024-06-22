import { AuthForm } from "./components";

export default function Home() {
    return (
        <article className="flex flex-col justify-center items-center lg:p-24 h-full">
            <section>
                <h1 className="font-bold text-3xl text-neutral-100 tracking-wide">AR23 | Messenger</h1>
            </section>
            <section>
                <AuthForm />
            </section>
        </article>
    );
}
