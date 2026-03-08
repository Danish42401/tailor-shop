import { Html, Head, Body, Container, Section, Heading, Text, Hr, Row, Column } from '@react-email/components';
import * as React from 'react';
import { type CartItem } from '@/store/cartStore';
import { type CheckoutFormValues } from '@/components/checkout/CheckoutForm';

interface OwnerOrderEmailProps {
    cartItems: CartItem[];
    formData: CheckoutFormValues;
    deliveryLabel: string;
    total: number;
}

export function OwnerOrderEmail({ cartItems, formData, deliveryLabel, total }: OwnerOrderEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f5ff', padding: '20px' }}>
                <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', padding: '32px', border: '1px solid #e9d5ff' }}>
                    <Section style={{ backgroundColor: '#4A1D96', padding: '20px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px' }}>
                        <Heading style={{ color: '#D4AF37', margin: 0, fontSize: '24px' }}>🛍️ New Order Received</Heading>
                    </Section>

                    <Heading as="h2" style={{ color: '#4A1D96', borderBottom: '2px solid #D4AF37', paddingBottom: '8px' }}>Customer Information</Heading>
                    <Text><strong>Name:</strong> {formData.fullName}</Text>
                    <Text><strong>Phone:</strong> {formData.phone}</Text>
                    {formData.email && <Text><strong>Email:</strong> {formData.email}</Text>}
                    <Text><strong>City:</strong> {formData.city}</Text>
                    <Text><strong>Address:</strong> {formData.address}</Text>
                    <Text><strong>Delivery:</strong> {deliveryLabel}</Text>
                    {formData.notes && <Text><strong>Notes:</strong> {formData.notes}</Text>}

                    <Hr style={{ borderColor: '#e9d5ff', margin: '24px 0' }} />

                    <Heading as="h2" style={{ color: '#4A1D96', borderBottom: '2px solid #D4AF37', paddingBottom: '8px' }}>Order Items</Heading>
                    {cartItems.map((item, i) => (
                        <Section key={i} style={{ backgroundColor: '#faf5ff', padding: '16px', borderRadius: '8px', marginBottom: '12px' }}>
                            <Row>
                                <Column>
                                    <Text style={{ fontWeight: 'bold', margin: 0 }}>{item.name_en}</Text>
                                    <Text style={{ color: '#6b7280', margin: '4px 0' }}>Qty: {item.quantity} × AED {item.price.toFixed(2)}</Text>
                                    {item.customization && (
                                        <Section style={{ backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '4px', marginTop: '8px' }}>
                                            <Text style={{ fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '13px' }}>✂️ Customization:</Text>
                                            {item.customization.ageSize && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Size (Age): {item.customization.ageSize}</Text>}
                                            {item.customization.standardSize && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Size: {item.customization.standardSize}</Text>}
                                            {item.customization.color && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Color: {item.customization.color}</Text>}
                                            {item.customization.fabric && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Fabric: {item.customization.fabric}</Text>}
                                            {item.customization.sleeveStyle && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Sleeves: {item.customization.sleeveStyle}</Text>}
                                            {item.customization.embroidery && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Embroidery: {item.customization.embroidery}</Text>}
                                            {item.customization.specialInstructions && <Text style={{ margin: '2px 0', fontSize: '13px' }}>• Notes: {item.customization.specialInstructions}</Text>}
                                        </Section>
                                    )}
                                </Column>
                                <Column style={{ textAlign: 'right' }}>
                                    <Text style={{ fontWeight: 'bold', color: '#4A1D96' }}>AED {(item.price * item.quantity).toFixed(2)}</Text>
                                </Column>
                            </Row>
                        </Section>
                    ))}

                    <Hr style={{ borderColor: '#e9d5ff', margin: '24px 0' }} />

                    <Section style={{ backgroundColor: '#4A1D96', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                        <Text style={{ color: '#ffffff', margin: 0, fontSize: '18px' }}>
                            <strong>Total: <span style={{ color: '#D4AF37' }}>AED {total.toFixed(2)}</span></strong>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
