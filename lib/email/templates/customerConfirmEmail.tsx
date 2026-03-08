import { Html, Head, Body, Container, Section, Heading, Text, Hr, Button } from '@react-email/components';
import * as React from 'react';
import { type CartItem } from '@/store/cartStore';

interface CustomerConfirmEmailProps {
    customerName: string;
    cartItems: CartItem[];
    total: number;
    shopName: string;
    whatsappNumber: string;
}

export function CustomerConfirmEmail({ customerName, cartItems, total, shopName, whatsappNumber }: CustomerConfirmEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f5ff', padding: '20px' }}>
                <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', border: '1px solid #e9d5ff' }}>
                    <Section style={{ backgroundColor: '#4A1D96', padding: '24px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                        <Heading style={{ color: '#D4AF37', margin: 0, fontSize: '24px' }}>Thank You, {customerName}! 🎉</Heading>
                        <Text style={{ color: '#f3e8ff', margin: '8px 0 0' }}>Your order request has been received</Text>
                    </Section>

                    <Text style={{ color: '#374151', lineHeight: '1.6' }}>
                        We have received your order from <strong>{shopName}</strong> and will confirm it via WhatsApp within 2 hours.
                    </Text>

                    <Heading as="h2" style={{ color: '#4A1D96' }}>Your Order Summary</Heading>

                    {cartItems.map((item, i) => (
                        <Section key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e9d5ff', padding: '12px 0' }}>
                            <Text style={{ margin: 0, flex: 1 }}>
                                <strong>{item.name_en}</strong><br />
                                <span style={{ color: '#6b7280', fontSize: '14px' }}>Qty: {item.quantity}</span>
                            </Text>
                            <Text style={{ margin: 0, fontWeight: 'bold', color: '#4A1D96' }}>AED {(item.price * item.quantity).toFixed(2)}</Text>
                        </Section>
                    ))}

                    <Hr style={{ borderColor: '#e9d5ff', margin: '16px 0' }} />

                    <Section style={{ textAlign: 'right' }}>
                        <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#4A1D96', margin: 0 }}>
                            Total: <span style={{ color: '#D4AF37' }}>AED {total.toFixed(2)}</span>
                        </Text>
                    </Section>

                    <Hr style={{ borderColor: '#e9d5ff', margin: '24px 0' }} />

                    <Text style={{ color: '#374151' }}>
                        Have questions? Contact us directly on WhatsApp:
                    </Text>
                    <Button
                        href={`https://wa.me/${whatsappNumber}`}
                        style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        💬 Chat on WhatsApp
                    </Button>

                    <Hr style={{ borderColor: '#e9d5ff', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        © {new Date().getFullYear()} {shopName}. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
