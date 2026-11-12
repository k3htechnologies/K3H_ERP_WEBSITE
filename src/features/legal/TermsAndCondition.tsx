const TermsAndCondition: React.FC = () => {
    const sections = [
        {
            title: "1. Introduction",
            paragraphs: [
                `Welcome to the official website of H. Rishabraj Group ("Rishabraj", "we", "our" or "us").`,
                `These Terms of Use govern your access to and use of this website, including its contents, information, photographs, project details, graphics, illustrations and other materials displayed herein.`,
                `By accessing or browsing this website, you agree to be bound by these Terms of Use. If you do not agree with these terms, you are advised to discontinue the use of this website.`
            ]
        },
        {
            title: "2. Purpose of the Website",
            paragraphs: [
                `This website has been developed to provide general information about H. Rishabraj Group, its business activities, real estate developments, redevelopment initiatives, projects, services and other related information.`,
                `The website is intended for informational and communication purposes and does not, by itself, constitute a legally binding offer, commitment, assurance or contractual representation by the Group.`
            ]
        },
        {
            title: "3. Accuracy of Information",
            paragraphs: [
                `While reasonable efforts are made to ensure that the information displayed on this website is accurate and updated, H. Rishabraj Group does not guarantee that all information is complete, error-free or current at all times.`,
                `Project details, photographs, illustrations, plans, specifications, amenities, configurations and other information may be revised, modified or updated from time to time, subject to applicable approvals, statutory requirements and project-specific contractual documents.`,
                `Visitors are advised to independently verify relevant information before making any investment, purchase or business decision.`
            ]
        },
        {
            title: "4. Enquiries, Registration and Communication",
            paragraphs: [
                `The Website may provide enquiry forms, contact forms, callback requests, project registration facilities or other communication channels.`,
                `By voluntarily submitting an enquiry or registering your details, you agree to provide accurate and complete information, which may include:`
            ],
            lettered: [
                "Full name.",
                "Email address.",
                "Mobile or telephone number.",
                "City or residential address.",
                "Project or property preferences.",
                "Unit type, preferred configuration, carpet area and indicative budget.",
                "Any other information reasonably requested in connection with your enquiry."
            ],
            after: [
                `By submitting your contact details and upon enquiries, you authorize H Rishabraj Group and its relevant authorized representatives or service providers to contact you in relation to your enquiry, requested information, projects, properties, services and related updates, through permitted communication channels. Marketing and promotional communications shall be undertaken in accordance with applicable consent requirements and communication regulations.`,
                `You may opt out of promotional communications at any time through the available unsubscribe mechanism or by contacting us using the details provided in these Terms. Such withdrawal shall not affect communications that are necessary for existing transactions, contractual obligations or compliance with applicable laws.`,
                `H Rishabraj Group reserves the right to verify information submitted through the Website and to decline or discontinue processing of incomplete, misleading or inaccurate enquiries.`,
                `Submission of an enquiry or registration of interest shall not create any obligation on H. Rishabraj Group to offer, reserve or allot any particular unit or property to the person submitting such enquiry.`
            ]
        },
        {
            title: "5. WhatsApp Communication and Automated Assistant",
            bullets: [
                `H. Rishabraj Group may provide communication, enquiry handling and customer assistance facilities through WhatsApp, website chatbots and other digital communication platforms. Users acknowledge that such facilities may be operated through automated assistants, chatbots or artificial intelligence-based systems and that responses received through such channels may not necessarily be generated or reviewed by a human representative.`,
                `Users may request assistance from a human representative through the available communication channels, subject to the availability of the concerned representative and applicable business hours.`,
                `Users shall have the option to discontinue receiving automated communications through the respective communication channel by replying "STOP" or by using the applicable opt-out mechanism made available on such channel. Such opt-out shall apply to the relevant communication channel. Withdrawal from promotional communications shall not affect service-related, transactional or other communications necessary for existing enquiries, transactions, contractual obligations or compliance with applicable laws.`,
                `Promotional messages, advertisements, marketing communications, discounts and special offers shall be communicated through WhatsApp or other digital channels only where the user has separately and expressly opted in to receive such promotional communications. Submission of an enquiry or consent to receive service-related communications shall not, by itself, constitute consent to receive promotional or marketing communications.`,
                `Users are strictly advised not to share sensitive personal, financial or confidential information through WhatsApp, chatbot interfaces or other automated communication channels, including Aadhaar numbers, PAN details, bank account details, debit or credit card information, passwords, PINs or One-Time Passwords (OTPs). H. Rishabraj Group shall not request such confidential information through its automated assistants or chatbots.`,
                `Responses generated by automated assistants or chatbots are intended solely for general information and preliminary assistance. No prices, quotations, discounts, promotional offers, commercial terms, assurances or commitments communicated through such automated channels shall be treated as authorised or binding upon H. Rishabraj Group unless the same have been duly approved and confirmed by its authorised representatives. Users are advised to obtain appropriate confirmation from an authorised representative before relying upon any such information or making any financial or contractual commitment.`
            ]
        },
        {
            title: "6. Intellectual Property Rights",
            paragraphs: [
                `All content displayed on this website, including but not limited to:`
            ],
            bullets: [
                "Company names, logos, trademarks and brand elements.",
                "Text, descriptions, photographs and graphics.",
                "Architectural designs, illustrations and visual representations.",
                "Project presentations, brochures and other digital materials.",
                "Website design, layout and content structure."
            ],
            after: [
                `are owned by, licensed to, belong to or lawfully used by H. Rishabraj Group, its group entities, or their respective licensors and are protected under applicable intellectual property laws.`,
                `No person shall reproduce, copy, modify, distribute, publish, transmit or commercially exploit any content from this website without prior written permission from the rightful owner.`,
                `Nothing contained on the Website shall be construed as granting any license or right to use any trademark, logo, copyright or other intellectual property belonging to H Rishabraj Group or any third party.`,
                `Unauthorized use of intellectual property may result in appropriate legal action.`
            ]
        },
        {
            title: "7. Use of Photographs, Videos and Testimonials for Promotional Purposes",
            paragraphs: [
                `Upon successful handover of possession of a premises to a customer, the customer shall be welcomed as a member of the H. Rishabraj family. In connection with such handover and other customer engagement activities, H. Rishabraj Group may request the customer to participate in or permit the capturing of photographs, videos, testimonials and other recordings featuring the customer, their family members or the premises, for the Group’s marketing, promotional, publicity and branding activities.`,
                `Subject to obtaining the separate consent of the concerned individual, H. Rishabraj Group shall be entitled to use, reproduce, publish, edit and share such photographs, videos, testimonials and recordings on its official website, Instagram, Facebook, WhatsApp, other social media platforms, digital advertisements, brochures, presentations and other promotional materials, without any additional payment or consideration.`,
                `Such use shall be limited to the scope of consent provided by the concerned individual and shall be in accordance with applicable laws. Consent may be withdrawn in accordance with applicable law by writing to H. Rishabraj Group at info@hrishabraj.com.`
            ]
        },
        {
            title: "8. Permitted Use",
            paragraphs: [
                `Visitors may access and use this website, landing pages, webpages, social media, Digital advertising mediums, third-party platforms and associated sites solely for lawful and legitimate informational purposes.`,
                `Visitors shall not:`
            ],
            bullets: [
                "Use the website for any unlawful, fraudulent or unauthorised purpose.",
                "Copy, reproduce or misuse website content without permission.",
                "Attempt to gain unauthorised access to the website, its servers or associated systems.",
                "Introduce viruses, malicious software or harmful code.",
                "Interfere with the security, operation or functionality of the website.",
                "Use the website in any manner that may damage the reputation or business interests of H. Rishabraj Group."
            ]
        },
        {
            title: "9. Project Information and Transactions",
            paragraphs: [
                `Information relating to residential, commercial and redevelopment projects is provided for general reference.`,
                `In case of any inconsistency between the information displayed on this website and the duly executed contractual documents, onsite display or applicable statutory records, the relevant contractual documents and statutory requirements shall prevail, subject to applicable law.`
            ]
        },
        {
            title: "10. No Offer, Allotment or Booking",
            paragraphs: [
                `All information, advertisements, project details, promotional materials, communications, expressions of interest and other representations made available through the Website, WhatsApp, automated chatbots, telephone calls, kiosks, social media, digital advertising mediums or any other communication channel of H. Rishabraj Group are intended solely for general informational and promotional purposes and shall not, by themselves, constitute a legally binding offer, invitation to purchase, allotment, confirmation of booking or commitment by the Group.`,
                `Any Token amount, Expression of Interest (EOI), enquiry, registration of interest or submission of preliminary details by a prospective purchaser shall not be construed as an allotment of any unit, confirmation of booking, reservation of any particular premises or a price lock or assurance regarding the availability, configuration or commercial terms of any unit. An EOI shall not create any right, title, interest or entitlement in favour of the person submitting the same.`,
                `Any amount collected towards an EOI, where applicable, shall be governed by the terms and conditions of the relevant EOI form and applicable project documentation. Refunds, if applicable, shall be processed in accordance with the refund terms expressly communicated in the relevant EOI documentation and applicable laws. Submission of an EOI shall not, by itself, entitle the applicant to claim allotment or any particular price, discount or commercial benefit.`,
                `Any actual booking, allotment or sale shall be subject to execution of the requisite documents, fulfilment of applicable conditions, receipt of necessary approvals and compliance with the applicable provisions of law, including the Real Estate (Regulation and Development) Act, 2016, wherever applicable.`
            ]
        },
        {
            title: "11. Payments and Prevention of Fraud",
            paragraphs: [
                `All payments in connection with any project shall be made strictly through authorised banking channels into the designated bank account specifically communicated by H. Rishabraj Group or the concerned project entity through its duly authorised representatives and official documentation.`,
                `Users and prospective purchasers are advised to independently verify the authenticity of payment instructions and the designated project bank account before initiating any transaction. H. Rishabraj Group shall not be responsible for payments made to unauthorised individuals, intermediaries, personal bank accounts or third-party accounts not officially designated for the concerned project, except to the extent such liability cannot be excluded under applicable law.`,
                `Users are cautioned against relying upon payment requests, QR codes, bank account details or payment links received through unofficial telephone calls, WhatsApp messages, social media accounts or other unauthorised communication channels.`
            ]
        },
        {
            title: "12. Public Advisory",
            paragraphs: [
                `It has come to our attention that certain individuals or entities may falsely claim to be associated with H. Rishabraj Group and may misuse the name, logo, identity or other materials of the Group, or represent themselves as its authorised representatives, without any authority or approval.`,
                `We wish to clarify that H. Rishabraj Group does not authorise or endorse any unauthorised investment schemes, paid membership programmes, earning opportunities or other financial arrangements purportedly offered in its name. Any such representations or claims made without the express authorisation of H. Rishabraj Group are unauthorised and may be fraudulent or misleading.`,
                `Members of the public are advised to exercise caution and verify the authenticity of any communication, offer, payment request or representation claiming to originate from or be associated with H. Rishabraj Group. In particular, the public is advised not to share personal or financial information or make any payments to unknown individuals or unauthorised persons claiming to represent the Group.`,
                `Any engagement with such unauthorised individuals or entities, whether through WhatsApp, Telegram, social media, telephone calls, emails, websites or in person, should be undertaken with due caution. H. Rishabraj Group shall not be responsible for any loss or damage arising from dealings with persons or entities who are not duly authorised by the Group, subject always to applicable laws.`,
                `For authentic information, project details and official communications, please refer only to the official website of H. Rishabraj Group: www.hrishabraj.com, or contact us through the official contact details published on the Website.`
            ]
        },
        {
            title: "13. Third-Party Links",
            paragraphs: [
                `This Website may contain links to external websites, government portals, regulatory authorities or other third-party platforms for convenience and informational purposes.`,
                `H. Rishabraj Group does not own, operate or control such external websites and does not endorse or guarantee the accuracy, availability or reliability of their content. Visitors accessing such external links do so at their own discretion.`,
                `To the extent permitted under applicable law, H. Rishabraj Group shall not be responsible for the content, policies or practices of such third-party websites.`
            ]
        },
        {
            title: "14. Limitation of Liability",
            paragraphs: [
                `To the extent permitted under applicable law, H. Rishabraj Group, its group entities, directors, officers, employees, representatives, consultants and service providers shall not be liable for any indirect, incidental, special, punitive or consequential losses or damages arising out of or in connection with:`
            ],
            bullets: [
                "Use of or inability to access this website.",
                "Reliance on information displayed on this website without independent verification.",
                "Technical errors, interruptions or temporary unavailability.",
                "Unauthorised access, cyber incidents or third-party interference.",
                "Content, information or services provided through third-party websites.",
                "Business interruption; loss of anticipated savings.",
                "Loss of business opportunity, goodwill or reputation.",
                "Any indirect or consequential loss or damage."
            ],
            after: [
                `Nothing in these Terms of Use shall exclude or restrict any liability that cannot legally be excluded or restricted under applicable law.`
            ]
        },
        {
            title: "15. Indemnity",
            paragraphs: [
                `You agree to indemnify and hold harmless H. Rishabraj Group, its group entities, directors, officers, employees, representatives and authorised service providers against any claims, losses, liabilities, damages, costs and expenses (including reasonable legal costs) arising out of or in connection with your unlawful use of the Website, violation of these Terms of Use, infringement of any intellectual property or other rights of any third party, or any act or omission involving fraud, misconduct or unauthorised activity by you, subject to applicable laws.`
            ]
        },
        {
            title: "16. Modification, Suspension and Termination",
            paragraphs: [
                `H. Rishabraj Group reserves the right to modify, amend, update, suspend, restrict, discontinue or withdraw any part of the Website, including its content, features, functionalities and services, at any time, for maintenance, upgrades, operational requirements, security reasons or other legitimate purposes, with or without prior notice, as may be appropriate in the circumstances.`,
                `H. Rishabraj Group may suspend, restrict or terminate a user's access to the Website, or any part thereof, in the event of:`
            ],
            lettered: [
                "Any violation of these Terms of Use by the user;",
                "Any suspected fraudulent, unlawful or unauthorised activity;",
                "Any act or omission that may compromise the security, integrity or proper functioning of the Website; or",
                "Any requirement or direction issued by a competent court, statutory authority or regulatory body."
            ],
            after: [
                `Users may discontinue their use of the Website at any time. Suspension or termination of access shall not affect any rights, obligations or liabilities accrued prior to such suspension or termination, or any provisions of these Terms of Use which are intended to survive the same.`
            ]
        },
        {
            title: "17. Website Availability",
            paragraphs: [
                `H. Rishabraj Group shall make reasonable efforts to maintain the availability and proper functioning of the Website. However, uninterrupted, continuous or error-free availability of the Website or any of its features and services is not guaranteed.`,
                `The Website, or any part thereof, may become temporarily unavailable or its functionality may be interrupted due to scheduled maintenance, technical issues, system upgrades, network interruptions, server failures, security concerns or circumstances beyond the reasonable control of H. Rishabraj Group.`,
                `H. Rishabraj Group shall not be responsible for any interruption or temporary unavailability of the Website arising from the circumstances mentioned above, to the extent permitted under applicable law.`
            ]
        },
        {
            title: "18. Governing Law and Jurisdiction",
            paragraphs: [
                `These Terms of Use shall be governed by and interpreted in accordance with the laws of India.`,
                `Subject to applicable laws and the jurisdiction of competent statutory, regulatory and other authorities or forums, courts having competent jurisdiction in Mumbai, Maharashtra, shall have jurisdiction over disputes arising out of or in connection with the access to or use of this Website.`
            ]
        },
        {
            title: "19. Amendments to Terms of Use",
            paragraphs: [
                `H. Rishabraj Group reserves the right to revise, modify or update these Terms of Use from time to time to reflect changes in its business practices, Website functionality, services or applicable laws and regulations.`,
                `Any revised version of these Terms of Use shall become effective upon publication on this Website, unless otherwise specified. Visitors are advised to periodically review these Terms of Use to remain informed of the applicable terms.`
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-30 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto px-6 py-10 sm:px-10 lg:px-14">

                <div className="border-b border-gray-200 pb-6 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#193b7d]">
                        Terms and Conditions
                    </h1>
                </div>

                <div className="space-y-9 text-gray-700 leading-7 text-[15px]">
                    {sections.map((section, index) => (
                        <section key={index}>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                {section.title}
                            </h2>

                            {section.paragraphs?.map((paragraph, i) => (
                                <p key={i} className={i > 0 ? "mt-3" : ""}>
                                    {paragraph}
                                </p>
                            ))}

                            {section.bullets && (
                                <ul className="list-disc pl-6 mt-3 space-y-2 marker:text-[#193b7d]">
                                    {section.bullets.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.lettered && (
                                <ol className="list-[lower-alpha] pl-6 mt-3 space-y-2 marker:text-gray-700">
                                    {section.lettered.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ol>
                            )}

                            {section.after?.map((paragraph, i) => (
                                <p key={i} className="mt-3">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TermsAndCondition;
