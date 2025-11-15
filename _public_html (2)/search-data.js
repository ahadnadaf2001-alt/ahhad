// ═══════════════════════════════════════════════════════════════════════
// SEARCH DATA - Article/Report Database
// Add all your articles here for searchability
// ═══════════════════════════════════════════════════════════════════════

const searchDatabase = [
  {
    id: 1,
    title: "Scaling AI You Can Trust",
    category: "Machine Learning",
    categoryEmoji: "🤖",
    excerpt: "Transforming people, operations and performance with responsible AI models.",
    description: "A comprehensive report on transforming operations and performance with responsible AI models. Learn how to scale AI responsibly in your organization.",
    url: "AI Article/Scaling AI You Can Trust.html",
    image: "Image/demo.jpg",
    date: "Nov 14, 2025",
    tags: ["AI", "Machine Learning", "Automation", "Responsible AI", "Enterprise"],
    searchKeywords: ["scaling", "ai", "trust", "responsible", "machine learning", "automation", "operations", "performance"]
  },
  {
    id: 2,
    title: "RPA vs. Cognitive Automation: Which is Right for Your Business?",
    category: "Automation",
    categoryEmoji: "⚙️",
    excerpt: "An essential comparison guide to help C-Suites select the ideal automation strategy for efficiency gains.",
    description: "Compare Robotic Process Automation (RPA) with cognitive automation to determine the best approach for your business needs.",
    url: "ai.html",
    image: "Image/demo.jpg",
    date: "Oct 05, 2025",
    tags: ["Automation", "RPA", "Cognitive Automation", "Business Strategy"],
    searchKeywords: ["rpa", "automation", "cognitive", "comparison", "business", "efficiency", "strategy"]
  },
  {
    id: 3,
    title: "The Future of Code: Generative AI in Web Development",
    category: "Software Development",
    categoryEmoji: "💻",
    excerpt: "How large language models and generative AI are accelerating development cycles and changing developer roles.",
    description: "Explore how generative AI and LLMs are transforming web development, accelerating deployment cycles, and reshaping developer responsibilities.",
    url: "ai.html",
    image: "Image/demo.jpg",
    date: "Sep 20, 2025",
    tags: ["AI", "Development", "Generative AI", "Web Development", "LLM"],
    searchKeywords: ["generative", "ai", "web", "development", "code", "developer", "llm", "future"]
  },
  {
    id: 4,
    title: "The State of Cyber Security 2025",
    category: "Cyber Security",
    categoryEmoji: "🔒",
    excerpt: "Essential checklist for C-Suites to navigate risk management in the hybrid work era.",
    description: "A comprehensive analysis of the current cyber security landscape in 2025, with actionable insights for executives to protect their organizations.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Oct 28, 2025",
    tags: ["Cyber Security", "Risk Management", "Hybrid Work", "Security Strategy"],
    searchKeywords: ["cyber", "security", "risk", "management", "2025", "hybrid", "work", "protection"]
  },
  {
    id: 5,
    title: "Cloud Migration Guide",
    category: "Cloud Computing",
    categoryEmoji: "☁️",
    excerpt: "Strategic steps for building and optimizing your presence in the cloud.",
    description: "A strategic guide to successfully migrating your infrastructure and applications to cloud platforms with minimal disruption.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Sep 01, 2025",
    tags: ["Cloud", "Migration", "Infrastructure", "Cloud Computing", "Strategy"],
    searchKeywords: ["cloud", "migration", "infrastructure", "computing", "optimization", "strategy", "guide"]
  },
  {
    id: 6,
    title: "Modern ERP Solutions Guide",
    category: "Business & Finance",
    categoryEmoji: "💼",
    excerpt: "Comprehensive guide to implementing modern ERP systems in your organization.",
    description: "Learn how to select, implement, and optimize modern ERP solutions for your enterprise business operations.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Aug 15, 2025",
    tags: ["ERP", "Business", "Finance", "Enterprise", "Operations"],
    searchKeywords: ["erp", "enterprise", "business", "finance", "system", "operations", "modern"]
  },
  {
    id: 7,
    title: "Identity & Access Management (IAM) Best Practices",
    category: "Cyber Security",
    categoryEmoji: "🔐",
    excerpt: "Secure your organization with comprehensive identity and access management strategies.",
    description: "Comprehensive guide to implementing IAM solutions to protect user identities and control access across your organization.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Sep 10, 2025",
    tags: ["IAM", "Security", "Access Control", "Identity Management"],
    searchKeywords: ["iam", "identity", "access", "management", "security", "authentication", "authorization"]
  },
  {
    id: 8,
    title: "Data Protection & Privacy Compliance",
    category: "Cyber Security",
    categoryEmoji: "🛡️",
    excerpt: "Navigate GDPR, CCPA, and other data protection regulations with confidence.",
    description: "A detailed guide to understanding and implementing data protection compliance frameworks like GDPR and CCPA.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Aug 25, 2025",
    tags: ["Data Protection", "Privacy", "GDPR", "CCPA", "Compliance"],
    searchKeywords: ["data", "protection", "privacy", "gdpr", "ccpa", "compliance", "regulation"]
  },
  {
    id: 9,
    title: "Cloud Infrastructure: IaaS vs PaaS",
    category: "Cloud Computing",
    categoryEmoji: "🏗️",
    excerpt: "Choose the right cloud infrastructure model for your organization's needs.",
    description: "A comprehensive comparison of Infrastructure as a Service (IaaS) and Platform as a Service (PaaS) solutions.",
    url: "categories.html",
    image: "Image/demo.jpg",
    date: "Jul 30, 2025",
    tags: ["Cloud", "IaaS", "PaaS", "Infrastructure", "Platform"],
    searchKeywords: ["cloud", "iaas", "paas", "infrastructure", "platform", "service", "model"]
  },
  {
    id: 10,
    title: "Robotics & Process Automation Trends",
    category: "Automation",
    categoryEmoji: "🤖",
    excerpt: "Emerging trends in robotics and process automation technologies.",
    description: "Explore the latest developments in robotics and automation technologies reshaping industries.",
    url: "ai.html",
    image: "Image/demo.jpg",
    date: "Oct 10, 2025",
    tags: ["Robotics", "Automation", "Technology", "Innovation"],
    searchKeywords: ["robotics", "automation", "robot", "process", "technology", "trends", "innovation"]
  },
  // Add this to your searchDatabase array in search-data.js
{
  id: 11,
  title: "How to Champion AI as an Executive",
  category: "AI Strategy",
  categoryEmoji: "👔",
  excerpt: "Strategic guide to leading AI transformation and building organizational capabilities.",
  description: "Comprehensive guide for executives on how to champion AI adoption, build organizational capabilities, establish governance, and drive business value through responsible AI implementation.",
  url: "AI-Article/How-to-Champion-AI-as-an-Executive/How-to-Champion-AI-as-an-Executive.html",
  image: "Image/demo.jpg",
  date: "Nov 15, 2025",
  tags: ["AI Strategy", "Executive Leadership", "AI Transformation", "Organizational Change", "Data Governance"],
  searchKeywords: ["champion", "ai", "executive", "leadership", "strategy", "transformation", "organizational", "change", "governance", "talent"]
}
];