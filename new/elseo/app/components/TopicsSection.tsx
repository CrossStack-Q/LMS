// import TopicCard from "./TopicCard";

// export default function TopicsSection() {
//   const topics = [
//     {
//       icon: "💡",
//       title: "What Is UX Design?",
//       desc: "From research to final design, delve into UX fundamentals and discover how the design process evolves step by step.",
//     },
//     {
//       icon: "🧠",
//       title: "Build Empathy & Define UX Issues",
//       desc: "Enhance your understanding of user needs and problem definition.",
//     },
//     {
//       icon: "🌱",
//       title: "Basics Of Design Thinking",
//       desc: "Structured and user-centered design thinking methodology.",
//     },
//     {
//       icon: "🔍",
//       title: "UX Research",
//       desc: "Gain a deep understanding of research methods to gather and analyze insights.",
//     },
//   ];

//   return (
//     <section className="w-full bg-grid border-t border-[rgba(0,0,0,0.15)] px-6 md:px-20 py-16">
//       <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-[rgba(0,0,0,0.85)]">
//         Topics
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {topics.map((topic, idx) => (
//           <TopicCard key={idx} {...topic} />
//         ))}
//       </div>
//     </section>
//   );
// }


import TopicCard from "./TopicCard";

export default function TopicsSection() {
  const topics = [
    {
      icon: "💡",
      title: "What Is UX Design?",
      desc: "From research to final design, delve into UX fundamentals and discover how the design process evolves step by step."
    },
    {
      icon: "🧠",
      title: "Build Empathy & Define UX Issues",
      desc: "Enhance your understanding of user needs focusing on user problem definition and its role in UX design."
    },
    {
      icon: "🌱",
      title: "Basics Of Design Thinking",
      desc: "Learn how to tackle design challenges by applying structured and user-centered Design Thinking methodology."
    },
    {
      icon: "🔍",
      title: "UX Research",
      desc: "Gain a deep understanding of key research methods to effectively gather and analyze user insights."
    },
    {
      icon: "📊",
      title: "Quantitative And Qualitative Research",
      desc: "Learn to identify patterns in user behavior and predict interactions to create more intuitive designs."
    },
    {
      icon: "✨",
      title: "Ideation Methods",
      desc: "Enter Design Thinking ideation: brainstorm and generate user-focused ideas."
    },
    {
      icon: "🧩",
      title: "UI/UX Wireframing",
      desc: "Explore a technique for creating basic design layouts that outline structure and functionality."
    },
    {
      icon: "⭐",
      title: "Heuristic Evaluation",
      desc: "Learn Heuristic Evaluation, a method for reviewing designs using key principles to find common usability issues."
    },
  ];

  return (
    <section className="w-full bg-(--bg-light) px-6 md:px-20 py-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-(--gray-900)">Topics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((t, i) => (
            <TopicCard key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
