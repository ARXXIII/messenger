import { AuthForm } from "./components";

export default function Home() {
    return (
        <article className="flex justify-center items-center lg:p-24 h-full">
            <div className="grid grid-cols-1 gap-y-6">
                <section>
                    <h1 className="text-center p-6 font-black text-2xl sm:text-3xl text-neutral-100 tracking-wide bg-zinc-900 rounded-xl shadow">AR23 | GigaMessenger</h1>
                </section>
                <section>
                    <AuthForm />
                </section>
            </div>
        </article>
    );
}
