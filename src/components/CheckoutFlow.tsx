import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  Smartphone,
  WalletCards,
  X,
} from "lucide-react";
import DeliveryDetails, { type DeliveryInfo } from "./DeliveryDetails";
import type { CartItem } from "./CartDrawer";
import "../styles/checkout.css";

type CheckoutStage =
  | "delivery"
  | "method"
  | "details"
  | "processing"
  | "success"
  | "declined"
  | "confirmation";
type PaymentMethod = "card" | "eft" | "mobile";

interface CheckoutFlowProps {
  items: CartItem[];
  onBackToBag: () => void;
  onComplete: () => void;
}

const paymentMethods: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Visa, Mastercard, etc.",
    icon: CreditCard,
  },
  {
    id: "eft",
    title: "Instant EFT / Bank Transfer",
    description: "Faster payments (simulated)",
    icon: WalletCards,
  },
  {
    id: "mobile",
    title: "Mobile Payment",
    description: "Scan & pay (simulated)",
    icon: Smartphone,
  },
];

const CheckoutProgress = ({ stage }: { stage: CheckoutStage }) => {
  const currentStep =
    stage === "delivery" ? 1 : stage === "confirmation" ? 3 : 2;

  return (
    <nav className="pixel-checkout__progress" aria-label="Checkout progress">
      {[
        { step: 1, label: "SHIPPING" },
        { step: 2, label: "PAYMENT" },
        { step: 3, label: "CONFIRMATION" },
      ].map(({ step, label }, index) => (
        <div className="pixel-checkout__progress-group" key={step}>
          {index > 0 && <span className="pixel-checkout__progress-line" />}
          <div
            className={`pixel-checkout__progress-item ${
              step === currentStep ? "is-active" : ""
            } ${step < currentStep ? "is-complete" : ""}`}
            aria-current={step === currentStep ? "step" : undefined}
          >
            {step < currentStep ? <Check size={12} /> : <span>{step}.</span>}
            <strong>{label}</strong>
          </div>
        </div>
      ))}
    </nav>
  );
};

const formatPrice = (price: number) => `R${price.toLocaleString("en-ZA")}`;

const CheckoutHeader = ({
  stage,
  onBack,
  itemCount,
}: {
  stage: CheckoutStage;
  onBack: () => void;
  itemCount: number;
}) => {
  const backLabel =
    stage === "delivery"
      ? "BACK TO BAG"
      : stage === "method"
        ? "BACK TO DELIVERY"
        : stage === "declined"
          ? "CHANGE PAYMENT"
          : "BACK TO PAYMENT";
  const canGoBack = !["processing", "success", "confirmation"].includes(stage);

  return (
    <>
      <header className="pixel-checkout__header">
        {canGoBack ? (
          <button
            type="button"
            className="pixel-checkout__back"
            onClick={onBack}
            aria-label={backLabel}
          >
            <ArrowLeft size={15} />
            {backLabel}
          </button>
        ) : (
          <span />
        )}
        <a className="pixel-checkout__logo" href="#home" aria-label="PIXEL">
          PIX<span>EL</span>
        </a>
        <span className="pixel-checkout__bag">BAG ({itemCount})</span>
      </header>
      <CheckoutProgress stage={stage} />
    </>
  );
};

const OrderSummary = ({
  items,
  delivery,
}: {
  items: CartItem[];
  delivery: number;
}) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <aside className="pixel-checkout__summary">
      <h2>ORDER SUMMARY</h2>
      <div className="pixel-checkout__summary-items">
        {items.map((item) => (
          <div className="pixel-checkout__summary-item" key={item.id}>
            <div className="pixel-checkout__item-mark" aria-hidden="true">
              {item.name.slice(0, 1).toUpperCase()}
            </div>
            <div className="pixel-checkout__item-details">
              <strong>{item.name}</strong>
              <span>{item.code}</span>
              <span>QTY: {item.quantity}</span>
            </div>
            <b>{formatPrice(item.price * item.quantity)}</b>
          </div>
        ))}
      </div>
      <div className="pixel-checkout__summary-row">
        <span>Subtotal</span><strong>{formatPrice(subtotal)}</strong>
      </div>
      <div className="pixel-checkout__summary-row">
        <span>Delivery</span>
        <strong>{delivery === 0 ? "FREE" : formatPrice(delivery)}</strong>
      </div>
      <div className="pixel-checkout__summary-row pixel-checkout__total">
        <span>Total</span><strong>{formatPrice(subtotal + delivery)}</strong>
      </div>
      <p className="pixel-checkout__demo-note">
        <LockKeyhole size={14} />
        DEMO ONLY — NO REAL PAYMENT WILL BE MADE
      </p>
    </aside>
  );
};

