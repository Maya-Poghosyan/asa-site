export default function SubmitButton({ isPending }: { isPending: boolean }) {
    return (
        <button type="submit" disabled={isPending}>
            {isPending ? "Submitting ..." : "Submit"}
        </button>
    )
}