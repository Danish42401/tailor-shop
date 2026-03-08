import { Html, Head, Body, Container, Section, Heading, Text, Hr } from '@react-email/components';
import * as React from 'react';

interface OrderSummaryItem {
    name: string;
    quantity: number;
    price: number;
    total: number;
}

interface DailySummaryEmailProps {
    date: string;
    orders: Array<{
        customerName: string;
        phone: string;
        total: number;
        items: OrderSummaryItem[];
    }>;
    grandTotal: number;
    shopName: string;
}

export function DailySummaryEmail({ date, orders, grandTotal, shopName }: DailySummaryEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f5ff', padding: '20px' }}>
                <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', border: '1px solid #e9d5ff' }}>
                    <Section style={{ backgroundColor: '#4A1D96', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                        <Heading style={{ color: '#D4AF37', margin: 0, fontSize: '22px' }}>📊 Daily Order Summary</Heading>
                        <Text style={{ color: '#f3e8ff', margin: '4px 0 0' }}>{date}</Text>
                    </Section>

                    <Section style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#faf5ff', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
                        <Text style={{ margin: 0 }}><strong>Total Orders:</strong> {orders.length}</Text>
                        <Text style={{ margin: 0, color: '#4A1D96', fontWeight: 'bold' }}>Grand Total: AED {grandTotal.toFixed(2)}</Text>
                    </Section>

                    {orders.length === 0 ? (
                        <Text style={{ textAlign: 'center', color: '#6b7280' }}>No orders received today.</Text>
                    ) : (
                        orders.map((order, i) => (
                            <Section key={i} style={{ backgroundColor: '#faf5ff', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #e9d5ff' }}>
                                <Text style={{ fontWeight: 'bold', margin: '0 0 8px', color: '#4A1D96' }}>Order #{i + 1} — {order.customerName}</Text>
                                <Text style={{ margin: '2px 0', color: '#6b7280', fontSize: '14px' }}>📱 {order.phone}</Text>
                                {order.items.map((item, j) => (
                                    <Text key={j} style={{ margin: '2px 0', fontSize: '14px' }}>
                                        • {item.name} × {item.quantity} = AED {item.total.toFixed(2)}
                                    </Text>
                                ))}
                                <Hr style={{ borderColor: '#e9d5ff', margin: '8px 0' }} />
                                <Text style={{ margin: 0, fontWeight: 'bold', textAlign: 'right' }}>AED {order.total.toFixed(2)}</Text>
                            </Section>
                        ))
                    )}

                    <Hr style={{ borderColor: '#e9d5ff', margin: '24px 0' }} />
                    <Text style={{ color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                        Automated daily report from {shopName}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
