import { useEffect, useMemo, useState } from "react";
import Accordion from "./components/Accordion";
import OptionsPanel from "./components/OptionsPanel.jsx";
import { FAQ_ITEMS } from "./data/faqItems.js";
import "./style.css";

const DEFAULT_OPTIONS = {
  count: 5,
  variant: "default",
  iconType: "chevron",
  iconPosition: "end",
  headingLevel: 3,
  multiple: false,
  collapsible: true,
  animated: true,
};

const CODE_SAMPLE = `<Accordion
  items={items}
  onChange={setOpenIds}
/>`;

export default function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState([]);

  const setOption = (key, value) => setOptions((prev) => ({ ...prev, [key]: value }));

  const { count, multiple } = options;
  const items = useMemo(() => FAQ_ITEMS.slice(0, count), [count]);
  const visibleItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    return items.filter(({ q }) => q.toLowerCase().includes(term));
  }, [items, search]);

  // Keep open ids consistent with the available items and the `multiple` option
  useEffect(() => {
    setOpenIds((ids) => {
      const valid = ids.filter((id) => items.some((item) => item.id === id));
      return multiple ? valid : valid.slice(0, 1);
    });
  }, [items, multiple]);

  return (
    <>
      <nav className="navbar">
        <span className="nav-title">Accordion</span>
      </nav>

      <main className="page">
        <h1>FAQ-Accordion</h1>
        <p className="subtitle">One or more questions, with animation, icons and different styles.</p>

        <div className="layout">
          <OptionsPanel options={options} onChange={setOption} />

          <section className="demo">
            <div className="search-row">
              <input
                type="search"
                placeholder="Search questions..."
                aria-label="Search questions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="status">{`${count} questions · Open: [${openIds.join(", ")}]`}</span>
            </div>

            <Accordion
              items={visibleItems}
              variant={options.variant}
              iconType={options.iconType}
              iconPosition={options.iconPosition}
              headingLevel={options.headingLevel}
              multiple={multiple}
              collapsible={options.collapsible}
              animated={options.animated}
              openIds={openIds}
              onChange={setOpenIds}
            />

            <pre className="code">{CODE_SAMPLE}</pre>
          </section>
        </div>
      </main>
    </>
  );
}
