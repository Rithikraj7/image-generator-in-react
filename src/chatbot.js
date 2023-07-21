import React, { useState } from 'react';
import { OpenAIApi, Configuration } from 'openai';

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const apiKey = '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'; // Replace with your actual API key
    //const apiUrl = 'https://api.openai.com/v1/images/generations';

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const configuration = new Configuration({
        apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await openai.createImage({
                prompt: userMessage,
                n: 1,
                size: "512x512",
            });

            const base64Image = response.data.data[0].url;
            setGeneratedImage(base64Image);
        } catch (error) {
            setError('Error making the request. Please try again later.');
            console.error('Error making the request:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>OpenAI Image Generator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button type="submit" disabled={loading}>
                    Generate Image
                </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {generatedImage && (
                <div>
                    <h3>Generated Image:</h3>
                    {/* Display the generated image */}
                    <img src={generatedImage} alt=" " />
                </div>
            )}
        </div>
    );
};

export default Chatbot;
