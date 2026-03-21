import type { Skill } from "../../types/cv";

interface SkillGroupProps {
  category: string;
  skills: Skill[];
}

function SkillGroup({ category, skills }: SkillGroupProps) {
  return (
    <div className="cv__skill-group">
      <h3 className="cv__skill-category">{category}</h3>
      <div className="cv__skill-list">
        {skills.map((skill) => (
          <div key={skill.name} className="cv__skill">
            <span className="cv__skill-name">{skill.name}</span>
            {skill.level && <span className="cv__skill-level">{skill.level}</span>}
            {skill.years && <span className="cv__skill-detail">{skill.years} ans</span>}
            {skill.details && <span className="cv__skill-detail">{skill.details}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillGroup;
