const PageType = {
    NowPlaying: {
        header: "Now Playing",
        url: "http://localhost:8081/home/now-playing"
    },

    Popular: {
        header: "Popular",
        url: "http://localhost:8081/home/popular"
    },

    Upcoming: {
        header: "Upcoming",
        url: "http://localhost:8081/home/upcoming"
    },

    TopRated: {
        header: "Top Rated",
        url: "http://localhost:8081/home/top-rated"
    }
}

function getPageDetails(pageType) {
    const details = PageType[pageType];

    if (!details) {
        console.error('Invalid pageType:', pageType);
        return null;
    }

    return {
        header: details.header,
        url: details.url
    };
}


export default getPageDetails;