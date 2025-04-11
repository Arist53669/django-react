import Form from "~/components/form";

export function meta() {
    return [
        { title: "Register" },
        { name: "description", content: "Register page" },
    ];
}

export default function Register() {
    localStorage.clear();

    return (
        <Form
            method="register"
            route="/api/user/register/"
        />
    );
}
