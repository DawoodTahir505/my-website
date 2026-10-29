export interface Profile {
  name: string;
  wordmark: string;
  greeting: string;
  title: string;
  statement: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface AboutData {
  heading: string;
  paragraphs: string[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  index: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface ContactData {
  heading: string;
  subheading: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Dawood",
    wordmark: "DAWOOD",
    greeting: "HELLO, I'M",
    title: "Data Science Student & Aspiring AI Engineer",
    statement: "Building intelligent solutions through data science, machine learning, and artificial intelligence.",
    location: "Pakistan",
    email: "dawoodtahiir@gmail.com",
    githubUrl: "https://github.com/dawoodTahir505",
    linkedinUrl: "https://linkedin.com/in/your-profile"
  },

  about: {
    heading: "About Me",
    paragraphs: [
      "I am a Data Science student interested in understanding data, developing machine learning models, and building intelligent AI applications. I enjoy working with Python and exploring modern AI technologies, including large language models, RAG systems, and AI agents.",
      "My focus is on learning through practical projects and developing solutions that address real-world problems. I am continuously improving my technical skills and exploring new developments in artificial intelligence."
    ]
  },

  skills: [
    {
      category: "Programming",
      items: ["Python", "SQL"]
    },
    {
      category: "Data Analysis",
      items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Exploratory Data Analysis"]
    },
    {
      category: "Machine Learning",
      items: ["Scikit-learn", "Regression", "Classification", "Model Evaluation"]
    },
    {
      category: "Deep Learning",
      items: ["Neural Networks", "CNN", "Computer Vision"]
    },
    {
      category: "Generative AI",
      items: ["LLMs", "Prompt Engineering", "RAG", "Embeddings", "Vector Databases"]
    },
    {
      category: "AI Development",
      items: ["LangChain", "LangGraph", "AI Agents", "FastAPI", "Streamlit"]
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Jupyter Notebook", "VS Code"]
    }
  ],

  projects: [
    {
      index: "01",
      title: "ResearchMind",
      description: "AI-powered research assistant for researching topics and generating structured reports.",
      technologies: ["Python", "LangChain", "LLMs", "Streamlit"],
      githubUrl: "https://github.com/dawoodTahir505",
      demoUrl: ""
    },
    {
      index: "02",
      title: "AI Video Assistant",
      description: "An application that allows users to interact with YouTube videos through AI-powered transcription and question answering.",
      technologies: ["Python", "Whisper", "Groq", "Streamlit"],
      githubUrl: "https://github.com/dawoodTahir505",
      demoUrl: ""
    },
    {
      index: "03",
      title: "Pakistan Scholarship Assistant",
      description: "A RAG-based application that answers scholarship-related questions using document retrieval.",
      technologies: ["Python", "LangChain", "RAG", "Vector Database"],
      githubUrl: "https://github.com/dawoodTahir505",
      demoUrl: ""
    },
    {
      index: "04",
      title: "Computer Vision Projects",
      description: "Image detection applications involving brain tumor and skin acne detection.",
      technologies: ["Python", "YOLO", "Computer Vision"],
      githubUrl: "https://github.com/dawoodTahir505",
      demoUrl: ""
    }
  ],

  interests: [
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Generative AI",
    "Agentic AI",
    "Real-world AI applications"
  ],

  contact: {
    heading: "Let's Connect",
    subheading: "Interested in technology, AI, or building something meaningful? Feel free to reach out.",
    email: "dawoodtahiir@gmail.com",
    githubUrl: "https://github.com/dawoodTahir505",
    linkedinUrl: "https://linkedin.com/in/your-profile"
  }
};
