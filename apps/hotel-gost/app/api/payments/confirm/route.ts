/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@hotel/lib/prisma';
import { sendPaymentConfirmationEmail } from '@hotel/lib';
import { getLocaleMessages } from '@/i18n/i18n';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27' as any,
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, rezervacijaId } = await request.json();

    console.log(`💳 Payment Confirm pozvan - Rezervacija: ${rezervacijaId}, PaymentIntent: ${paymentIntentId}`);

    if (!paymentIntentId || !rezervacijaId) {
      console.error('❌ Nedostaju parametri');
      const lang = 'sr'; // ili iz requesta/cookie
      const messages = await getLocaleMessages(lang, 'common');
      return NextResponse.json(
        { error: messages.payment_missing_params },
        { status: 400 }
      );
    }

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      console.warn(`⚠️ Payment nije completed - status: ${paymentIntent.status}`);
      const lang = 'sr';
      const messages = await getLocaleMessages(lang, 'common');
      return NextResponse.json(
        { error: messages.payment_not_completed },
        { status: 400 }
      );
    }

    console.log(`✓ Payment verified sa status: ${paymentIntent.status}`);

    // Update reservation status in database
    const updatedRezervacija = await prisma.rezervacija.update({
      where: {
        id: parseInt(rezervacijaId),
      },
      data: {
        status: 'paid',
      },
      include: {
        soba: true,
        gost: true,
      },
    });

    console.log(`✓ Rezervacija ${rezervacijaId} ažurirana sa statusom 'paid'`);

    // Pošalji email potvrdu plaćanja
    if (updatedRezervacija.gost) {
      try {
        const paymentAmount = paymentIntent.amount / 100; // Stripe koristi cente
        console.log(`📧 Slanje email potvrde za plaćanje na: ${updatedRezervacija.gost.email}`);

        const emailSent = await sendPaymentConfirmationEmail(
          {
            gost: updatedRezervacija.gost,
            rezervacija: updatedRezervacija,
            paymentAmount
          },
          'sr' // Default language - možete dodati lang parametar ako trebate
        );

        if (emailSent) {
          console.log(`✓ Email plaćanja uspješno poslana za rezervaciju ${rezervacijaId}`);
        } else {
          console.warn(`⚠️ Email plaćanja nije poslana (možda nisu dostupni kredencijali)`);
        }
      } catch (emailError) {
        console.error(`✗ Greška pri slanju emaila plaćanja za rezervaciju ${rezervacijaId}:`, emailError);
        // Ne prekidaj request ako email fajla
      }
    } else {
      console.warn(`⚠️ Gost nije pronađen za rezervaciju ${rezervacijaId}`);
    }

    return NextResponse.json({
      success: true,
      rezervacija: updatedRezervacija,
      emailSent: true, // Indikatcija da je email pokušan
    });
  } catch (error) {
    console.error('❌ Payment confirmation error:', error);
    const lang = 'sr';
    const messages = await getLocaleMessages(lang, 'common');
    return NextResponse.json(
      { error: messages.payment_failed_confirm },
      { status: 500 }
    );
  }
}