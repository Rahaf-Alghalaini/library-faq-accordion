import { useId } from "react";
import AccordionItem from "./AccordionItem.jsx";
import { useOpenIds } from "./useOpenIds.js";

export default function Accordion({
  items,
  variant = "default",   // "default" | "bordered" | "filled"
  iconType = "chevron",  // "chevron" | "plus-minus"
  iconPosition = "end",  // "end" | "start"
  headingLevel = 3,      // 2 | 3 | 4
  multiple = false,
  collapsible = true,
  animated = true,
  openIds,
  defaultOpenIds,
  onChange,
  emptyText = "No questions match your search.",
}) {
  const uid = useId();
  const state = useOpenIds({ openIds, defaultOpenIds, onChange, multiple, collapsible });

  const className = ["accord", variant !== "default" && variant, animated && "animated"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {items.length === 0 && <div className="empty">{emptyText}</div>}

      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          baseId={`${uid}-${item.id}`}
          isOpen={state.openIds.includes(item.id)}
          onToggle={() => state.toggle(item.id)}
          headingLevel={headingLevel}
          iconType={iconType}
          iconPosition={iconPosition}
        />
      ))}
    </div>
  );
}
