import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RetroGrid } from "@/components/magicui/retro-grid";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [result, setResult] = useState("");

    const formRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.set(formRef.current, { x: -1000, opacity: 0 });

        gsap.to(formRef.current, {
            x: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("Sending...");

        try {
            const formDataObj = new FormData();
            formDataObj.append(
                "access_key",
                import.meta.env.VITE_WEB3_FORM_KEY
            );
            formDataObj.append("name", formData.name);
            formDataObj.append("email", formData.email);
            formDataObj.append("message", formData.message);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formDataObj,
                }
            );

            const data = await response.json();

            if (data.success) {
                setResult("Mail Sent Successfully!");
                setFormData({ name: "", email: "", message: "" });
            } else {
                console.error("Web3Forms Error:", data);
                setResult(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Submit Error:", error);
            setResult("Network error. Please try again later.");
        }
    };

    return (
        <section
            id="contact"
            ref={triggerRef}
            className="relative flex items-center justify-center min-h-[90vh] overflow-hidden mt-30 z-100"
        >
            <div
                ref={formRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-white px-6"
            >
                <RetroGrid />

                <div className="w-full flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Let&apos;s Talk
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg bg-white/10 p-8 rounded-2xl shadow-xl border border-white/20"
                    >
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-300 text-sm mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/20 text-white rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-pink-500/50 transition-transform transform hover:scale-105"
                        >
                            Send Message
                        </button>
                    </form>

                    {result && (
                        <p className="mt-4 text-gray-300 text-center">
                            {result}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
