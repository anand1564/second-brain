import { useEffect, useState } from "react";
import { Card } from "./Card";
import { useNavigate } from "react-router-dom";

export default function Content() {
    const navigate = useNavigate();
    const [content, setContent] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/content/1")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch content");
                }
                return res.json();
            })
            .then((data) => setContent(Array.isArray(data) ? data : []))
            .catch((error) => console.error("Error fetching content:", error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-start gap-6">
            <div>
                <h1>Your Links</h1>
                <div className="flex items-center justify-center">
                    {content.length === 0 ? (
                        <h1>No content to display</h1>
                    ) : (
                        content.map((cont: any) => (
                            <Card key={cont.id} title={cont.title} description={cont.description} type={cont.type} />
                        ))
                    )}
                </div>
            </div>
            <div>
                <button onClick={() => navigate("/add")}>Add Content</button>
            </div>
        </div>
    );
}
