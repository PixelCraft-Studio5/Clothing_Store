
import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { CartItem } from "./CartDrawer";
import "../styles/delivery-details.css";

export interface DeliveryInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
}

interface DeliveryDetailsProps {
  items: CartItem[];
  initialDetails?: DeliveryInfo | null;
  onContinue: (details: DeliveryInfo) => void;
}

export default function DeliveryDetails({
  items,
  initialDetails,
  onContinue,
}: DeliveryDetailsProps) {
  const [details, setDetails] = useState<DeliveryInfo>(
    initialDetails ?? {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      province: "Western Cape",
      postalCode: "",
    }
  );
  const [error, setError] = useState("");

  const updateField = (field: keyof DeliveryInfo, value: string) => {
    setDetails((current) => ({
      ...current,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!details.fullName.trim() || !details.address.trim()) {
      setError("Please complete your name and delivery address.");
      return;
    }

    if (!details.email.trim() || !details.city.trim()) {
      setError("Please complete your email and city.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{4}$/.test(details.postalCode)) {
      setError("Enter a valid 4-digit South African postal code.");
      return;
    }

    onContinue(details);
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 3500 ? 0 : 99;
  const formatPrice = (price: number) => `R${price.toLocaleString("en-ZA")}`;

  return (
    <section className="pixel-delivery">
      <div className="pixel-delivery__layout">
        <section className="pixel-delivery__main">
          <p className="pixel-delivery__eyebrow">
            FINAL ROUND / CHECKOUT
          </p>

          <h1>
            SECURE
            <br />
            <span>YOUR DROP.</span>
          </h1>

          <p className="pixel-delivery__intro">
            Your next favourite piece is almost yours.
            First, tell us where to send your order.
          </p>

          <form onSubmit={handleSubmit}>
            <section className="pixel-delivery__section">
              <div className="pixel-delivery__section-heading">
                <span>01</span>
                <h2>CONTACT INFORMATION</h2>
              </div>

              <div className="pixel-delivery__fields">
                <label>
                  FULL NAME *
                  <input
                    required
                    autoComplete="name"
                    value={details.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  EMAIL ADDRESS *
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={details.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="you@example.com"
                  />
                </label>

                <label className="pixel-delivery__wide">
                  PHONE NUMBER
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={details.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="+27 00 000 0000"
                  />
                </label>
              </div>
            </section>

            <section className="pixel-delivery__section">
              <div className="pixel-delivery__section-heading">
                <span>02</span>
                <h2>SHIPPING ADDRESS</h2>
              </div>

              <div className="pixel-delivery__fields">
                <label className="pixel-delivery__wide">
                  STREET ADDRESS *
                  <input
                    required
                    autoComplete="street-address"
                    value={details.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    placeholder="House number and street name"
                  />
                </label>

                <label className="pixel-delivery__wide">
                  APARTMENT / UNIT (OPTIONAL)
                  <input
                    value={details.apartment}
                    onChange={(event) =>
                      updateField("apartment", event.target.value)
                    }
                    placeholder="Apartment, unit or complex"
                  />
                </label>

                <label>
                  CITY / TOWN *
                  <input
                    required
                    autoComplete="address-level2"
                    value={details.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    placeholder="Cape Town"
                  />
                </label>

                <label>
                  PROVINCE
                  <select
                    value={details.province}
                    onChange={(event) =>
                      updateField("province", event.target.value)
                    }
                  >
                    <option>Eastern Cape</option>
                    <option>Free State</option>
                    <option>Gauteng</option>
                    <option>KwaZulu-Natal</option>
                    <option>Limpopo</option>
                    <option>Mpumalanga</option>
                    <option>North West</option>
                    <option>Northern Cape</option>
                    <option>Western Cape</option>
                  </select>
                </label>

                <label className="pixel-delivery__wide">
                  POSTAL CODE *
                  <input
                    required
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={4}
                    pattern="[0-9]{4}"
                    value={details.postalCode}
                    onChange={(event) =>
                      updateField(
                        "postalCode",
                        event.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="8001"
                  />
                </label>
              </div>
            </section>

            {error && (
              <p className="pixel-delivery__error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="pixel-delivery__continue"
            >
              CONTINUE TO PAYMENT
              <ArrowRight size={18} />
            </button>

            <p className="pixel-delivery__privacy">
              <ShieldCheck size={15} />
              FRONTEND DEMO · DETAILS ARE NOT SENT TO A SERVER
            </p>
          </form>
        </section>

        <aside className="pixel-delivery__aside">
          <div className="pixel-delivery__summary">
            <h2>ORDER SUMMARY</h2>
            <div className="pixel-delivery__summary-items">
              {items.map((item) => (
                <div className="pixel-delivery__summary-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.code} · QTY {item.quantity}</span>
                  </div>
                  <b>{formatPrice(item.price * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="pixel-delivery__summary-row">
              <span>SUBTOTAL</span><strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="pixel-delivery__summary-row">
              <span>DELIVERY</span>
              <strong>{delivery === 0 ? "FREE" : formatPrice(delivery)}</strong>
            </div>
            <div className="pixel-delivery__summary-row is-total">
              <span>TOTAL</span>
              <strong>{formatPrice(subtotal + delivery)}</strong>
            </div>
          </div>

          <div className="pixel-delivery__demo-note">
            <ShieldCheck size={17} />
            <p>
              <strong>SECURE CHECKOUT</strong>
              <br />
              Your details stay in this demo and are not sent to a server.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
