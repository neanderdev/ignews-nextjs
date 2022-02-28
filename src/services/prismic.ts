import * as prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown) {
    const endpoint = prismic.getEndpoint('ig-news-nextjs-dev');
    const client = prismic.createClient(
        endpoint, // pode usar o de baixo também
        // process.env.PRISMIC_ENDPOINT, 
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    );
    client.enableAutoPreviewsFromReq(req);

    return client;
}