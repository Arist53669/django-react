import Form from "~/components/form";

export function meta() {
    return [
        { title: "Login" },
        { name: "description", content: "Login page " },
    ];
}

export default function Login() {
    return (
        <Form
            method="login"
            route="/api/token/"
        />
    );
}
