import { Article } from "@/types/article";
import tarrifImage from "@/assets/India-USA-Tariff.png"

export const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const initialArticles: Article[] = [
    {
    id: "1",
    title: "The Future of Artificial Intelligence in Healthcare",
    content: `Artificial Intelligence is revolutionizing healthcare in unprecedented ways. From diagnostic imaging to drug discovery, AI technologies are enhancing the accuracy and speed of medical processes.

Machine learning algorithms can now detect diseases in medical images with accuracy rates that often surpass human specialists. This breakthrough is particularly significant in fields like radiology, where early detection can be life-saving.

The integration of AI in healthcare extends beyond diagnosis. Predictive analytics help hospitals manage resources more efficiently, while AI-powered robots assist in surgeries with precision that reduces recovery times.

However, the implementation of AI in healthcare also raises important ethical questions about data privacy and the role of human judgment in medical decisions. As we move forward, striking the right balance between technological advancement and human oversight will be crucial.`,
    excerpt: "Exploring how AI is transforming medical diagnosis, treatment, and patient care across the healthcare industry.",
    author: "Tax Sahi",
    category: "technology" as const,
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["AI", "Healthcare", "Innovation", "Medical Technology"],
    publishedAt: new Date("2025-01-15"),
    readTime: 5,
    featured: true,
  },

  {
    id: "2",
    title: "Sustainable Business Practices in 2025",
    content: `As environmental concerns continue to grow, businesses worldwide are adopting sustainable practices not just as a moral imperative, but as a strategic advantage.

Companies are discovering that sustainable practices often lead to cost savings, improved brand reputation, and increased customer loyalty. From reducing energy consumption to implementing circular economy principles, businesses are finding innovative ways to minimize their environmental impact.

The rise of ESG (Environmental, Social, and Governance) investing has further accelerated this trend, with investors increasingly considering sustainability metrics when making investment decisions.

Small businesses, in particular, are finding creative ways to implement sustainable practices, often with limited resources but maximum impact through community engagement and local partnerships.`,
    excerpt: "How companies are integrating environmental responsibility into their core business strategies for long-term success.",
    author: "Tax Sahi",
    category: "business" as const,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Sustainability", "Business", "Environment", "ESG"],
    publishedAt: new Date("2025-01-14"),
    readTime: 4,
  },
  {
    id: "3",
    title: "The Rise of Electric Vehicles in Professional Sports",
    content: `Professional sports are embracing electric vehicles in ways that extend far beyond just transportation. From Formula E racing to electric support vehicles at major sporting events, the automotive revolution is making its mark on the sports industry.

Formula E has emerged as a premier racing series, showcasing the performance capabilities of electric vehicles while promoting sustainable technology. The series has attracted major automotive manufacturers and has become a testing ground for innovations that eventually make their way to consumer vehicles.

Traditional motorsports are also evolving, with NASCAR and other racing series exploring hybrid and electric alternatives. This shift represents not just an environmental consideration, but also a response to changing consumer preferences and sponsor demands.

Beyond racing, sports teams and venues are investing in electric vehicle infrastructure, creating charging stations for fans and transitioning their fleet vehicles to electric alternatives.`,
    excerpt: "Examining the growing influence of electric vehicle technology in various sporting disciplines and venues.",
    author: "Tax Sahi",
    category: "sports" as const,
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Electric Vehicles", "Sports", "Racing", "Technology"],
    publishedAt: new Date("2025-01-13"),
    readTime: 3,
  },
  {
    id: "4",
    title: "Streaming Wars: The Battle for Entertainment Dominance",
    content: `The entertainment landscape has been forever changed by the rise of streaming platforms. What started with Netflix disrupting traditional television has evolved into a complex ecosystem of competing services, each vying for consumer attention and subscription dollars.

Disney+, HBO Max, Amazon Prime Video, and numerous other platforms have entered the fray, creating an unprecedented amount of original content. This competition has led to what many call the "Golden Age of Television," with high-budget productions and diverse storytelling reaching global audiences.

However, the fragmentation of content across multiple platforms has created new challenges for consumers, who now face "subscription fatigue" as they navigate an increasingly complex array of services.

The pandemic accelerated the shift toward streaming, fundamentally altering how content is produced, distributed, and consumed. Traditional media companies have been forced to adapt or risk obsolescence.`,
    excerpt: "Analyzing the competitive landscape of streaming services and their impact on traditional entertainment media.",
    author: "Tax Sahi",
    category: "entertainment" as const,
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Streaming", "Entertainment", "Technology", "Media"],
    publishedAt: new Date("2025-01-12"),
    readTime: 6,
  },
  {
    id: "5",
    title: "Quantum Computing: The Next Frontier",
    content: `Quantum computing represents one of the most significant technological advances of our time, promising to solve complex problems that are currently impossible for classical computers.

Unlike traditional computers that use bits to process information, quantum computers use quantum bits (qubits) that can exist in multiple states simultaneously. This quantum superposition allows for exponentially more powerful calculations.

The potential applications are staggering: from drug discovery and financial modeling to cryptography and artificial intelligence. Major tech companies like IBM, Google, and Microsoft are investing billions in quantum research.

However, quantum computing also presents challenges, particularly in cybersecurity, as it could potentially break current encryption methods. This has led to research into quantum-resistant cryptography.`,
    excerpt: "Understanding the revolutionary potential of quantum computing and its implications for the future of technology.",
    author: "Tax Sahi",
    category: "technology" as const,
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Quantum Computing", "Technology", "Innovation", "Future"],
    publishedAt: new Date("2025-01-11"),
    readTime: 7,
  },
  {
    id: "6",
    title: "The Future of Remote Work Culture",
    content: `Remote work has evolved from a temporary pandemic solution to a permanent fixture in the modern workplace. Companies worldwide are reimagining their organizational structures to accommodate distributed teams.

The benefits of remote work extend beyond geographical flexibility. Studies show increased productivity, better work-life balance, and reduced operational costs for businesses. However, challenges remain in maintaining company culture and ensuring effective collaboration.

Hybrid work models are emerging as a popular compromise, combining the benefits of remote work with the collaborative advantages of in-person interaction. This approach requires new management strategies and technological infrastructure.

The long-term implications of this shift are still unfolding, affecting everything from urban planning to commercial real estate markets.`,
    excerpt: "Exploring how remote work is reshaping organizational culture and the future of professional collaboration.",
    author: "Tax Sahi",
    category: "business" as const,
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    tags: ["Remote Work", "Business", "Culture", "Future"],
    publishedAt: new Date("2025-01-10"),
    readTime: 5,
  },
  {
    id: "7",
    title: "Tariff Tensions 2025: How India-US Trade is Shifting",
    content: `In 2025, the economic relationship between India and the United States is entering a crucial phase, marked by both cooperation and contention. The two nations, long seen as strategic partners in global trade, are experiencing renewed tensions due to evolving tariff policies. Washington has expressed concerns over India’s protective measures in key sectors such as electronics, pharmaceuticals, and agriculture, arguing that these restrictions create trade imbalances. On the other hand, New Delhi contends that such measures are necessary to safeguard domestic industries, support “Make in India” initiatives, and reduce dependency on foreign imports.

The introduction of higher tariffs on steel, aluminum, and select IT products has triggered diplomatic negotiations, with both sides seeking common ground while safeguarding national interests. The U.S. business lobby continues to press for greater market access in India, while Indian exporters demand fair treatment in American markets. Despite these challenges, trade volumes between the two countries remain robust, reflecting their mutual dependence in technology, services, and energy. Analysts predict that while short-term frictions may persist, long-term cooperation is likely to strengthen as both nations recognize the strategic value of their partnership.

Ultimately, the tariff tensions of 2025 highlight the delicate balance between protectionism and globalization. India and the U.S. must navigate these challenges carefully, ensuring that policy decisions foster growth without undermining trust. The trajectory of their trade relations will not only shape bilateral ties but also influence global economic dynamics in an era of shifting alliances and emerging trade blocs.`,
    excerpt: "Analyzing the evolving trade relationship between India and the US in 2025.",
    author: "Tax Sahi",
    category: "business" as const,
    imageUrl: tarrifImage,
    tags: ["Trade", "Economy", "India", "US","Tariffs", "USA", "Modi","Trump", "Exports", "Inflation"],
    publishedAt: new Date("2025-08-10"),
    readTime: 6,
       featured: true,
  }
];