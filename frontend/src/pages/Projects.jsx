import { useState, useMemo, useRef, useEffect } from "react";
import "../styles/pages/projects.css";
import { allProjects } from "../data/projects";
import { FiSearch, FiX } from "react-icons/fi";

function ProjectsPage() {
    const [query, setQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);

    // All unique tags from all projects
    const allTags = useMemo(() => {
        const tagsSet = new Set();
        allProjects.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
        return Array.from(tagsSet).sort();
    }, []);

    // Tags matching the current search query, excluding already selected
    const suggestedTags = useMemo(() => {
        const q = query.toLowerCase().trim();
        return allTags.filter(
            tag => !selectedTags.includes(tag) &&
            (q === "" || tag.toLowerCase().includes(q))
        );
    }, [query, selectedTags, allTags]);

    // Projects filtered by selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) return allProjects;
        return allProjects.filter(p =>
            selectedTags.every(tag => p.tags.includes(tag))
        );
    }, [selectedTags]);

    const addTag = (tag) => {
        setSelectedTags(prev => [...prev, tag]);
        setQuery("");
        setDropdownOpen(false);
        setHighlightedIndex(-1);
    };

    const removeTag = (tag) => {
        setSelectedTags(prev => prev.filter(t => t !== tag));
    };

    // Auto-scroll highlighted item into view
    useEffect(() => {
        if (highlightedIndex >= 0 && dropdownRef.current) {
            const item = dropdownRef.current.children[highlightedIndex];
            item?.scrollIntoView({ block: "nearest" });
        }
    }, [highlightedIndex]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <main className="projects-page-container">
            <header className="projects-page-header">
                <h1 className="project-main-title">Projects</h1>
                <p className="projects-subtitle">
                    A curated shelf of systems tools, internal automation layers, and active builds.
                </p>
            </header>

            <div className="search-filter-wrapper" ref={wrapperRef}>
                <div className={`search-bar ${dropdownOpen && suggestedTags.length > 0 ? "open" : ""}`}>
                    <FiSearch className="search-icon" size={15} />
                    <div className="search-chips-input">
                        {selectedTags.map(tag => (
                            <span key={tag} className="search-chip">
                                {tag}
                                <button onClick={() => removeTag(tag)} className="chip-remove">
                                    <FiX size={11} />
                                </button>
                            </span>
                        ))}
                        <input
                            type="text"
                            className="search-input"
                            placeholder={selectedTags.length === 0 ? "Search tags..." : ""}
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setDropdownOpen(true);
                                setHighlightedIndex(-1);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Backspace" && query === "" && selectedTags.length > 0) {
                                    removeTag(selectedTags[selectedTags.length - 1]);
                                    return;
                                }
                                if (!dropdownOpen || suggestedTags.length === 0) return;
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    setHighlightedIndex(prev => Math.min(prev + 1, suggestedTags.length - 1));
                                } else if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    setHighlightedIndex(prev => Math.max(prev - 1, 0));
                                } else if (e.key === "Enter" && highlightedIndex >= 0) {
                                    e.preventDefault();
                                    addTag(suggestedTags[highlightedIndex]);
                                } else if (e.key === "Escape") {
                                    setDropdownOpen(false);
                                    setHighlightedIndex(-1);
                                }
                            }}
                            onFocus={() => setDropdownOpen(true)}
                        />
                    </div>
                    {(query || selectedTags.length > 0) && (
                        <button className="search-clear" onClick={() => {
                            setQuery("");
                            setSelectedTags([]);
                            setDropdownOpen(false);
                            setHighlightedIndex(-1);
                        }}>
                            <FiX size={13} />
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {dropdownOpen && suggestedTags.length > 0 && (
                    <div className="tag-dropdown" ref={dropdownRef}>
                        {suggestedTags.map((tag, index) => (
                            <button
                                key={tag}
                                className={`tag-dropdown-item ${index === highlightedIndex ? "highlighted" : ""}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => addTag(tag)}
                            >
                                <span className="tag-dropdown-name">{tag}</span>
                                <span className="tag-dropdown-count">
                                    {allProjects.filter(p => p.tags.includes(tag)).length} projects
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

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
                    <p>No builds found matching the selected tags.</p>
                </div>
            )}
        </main>
    );
}

export default ProjectsPage;