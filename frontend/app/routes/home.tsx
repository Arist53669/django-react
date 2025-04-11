import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import api from "~/api";
import Note from "~/notes/note";

export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await getNotes();
        })();
    }, []);

    async function getNotes() {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteNote(id: string) {
        try {
            const res = await api.delete(`/api/notes/delete/${id}/`);

            if (res.status === 204) {
                alert("Note deleted!");
                await getNotes();
            } else {
                alert("Failed to delete note!");
            }
        } catch (error) {
            alert(error);
        }
    }

    async function createNote(e: FormEvent) {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });

            if (res.status === 201) {
                alert("Note created!");
                await getNotes();
            } else {
                alert("Failed to make note!");
            }
        } catch (error) {
            alert(error);
        }
    }

    async function handleLogout() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <>
            <button
                type="button"
                onClick={() => handleLogout()}>
                Logout
            </button>
            <div className="flex justify-center">
                <div className="w-1/3">
                    <h2 className="text-5xl font-bold mt-2 mb-6 text-center">
                        Notes
                    </h2>
                    {notes.map((note: any) => (
                        <Note
                            key={note.id}
                            note={note}
                            onDelete={deleteNote}
                        />
                    ))}
                </div>

                <form
                    onSubmit={(e) => createNote(e)}
                    className="w-2/3 h-full max-w-xl bg-white text-black p-8 mx-auto mt-10 rounded-lg shadow-md">
                    <h2 className="text-3xl text-black font-bold mb-6 text-center">
                        Create a Note
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            required
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="mb-10">
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Content"
                            required
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Create a Note
                    </button>
                </form>
            </div>
        </>
    );
}
