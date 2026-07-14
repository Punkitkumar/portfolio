export const profile = {
  name: "Punkit Kumar",
  role: "Software Engineer | Backend · Applied AI · Distributed Systems",
  tagline: "Standard Chartered · IIT Kharagpur · LeetCode Knight · Codeforces Expert",
  email: "punkitkumar26@gmail.com",
  phones: ["+91 72090 63839"],
  linkedin: "https://www.linkedin.com/in/punkit-kumar-11a72a1b9/",
  github: "https://github.com/Punkitkumar",
  githubHandle: "Punkitkumar",
  leetcode: "https://leetcode.com/u/punkitkumar/",
  location: "Bengaluru, India",
  college: "IIT Kharagpur",
  company: "Standard Chartered",
  companyRole: "Development Engineer",
  headline:
    "Engineering production backends, RAG systems, and agentic AI — from payment platforms to multi-source LLM workflows.",
  summary:
    "IIT Kharagpur dual-degree graduate (B.Tech in Electronics & Electrical Communication Engineering + M.Tech in Vision & Intelligent Systems) and Teaching Assistant. Through Standard Chartered GBS and Landmark Group’s Logistiq Lab, I have designed scalable full-stack applications, RESTful APIs, data pipelines, and cloud-native microservices using Docker, Kubernetes, Spring Boot, React, GCP, and CI/CD. I engineer advanced AI systems — specializing in RAG, agentic MCP workflows, prompt engineering for LLMs, hybrid search, OCR with ResNet, and NLP-intensive deep learning with TensorFlow and PyTorch. Competitive programming credentials (LeetCode Knight, Codeforces Expert, CodeChef 4-Star) ground my work in algorithms, systems design, and rigorous problem-solving.",
  interests: [
    "Software Engineering",
    "Backend Architecture",
    "Machine Learning",
    "AI Systems Engineering",
    "Cloud Engineering",
  ],
}

export const domains = [
  {
    name: "Backend",
    detail:
      "Spring Boot, FastAPI, REST APIs, microservices, Kafka, JWT, RBAC — production services with concurrency and idempotency",
    accent: "teal",
  },
  {
    name: "Applied AI",
    detail:
      "RAG, MCP agents, hybrid search, prompt engineering, OCR, dense embeddings, ChromaDB, FAISS, TensorFlow & PyTorch",
    accent: "amber",
  },
  {
    name: "Distributed Systems",
    detail:
      "Cloud-native microservices, asynchronous processing, event-driven pipelines, and restart-safe ingestion at scale",
    accent: "ink",
  },
  {
    name: "Finance",
    detail:
      "Standard Chartered · payment platforms, loan origination, Hive-to-PostgreSQL migration, SCPay reporting",
    accent: "teal",
  },
  {
    name: "Logistics",
    detail:
      "Logistiq · Landmark Group · Kafka event delivery, Jsprit route planning, GCP receipt storage, JWT-secured APIs",
    accent: "amber",
  },
  {
    name: "Mentorship",
    detail:
      "IIT Kharagpur TA · AlgoZenith mentor · Chegg Calculus SME — teaching algorithms, electronics, and interview prep",
    accent: "ink",
  },
  {
    name: "Competitive Programming",
    detail:
      "LeetCode Knight · Codeforces Expert · CodeChef 4-Star · global contest ranks among 23,000+ participants",
    accent: "teal",
  },
]

export const skills = [
  {
    title: "Languages",
    items: ["Java", "Python", "C++", "SQL", "JavaScript", "Go", "C", "Bash"],
  },
  {
    title: "AI / ML & Agents",
    items: [
      "RAG",
      "MCP",
      "LLM Agents",
      "Prompt Engineering",
      "Hybrid Search",
      "BM25",
      "Dense Embeddings",
      "Reranking",
      "ChromaDB",
      "FAISS",
      "Hugging Face",
      "Claude",
      "TensorFlow",
      "PyTorch",
      "OCR / ResNet",
    ],
  },
  {
    title: "Backend & Distributed Systems",
    items: [
      "Spring Boot",
      "FastAPI",
      "React",
      "REST APIs",
      "Microservices",
      "Kafka",
      "JWT",
      "RBAC",
      "Concurrency",
      "Idempotency",
      "JUnit 5",
      "Mockito",
    ],
  },
  {
    title: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Apache Hive",
      "SQL / NoSQL",
      "Vector Databases",
      "Schema Design",
      "Indexing",
      "Query Optimization",
    ],
  },
  {
    title: "Cloud / DevOps",
    items: [
      "GCP",
      "AWS",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Azure DevOps",
      "Git",
      "Render",
      "n8n",
      "Postman",
    ],
  },
]

