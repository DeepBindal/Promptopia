import connectToDB from "@utils/database"
import Prompt from "@Models/prompt"
export const GET = async (req, res) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        return new Response("Failed to create Prompt", {status : 500})
    }
}