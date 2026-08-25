import { skillGroups } from '../../data/skills'

export function SkillsWindow() {
  return (
    <div className="skills-body">
      {skillGroups.map((group) => (
        <fieldset key={group.category} className="skills-group">
          <legend>{group.category}</legend>
          <ul className="tree-view skills-list">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  )
}
