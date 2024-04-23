import { host } from '../../assets/constants/host.constant'

class NewsService {

    getNews = async () => {
        return fetch(`${host}/post/`).then(data => data.json())
    }
}

export default NewsService