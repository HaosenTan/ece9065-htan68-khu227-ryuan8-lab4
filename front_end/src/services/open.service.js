import axios from "axios";
import { BASE_URL } from "./setting";

const API_URL = BASE_URL + 'api/open/';

const searchTracks = (artistName, trackTitle, trackGenre) => {
    return axios.post(API_URL + 'trackDetailsBycombi', {
        artist_name: artistName,
        track_title: trackTitle,
        track_genres: trackGenre
    })
    .then(
        response => {
            return response.data;
        }
    );
};

const getPublicLists = () => {
    return axios.get(API_URL + 'tenPublicList')
    .then(
        response => {
            return response.data;
        }
    );
};

export default {
    searchTracks,
    getPublicLists
};