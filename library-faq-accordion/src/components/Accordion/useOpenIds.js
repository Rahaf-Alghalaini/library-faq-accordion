import { useState } from "react";

/**
 * Manages which accordion items are open.
 * Works controlled (`openIds` given) or uncontrolled (`defaultOpenIds`).
 */
export function useOpenIds({ openIds, defaultOpenIds = [], onChange, multiple, collapsible }) {
  const [internalIds, setInternalIds] = useState(defaultOpenIds);
  const current = openIds ?? internalIds;

  const commit = (next) => {
    if (openIds === undefined) setInternalIds(next);
    onChange?.(next);
  };

  const toggle = (id) => {
    if (current.includes(id)) {
      const isLastOpen = current.length === 1;
      if (!collapsible && isLastOpen) return;
      commit(current.filter((openId) => openId !== id));
    } else {
      commit(multiple ? [...current, id] : [id]);
    }
  };

  return { openIds: current, toggle };
}
