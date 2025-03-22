import React, { useState, useEffect } from 'react';
import './ExplorePage.css';

const ExplorePage = () => {
    const [text, setText] = useState('');
    const fullText = "Explore Flu";
    const typingSpeed = 100;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, index + 1)); // Use substring to avoid incorrect state updates
            index++;

            if (index === fullText.length) {
                clearInterval(interval);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, []);

    const mediaItems = [
        { id: 1, src: 'ep1.mp4', type: 'video', alt: 'Video of a person' },
        { id: 2, src: 'epi3.jpg', type: 'image', alt: 'Person in a hoodie' },
        { id: 3, src: 'ep2.mp4', type: 'video', alt: 'Video of a person' },
        { id: 4, src: 'p.jpg', type: 'image', alt: 'Person in a hat' },
        { id: 5, src: 'ep3.mp4', type: 'video', alt: 'Video of a person' },
        { id: 6, src: 'epf.jpg', type: 'image', alt: 'Person in a hat' },
        { id: 7, src: 'epi6.png', type: 'image', alt: 'Person in black dress' },
        { id: 8, src: 'ep4.mp4', type: 'video', alt: 'Video of a person' },
        { id: 9, src: 'ep5.mp4', type: 'video', alt: 'Video of a person' },
    ];

    return (
        <div className="explore-flu">
            <h1 className="typing-effect">{text}</h1>
            <div className="media-grid">
                {mediaItems.map(item => (
                    <div key={item.id} className="media-item">
                        {item.type === 'video' ? (
                            <video className="media" autoPlay loop muted>
                                <source src={item.src} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img className="media" src={item.src} alt={item.alt} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
