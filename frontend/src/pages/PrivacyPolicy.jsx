import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const PrivacyPolicy = () => {
  return (
    <>
    <div className="min-h-screen bg-white flex flex-col p-8 mb-16">
        <Header/>
      <h1 className="text-3xl font-semibold text-center mb-6 mt-20">Privacy Policy</h1>
      <div className="max-w-3xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p>
            We value your privacy and are committed to protecting the personal information you share with us.
            This privacy policy outlines how we collect, use, and protect your data when you use our tutorial app.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <p>
            When using the app, we collect the following types of information:
          </p>
          <ul className="list-disc pl-6">
            <li>Personal details (name, email) for account creation.</li>
            <li>Usage data, including tutorials accessed, for app improvement.</li>
            <li>Device information and app usage statistics to ensure proper functioning.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            The data we collect is used to:
          </p>
          <ul className="list-disc pl-6">
            <li>Personalize your learning experience based on the tutorials you access.</li>
            <li>Improve the app's performance and functionality.</li>
            <li>Provide support and respond to your queries effectively.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data from unauthorized access, alteration, or destruction. However, no method of data transmission over the internet is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6">
            <li>Access and correct your personal data at any time.</li>
            <li>Request the deletion of your personal data (subject to legal obligations).</li>
            <li>Opt out of receiving marketing communications from us.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any questions or concerns regarding your privacy or this policy, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> support@tutorialapp.com
          </p>
        </section>
      </div>
    </div>
      <Navbar/>
      </>
  );
};

export default PrivacyPolicy;
