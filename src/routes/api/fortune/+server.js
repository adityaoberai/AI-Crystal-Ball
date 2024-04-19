import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { OpenAI } from 'openai';

export async function POST({ request }) {
    try{
        const requestBody = await request.json();

        const openai = new OpenAI({
            apiKey: env.SECRET_OPENAI_API_KEY
        });

        const userData = requestBody.userData;
      
        const prompt = `You have the following data on a developer from their GitHub account:\n\nGitHub username: ${userData.username}\nFollowers: ${userData.followers}\nFollowing: ${userData.following}\nTop 5 languages:\n${userData.languages.join(',')}\n\nBased on this data, create a humourous, realistic prediction to lightly roast the individual about what they'll be doing in 5 years from now. Do not explicitly include their GitHub data in the final message. Only use gender-neutral pronouns.`;
        const response = await openai.chat.completions.create({
        model: 'gpt-4',
        max_tokens: 250,
        messages: [{ role: 'user', content: prompt }],
        });
        const completion = response.choices[0].message?.content;
        console.log(completion);

        return new Response(
            JSON.stringify({
                fortune: completion
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: 200
            }
        )
    } catch(err){
        console.error(err);
        throw error(500, err.message);
    }
}