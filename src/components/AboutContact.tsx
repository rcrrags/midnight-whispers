import { Heart, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import coupleImage from "@/assets/couple-romantic.jpg";

const AboutContact = () => (
  <>
    {/* About Section */}
    <section id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-accent" />
          <h2 className="font-display text-4xl md:text-5xl font-bold text-accent tracking-wide">
            About HeartPlay
          </h2>
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

    {/* Contact Section */}
    <section id="contact" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-accent tracking-wide mb-4">
            Get in Touch
          </h2>
          <div className="gold-divider mx-auto w-32 mb-4" />
          <p className="font-body text-foreground/50 text-base">
            We'd love to hear from you <Heart className="inline w-4 h-4 text-primary" />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-border/30 glow-soft">
            <img
              src={coupleImage}
              alt="Romantic couple embracing in elegant setting"
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </div>

          {/* Contact Details */}
          <div className="glass-card rounded-2xl border border-border/40 p-8 space-y-8">
            <h3 className="font-display text-2xl font-semibold text-foreground/90">
              Let's Connect
            </h3>

            {[
              {
                icon: Phone,
                label: "Phone",
                value: "+1 234 567 8900",
                href: "tel:+12345678900",
              },
              {
                icon: Mail,
                label: "Email",
                value: "support@heartplay.com",
                href: "mailto:support@heartplay.com",
              },
              {
                icon: MapPin,
                label: "Address",
                value: "123 Love Street, Romance City, NY 10001",
                href: "#",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 group transition-all duration-300 hover:translate-x-1"
              >
                <div className="p-3 rounded-xl velvet-card group-hover:glow-gold transition-shadow duration-300">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-foreground/40 block mb-1">
                    {item.label}
                  </span>
                  <span className="font-body text-base text-foreground/80 group-hover:text-accent transition-colors duration-300">
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AboutContact;
