import Contact from "../components/Contact/Contact";

export default function contactPage() {

    document.body.classList.remove('no-scroll');
    return (
        <div>
        <Contact></Contact>
        </div>
    );
}