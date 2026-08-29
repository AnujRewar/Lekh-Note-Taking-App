import React from 'react';

function AboutRight() {
    const features = [
        {
            id: "01",
            title: "Online Sync",
            description: "Keep your notes synchronized across all your devices."
        },
        {
            id: "02",
            title: "Save Notes",
            description: "Save your ideas and important thoughts without losing them."
        },
        {
            id: "03",
            title: "Access Anywhere",
            description: "Access your notes whenever and wherever you need them."
        }
    ];

    return (
        <div className="w-full pt-4 lg:pt-8 space-y-10">
            {features.map((feature) => (
                <div
                    key={feature.id}
                    className="group relative pl-6"
                >
                    {/* Vertical line indicator */}
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-zinc-800 group-hover:bg-indigo-400 transition-colors duration-300"></div>

                    <div className="pl-6">
                        <span className="text-xs font-mono text-zinc-600 group-hover:text-indigo-400 transition-colors duration-300">
                            {feature.id}
                        </span>
                        <h3 className="mt-1 text-xl font-semibold group-hover:text-indigo-300 transition-colors duration-300">
                            {feature.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AboutRight;