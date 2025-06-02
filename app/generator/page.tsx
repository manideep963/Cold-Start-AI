"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const skills = [
  "Web development",
  "Content writing",
  "Automation (e.g. Python scripts)",
  "UI/UX Design",
  "Video editing",
];

const platforms = ["Cold Email", "Instagram DM", "LinkedIn Message"];

export default function GeneratorPage() {
  const [skill, setSkill] = useState(skills[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [extraInfo, setExtraInfo] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGenerated("");

    const prompt = `
You are an elite AI outreach strategist trained by the best cold email copywriters and growth hackers on the planet.

Your mission is to help a beginner freelancer or BTech student get their **first few high-quality freelance clients**, even if they have no audience or case studies.

== USER INPUT ==
Skill: ${skill}
Outreach method: ${platform}
Extra context: ${extraInfo || "None"}
== END ==

== YOUR TASK ==
1. **Who to Contact:**  
   Identify **3 ultra-specific** client types, business niches, or use cases that would strongly benefit from this skill. Make it feel practical and relevant — not generic.

2. **Scroll-Stopping Outreach Message:**  
   Write a short, engaging ${platform.toLowerCase()} message that:
   - Feels like it was written by a friendly, thoughtful human (not AI)
   - Includes a genuine compliment or insight about the prospect (even hypothetical — like referencing a tweet, product, or design)
   - Is no longer than **5 sentences**
   - Ends with **2 call-to-action variants**:
     - One direct (e.g. "Want to work together?")
     - One soft (e.g. "Open to exploring?")

   Keep the tone: **warm, confident, and casual — never desperate or robotic.**

3. **Where to Find These Clients:**  
   Recommend **3 specific online spots** where this user can find or connect with these client types. Could be websites, subreddits, hashtags, Discords, or community forums.

== OUTPUT FORMAT ==
Respond in clear **Markdown**, using numbered sections and emojis like this:

### 1. 🔍 Who to Contact  
- [Client Type 1]  
- [Client Type 2]  
- [Client Type 3]  

### 2. ✉️ ${platform} Message  
Hey! Just saw [insert specific insight or compliment]. I help [type of people/businesses] with [skill] so they can [benefit]. I’d love to support your work if you're open to it.  

👉 **Direct CTA:** Want to jam on something together?  
🌱 **Soft CTA:** No pressure at all — open to exploring?

### 3. 🌍 Where to Find Them  
- [Platform 1]  
- [Platform 2]  
- [Platform 3]  

== FINAL NOTE ==  
Make the whole response **feel inspiring and doable for a beginner**. No fluff, just real tactical advice and copy that makes prospects want to reply.

== END ==

`;


    const res = await fetch("/api/generate-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setGenerated(data.result);
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 AI Outreach Message Generator</h1>

      <label className="block mb-2 font-medium">1. Your Skill</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      >
        {skills.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">2. Outreach Method</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        {platforms.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">3. Anything else to add?</label>
      <textarea
        placeholder="Optional: Add your goals, target audience, niche, etc."
        className="w-full p-3 border border-gray-300 rounded mb-4"
        rows={3}
        value={extraInfo}
        onChange={(e) => setExtraInfo(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Outreach Message"}
      </button>

      {generated && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-2">🧠 AI-Generated Strategy</h2>
    <div className="relative bg-gray-500 p-4 rounded-md">
      <button
        onClick={() => navigator.clipboard.writeText(generated)}
        className="absolute top-2 right-2 bg-gray-800 text-sm border px-2 py-1 rounded hover:bg-gray-200"
      >
        Copy
      </button>
      <div className="prose prose-sm">
        <ReactMarkdown>{generated}</ReactMarkdown>
      </div>
    </div>
  </div>
)}
    </main>
  );
}
