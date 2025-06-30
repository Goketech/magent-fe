"use client";
import React from "react";

export default function PrivacyPolicyPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const contentItems = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      number: "1",
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      number: "2",
    },
    {
      id: "data-sharing-disclosure",
      title: "Data Sharing and Disclosure",
      number: "3",
    },
    { id: "data-security", title: "Data Security", number: "4" },
    { id: "data-retention", title: "Data Retention", number: "5" },
    {
      id: "your-rights-choices",
      title: "Your Rights and Choices",
      number: "6",
    },
    {
      id: "cookies-tracking",
      title: "Cookies and Tracking Technologies",
      number: "7",
    },
    { id: "third-party-services", title: "Third-Party Services", number: "8" },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      number: "9",
    },
    { id: "childrens-privacy", title: "Children's Privacy", number: "10" },
    {
      id: "california-privacy",
      title: "California Privacy Rights",
      number: "11",
    },
    { id: "european-users", title: "European Users (GDPR)", number: "12" },
    {
      id: "data-marketplace",
      title: "Data Marketplace and Cryptocurrency Rewards",
      number: "13",
    },
    {
      id: "changes-policy",
      title: "Changes to This Privacy Policy",
      number: "14",
    },
    { id: "contact-us", title: "Contact Us", number: "15" },
    { id: "definitions", title: "Definitions", number: "16" },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl px-12 py-8">
        {/* Table of Contents Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="p-6">
              <h2 className="text-5xl font-bold mb-2 leading-tight">
                Powerful for
                <br />
                developers. Fast for
                <br />
                everyone.
              </h2>
              <div className="my-4">
                <p className="text-[#999999] text-sm md:text-md py-2">
                  Effective Date: 22-06-2025
                </p>
                <p className="text-[#999999] text-sm md:text-md  py-2">
                  Last Updated: 22-06-2025
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1">Introduction</h3>
                <p className="text-lg text-gray-500">
                  Hello Magent ("we," "our," or "us") is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you use our
                  AI marketing platform and services (the "Service").
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold mb-4 text-white">CONTENTS</h3>
                <nav className="space-y-1">
                  {contentItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-start w-full text-left text-2xl text-[#DE3AF7] hover:text-[#5b1e64] transition-colors py-1"
                    >
                      <span className="mr-2 text-2xl">{item.number}.</span>
                      <span className="flex-1">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="p-8">
            {/* Section 1: Information We Collect */}
            <section id="information-we-collect" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                1. Information We Collect
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999] ">
                  1.1 Information You Provide Directly
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0 "></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Account Information:
                      </span>{" "}
                      Name, email address, company name, job title, and contact
                      details
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Payment Information:
                      </span>{" "}
                      Billing address and payment method details (processed
                      securely through third-party providers)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Profile Data:
                      </span>{" "}
                      Marketing preferences, business objectives, and campaign
                      goals
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Communications:
                      </span>{" "}
                      Messages, feedback, and support requests you send to us
                    </div>
                  </li>
                </ul>
              </div>

              {/* 1.2 Marketing and Business Data */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999] ">
                  1.2 Marketing and Business Data
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Campaign Data:
                      </span>{" "}
                      Marketing campaigns, strategies, and performance metrics
                      you create or upload
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Social Media Data:
                      </span>{" "}
                      Content, analytics, and performance data from connected
                      social media accounts
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Third-Party Platform Data:
                      </span>{" "}
                      Data from marketing platforms you connect to our Service
                      (with your authorization)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Customer Data:
                      </span>{" "}
                      Information about your customers and audience that you
                      provide for analysis
                    </div>
                  </li>
                </ul>
              </div>

              {/* 1.3 Automatically Collected Information */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999] ">
                  1.3 Automatically Collected Information
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Usage Data:
                      </span>{" "}
                      How you interact with our platform, features used, and
                      time spent
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Device Information:
                      </span>{" "}
                      IP address, browser type, operating system, and device
                      identifiers
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Voice Data:
                      </span>{" "}
                      Audio recordings when you use voice prompts (processed and
                      deleted after transcription)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Cookies and Tracking:
                      </span>{" "}
                      Information collected through cookies and similar
                      technologies
                    </div>
                  </li>
                </ul>
              </div>

              {/* 1.4 Data from Third-Party Sources */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999] ">
                  1.4 Data from Third-Party Sources
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Market Research Data:
                      </span>{" "}
                      Aggregated industry and market data from various sources
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Public Data:
                      </span>{" "}
                      Publicly available information relevant to your marketing
                      objectives
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Data Marketplace:
                      </span>{" "}
                      Data shared by other users through our cryptocurrency
                      reward system
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section id="how-we-use-information" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                2. How We Use Your Information
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999] ">
                We use your information to:
              </h3>
              <ul className="space-y-3 text-[#999999] pl-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Provide Our Service:
                    </span>{" "}
                    Deliver AI-powered marketing insights, analysis, and
                    recommendations
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Personalization:
                    </span>{" "}
                    Customize strategies and recommendations based on your
                    business needs
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Platform Integration:
                    </span>{" "}
                    Connect and sync data with your social media and marketing
                    platforms
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Automation:
                    </span>{" "}
                    Execute automated marketing activities like email campaigns
                    and social media posting
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Analytics and Reporting:
                    </span>{" "}
                    Generate performance reports and marketing insights
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Communication:
                    </span>{" "}
                    Send notifications, reminders, and important updates about
                    your account
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Improvement:
                    </span>{" "}
                    Enhance our AI algorithms and platform functionality
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">Support:</span>{" "}
                    Provide customer service and technical support
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Compliance:
                    </span>{" "}
                    Meet legal obligations and protect our rights
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3: Data Sharing and Disclosure */}
            <section id="data-sharing-disclosure" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                3. Data Sharing and Disclosure
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  3.1 We May Share Your Information With
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Service Providers:
                      </span>{" "}
                      Third-party vendors who help operate our platform
                      (hosting, analytics, payment processing)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        AI Processing Partners:
                      </span>{" "}
                      Companies that help process and analyze data to improve
                      our AI capabilities
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Integrated Platforms:
                      </span>{" "}
                      Social media and marketing platforms you authorize us to
                      connect with
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Data Contributors:
                      </span>{" "}
                      In aggregated, anonymized form as part of our data
                      marketplace rewards system
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-4 text-[#999999]">
                  3.2 We Do Not Sell Personal Information
                </h3>
                <div className="text-[#999999] pl-4">
                  We do not sell your personal information to third parties for
                  monetary consideration.
                </div>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-4 text-[#999999]">
                  3.3 Legal Disclosure
                </h3>
                <div className="text-[#999999] pl-4">
                  We may disclose information when required by law, to protect
                  our rights, or in connection with business transfers.
                </div>
              </div>
            </section>

            {/* Section 4: Data Security */}
            <section id="data-security" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                4. Data Security
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  4.1 Security Measures
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Encryption of data in transit and at rest</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Secure authentication and access controls</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Regular security audits and monitoring</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Secure data centers and infrastructure</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Employee training on data protection</div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5: Data Retention */}
            <section id="data-retention" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                5. Data Retention
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  We retain your information for as long as necessary to:
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Provide our services to you</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Comply with legal obligations</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Resolve disputes and enforce agreements</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Improve our AI models and services</div>
                  </li>
                </ul>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  Voice recordings are typically deleted within 30 days after
                  transcription.
                </h3>
              </div>
            </section>

            {/* Section 6: Your Rights and Choices */}
            <section id="your-rights-choices" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                6. Your Rights and Choices
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  Depending on your location, you may have the right to:
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Access:
                      </span>{" "}
                      Request copies of your personal information
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Correction:
                      </span>{" "}
                      Update or correct inaccurate information
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Deletion:
                      </span>{" "}
                      Request deletion of your personal information
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Portability:
                      </span>{" "}
                      Receive your data in a portable format
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Restriction:
                      </span>{" "}
                      Limit how we process your information
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Objection:
                      </span>{" "}
                      Object to certain processing activities
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Withdraw Consent:
                      </span>{" "}
                      Withdraw consent where processing is based on consent
                    </div>
                  </li>
                </ul>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  To exercise these rights, contact us at{" "}
                  <a
                    href="mailto:privacy@hellomagent.com"
                    className="underline"
                  >
                    privacy@hellomagent.com
                  </a>
                  .
                </h3>
              </div>
            </section>

            {/* Section 7: Cookies and Tracking Technologies */}
            <section id="cookies-tracking" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                7. Cookies and Tracking Technologies
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  We use cookies and similar technologies to:
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Remember your preferences and settings</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Analyze platform usage and performance</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Provide personalized experiences</div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>Ensure platform security</div>
                  </li>
                </ul>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  You can control cookie settings through your browser, though
                  this may affect platform functionality.
                </h3>
              </div>
            </section>

            {/* Section 8: Third-Party Services */}
            <section id="third-party-services" className="mb-12 ">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                8. Third-Party Services
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                Our platform integrates with various third-party services
                (social media platforms, marketing tools, payment processors).
                These services have their own privacy policies, and we encourage
                you to review them.
              </h3>
            </section>

            {/* Section 9: International Data Transfers */}
            <section id="international-transfers" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                9. International Data Transfers
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                Your information may be transferred to and processed in
                countries other than your own. We ensure appropriate safeguards
                are in place for such transfers in compliance with applicable
                laws.
              </h3>
            </section>

            {/* Section 10: Children's Privacy */}
            <section id="childrens-privacy" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                10. Children's Privacy
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                Our Service is not intended for individuals under 18. We do not
                knowingly collect personal information from children under 18.
              </h3>
            </section>

            {/* Section 11: California Privacy Rights */}
            <section id="california-privacy" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                11. California Privacy Rights
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                California residents have additional rights under the California
                Consumer Privacy Act (CCPA), including the right to know about
                personal information collection and the right to opt-out of the
                sale of personal information.
              </h3>
            </section>

            {/* Section 12: European Users (GDPR) */}
            <section id="european-users" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                12. European Users (GDPR)
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                If you're in the European Economic Area, you have additional
                rights under the General Data Protection Regulation (GDPR). Our
                lawful basis for processing includes consent, contract
                performance, legitimate interests, and legal compliance.
              </h3>
            </section>

            {/* Section 13: Data Marketplace and Cryptocurrency Rewards */}
            <section id="data-marketplace" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                13. Data Marketplace and Cryptocurrency Rewards
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                When you participate in our data marketplace by sharing data,
                you may receive cryptocurrency rewards. Participation is
                voluntary, and shared data is aggregated and anonymized to
                protect privacy.
              </h3>
            </section>

            {/* Section 14: Changes to This Privacy Policy */}
            <section id="changes-policy" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                14. Changes to This Privacy Policy
              </h2>
              <h3 className="text-[20px] md:text-[1.5rem] font-medium leading-10 my-6 text-[#999999]">
                We may update this Privacy Policy periodically. We'll notify you
                of material changes via email or platform notification. Your
                continued use of the Service constitutes acceptance of the
                updated policy.
              </h3>
            </section>

            {/* Section 15: Contact Us */}
            <section id="contact-us" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                15. Contact Us
              </h2>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold my-6 text-[#999999]">
                  For privacy-related questions or concerns, contact us at:
                </h3>
                <ul className="space-y-3 text-[#999999] pl-4">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div className="text-[#DE3AF7]">
                      <span className="font-semibold text-[#999999]">Email:</span>{" "}
                      modupe775@gmail.com
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#999999]">
                        Address:
                      </span>{" "}
                      26, Victoria Island, Lagos
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div className="text-[#DE3AF7]">
                      <span className="font-semibold text-[#999999]">Phone:</span>{" "}
                      +2348117266403
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 16: Definitions */}
            <section id="definitions" className="mb-12">
              <h2 className="text-2xl md:text-4xl font-bold py-6">
                16. Definitions
              </h2>
              <ul className="space-y-3 text-[#999999] pl-4">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Personal Information:
                    </span>{" "}
                    Information that identifies, relates to, or can be linked to
                    you
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">Service:</span>{" "}
                    Hello Magent platform and related services
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-[#999999] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <span className="font-semibold text-[#999999]">
                      Third-Party:
                    </span>{" "}
                    Companies or individuals other than Hello Magent and you
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
