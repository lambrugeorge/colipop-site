"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
    subtotal: number;
    discount: number;
    total: number;
    count: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    coupon: string | null;
    applyCoupon: (code: string) => { success: boolean; message: string };
    removeCoupon: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [coupon, setCoupon] = useState<string | null>(null);

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, qty: number) => {
        if (qty <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id));
        } else {
            setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
        }
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        setCoupon(null);
    }, []);

    const applyCoupon = useCallback((code: string) => {
        const normalized = code.trim().toUpperCase();
        if (normalized === "COLIPOP10") {
            setCoupon(normalized);
            return { success: true, message: "Cupon aplicat cu succes! (10% reducere)" };
        }
        return { success: false, message: "Cod de cupon invalid." };
    }, []);

    const removeCoupon = useCallback(() => setCoupon(null), []);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

    const discount = useMemo(() => {
        if (coupon === "COLIPOP10") {
            return subtotal * 0.1;
        }
        return 0;
    }, [subtotal, coupon]);

    const total = subtotal - discount;
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addItem, removeItem, updateQuantity, clearCart,
            subtotal, discount, total, count,
            isOpen, setIsOpen,
            coupon, applyCoupon, removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    );
}
