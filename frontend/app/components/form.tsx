import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import api from "~/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "~/constants";
import LoadingIndicator from "./loading-indicator";

export default function Form({ route, method }: FormProps) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    async function handleSubmit(e: FormEvent) {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {
                username,
                password,
            });

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <LoadingIndicator />}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl bg-white text-black p-8 mx-auto mt-10 rounded-lg shadow-md">
                <h2 className="text-3xl text-black font-bold mb-6 text-center">
                    {name}
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 font-medium mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-10">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    {name}
                </button>
            </form>
        </>
    );
}

type FormProps = {
    route: string;
    method: string;
};