export const experience = [
  {
    role: "Development Engineer",
    company: "Standard Chartered · CIB Cash Technology",
    location: "Bengaluru, India",
    period: "Jul 2025 – Present",
    highlights: [
      "Architected restart-safe ingestion for a 30,000+ page Confluence RAG corpus by implementing 100-page checkpoints, delta indexing, and snapshot recovery, eliminating full-corpus reprocessing after interrupted refreshes.",
      "Orchestrated hybrid retrieval across 2 search modalities by fusing BM25 with 384-dimensional embeddings and reranking the top 60 sparse and dense candidates through Python, MCP, and ChromaDB.",
      "Engineered a 6-agent MCP workflow spanning Azure DevOps, Confluence, and production databases, reducing engineering story investigation time by 60–70% through multi-source reasoning with Claude.",
      "Optimized a streaming JSON-to-XML transformation service to sub-5 ms latency, validating correctness across 1M+ requests while preventing data loss through deterministic mapping and hardened XML processing.",
      "Migrated 20+ Apache Hive workloads from EDMP to PostgreSQL by rewriting incompatible queries, reconciling outputs, and preserving downstream payment-report integrity.",
      "Streamlined payment-report generation across 2 data layers by building DAO components and indexed SQL retrieval paths for structured SCPay datasets.",
    ],
  },
  {
    role: "Teaching Assistant · Basic Electronics",
    company: "Indian Institute of Technology, Kharagpur",
    location: "Kharagpur, India",
    period: "Aug 2024 – Apr 2025",
    highlights: [
      "Supported undergraduate Basic Electronics coursework as a Teaching Assistant — clarifying concepts, guiding problem sets, and mentoring students through the dual-degree ECE curriculum.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Logistiq · Landmark Group",
    location: "Dubai (Remote) · Bengaluru",
    period: "Sep 2024 – Mar 2025",
    highlights: [
      "Delivered 4 production backend capabilities spanning transactional persistence, GCP receipt storage, Kafka event delivery, and JWT request security using Java and Spring Boot.",
      "Orchestrated asynchronous communication across distributed services by implementing Kafka producers and consumers with resilient event-processing paths for payment and logistics workflows.",
      "Integrated complex third-party payment gateway providers and cloud storage for document management under tight delivery timelines — recognized by stakeholders for ownership and production-quality execution.",
      "Optimized last-mile route planning by incorporating zone-level service times into the Jsprit vehicle-routing algorithm, improving constraint fidelity during peak delivery scheduling.",
      "Hardened API security across authentication, authorization, and request tracing with JWT filters and protected Spring Security endpoints; reached 85% code coverage via JUnit 5 and Mockito CI suites.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Standard Chartered · CIB DCDA",
    location: "Chennai / Bengaluru, India",
    period: "May 2024 – Jul 2024",
    highlights: [
      "Shipped a 3-layer loan-origination application using React, Redux, Material UI, Spring Boot, and PostgreSQL, centralizing workflow state and reducing redundant client-side rendering.",
      "Designed a production-oriented relational model with normalization, constraints, indexes, and UML-based entity mapping for secure payment workflows.",
      "Integrated frontend and backend across 3 S2B payment stages by validating API contracts, transaction flows, and role-based access boundaries.",
    ],
  },
  {
    role: "Winter Intern · Python Developer",
    company: "University of Leeds",
    location: "Remote",
    period: "Dec 2023 – Jan 2024",
    highlights: [
      "Built Python-based tooling and engineering deliverables in collaboration with a Russell Group research institution, sharpening applied software development practice.",
    ],
  },
]

export const projects = [
  {
    title: "AlgoSearch — AI-Powered Coding Problem Search Engine",
    tag: "Hybrid Search · FastAPI · Docker · Render",
    org: "May 2025 – Jun 2025",
    description:
      "Built a hybrid search platform over 6,000+ LeetCode and Codeforces problems by combining BeautifulSoup ingestion, BM25 lexical retrieval, and FAISS semantic indexing. Calibrated relevance through a 40:60 lexical-to-semantic scoring blend using MiniLM embeddings, returning full-corpus results with sub-second retrieval via FastAPI, Docker, and Render.",
    metric: "Sub-second retrieval",
  },
  {
    title: "Adaptive Sparse Signal Recovery",
    tag: "M.Tech Thesis · Bilevel Optimization · Compressed Sensing",
    org: "IIT Kharagpur · Aug 2024 – Apr 2025",
    description:
      "Formulated a bilevel optimization framework that jointly learned sensing matrices and Smooth-L1 hyperparameters using HOAG under noisy measurements. Improved recovery quality by 15%, achieving 0.65 NMSE and 0.34 support recovery against baselines at an 80% compression rate.",
    metric: "15% quality gain",
  },
  {
    title: "Coding Question Search Engine",
    tag: "Flask · TF-IDF · Selenium · Render",
    org: "May 2023 – Jun 2023",
    description:
      "Engineered a Python/Flask search engine over 5,000+ DSA problems scraped from LeetCode and Codeforces with Selenium. Ranked results with TF-IDF relevance scoring and deployed on Render with GET/POST search endpoints for concurrent access.",
    metric: "5,000+ problems",
  },
]

export const education = {
  degree: "B.Tech + M.Tech, Dual Degree",
  school: "Indian Institute of Technology (IIT) Kharagpur",
  period: "Dec 2020 – May 2025",
  details: [
    "M.Tech in Vision & Intelligent Systems",
    "B.Tech in Electronics & Electrical Communication Engineering",
    "CGPA: 7.96 / 10",
  ],
  coursework: [
    "Deep Learning",
    "Pattern Recognition & Machine Intelligence",
    "Image & Video Processing",
    "Foundations of Learning Theory",
    "Vision & Visualization",
    "Algorithms",
    "Data Structures & Object Representation",
    "Computer Architecture",
    "Digital Signal Processing",
    "Probability & Statistics",
    "Linear Algebra & Optimization",
  ],
}

export const achievements = [
  {
    title: "LeetCode Knight · Top 2.9%",
    detail:
      "1968 Knight rating with global contest ranks 216 and 319 among 23,000+ participants — strong algorithms and systems design foundation.",
  },
  {
    title: "Codeforces Expert · CodeChef 4-Star",
    detail: "1780 Codeforces rating and 1947 CodeChef rating across rated contests.",
  },
  {
    title: "Google Contest Ranks",
    detail:
      "Global rank 1407 in Google Farewell Round A and rank 2029 in Google Kick Start Round G among 18,000+ competitors.",
  },
  {
    title: "CBSE Class 12 · 97.40%",
    detail:
      "School Topper · 2nd District Topper, Dhanbad — Chemistry 100/100 at D.A.V. Public School Koyla Nagar.",
  },
]

export const mentorship = [
  {
    title: "Teaching Assistant · IIT Kharagpur",
    detail:
      "TA for Basic Electronics (Aug 2024 – Apr 2025), mentoring undergraduates through the ECE curriculum while completing the dual degree.",
  },
  {
    title: "Mentor · AlgoZenith",
    detail:
      "Mentored students through data structures, algorithms, and technical interview preparation (Jul 2023 – Nov 2024), combining live guidance with a structured growth process.",
  },
  {
    title: "Subject Matter Expert · Chegg India",
    detail:
      "Solved 500+ calculus doubts for students worldwide (Apr 2021 – Mar 2023), sharpening communication and pedagogical clarity.",
  },
]

export const recommendation = {
  quote:
    "Punkit played a crucial role in successfully delivering the Payment Service implementation within tight deadlines while maintaining high-quality work. He quickly understood and contributed to the integration of complex third-party gateway providers… I would recommend him to any team seeking a proactive and enthusiastic individual who takes ownership of his tasks and delivers results efficiently.",
  author: "Nishant Sharma",
  context: "Landmark Group · Logistiq",
}
