import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: "Jay Sarkar" },
        roles: { type: [String], default: ["Full Stack Developer", "Next.js Developer"] },
        resumeUrl: { type: String, default: "/resume.pdf" }
    },
    about: {
        description: { type: String, default: "I am a passionate software engineer..." },
        highlights: [{
            title: String,
            description: String,
            icon: String
        }],
        image: { type: String, default: "/about-image.jpg" }
    },
    education: [{
        degree: String,
        institution: String,
        period: String,
        description: String
    }],
    skills: [{
        category: String,
        items: [{
            name: String,
            level: Number,
            icon: String
        }]
    }],
    experience: [{
        role: String,
        company: String,
        period: String,
        description: String
    }],
    projects: [{
        title: String,
        description: String,
        image: String,
        techStack: [String],
        githubUrl: String,
        liveUrl: String
    }],
    contact: {
        email: { type: String, default: "jaisarkar200@gmail.com" },
        phone: { type: String, default: "" },
        location: { type: String, default: "" },
        github: { type: String, default: "https://github.com/JaySarkar01" },
        linkedin: { type: String, default: "https://www.linkedin.com/in/jay-sarkar-724669249/" }
    }
}, { timestamps: true });

export const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
