import {
  Network,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  Droplets,
  Sprout,
  Radio,
} from "lucide-react";

const features = [
  {
    icon: Network,
    number: "01",
    title: "Predict propagation",
    description:
      "Use graph-based learning to understand how local drought stress may influence connected downstream nodes.",
    tag: "GRAPHSAGE / GNN",
    color: "#06B6D4",
  },
  {
    icon: Activity,
    number: "02",
    title: "Inspect basin health",
    description:
      "Explore connected reservoirs, sensors, and farms with node-level moisture, flow, and risk indicators.",
    tag: "DIGITAL TWIN",
    color: "#10B981",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Prioritize interventions",
    description:
      "Organize potential mitigation actions around water management, agricultural needs, and field monitoring.",
    tag: "DECISION SUPPORT",
    color: "#F59E0B",
  },
];

const applications = [
  {
    icon: Droplets,
    title: "Water management",
    text: "Identify flow constraints and locations that may require closer monitoring.",
  },
  {
    icon: Sprout,
    title: "Agricultural resilience",
    text: "Understand soil moisture stress and prioritize vulnerable farming areas.",
  },
  {
    icon: Radio,
    title: "Field intelligence",
    text: "Direct attention towards locations where updated observations are valuable.",
  },
];

export default function FeatureSection() {
  return (
    <>
      <section
        id="technology"
        className="border-y border-emerald-400/[0.08] bg-[#081610]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="max-w-2xl">
            <div className="mb-4 text-xs tracking-[0.2em] text-emerald-400">
              BUILT FOR CONNECTED SYSTEMS
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
              From scattered signals
              <span className="block text-emerald-400">
                to connected intelligence.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              CASCADE combines watershed telemetry, graph-based prediction, and
              decision support to help stakeholders reason about drought as a
              connected system.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group rounded-xl border border-white/[0.08] bg-[#06110D] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/25 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-lg border"
                      style={{
                        color: feature.color,
                        borderColor: `${feature.color}30`,
                        backgroundColor: `${feature.color}0D`,
                      }}
                    >
                      <Icon size={21} />
                    </div>
                    <span className="font-mono text-xs text-slate-600">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-medium text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 min-h-[96px] text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                    <span
                      className="text-[9px] tracking-[0.17em]"
                      style={{ color: feature.color }}
                    >
                      {feature.tag}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-slate-600 transition group-hover:text-emerald-400"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="mb-4 text-xs tracking-[0.2em] text-emerald-400">
              WHY IT MATTERS
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Earlier insight.
              <span className="block text-slate-500">
                Better-informed action.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              The goal isn't just to visualize water scarcity. It's to help
              people understand where it may spread and which locations deserve
              attention first.
            </p>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {applications.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex gap-4 py-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.08] text-emerald-400">
                    <Icon size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
