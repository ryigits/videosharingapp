import "./App.css";
import { useState } from "react";
import youtube from "./api/youtube";
import { Grid } from "@material-ui/core";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
function App() {
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideos] = useState({
        id: {},
        snippet: {},
    });
    return (
        <Grid style={{ justifyContent: "center" }} container spacing={10}>
            <Grid item xs={11}>
                <Grid container spacing={10}>
                    <Grid item xs={12}>
                        <SearchBar onSubmit={handleSubmit} />
                    </Grid>
                    <Grid item xs={8}>
                        <VideoDetail video={selectedVideo} />
                    </Grid>
                    <Grid item xs={4}>
                        <VideoList
                            videos={videos}
                            onVideoSelect={setSelectedVideos}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
    async function handleSubmit(searchItem) {
        const {
            data: { items: videos },
        } = await youtube("search", {
            params: {
                part: "snippet",
                maxResults: 5,
                key: process.env.REACT_APP_GOOGLE_API_KEY,
                q: searchItem,
            },
        });
        setVideos(videos);
        setSelectedVideos(videos[0]);
    }
}

export default App;
