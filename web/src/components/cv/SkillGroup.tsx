import type { Skill } from "../../types/cv";

interface SkillGroupProps {
  category: string;
  skills: Skill[];
}

function SkillGroup({ category, skills }: SkillGroupProps) {
  return (
    <div className="cv-skill-group">
      <h3 className="cv-skill-group__title">{category}</h3>
      <div className="cv-skill-group__pills">
        {skills.map((skill) => (
          <span key={skill.name} className="cv-pill">
            {skill.name}
            {skill.level && (
              <span className="cv-pill__level">{skill.level}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillGroup;
