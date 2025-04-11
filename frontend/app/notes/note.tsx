export default function Note({ note, onDelete }: NoteTypes) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="my-4 max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <p className="font-bold text-xl mb-2">{note.title}</p>
                <p className="text-gray-700 text-base mb-2">{note.content}</p>
                <p className="text-gray-600 text-sm">{formattedDate}</p>
                <br />
                <button
                    type="submit"
                    onClick={() => onDelete(note.id)}
                    className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 hover:cursor-pointer transition duration-300">
                    Delete
                </button>
            </div>
        </div>
    );
}

type NoteTypes = {
    note: any;
    onDelete: (id: string) => void;
};
