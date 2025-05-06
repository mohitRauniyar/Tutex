// HelpCenter.js
import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col p-8 mb-20">
      <Header/>
      <h1 className="text-3xl font-semibold text-center mb-6 mt-20">Help Center</h1>
      <div className="max-w-3xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <p>
            Welcome to the tutorial app! Here's how you can get started with our step-by-step guides:
          </p>
          <ul className="list-disc pl-6">
            <li>Browse through different categories of tutorials.</li>
            <li>Each tutorial offers easy-to-follow instructions for tasks like online shopping, UPI payments, and more.</li>
            <li>Use the search bar to find a specific tutorial you're looking for.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">How do I use UPI for payments?</h3>
              <p>Our UPI payment tutorial will guide you through the steps to make secure payments using UPI apps like Google Pay or PhonePe.</p>
            </div>
            <div>
              <h3 className="font-semibold">How do I book a cab online?</h3>
              <p>Learn how to use popular cab booking services like Uber and Ola with our step-by-step tutorials.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I contact support?</h3>
              <p>If you need further assistance, feel free to contact our support team by email or through our live chat feature.</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Troubleshooting</h2>
          <p>If you're having trouble with the app or tutorials, here are some tips:</p>
          <ul className="list-disc pl-6">
            <li>Ensure you're using the latest version of the app.</li>
            <li>Try restarting the app if you're experiencing issues with loading tutorials.</li>
            <li>Check your internet connection for better streaming of tutorial videos.</li>
          </ul>
        </section>
      </div>
      <Navbar/>
    </div>
  );
};

export default HelpCenter;
