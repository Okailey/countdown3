import React, { useState, useEffect } from 'react';
import "../styles/News.css";
import { Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

function News({ }) {
    const [dailyNews, setDailyNews] = useState([]); // Default to empty array
    const [isLoading, setIsLoading] = useState(false); // Default to false
    const [error, setError] = useState("");
    const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    // Fetch the top 5 news for the last day (previous day to display)
    const fetchData = async () => {
        const NEWS_API = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${NEWS_API_KEY}`;
        try {
            setIsLoading(true);
            const response = await fetch(NEWS_API);

            // Check if the response status is okay
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            const top5 = data.results.slice(0, 5); // Get the top 5 articles
            setDailyNews(top5);
            setError(""); // Clear any previous error
        } catch (error) {
            setError("Failed to fetch news.");
        } finally {
            setIsLoading(false); // Stop the loading indicator
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Only run this on component mount

    return (
        <div className="news-container">
            <Typography className="news-title">Top 5 News (Home)</Typography>
            {isLoading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <div className="news-grid">
                {dailyNews.map((article, idx) => (
                    <Card className="news-card" key={idx}>
                        {article.multimedia?.[0] && (
                            <CardMedia
                                component="img"
                                className="news-image"
                                image={article.multimedia[0].url}
                                alt={article.title}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6">{article.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{article.byline}</Typography>
                            <Typography>{article.abstract}</Typography>
                            <Button href={article.url} target="_blank" variant="contained">Read More</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default News;
