import { HiMinus, HiPlus, HiOutlineTicket, HiOutlineStar, HiOutlineLightningBolt } from 'react-icons/hi';

const ticketTypes = [
  { key: 'standard', label: 'Standard', desc: 'General admission seating', icon: HiOutlineTicket, priceKey: 'price' },
  { key: 'vip', label: 'VIP', desc: 'Priority seating and meet and greet', icon: HiOutlineStar, priceKey: 'vipPrice' },
  { key: 'premium', label: 'Premium', desc: 'Front row and backstage access', icon: HiOutlineLightningBolt, priceKey: 'premiumPrice' },
];

const TicketSelector = ({ event, selectedType, quantity, onTypeChange, onQuantityChange }) => {
  const getPrice = (type) => {
    const t = ticketTypes.find(t => t.key === type);
    return event[t?.priceKey] || event.price;
  };

  return (
    <div className="space-y-5">
      {/* Ticket Type */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Select Ticket Type</h3>
        <div className="space-y-2.5">
          {ticketTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => onTypeChange(type.key)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-300 group
                ${selectedType === type.key
                  ? 'border-primary bg-primary/[0.04] shadow-sm'
                  : 'border-border/60 bg-white hover:border-primary/30 hover:bg-surface-secondary'
                }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${selectedType === type.key ? 'bg-primary/10 text-primary' : 'bg-surface-secondary text-text-muted'}`}>
                <type.icon className="text-base" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${selectedType === type.key ? 'text-primary' : 'text-text-primary'}`}>
                  {type.label}
                </p>
                <p className="text-xs text-text-muted leading-tight mt-0.5">{type.desc}</p>
              </div>
              <span className={`text-sm font-bold whitespace-nowrap ${selectedType === type.key ? 'text-primary' : 'text-text-primary'}`}>
                INR {(event[type.priceKey] || event.price).toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-3">Number of Tickets</h3>
        <div className="flex items-center gap-4 p-3 rounded-xl bg-surface-secondary border border-border/60">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 disabled:opacity-30 disabled:hover:text-text-secondary disabled:hover:border-border transition-all"
          >
            <HiMinus className="text-sm" />
          </button>
          <span className="text-xl font-bold text-text-primary w-8 text-center tabular-nums">{quantity}</span>
          <button
            onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
            disabled={quantity >= 10}
            className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 disabled:opacity-30 transition-all"
          >
            <HiPlus className="text-sm" />
          </button>
          <span className="text-xs text-text-muted ml-auto">Max 10 per order</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-primary/[0.04] to-accent/[0.04] border border-primary/10">
        <span className="text-sm font-medium text-text-secondary">Total Amount</span>
        <span className="font-outfit font-black text-2xl gradient-text">
          INR {(getPrice(selectedType) * quantity).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default TicketSelector;
