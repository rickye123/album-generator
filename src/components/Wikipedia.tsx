interface WikipediaProps {
    wikipediaUrl: string;
}

const Wikipedia: React.FC<WikipediaProps> = ({ wikipediaUrl }) => {

    return (
        <a
            href={wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wikipedia-link"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png"
                alt="Wikipedia"
                className="wikipedia-icon"
            />
        </a>
    );
};

export default Wikipedia;
