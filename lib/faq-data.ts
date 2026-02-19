export interface FAQItem {
  id: string;
  question: {
    en: string;
    ar: string;
  };
  answer: {
    en: string;
    ar: string;
  };
}

export const faqData: FAQItem[] = [
  {
    id: "q1",
    question: {
      en: "What are the visiting hours for patients?",
      ar: "ما هي مواعيد زيارة المرضى؟",
    },
    answer: {
      en: "Visiting hours vary by department to ensure patient comfort and safety.\n• Inpatients: 10:00 AM – 10:00 PM\n• ICU: 4:00 PM – 5:00 PM\nPlease contact reception for any updates.",
      ar: "تختلف مواعيد الزيارة حسب القسم لضمان راحة المرضى وسلامتهم.\n• المرضى الداخليين: من 10 صباحًا حتى 10 مساءً\n• الرعاية المركزة: من 4 مساءً حتى 5 مساءً",
    },
  },
  {
    id: "q2",
    question: {
      en: "How can I book an appointment?",
      ar: "كيف يمكنني حجز موعد؟",
    },
    answer: {
      en: "You can book an appointment via:\n• Hotline: 19986\n• WhatsApp: 01029640837\n• Facebook: facebook.com/Drbadranhospital",
      ar: "يمكنك حجز موعد من خلال:\n• الخط الساخن: 19986\n• واتساب: 01029640837",
    },
  },
  {
    id: "q3",
    question: {
      en: "Does the hospital have an emergency department?",
      ar: "هل يوجد قسم طوارئ؟",
    },
    answer: {
      en: "Yes, Badran Hospital has a fully equipped Emergency Department with specialist doctors, laboratory, and imaging services available.",
      ar: "نعم، يضم مستشفى بدران قسم طوارئ مجهز بالكامل بأطباء أخصائيين واستشاريين مع خدمات المعمل والأشعة.",
    },
  },
  {
    id: "q4",
    question: {
      en: "Is the emergency department available 24/7?",
      ar: "هل الطوارئ تعمل 24 ساعة؟",
    },
    answer: {
      en: "Yes, emergency services are available 24 hours a day, 7 days a week.",
      ar: "نعم، قسم الطوارئ يعمل على مدار 24 ساعة طوال أيام الأسبوع.",
    },
  },
  {
    id: "q5",
    question: {
      en: "Does the hospital provide ICU services?",
      ar: "هل يوجد عناية مركزة؟",
    },
    answer: {
      en: "Yes, we provide a fully equipped ICU supervised by experienced medical professionals.",
      ar: "نعم، يوفر المستشفى وحدة عناية مركزة مجهزة بالكامل تحت إشراف فريق طبي متخصص.",
    },
  },
  {
    id: "q6",
    question: {
      en: "Does the hospital provide radiology services?",
      ar: "هل يوجد خدمات أشعة؟",
    },
    answer: {
      en: "We provide comprehensive imaging services including:\n• X-ray\n• Ultrasound\n• CT Scan\n• Other diagnostic imaging",
      ar: "يقدم المستشفى خدمات الأشعة المختلفة مثل:\n• الأشعة السينية\n• السونار\n• الأشعة المقطعية",
    },
  },
  {
    id: "q7",
    question: {
      en: "Is there a medical laboratory?",
      ar: "هل يوجد معمل تحاليل؟",
    },
    answer: {
      en: "Yes, our on-site laboratory provides accurate diagnostic tests with timely results (24/7).",
      ar: "نعم، يحتوي المستشفى على معمل تحاليل متكامل لتقديم نتائج دقيقة وفي الوقت المناسب على مدار اليوم.",
    },
  },
  {
    id: "q8",
    question: {
      en: "Can I know treatment costs before admission?",
      ar: "هل يمكن معرفة التكلفة قبل الدخول؟",
    },
    answer: {
      en: "Yes, our administrative team can provide estimated costs before admission whenever possible. Please contact us for details.",
      ar: "نعم، يمكن لفريق خدمة العملاء تزويدك بمعلومات تقديرية عن التكاليف قبل بدء العلاج قدر الإمكان. يرجى التواصل معنا لمزيد من التفاصيل.",
    },
  },
  {
    id: "q9",
    question: {
      en: "Does the hospital work with insurance companies?",
      ar: "هل يتعامل المستشفى مع شركات التأمين؟",
    },
    answer: {
      en: "Yes, Badran Hospital collaborates with multiple health insurance companies. Please contact us to confirm coverage details.",
      ar: "نعم، يتعاون المستشفى مع عدد من شركات التأمين الطبي. يرجى التواصل معنا للتأكد من تفاصيل التغطية.",
    },
  },
  {
    id: "q10",
    question: {
      en: "Does the hospital offer physiotherapy services?",
      ar: "هل يوجد علاج طبيعي وتأهيل؟",
    },
    answer: {
      en: "Yes, we provide physiotherapy and rehabilitation services as part of our comprehensive patient care programs.",
      ar: "نعم، يقدم المستشفى خدمات العلاج الطبيعي والتأهيل ضمن برامج رعاية متكاملة للمرضى.",
    },
  },
];
