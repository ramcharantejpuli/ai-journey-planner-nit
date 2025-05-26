
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const FAQ = () => {
  const faqs = [
    {
      question: "Is this event mandatory for all students?",
      answer: "No, this is an optional workshop. However, it's highly recommended for students interested in AI and Data Science careers."
    },
    {
      question: "Can I join only the industrial tour to Mohali?",
      answer: "The workshop is designed as a complete 4-day experience. We recommend attending all days for maximum benefit, but contact support for special arrangements."
    },
    {
      question: "What should I bring to the workshop?",
      answer: "Bring your laptop, notebook, ID proof, comfortable clothes for the tour, and enthusiasm to learn!"
    },
    {
      question: "Are meals included in the registration fee?",
      answer: "Yes, all meals during the workshop days are included. Special dietary requirements can be accommodated."
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes, you'll receive an official certificate from NIT Jalandhar upon successful completion of the workshop."
    },
    {
      question: "Is accommodation provided?",
      answer: "Local participants can commute daily. Out-station participants can contact us for hostel accommodation arrangements."
    }
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">Get answers to common questions</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Collapsible className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 overflow-hidden">
                <CollapsibleTrigger className="w-full p-6 text-left hover:bg-white/5 transition-colors duration-300 flex items-center justify-between">
                  <h3 className="text-white font-medium text-lg">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-6 pt-0 text-gray-300">
                    {faq.answer}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
