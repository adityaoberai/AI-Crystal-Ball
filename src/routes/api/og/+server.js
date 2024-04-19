import { ImageResponse } from '@vercel/og';
 
export const config = {
  runtime: 'edge',
};
 
export async function GET({ url }) {
    let destiny = url.searchParams.get('destiny') || 'Not found';
    let username = url.searchParams.get('username') || 'Not found';

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'gold',
                    width: '100%',
                    height: '100%',
                    padding: '50px 50px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        background: 'white',
                        padding: '50px 50px',
                        borderRadius: '20px',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1 style={{ fontSize: 60, margin: 0 }}>{username}'s' Destiny</h1>
                    <h2 style={{ fontSize: 40, margin: 0 }}>{destiny}...</h2>
                </div>
            </div>
        ),
        {
        width: 1200,
        height: 630,
        },
    );
}