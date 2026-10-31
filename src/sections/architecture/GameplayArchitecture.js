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
      "As a character gains actions like walking, jumping, dodging, and climbing, putting every rule inside one large update loop makes it easier for behaviors to conflict. It also becomes harder to tell why a movement or animation transition happened.",
    approach:
      "I organize the controller as a finite state machine: one active state is responsible for a particular group of behavior. Grounded locomotion handles walking and running; aerial behavior handles jumping and falling; and contextual actions such as a dodge roll or ledge climb take control when their conditions are met. States have defined transition rules, while shared movement and animation data stay accessible to the controller.",
    judgment:
      "I group related actions instead of creating a state for every animation. A small character controller may work well with simple conditions; states become more useful when actions need distinct rules, can interrupt each other, or must coordinate with animation and collision.",
    practice:
      "In a 3D third-person action prototype, I developed character movement, jump and fall handling, dodge rolls, and automatic ledge climbing. The controller coordinates those actions with animation and collision, so one behavior does not issue movement commands while another is in control.",
    transfer:
      "The important parts are states, conditions for switching between them, and shared character data. The same structure can be written with Unity C# classes, Godot scripts or nodes, or Unreal C++ and Blueprints.",
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
      "An enemy with only a few actions does not need the same decision system as a boss with multiple phases, competing priorities, or attacks that can interrupt one another. Overcomplicated AI wastes development time; oversimplified AI becomes difficult to extend.",
    approach:
      "I choose a decision structure based on the behaviors an enemy needs. For an enemy with only a few actions, a simple finite state machine can use an enum to name its states and straightforward conditions to switch between them. A hierarchical state machine groups related states under shared rules. A behavior tree can help when an enemy must evaluate several possible actions and decide which takes priority.",
    judgment:
      "Simple states are easier to follow and debug, but a large flat state machine can grow into a web of transitions. More structured AI is worthwhile only when it makes the behavior clearer or easier to extend, not because it is more advanced.",
    practice:
      "In 2D action-platformers and 3D action or exploration games, I have worked on enemy NPC behavior, combat systems, and encounters with multiple attack phases. I consider how many decisions an enemy makes, what can interrupt an action, and whether behaviors share rules before choosing its state or decision structure.",
    transfer:
      "Choosing what an enemy should do is separate from how the engine moves it, detects the player, or plays animations. This reasoning applies across Unity, Godot, Unreal, and custom gameplay frameworks.",
    flowTitle: "Complexity should guide the choice",
    flowTop: "Behavior requirements",
    flowNodes: ["Simple FSM (enum states)", "FSM / hierarchical FSM", "Behavior tree"],
  },
  {
    id: "interaction",
    number: "03",
    title: "Reusable Interaction Systems",
    subtitle: "Letting objects define their own interactions",
    Icon: FiMousePointer,
    concepts: ["Abstraction", "Loose Coupling"],
    problem:
      "If player code contains a separate rule for every door, collectible, puzzle, and NPC, adding new interactive objects means repeatedly modifying the player controller. A single input action gradually becomes tightly coupled to unrelated gameplay features.",
    approach:
      "I separate interaction into three responsibilities: find a possible target, check whether it can be used, and request the action. The player-side interactor handles the request; the target decides what the action does. For example, the same interaction input might open a door, activate a puzzle element, or start a conversation, without the player needing to know each object's internal logic.",
    judgment:
      "The shared entry point should be simple enough for the project. Interfaces, components, or callbacks are possible implementations, but the real benefit is keeping object-specific behavior with the object instead of adding more special cases to player code.",
    practice:
      "In a first-person puzzle and exploration game, I programmed player controls, object interactions, minigames, and related health and stamina systems. Different gameplay features had to respond to player actions, so I favor a reusable request path while allowing each interactive object or system to define its own result.",
    transfer:
      "The separation between finding a target, checking eligibility, and performing its action works in component-based and object-oriented game architectures, regardless of the engine's specific interaction APIs.",
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
      "When many gameplay scripts need scene transitions, sound playback, or common references, handling the same setup in each script creates duplication. A change to one shared feature can then require edits across unrelated parts of the project.",
    approach:
      "I keep shared responsibilities in focused managers or service access points. A scene manager handles level changes; a sound manager handles audio requests; other shared systems expose clearly defined functions. Player, enemy, or UI code can request those services instead of reimplementing their logic or maintaining a long list of repeated references.",
    judgment:
      "Central access is not the same as putting everything in one global object. Each manager needs a clear purpose, and features should still own their own gameplay logic. For a small or local dependency, a direct reference can be simpler than adding another manager.",
    practice:
      "In games with multiple scenes, interface screens, sound effects, and interconnected gameplay features, I use manager systems as common access points for scene changes, audio, and shared script references. This reduces repeated setup and keeps related responsibilities in one place.",
    transfer:
      "Unity managers, Godot autoloads, Unreal subsystems, and explicit service references are different ways to organize the same idea: give shared functionality a clear owner and a predictable way to access it.",
    flowTitle: "Focused shared responsibilities",
    flowTop: "Gameplay systems",
    flowNodes: ["Scene service", "Audio service", "Other shared services"],
  },
];

export default function GameplayArchitecture() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="arch-content">
      <div className="arch-introduction">
        <span className="arch-introduction-mark" aria-hidden="true">&lt;/&gt;</span>
        <div>
          <p className="arch-introduction-heading">The concept comes before the engine.</p>
          <p className="arch-introduction-text">
            Game engines provide different tools, but they often present the same design challenges: managing character actions, enemy decisions, interactive objects, and shared systems. I choose a structure that fits the problem, then adapt the implementation to the engine and project.
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
