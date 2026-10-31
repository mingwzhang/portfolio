import React, { useState } from "react";
import SlideReveal from "../../components/common/SlideReveal";
import { FiChevronDown, FiGitBranch, FiCpu, FiMousePointer, FiLayers } from "react-icons/fi";
import "./GameplayArchitecture.css";

const systems = [
  {
    id: "player-states",
    number: "01",
    title: "State-Driven Player Controllers",
    subtitle: "Separating movement, actions, and transitions",
    Icon: FiGitBranch,
    concepts: ["Finite State Machines", "Separation of Concerns"],
    problem:
      "A controller becomes difficult to maintain when locomotion, jumping, falling, dodging, and contextual actions all compete inside the same update loop.",
    approach:
      "I organize player behavior around explicit states and transition rules. Related movement can remain under locomotion, while aerial behavior and actions such as rolling or ledge climbing have their own conditions. This makes it clearer which logic should run, when control should change, and how animations should respond.",
    judgment:
      "I don't split every animation into a separate state. I group related behavior first and introduce additional states when transitions or responsibilities become complex enough to justify them.",
    practice:
      "My Unity third-person controller work includes CharacterController movement, jump/fall handling, dodge rolls, automatic ledge climbing, and animation coordination.",
    transfer:
      "States, transitions, and shared context are the transferable parts; Unity C#, Godot scripts, and Unreal C++ or Blueprints provide different ways to express them.",
    flowTitle: "Organizing player behavior",
    flowTop: "Player state machine",
    flowNodes: ["Locomotion", "Aerial", "Contextual actions"],
  },
  {
    id: "enemy-ai",
    number: "02",
    title: "Enemy AI & Decision Architecture",
    subtitle: "Choosing the right complexity for each behavior",
    Icon: FiCpu,
    concepts: ["FSM / Hierarchical FSM", "Behavior Trees"],
    problem:
      "A simple enemy shouldn't require the same decision architecture as an enemy with multiple combat phases, priorities, and interruptible behaviors.",
    approach:
      "I choose how to represent enemy behavior based on what the design actually needs: enum-driven logic for compact behaviors, state machines for clearer transitions, hierarchical states for related or shared behavior, and behavior trees when branching decisions and priorities warrant them.",
    judgment:
      "Each option has a cost. A simple FSM can be easier to debug than a large tree; a flat FSM can become unwieldy when the number of transitions grows. I aim for the least complicated structure that stays readable and extendable.",
    practice:
      "As lead gameplay programmer on Holly’s Splendid Sugar Rush Rally, I worked on AI and combat systems. My broader gameplay work has also included enemy NPC behavior.",
    transfer:
      "The AI's decisions and transition rules are separate from engine-specific navigation, sensing, and animation APIs.",
    flowTitle: "Complexity should guide the choice",
    flowTop: "Behavior requirements",
    flowNodes: ["Enum / simple FSM", "FSM / hierarchical FSM", "Behavior tree"],
  },
  {
    id: "interaction",
    number: "03",
    title: "Reusable Interaction Systems",
    subtitle: "Letting objects define their own interactions",
    Icon: FiMousePointer,
    concepts: ["Abstraction", "Loose Coupling"],
    problem:
      "When a player controller hardcodes what every door, item, puzzle, or NPC should do, each new object type adds another special case and makes unrelated code harder to change.",
    approach:
      "I separate the act of detecting and requesting an interaction from the object-specific result. The interactor handles finding an eligible target and issuing the request; the target owns the behavior that follows. The common contract can take different forms depending on the project.",
    judgment:
      "The goal isn't to add interfaces or classes for their own sake. A shared interaction rule is useful when several objects need the same entry point, while unique behavior remains with the object that owns it.",
    practice:
      "In Project IOTA, I worked on player controls, interactions, minigames, and related gameplay systems. Those systems inform how I separate interaction requests from their outcomes.",
    transfer:
      "Detection, eligibility, and execution can be separated in component-based or object-oriented architectures regardless of engine.",
    flowTitle: "One request, different outcomes",
    flowTop: "Interactor requests action",
    flowNodes: ["Door", "Item / puzzle", "NPC"],
  },
  {
    id: "shared-services",
    number: "04",
    title: "Shared Services & Manager Systems",
    subtitle: "Keeping common systems accessible and focused",
    Icon: FiLayers,
    concepts: ["Service Organization", "Dependency Management"],
    problem:
      "Scene changes, audio playback, and other shared functions are used in many places. Duplicating references and setup across scripts makes the project more fragile and cumbersome to maintain.",
    approach:
      "I organize shared responsibilities through focused managers or service access points—for example, scene and sound management—so gameplay systems can request a service without each script rebuilding its own reference network.",
    judgment:
      "Central access shouldn't mean one object controls the entire game. I keep ownership clear, separate unrelated services, and avoid turning a global manager into a collection of gameplay-specific exceptions.",
    practice:
      "While leading gameplay development on Holly’s Splendid Sugar Rush Rally, I coordinated gameplay, UI, animation, art, and audio integration. That work reinforced the value of clearly owned shared services.",
    transfer:
      "The same responsibility boundaries can be implemented using managers, engine subsystems, service registries, or explicit dependency references.",
    flowTitle: "Focused shared responsibilities",
    flowTop: "Gameplay systems",
    flowNodes: ["Scene service", "Audio service", "Other shared services"],
  },
];

