import { useEffect, useState, useRef } from 'react';
import './Chatbot.scss';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types/product';

type Message = { from: 'user' | 'bot'; text: string };

const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const { cart } = useCart();
    const listRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // fetch product list for basic answers
        fetch('/api/products')
            .then((r) => r.ok ? r.json() : [])
            .then((data) => setProducts(data))
            .catch(() => setProducts([]));
    }, []);

    useEffect(() => {
        // scroll to bottom on new message
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, open]);

    const push = (msg: Message) => setMessages((s) => [...s, msg]);

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        push({ from: 'user', text });
        setInput('');
        // simple intent matching
        const q = text.toLowerCase();
        setTimeout(() => {
            if (q.includes('cart') || q.includes('what') && q.includes('in my cart')) {
                if (cart.length === 0) {
                    push({ from: 'bot', text: 'Your cart is empty.' });
                } else {
                    const lines = cart.map((i) => `${i.quantity}× ${i.name} ($${i.price.toFixed(2)})`);
                    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0).toFixed(2);
                    push({ from: 'bot', text: `You have ${cart.length} items: ${lines.join('; ')}. Total: $${total}` });
                }
                return;
            }

            const priceMatch = /price of (.+)/i.exec(text) || /how much is (.+)/i.exec(text);
            if (priceMatch) {
                const name = priceMatch[1].toLowerCase().trim();
                const found = products.find((p) => p.name.toLowerCase().includes(name));
                if (found) {
                    push({ from: 'bot', text: `${found.name} is $${Number(found.price).toFixed(2)}.` });
                } else {
                    push({ from: 'bot', text: 'I could not find that product. Try another name.' });
                }
                return;
            }

            if (q.includes('shipping') || q.includes('delivery')) {
                push({ from: 'bot', text: 'Shipping is calculated at checkout based on your address.' });
                return;
            }

            if (q.includes('help') || q.includes('how') || q.includes('support')) {
                push({ from: 'bot', text: 'Ask me about product prices, what is in your cart, or shipping.' });
                return;
            }

            push({ from: 'bot', text: "Sorry — I don't know that yet. Try asking about products or your cart." });
        }, 300);
    };

    return (
        <div className={`chatbot ${open ? 'open' : ''}`}>
            <div className="chatbot-toggle" onClick={() => setOpen((s) => !s)} aria-hidden>
                {open ? '×' : 'Chat'}
            </div>
            {open && (
                <div className="chatbot-panel" role="dialog" aria-label="Help chat">
                    <div className="chatbot-header">Assistant</div>
                    <div className="chatbot-list" ref={listRef}>
                        {messages.length === 0 && (
                            <div className="chatbot-welcome">Hi — ask me about products, pricing, or your cart.</div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`chatbot-msg ${m.from}`}>{m.text}</div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} placeholder="Ask a question..." />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
