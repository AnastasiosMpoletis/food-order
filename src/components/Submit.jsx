import { useFormStatus } from "react-dom";

export default function Submit() {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="button" disabled={pending}>
            {pending ? 'Submiting Order...' : 'Submit Order'}
        </button>
    );
}