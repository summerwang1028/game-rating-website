import axios from './api';

export default {
    siteRoot: 'https://mysite.com',
    getSiteData: () => ({
        title: 'Game Rating',
    }),
    getRoutes: async () => {
        const { data: games } = await axios.get('/games');
        return [
            {
                path: '/',
                component: 'src/containers/Home',
            },
            {
                path: '/about',
                component: 'src/containers/About',
            },
            {
                path: '/games',
                component: 'src/containers/GameList',
                getData: () => ({
                    games,
                }),
                children: games.map(game => ({
                    path: `/${game._id}`,
                    component: 'src/containers/Game',
                    getData: () => {
                        return {
                            game,
                        };
                    }
                })),
            },
            // {
            //     path: '/blog',
            //     component: 'src/containers/Blog',
            //     getData: () => ({
            //         posts,
            //     }),
            //     children: posts.map(post => ({
            //         path: `/post/${post.id}`,
            //         component: 'src/containers/Post',
            //         getData: () => ({
            //             post,
            //         }),
            //     })),
            // },
            {
                is404: true,
                component: 'src/containers/404',
            },
        ]
    },
}
