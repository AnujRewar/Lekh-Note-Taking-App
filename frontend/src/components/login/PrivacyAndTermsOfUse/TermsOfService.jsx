import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 px-6 py-12 md:px-20 lg:px-40">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <Link to="/" className="text-sm text-indigo-400 hover:underline mb-4 inline-block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Terms of Service</h1>
                    <p className="text-sm text-zinc-500 mt-1">Effective Date: September 9, 2026</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. Purpose & Scope</h2>
                    <p className="leading-relaxed">
                        By accessing or using <strong>Lekh</strong>, you agree to be bound by these Terms of Service. Lekh is a free, open-source college project created to assist students and individuals who face financial barriers with paid cloud-sync software.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Free-Tier & "As-Is" Disclaimer</h2>
                    <p className="leading-relaxed">
                        This application is hosted on free-tier servers and provided on an "as-is" and "as-available" basis without warranties of any kind. The developer assumes no responsibility or liability if the service experiences downtime, unexpected interruptions, or data loading failures.
                    </p>
                    <p className="leading-relaxed">
                        Because uptime depends on free-tier infrastructure limits, users are encouraged to maintain local backups of critical files. If you encounter service downtime preventing access to important data, you may reach out via the contact email in the about section to request a server restart, though immediate availability cannot be guaranteed.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. Acceptable Use</h2>
                    <p className="leading-relaxed">
                        Any form of illegal, malicious, or abusive use of the platform is strictly prohibited. The developer holds zero liability for any issues, damages, or consequences arising from the misuse of the application.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Support & Open Source Contributions</h2>
                    <p className="leading-relaxed">
                        For help, bug reports, or inquiries, you can contact the developer using the email listed in the about section. Because Lekh is open-source, contributions, bug fixes, and feature pull requests (PRs) from the community are welcomed through the official GitHub repository that is available in our about section.
                    </p>
                </section>
            </div>
        </div>
    );
}