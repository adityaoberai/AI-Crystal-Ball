import satori from 'satori';
import {html as toReactElement} from 'satori-html';
import {Resvg} from '@resvg/resvg-js'

const height = 630;
const width = 1200;

const fontFile = await fetch('https://og-playground.vercel.app/inter-latin-ext-700-normal.woff');
const fontData = await fontFile.arrayBuffer();

export async function GET ({ url }) {
    let destiny = url.searchParams.get('destiny') || 'Not found';
    let username = url.searchParams.get('username') || 'Not found';

    const html = `<div width=1200 height=630 style="background: #c0b283; width: 100%; height: 100%; text-align: center; justify-content: center; align-items: center; display: flex; flex-direction: column;"><h1 style= "fontSize: 60; color: #ffffff">${username}'s Destiny</h1><div style="background: white; padding: 50px 50px; border-radius: 40px; border: 1px solid black; width: 80%; height: 80%; text-align: center; justify-content: center; align-items: center; display: flex; flex-direction: column"><h2 style="fontSize: 30; margin: 0">${destiny}...</h2></div></div>`;
    const svg = await satori(toReactElement(html), {
        fonts: [
            {
                name: 'Inter Latin',
                data: fontData,
                style: 'normal'
            }
        ],
        height,
        width
    });

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: width
        }
    });

    const image = resvg.render();

    return new Response(image.asPng(), {
        headers: {
            'content-type': 'image/png',
            'Access-Control-Allow-Origin': '*'
        }
    });
};