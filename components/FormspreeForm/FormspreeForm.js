import { useForm, ValidationError } from "@formspree/react";
import { Input } from "components/Input";

export const FormspreeForm = ({ formId }) => {
    console.log("FORM ID: ", formId)
    const [state, handleSubmit] = useForm(formId);
    if (state.succeeded) {
        return (
            <p className="max-w-5xl mx-auto my-5">Thanks for joining!</p>
        );
    }
    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto my-5">
            <div>
            <label htmlFor="email" className="block">
                Email Address
            </label>
            <Input
                id="email"
                type="email" 
                name="email"
            />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
            />
            </div>
            <div>
                <label htmlFor="message" className="block my-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    className="border-2 border-slate-400 p-1 hover:border-slate-500 w-full"
                />
                <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                />
            </div>
            <div>
                <button className="btn" type="submit" disabled={state.submitting}>
                    Submit
                </button>
            </div>
        </form>
    );
}