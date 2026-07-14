export const profile = {
  name: "Punkit Kumar",
  role: "Backend Engineer | Applied AI / ML Engineer | Distributed Systems",
  email: "punkitkumar26@gmail.com",
  phones: ["+91 72090 63839"],
  linkedin: "https://www.linkedin.com/in/punkit-kumar-11a72a1b9/",
  github: "https://github.com/Punkitkumar",
  leetcode: "https://leetcode.com/u/punkitkumar/",
  location: "Bengaluru, India",
  college: "IIT Kharagpur",
  company: "Standard Chartered GBS",
  companyRole: "Software Development Engineer",
  headline: "Building production backend systems, RAG pipelines, and distributed AI workflows.",
  summary:
    "IIT Kharagpur dual-degree graduate (B.Tech in Electronics & Electrical Communication Engineering + M.Tech in Vision & Intelligent Systems) with production backend and applied AI experience at Standard Chartered GBS and Landmark Group. Combines distributed systems engineering — Spring Boot, Kafka, PostgreSQL, microservices — with applied AI/ML execution using RAG, MCP agent workflows, hybrid search, and vector databases.",
  interests: [
    "Backend Engineer",
    "Applied AI / ML Engineer",
    "Distributed Systems Engineer",
    "Software Engineer",
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
    detail: "RAG, MCP agents, hybrid search, BM25, dense embeddings, reranking, ChromaDB, FAISS, and LLM orchestration",
    accent: "amber",
  },
  {
    name: "Distributed Systems",
    detail: "Asynchronous processing, event-driven architecture, streaming pipelines, and restart-safe ingestion at scale",
    accent: "ink",
  },
  {
    name: "Finance",
    detail: "Standard Chartered · CIB Cash Technology · payment reports, Hive-to-PostgreSQL migration, SCPay datasets",
    accent: "teal",
  },
  {
    name: "Logistics",
    detail: "Logistiq · Kafka event delivery, route optimization with Jsprit, GCP receipt storage, JWT-secured APIs",
    accent: "amber",
  },
  {
    name: "ECE",
    detail: "IIT Kharagpur · Electronics & Electrical Communication Engineering foundation",
    accent: "ink",
  },
  {
    name: "Competitive Programming",
    detail: "LeetCode Knight · Codeforces Expert · CodeChef 4-Star · global contest ranks among 23,000+ participants",
    accent: "teal",
  },
]

export const skills = [
  {
    title: "Languages",
    items: ["Java", "Python", "C++", "SQL", "JavaScript", "C", "Bash"],
  },
  {
    title: "AI/ML Infrastructure",
    items: [
      "RAG",
      "MCP",
      "LLM Agents",
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
    ],
  },
  {
    title: "Backend & Distributed Systems",
    items: [
      "Spring Boot",
      "FastAPI",
      "REST APIs",
      "Microservices",
      "Kafka",
      "Asynchronous Processing",
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
      "Vector Databases",
      "Schema Design",
      "Indexing",
      "Query Optimization",
    ],
  },
  {
    title: "Cloud / DevOps",
    items: ["GCP", "Docker", "CI/CD", "Git", "Azure DevOps", "Render", "Postman"],
  },
]

export const experience = [
  {
    role: "Software Development Engineer",
    company: "Standard Chartered GBS · CIB Cash Technology",
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
    role: "Technology Intern",
    company: "Logistiq · Landmark Group",
    location: "Bengaluru, India",
    period: "Sep 2024 – Mar 2025",
    highlights: [
      "Delivered 4 production backend capabilities spanning transactional persistence, GCP receipt storage, Kafka event delivery, and JWT request security using Java and Spring Boot.",
      "Orchestrated asynchronous communication across distributed services by implementing Kafka producers and consumers with resilient event-processing paths for payment and logistics workflows.",
      "Optimized last-mile route planning by incorporating zone-level service times into the Jsprit vehicle-routing algorithm, improving constraint fidelity during peak delivery scheduling.",
      "Hardened API security across 3 control layers — authentication, authorization, and request tracing — by implementing JWT filters and protected Spring Security endpoints.",
      "Benchmarked backend reliability at 85% code coverage by building JUnit 5 and Mockito suites integrated into automated CI/CD validation.",
    ],
  },
  {
    role: "Software Development Engineer Intern",
    company: "Standard Chartered GBS · CIB DCDA",
    location: "Bengaluru, India",
    period: "May 2024 – Jul 2024",
    highlights: [
      "Shipped a 3-layer loan-origination application using React, Redux, Material UI, Spring Boot, and PostgreSQL, centralizing workflow state and reducing redundant client-side rendering.",
      "Designed a production-oriented relational model with 4 performance controls — normalization, constraints, indexes, and UML-based entity mapping — for secure payment workflows.",
      "Integrated frontend and backend components across 3 S2B payment stages by validating API contracts, transaction flows, and role-based access boundaries.",
    ],
  },
]

export const projects = [
  {
    title: "AlgoSearch — AI-Powered Coding Problem Search Engine",
    tag: "Hybrid Search · FastAPI · Docker · Render",
    org: "May 2025 – Jun 2025",
    description:
      "Built a hybrid search platform over 6,000+ LeetCode and Codeforces problems by combining BeautifulSoup ingestion, BM25 lexical retrieval, and FAISS semantic indexing. Calibrated relevance through a 40:60 lexical-to-semantic scoring blend using MiniLM embeddings and min-max normalization, returning full-corpus results with sub-second retrieval.",
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
    "Computer Vision",
    "Pattern Recognition",
    "Compressed Sensing",
    "Data Structures & Algorithms",
    "Probability & Statistics",
    "Linear Algebra",
    "Distributed Systems",
  ],
}

export const achievements = [
  {
    title: "LeetCode Knight · Top 2.9%",
    detail:
      "1968 Knight rating with global contest ranks 216 and 319 among 23,000+ participants.",
  },
  {
    title: "Codeforces Expert · CodeChef 4-Star",
    detail: "1780 Codeforces rating and 1947 CodeChef rating.",
  },
  {
    title: "Google Contest Ranks",
    detail:
      "Global rank 1407 in Google Farewell Round A and rank 2029 in Google Kick Start Round G among 18,000+ competitors.",
  },
]

export const mentorship = [
  {
    title: "AlgoZenith Mentor",
    detail:
      "Mentored engineering students in data structures, algorithms, and technical interview problem-solving through AlgoZenith at IIT Kharagpur.",
  },
]