export default function CheckoutFlow({
  items,
  onBackToBag,
  onComplete,
}: CheckoutFlowProps) {
  const [stage, setStage] = useState<CheckoutStage>("delivery");
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [testDecline, setTestDecline] = useState(false);
  const [orderReference] = useState(
    () => `PIX-${Math.floor(10000 + Math.random() * 90000)}`
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery = subtotal >= 3500 ? 0 : 99;

  useEffect(() => {
    if (stage !== "processing") return;
    const timeout = window.setTimeout(
      () => setStage(testDecline ? "declined" : "success"),
      1800
    );
    return () => window.clearTimeout(timeout);
  }, [stage, testDecline]);

  const handleBack = () => {
    if (stage === "delivery") {
      onBackToBag();
    } else if (stage === "method") {
      setStage("delivery");
    } else if (stage === "details") {
      setStage("method");
    } else if (stage === "declined") {
      setStage("method");
    }
  };

  const handlePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStage("processing");
  };

  const continueShopping = () => {
    onComplete();
  };

  if (items.length === 0) {
    return (
      <main className="pixel-checkout pixel-checkout--empty">
        <p>Your bag is empty.</p>
        <button type="button" className="pixel-checkout__button" onClick={onBackToBag}>
          RETURN TO SHOPPING <ArrowRight size={16} />
        </button>
      </main>
    );
  }

  return (
    <main className="pixel-checkout">
      <CheckoutHeader
        stage={stage}
        onBack={handleBack}
        itemCount={items.reduce((count, item) => count + item.quantity, 0)}
      />

      {stage === "delivery" && (
        <DeliveryDetails
          items={items}
          initialDetails={deliveryInfo}
          onContinue={(details) => {
            setDeliveryInfo(details);
            setStage("method");
          }}
        />
      )}

      {stage === "method" && (
        <div className="pixel-checkout__layout">
          <section className="pixel-checkout__content">
            <p className="pixel-checkout__eyebrow">CHECKOUT / STEP 02</p>
            <h1>PAYMENT METHOD</h1>
            <p className="pixel-checkout__lead">Choose how you'd like to pay.</p>
            <div className="pixel-checkout__method-list">
              {paymentMethods.map(({ id, title, description, icon: Icon }) => (
                <label
                  className={`pixel-checkout__method ${
                    paymentMethod === id ? "is-selected" : ""
                  }`}
                  key={id}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={id}
                    checked={paymentMethod === id}
                    onChange={() => setPaymentMethod(id)}
                  />
                  <Icon size={22} />
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <span className="pixel-checkout__radio" />
                </label>
              ))}
            </div>
            <button
              type="button"
              className="pixel-checkout__button"
              onClick={() => setStage("details")}
            >
              CONTINUE <ArrowRight size={16} />
            </button>
          </section>
          <OrderSummary items={items} delivery={delivery} />
        </div>
      )}

      {stage === "details" && (
        <div className="pixel-checkout__layout">
          <section className="pixel-checkout__content">
            <p className="pixel-checkout__eyebrow">CHECKOUT / STEP 02</p>
            <h1>{paymentMethod === "card" ? "CARD DETAILS" : "PAYMENT DETAILS"}</h1>
            <p className="pixel-checkout__lead">
              {paymentMethod === "card"
                ? "Use fictional details for this simulated payment."
                : paymentMethod === "eft"
                  ? "Your bank transfer will be simulated for this demo."
                  : "Your mobile payment will be simulated for this demo."}
            </p>
            <form className="pixel-checkout__payment-form" onSubmit={handlePayment}>
              {paymentMethod === "card" ? (
                <>
                  <label className="pixel-checkout__field pixel-checkout__field--wide">
                    CARD NUMBER
                    <input
                      required
                      inputMode="numeric"
                      autoComplete="cc-number"
                      minLength={16}
                      maxLength={19}
                      pattern="[0-9 ]{16,19}"
                      value={cardNumber}
                      onChange={(event) =>
                        setCardNumber(event.target.value.replace(/[^\d ]/g, ""))
                      }
                      placeholder="4242 4242 4242 4242"
                    />
                  </label>
                  <label className="pixel-checkout__field pixel-checkout__field--wide">
                    NAME ON CARD
                    <input
                      required
                      autoComplete="cc-name"
                      value={cardholder}
                      onChange={(event) => setCardholder(event.target.value)}
                      placeholder="Name as shown on card"
                    />
                  </label>
                  <label className="pixel-checkout__field">
                    EXPIRY DATE
                    <input
                      required
                      autoComplete="cc-exp"
                      inputMode="numeric"
                      maxLength={5}
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      value={expiry}
                      onChange={(event) => setExpiry(event.target.value)}
                      placeholder="MM/YY"
                    />
                  </label>
                  <label className="pixel-checkout__field">
                    CVV
                    <input
                      required
                      autoComplete="cc-csc"
                      inputMode="numeric"
                      maxLength={4}
                      minLength={3}
                      pattern="[0-9]{3,4}"
                      value={cvv}
                      onChange={(event) =>
                        setCvv(event.target.value.replace(/\D/g, ""))
                      }
                      placeholder="123"
                    />
                  </label>
                  <label className="pixel-checkout__decline">
                    <input
                      type="checkbox"
                      checked={testDecline}
                      onChange={(event) => setTestDecline(event.target.checked)}
                    />
                    <span>Test a declined payment instead</span>
                  </label>
                </>
              ) : (
                <div className="pixel-checkout__payment-message">
                  <LockKeyhole size={24} />
                  <strong>
                    {paymentMethod === "eft"
                      ? "SECURE BANK TRANSFER"
                      : "SECURE MOBILE PAYMENT"}
                  </strong>
                  <p>
                    No bank or mobile account details are needed. Select
                    “Pay now” to simulate the result.
                  </p>
                  <label className="pixel-checkout__decline">
                    <input
                      type="checkbox"
                      checked={testDecline}
                      onChange={(event) => setTestDecline(event.target.checked)}
                    />
                    <span>Test a declined payment instead</span>
                  </label>
                </div>
              )}
              <button type="submit" className="pixel-checkout__button">
                PAY {formatPrice(subtotal + delivery)} NOW <ArrowRight size={16} />
              </button>
              <p className="pixel-checkout__secure-note">
                <LockKeyhole size={13} />
                DEMO ONLY — YOUR PAYMENT DETAILS ARE NOT STORED OR SENT
              </p>
            </form>
          </section>
          <OrderSummary items={items} delivery={delivery} />
        </div>
      )}

      {stage === "processing" && (
        <section className="pixel-checkout__result pixel-checkout__processing" aria-live="polite">
          <div className="pixel-checkout__spinner"><CreditCard size={27} /></div>
          <p className="pixel-checkout__eyebrow">SECURE PAYMENT SIMULATION</p>
          <h1>PROCESSING PAYMENT...</h1>
          <p>Please wait while we verify your payment.</p>
          <div className="pixel-checkout__processing-steps">
            <span className="is-done">VERIFYING</span>
            <span className="is-active">AUTHORISING</span>
            <span>COMPLETING</span>
          </div>
        </section>
      )}

      {stage === "success" && (
        <section className="pixel-checkout__result">
          <div className="pixel-checkout__result-icon is-success"><Check size={31} /></div>
          <p className="pixel-checkout__eyebrow">YOUR DROP IS SECURED</p>
          <h1>PAYMENT CONFIRMED</h1>
          <p className="pixel-checkout__result-lead">
            Your payment was successful. Your order is ready for confirmation.
          </p>
          <div className="pixel-checkout__receipt">
            <span>Order reference<strong>{orderReference}</strong></span>
            <span>Payment method<strong>{paymentMethods.find(({ id }) => id === paymentMethod)?.title}</strong></span>
            <span>Total<strong>{formatPrice(subtotal + delivery)}</strong></span>
          </div>
          <div className="pixel-checkout__actions">
            <button type="button" className="pixel-checkout__button" onClick={() => setStage("confirmation")}>
              VIEW ORDER <ArrowRight size={16} />
            </button>
            <button type="button" className="pixel-checkout__secondary" onClick={continueShopping}>
              CONTINUE SHOPPING
            </button>
          </div>
          <p className="pixel-checkout__disclaimer">DEMO ONLY — NO REAL PAYMENT WAS MADE</p>
        </section>
      )}

      {stage === "declined" && (
        <section className="pixel-checkout__result">
          <div className="pixel-checkout__result-icon is-declined"><X size={31} /></div>
          <p className="pixel-checkout__eyebrow">PAYMENT NOT COMPLETED</p>
          <h1>PAYMENT DECLINED</h1>
          <p className="pixel-checkout__result-lead">
            The simulated payment was declined. Your order has not been placed.
          </p>
          <div className="pixel-checkout__receipt">
            <span>Order reference<strong>—</strong></span>
            <span>Payment method<strong>{paymentMethods.find(({ id }) => id === paymentMethod)?.title}</strong></span>
            <span>Reason<strong>Insufficient funds (simulated)</strong></span>
          </div>
          <div className="pixel-checkout__actions">
            <button type="button" className="pixel-checkout__button" onClick={() => setStage("details")}>
              TRY AGAIN <ArrowRight size={16} />
            </button>
            <button type="button" className="pixel-checkout__secondary" onClick={() => setStage("method")}>
              CHANGE PAYMENT METHOD
            </button>
          </div>
        </section>
      )}

      {stage === "confirmation" && (
        <section className="pixel-checkout__confirmation">
          <div className="pixel-checkout__confirmation-copy">
            <p className="pixel-checkout__eyebrow">THANK YOU FOR SHOPPING WITH PIXEL</p>
            <h1>ORDER<br />CONFIRMED</h1>
            <p>Your order has been received and is being processed.</p>
            {deliveryInfo && (
              <p className="pixel-checkout__delivery-address">
                DELIVERING TO<br />
                <strong>{deliveryInfo.fullName}</strong><br />
                {deliveryInfo.address}, {deliveryInfo.city}
              </p>
            )}
            <button type="button" className="pixel-checkout__button" onClick={continueShopping}>
              CONTINUE SHOPPING <ArrowRight size={16} />
            </button>
          </div>
          <div className="pixel-checkout__confirmation-details">
            <div className="pixel-checkout__receipt">
              <span>Order reference<strong>{orderReference}</strong></span>
              <span>Items<strong>{items.reduce((count, item) => count + item.quantity, 0)}</strong></span>
              <span>Delivery<strong>{delivery === 0 ? "FREE" : formatPrice(delivery)}</strong></span>
              <span>Total<strong>{formatPrice(subtotal + delivery)}</strong></span>
            </div>
            <h2>NEXT STEPS</h2>
            <ol>
              <li>You’ll receive a confirmation email shortly.</li>
              <li>Track your order in your account.</li>
              <li>We’ll keep you updated on delivery.</li>
            </ol>
            <p className="pixel-checkout__disclaimer">DEMO ONLY — NO REAL ORDER WAS PLACED</p>
          </div>
        </section>
      )}
    </main>
  );
}
