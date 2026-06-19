import { useState, useMemo } from "react";
import "../styles/pages/projects.css"; 
import { allProjects } from "../data/projects";

function ProjectsPage() {
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return allProjects;
        return allProjects.filter((project) =>
            selectedTags.every((tag) => project.tags.includes(tag))
        );
    }, [selectedTags]);


    const dynamicallyAvailableTags = useMemo(() => {
        const tagsSet = new Set();
        
        filteredProjects.forEach(project => 
            project.tags.forEach(tag => tagsSet.add(tag))
        );
        
        selectedTags.forEach(tag => tagsSet.add(tag));
        
        return Array.from(tagsSet);
    }, [filteredProjects, selectedTags]);

    const handleTagToggle = (tag) => {
        if (tag === "All") {
            setSelectedTags([]);
            return;
        }

        setSelectedTags((prevTags) =>
            prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)
                : [...prevTags, tag]
        );
    };

    return (
        <main className="projects-page-container">
            <header className="projects-page-header">
                <h1 className="project-main-title">Projects</h1>
                <p className="projects-subtitle">
                    A curated shelf of systems tools, internal automation layers, and active builds.
                </p>
            </header>

            <nav className="filter-container" aria-label="Project tag filters">
                <button
                    className={`filter-pill ${selectedTags.length === 0 ? "active" : ""}`}
                    onClick={() => handleTagToggle("All")}
                >
                    All
                </button>

                {dynamicallyAvailableTags.map((tag) => {
                    const isPassedActive = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            className={`filter-pill ${isPassedActive ? "active" : ""}`}
                            onClick={() => handleTagToggle(tag)}
                        >
                            {tag}
                            <span className="tag-count">
                                ({allProjects.filter(p => p.tags.includes(tag)).length})
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="projects-gallery-grid">
                {filteredProjects.map((project) => (
                    <a key={project.id} href={project.link} target="_blank" rel="noreferrer" className="project-card">
                        <p className="project-repo">
                            <span className="accent">{project.repoOwner}</span> / {project.name}
                        </p>
                        <p className="project-desc">{project.description}</p>
                        <div className="project-tags">
                            {project.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className={`tag ${selectedTags.includes(tag) ? "highlighted-tag" : ""}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </a>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="empty-state-notice">
                    <p>No builds found matching the combined target identifier criteria.</p>
                </div>
            )}
        </main>
    );
}

export default ProjectsPage;