export default function GameplayArchitecture() {
  const [openId, setOpenId] = useState("player-states");

  return (
    <div className="arch-content">
      <div className="arch-introduction">
        <span className="arch-introduction-mark" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <p className="arch-introduction-heading">The concept comes before the engine.</p>
          <p className="arch-introduction-text">
            My approach is to choose a structure that fits the problem, then adapt its implementation to the tools at hand. These principles inform my gameplay work across engines, rather than tying the design to a particular API.
          </p>
        </div>
      </div>

      <div className="arch-system-list">
        {systems.map((system) => {
          const isOpen = openId === system.id;
          const detailsId = `architecture-${system.id}-details`;
          const headingId = `architecture-${system.id}-heading`;
          const Icon = system.Icon;

          return (
            <article className={`arch-system ${isOpen ? "arch-system-open" : ""}`} key={system.id} aria-labelledby={headingId}>
              <h3 className="arch-system-heading" id={headingId}>
                <button
                  type="button"
                  className="arch-system-toggle"
                  aria-expanded={isOpen}
                  aria-controls={detailsId}
                  onClick={() => setOpenId(isOpen ? null : system.id)}
                >
                  <span className="arch-number">{system.number}</span>
                  <span className="arch-icon" aria-hidden="true"><Icon size={20} /></span>
                  <span className="arch-toggle-copy">
                    <span className="arch-toggle-title">{system.title}</span>
                    <span className="arch-toggle-subtitle">{system.subtitle}</span>
                  </span>
                  <FiChevronDown size={19} aria-hidden="true" className={`arch-toggle-chevron ${isOpen ? "arch-toggle-chevron-up" : ""}`} />
                </button>
              </h3>

              <SlideReveal id={detailsId} open={isOpen} className="arch-system-reveal">
                <div className="arch-system-details">
                  <div className="arch-concepts" aria-label="Related concepts">
                    {system.concepts.map((concept) => <span key={concept}>{concept}</span>)}
                  </div>

                  <div className="arch-detail-grid">
                    <section className="arch-explanation">
                      <h4>The problem</h4>
                      <p>{system.problem}</p>
                      <h4>My approach</h4>
                      <p>{system.approach}</p>
                      <h4>Design trade-offs</h4>
                      <p>{system.judgment}</p>
                    </section>
                    <aside className="arch-detail-aside" aria-label={`Architecture example for ${system.title}`}>
                      <div className="arch-flow" aria-label={system.flowTitle}>
                        <p className="arch-flow-caption">{system.flowTitle}</p>
                        <div className="arch-flow-root">{system.flowTop}</div>
                        <div className="arch-flow-connector" aria-hidden="true" />
                        <div className="arch-flow-nodes">
                          {system.flowNodes.map((node) => <div key={node}>{node}</div>)}
                        </div>
                        <p className="arch-flow-footnote">Conceptual diagram — implementation varies by project.</p>
                      </div>
                      <div className="arch-practice">
                        <h4>Applied in my work</h4>
                        <p>{system.practice}</p>
                      </div>
                    </aside>
                  </div>

                  <div className="arch-transfer">
                    <span className="arch-transfer-label">Across engines</span>
                    <p>{system.transfer}</p>
                  </div>
                </div>
              </SlideReveal>
            </article>
          );
        })}
      </div>
      <p className="arch-outro">Different engines, different tools. The design decisions still matter.</p>
    </div>
  );
}
