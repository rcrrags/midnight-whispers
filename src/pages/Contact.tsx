import { Heart, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import coupleImage from "@/assets/couple-romantic.jpg";

const Contact = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-16">
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-accent tracking-wide mb-4">
              Get in Touch
            </h1>
            <div className="gold-divider mx-auto w-32 mb-4" />
            <p className="font-body text-foreground/50 text-base">
              We'd love to hear from you <Heart className="inline w-4 h-4 text-primary" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-border/30 glow-soft">
              <img
                src={coupleImage}
                alt="Romantic couple embracing in elegant setting"
                className="w-full h-72 md:h-96 object-cover"
                loading="lazy"
              />
            </div>

            <div className="glass-card rounded-2xl border border-border/40 p-8 space-y-8">
              <h3 className="font-display text-2xl font-semibold text-foreground/90">
                Let's Connect
              </h3>

              {[
                { icon: Phone, label: "Phone", value: "+1 234 567 8900", href: "tel:+12345678900" },
                { icon: Mail, label: "Email", value: "support@heartplay.com", href: "mailto:support@heartplay.com" },
                { icon: MapPin, label: "Address", value: "123 Love Street, Romance City, NY 10001", href: "#" },
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
    </main>
    <Footer />
  </div>
);

export default Contact;
