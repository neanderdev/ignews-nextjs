import { Get, query as q } from "faunadb";

import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
) {
    console.log(subscriptionId, customerId);
    // Buscar o usuário no banco do FaunaDB com o ID: { customerId }    
    const userRef = await fauna.query(
        q.Select(
            'ref',
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                ), 
             ),
        ),
    );

    // Salvar os dados de subscription no FaunaDB
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptiondata = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data: subscriptiondata }
        ),
    );
}