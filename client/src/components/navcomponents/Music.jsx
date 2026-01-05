import React, { useState } from "react";

function Music() {
    const tracks = [
        { id: "mt9xg0mmt28", title: "Tum Se Hi" },
        { id: "9UDkYz64ehA", title: "Ambersariya" },
        { id: "iSo9l950QLo", title: "Shiddat" },
        { id: "vJQMhj6WYZA", title: "Barbadiyan" },
    ];

    const [current, setCurrent] = useState(0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Music Playlist 🎵</h2>

            <div className="max-w-3xl mx-auto">
                <div className="w-full mb-4">
                    <iframe
                        src={`https://www.youtube.com/embed/${tracks[current].id}?rel=0`}
                        title={tracks[current].title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-64 md:h-96 rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex gap-3 overflow-x-auto py-2">
                    {tracks.map((t, i) => (
                        <button
                            key={t.id}
                            onClick={() => setCurrent(i)}
                            className={`shrink-0 w-36 text-left ${i === current ? "ring-4 ring-pink-300 rounded-md" : ""}`}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`}
                                alt={t.title}
                                className="w-full h-20 object-cover rounded-md"
                            />
                            <div className="text-sm mt-1 truncate">{t.title}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Music;