import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-zinc-300 px-6 py-12 md:px-20 lg:px-40">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <Link to="/" className="text-sm text-indigo-400 hover:underline mb-4 inline-block">
                        &larr; Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Privacy Policy</h1>
                    <p className="text-sm text-zinc-500 mt-1">Effective Date: September 9, 2026</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. Introduction</h2>
                    <p className="leading-relaxed">
                        Welcome to <strong>Lekh</strong>, an open-source cloud-synced note-taking application designed primarily for students and individuals seeking free alternatives to paid cloud services. This Privacy Policy outlines how your information is handled when you use our service.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. Information We Collect</h2>
                    <p className="leading-relaxed">
                        When you sign in using Google OAuth, we collect your basic Google account profile information (such as your name and email address) and interact with your connected storage solely to provide note synchronization functionality within the app.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. Data Usage & Sharing</h2>
                    <p className="leading-relaxed">
                        Your data is used exclusively to authenticate your account and operate the core note-taking features. <strong>The developer does not use, sell, rent, or share your personal data with any third parties.</strong> This is a community-focused project built for transparency.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Data Deletion & Account Removal</h2>
                    <p className="leading-relaxed">
                        You can manage your data directly from your account settings. If you wish to completely delete your account and associated data from our servers, you may email the developer at the address listed in the about section specifying the exact user ID/email you want removed. Once processed, your data will be permanently wiped.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">5. Open Source Transparency</h2>
                    <p className="leading-relaxed">
                        As an open-source project, our complete codebase is publicly accessible on the developer's GitHub repository for code review, audits, and community trust. You can access the github repository on the account provided in about section.
                    </p>
                </section>
            </div>
        </div>
    );
}