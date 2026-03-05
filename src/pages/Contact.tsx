import { Phone, Mail, MapPin, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import coupleImage from "@/assets/couple-romantic.jpg";

const contactItems = [
  { icon: Phone, label: "Phone", value: "+1 234 567 8900", href: "tel:+12345678900" },
  { icon: Mail, label: "Email", value: "support@heartplay.com", href: "mailto:support@heartplay.com" },
  { icon: MapPin, label: "Address", value: "123 Love Street, Romance City, NY 10001", href: "#" },
];

const Contact = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-14">
      <section className="py-16 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <Send className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">CONTACT</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground tracking-tight mb-3">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-sm">
              We'd love to hear from you ❤️
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-2xl overflow-hidden border border-border/30">
              <img
                src={coupleImage}
                alt="Romantic couple embracing in elegant setting"
                className="w-full h-full min-h-[240px] object-cover"
                loading="lazy"
              />
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm p-6 flex flex-col justify-center gap-6">
              <h3 className="font-display text-xl font-semibold text-foreground">
                Let's Connect
              </h3>

              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 p-2.5 rounded-xl bg-muted/50 group-hover:bg-primary/10 transition-colors duration-200">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors duration-200">
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
