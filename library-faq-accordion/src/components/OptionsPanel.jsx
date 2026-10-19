const SELECT_FIELDS = [
  { key: "count", label: "Number of questions (to try)", choices: [3, 4, 5, 6] },
  { key: "variant", label: "variant", choices: ["default", "bordered", "filled"] },
  { key: "iconType", label: "iconType", choices: ["chevron", "plus-minus"] },
  { key: "iconPosition", label: "iconPosition", choices: ["end", "start"] },
  { key: "headingLevel", label: "headingLevel", choices: [2, 3, 4] },
];

const CHECK_FIELDS = [
  { key: "multiple", label: "Open more than one (multiple)" },
  { key: "collapsible", label: "Collapse all (collapsible)" },
  { key: "animated", label: "Animated (animated)" },
];

export default function OptionsPanel({ options, onChange }) {
  return (
    <fieldset className="options">
      <legend>Options (props)</legend>

      {SELECT_FIELDS.map(({ key, label, choices }) => (
        <label key={key}>
          {label}
          <select
            value={options[key]}
            onChange={(e) => onChange(key, typeof choices[0] === "number" ? +e.target.value : e.target.value)}
          >
            {choices.map((choice) => (
              <option key={choice} value={choice}>{choice}</option>
            ))}
          </select>
        </label>
      ))}

      {CHECK_FIELDS.map(({ key, label }) => (
        <label key={key} className="check">
          <input
            type="checkbox"
            checked={options[key]}
            onChange={(e) => onChange(key, e.target.checked)}
          />
          {label}
        </label>
      ))}
    </fieldset>
  );
}
