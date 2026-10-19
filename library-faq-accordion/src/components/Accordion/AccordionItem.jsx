const ICON_SYMBOLS = {
  chevron: () => "›",
  "plus-minus": (isOpen) => (isOpen ? "−" : "+"),
};

export default function AccordionItem({
  item,
  isOpen,
  onToggle,
  headingLevel,
  iconType,
  iconPosition,
  baseId,
}) {
  const Heading = `h${headingLevel}`;
  const buttonId = `${baseId}-button`;
  const panelId = `${baseId}-panel`;

  const icon = (
    <span key="icon" className={`icon ${iconType}`} aria-hidden="true">
      {ICON_SYMBOLS[iconType](isOpen)}
    </span>
  );
  const label = <span key="label" className="label">{item.q}</span>;

  return (
    <div className={`accord-item${isOpen ? " open" : ""}`}>
      <Heading>
        <button
          type="button"
          id={buttonId}
          className="btn-answer"
          disabled={item.disabled}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {iconPosition === "start" ? [icon, label] : [label, icon]}
        </button>
      </Heading>

      <div id={panelId} className="answer-question" role="region" aria-labelledby={buttonId}>
        <div>
          <p>{item.a}</p>
        </div>
      </div>
    </div>
  );
}
