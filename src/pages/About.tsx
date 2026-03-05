import { Sparkles, Heart, Flame, HeartHandshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Heart, title: "Flirty Challenges", desc: "Playful dares that spark chemistry" },
  { icon: Flame, title: "Exciting Tasks", desc: "Keep the thrill alive every round" },
  { icon: HeartHandshake, title: "Deeper Bonds", desc: "Strengthen your connection together" },
];

const About = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-14">
      <section className="py-16 px-5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wide">ABOUT US</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground tracking-tight mb-3">
              About HeartPlay
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
              A fun and romantic 2-player couples game filled with flirty, sweet, and exciting challenges.
            </p>
          </div>

          <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-6 md:p-8 mb-8">
            <p className="font-body text-sm md:text-base leading-relaxed text-foreground/80">
              Whether you're sparking a new connection or deepening a lifelong bond, HeartPlay turns
              every moment into an opportunity to laugh, connect, and fall in love all over again.
              Navigate through 30 unique blocks of playful dares, romantic questions, and intimate
              challenges — all wrapped in an experience that feels as luxurious as your love story.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/30 bg-card/50 p-5 text-center hover:bg-card/80 hover:border-border/50 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="font-body text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
