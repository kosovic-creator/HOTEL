import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'eur', rezervacijaId, metadata } = await request.json();

    console.log(`💳 Payment Intent kreiranju - Rezervacija ID: ${rezervacijaId}, Iznos: €${amount}`);

    // Kreiranje PaymentIntent-a
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe koristi cente
      currency,
      metadata: {
        rezervacijaId: rezervacijaId.toString(),
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(`✓ Payment Intent kreiran: ${paymentIntent.id}`);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('❌ Stripe PaymentIntent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}