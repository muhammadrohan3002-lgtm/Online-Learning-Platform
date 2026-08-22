import tipsData from "@/data/tips.json";

export default function StudyTips() {
    return (
        <section className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl font-bold">📌 Effective Study Techniques</h2>
                <p className="text-sm text-gray-600 mt-1">Accelerate retention using proven cognitive routines</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tipsData.map((tip, idx) => (
                    <div key={idx} className="p-5 bg-base-100 rounded-xl shadow-xs">
                        <div className="text-2xl mb-2">{tip.icon}</div>
                        <h3 className="font-bold text-sm">{tip.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{tip.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}