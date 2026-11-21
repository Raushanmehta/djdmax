import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I book an event?",
    answer:
      "Browse the events, choose the one you want, add it to your cart, and complete checkout.",
  },
  {
    question: "Where can I see my bookings?",
    answer:
      "Sign in and open My Account to view your booking history and booking details.",
  },
  {
    question: "How can I ask about changing or cancelling a booking?",
    answer:
      "Contact our team with your booking details and we’ll help you with the available options.",
  },
  {
    question: "How do I contact the team?",
    answer:
      "Use our Contact Us page or the phone and email details listed in the footer.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(faqs[0].question);

  return (
    <section className="bg-gray-50 py-10 md:py-16 lg:py-20 px-4 transition-colors duration-300 dark:bg-gray-950 md:py-24">
      <div className="mx-auto max-w-[1330px] ">
       
         {/* Heading */}
        <div className="text-center mb-7 md:mb-10">
          <h2 className="testimonial-display text-gray-900 dark:text-white text-[clamp(2rem,4vw,5.75rem)] leading-[0.92]">
            <span className="block"> Frequently</span>
            <span className="mx-auto mt-2.5 block w-fit -rotate-2 origin-left bg-orange-500 px-5 py-2 text-[clamp(1.35rem,3.5vw,2rem)] leading-none text-white shadow-[7px_7px_0_rgba(249,115,22,0.2)] dark:shadow-[7px_7px_0_rgba(249,115,22,0.35)]">
             Asked Questions
              </span>
          </h2>
        </div>


        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className={`rounded-xl border bg-white px-5 shadow-sm transition-colors dark:bg-gray-900 ${
                openFaq === faq.question
                  ? "border-orange-300 dark:border-orange-500/60"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              <button
                type="button"
                aria-expanded={openFaq === faq.question}
                aria-controls={`faq-answer-${index}`}
                onClick={() =>
                  setOpenFaq(openFaq === faq.question ? null : faq.question)
                }
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-gray-900 dark:text-white"
              >
                {faq.question}
                <ChevronDown
                  aria-hidden="true"
                  size={20}
                  className={`shrink-0 text-orange-500 transition-transform duration-300 motion-reduce:transition-none ${
                    openFaq === faq.question ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                aria-hidden={openFaq !== faq.question}
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                  openFaq === faq.question
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="pb-5 pr-8 leading-7 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
