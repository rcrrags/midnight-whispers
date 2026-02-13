import { Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-16">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-accent tracking-wide">
              About HeartPlay
            </h1>
            <Sparkles className="w-6 h-6 text-accent" />
          </div>

          <div className="gold-divider mx-auto w-32 mb-10" />

          <div className="glass-card rounded-2xl border border-border/40 p-8 md:p-12 space-y-6">
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
              <span className="text-accent font-semibold">HeartPlay</span> is a fun and romantic
              2-player couples game filled with flirty, sweet, and exciting challenges designed to
              bring you and your partner closer together.
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-foreground/60">
              Whether you're sparking a new connection or deepening a lifelong bond, HeartPlay turns
              every moment into an opportunity to laugh, connect, and fall in love all over again.
              Navigate through 30 unique blocks of playful dares, romantic questions, and intimate
              challenges — all wrapped in an experience that feels as luxurious as your love story.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {[
                { icon: "💕", title: "Flirty Challenges", desc: "Playful dares that spark chemistry" },
                { icon: "🔥", title: "Exciting Tasks", desc: "Keep the thrill alive every round" },
                { icon: "💖", title: "Deeper Bonds", desc: "Strengthen your connection together" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="velvet-card rounded-xl p-5 text-center transition-all duration-300 hover:velvet-card-hover hover:-translate-y-1"
                >
                  <span className="text-3xl block mb-2">{item.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-accent mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-foreground/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
