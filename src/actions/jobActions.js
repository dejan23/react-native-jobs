import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'

// this is hard coded data since indeed api doesnt work
import jobsDATA from './jobsDATA.json'

import {
    FETCH_JOBS,
    LIKED_JOB,
    CLEAR_LIKED_JOBS,
} from './types'

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript',
    userip: '1232131',
    useragent: 'chrome'
}

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip })
    return `${JOB_ROOT_URL}${query}`
}


export const fetchJobs = (region, cb) => async dispatch => {
    try {
        // Indeed api doesnt work so i am using hard coded data
        // let zip = await reverseGeocode(region)
        // const url = buildJobsUrl(zip)
        // let { data } = await axios.get(url)

        dispatch({ type: FETCH_JOBS, payload: jobsDATA })
        cb()
    } catch (e) {
        console.log(e)
        cb()
    }
}

export const likeJob = job => {
    return {
        payload: job,
        type: LIKED_JOB
    }
}

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS }
}