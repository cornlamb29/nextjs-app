# Design Documentation

This documentation acts as an explanation to architectural decisions and thought process
for the creation of this code assessment.

## Project Overview
This is a NextJS web application that displays a list of users and their friends.  It also displays
a user's photos and posts.
- / - displays a list of users
- /users - displays a list of users
- /users/[id] - displays a user's profile page
- /users/[id]/friends - displays a user's friends
- /users/[id]/photos - displays a user's photos
- /users/[id]/posts - displays a user's posts

## Inspiration
My main design inspirations came from two sites I found on ThemeForest.  For the circled
images of profiles in my app I drew inspiration from this [site](https://friendkit.cssninja.io/navbar-v1-stories-main.html).
I love how the images are displayed on the team's page [here](https://preview.themeforest.net/item/socializ-social-media-marketing-agency-elementor-template-kit/full_screen_preview/49460522?_ga=2.117159430.1031997906.1734442694-1573185640.1728171194&_gac=1.49014100.1734442694.CjwKCAiA34S7BhAtEiwACZzv4ULWzAKLDh5cKIj1i7ZT8x5GNqn2Ls_nywWBGaURsDVQuTEs0NbtwhoCVKkQAvD_BwE).

## Technologies Used
- **React** - Frontend Framework
- **NextJS** - React framework that processes client and server side rendering.
- **Typescript** - Adds static typing to JavaScript.
- **Recoil** - React state management.
- **Sass** - Advanced features extended to CSS.
- **Tailwind** - Utility based CSS framework.
- **SWR** - fetching utility

## Architecture

### Enviornment variable file
- port - control which port application runs on
- API_REFRESH_INTERVAL - interval in milliseconds to refresh api data
```env
PORT=3000
API_REFRESH_INTERVAL=60000
```

### Directory Structure
Below shows directory structure along with some notes on some of the directories.
```
├── public [Publically acessible files]
│   └── images
│       ├── albums [Adding directory with user id and adding images shows images on user's photos page]
│       │   └── 1
│       └── profiles
└── src
    ├── app
    │   ├── api [NextJS API built in API routing]
    │   │   └── users
    │   │       └── [id]
    │   │           ├── friends
    │   │           ├── photos
    │   │           └── posts
    │   └── users [Routing for user's pages]
    │       └── [id]
    │           ├── friends
    │           ├── photos
    │           └── posts
    ├── components [Reusable components]
    │   ├── FriendsIconList
    │   ├── FriendsList
    │   ├── Photo
    │   ├── PhotosList
    │   ├── PostsList
    │   └── SidebarNavigation
    ├── data [mock data]
    ├── hooks
    ├── lib
    ├── providers
    └── store [Recoil state management]
        ├── localStorage
        └── theme
```

I tried to follow a standardized directory structure.  The store directory holds
recoil state management which was minimal.  For providers, I added theme component
which technically is not a provider due to not having any context API usage, but
I left it there because typically I would add theme settings set in provider value
for child components to use.

#### Albums
The albums directory in public folder holds user's photos.  If you add images to
a directory that matches a user's user_id those images will show up on user's photos
page.

#### Component Directory
Most components are comprised in a directory where `index.tsx` and `types.ts` exist for
splitting out typing. 

#### CSS
I used both tailwind and sass.  The philosophy I used for the most part was to use Tailwind
for spacing and structural designs and SASS for all other styling.  Global.scss does styling
for main layout component and variables to handle theme changes in application.

#### Component/Server Components
For the routing components located at `src/users`.  I tried to make all of them Server components.
So I abstracted pieces of the page that needed to be client components to the `components`
directory.

## Challenges
I had a tough time trying to use recoil and Next.js.  Searching around the interwebs I stumbled
across a [forum](https://github.com/vercel/turborepo/discussions/8373#discussioncomment-11580880) to where a nerd much smarter than me figured it out. Simply put, recoil and Next.js latest versions dont play well together.

There was a scenario where I retrieved data in a layout component `src/users/[id]/layout.tsx`
```javascript
const user = await getUser(Number(params.id));
const friends = await getFriends(Number(params.id));
```
I wanted to pass the results from user and friends in layout component passed to its child page components.  It seems like [Custom App](https://nextjs.org/docs/pages/building-your-application/routing/custom-app) would solve this, 
but I could not get it to work. I just made the same api calls again subsequently found in the `components` directory (some not all).  This is probably not 100% optimal.

Sprinkled throughout the code base I commented with URLs to places I searched for to get answers to coding challenges
- [Reading files from directory](https://milddev.com/list-files-in-a-directory-using-nodejs) - used for api logic to get user's photos.
- [Getting relative path in Node](https://stackoverflow.com/questions/34696334/node-js-get-relative-to-project-src-path-of-file) -  also used for user's photo api endpoint.
- [Tailwind css syntax](https://github.com/tailwindlabs/tailwindcss/discussions/7282) - this particular syntax made it possible for changing theme background of a component
  based on having a parent class containing light class `[html.ligth&]:bg-white`.  Probably should have handled in global variables in global.scss, but I really like the color
  that tailwind css provided.
- [Recoil local storage](https://blog.jim-nielsen.com/2024/localstorage-recoil/) - maybe a little overkill. I just wanted a recoil store to manage settings synced with local storage.
  Storing theme and user settings could also be used for this for future considerations.  Also for authentication purposes this strategy of using local storage can be used for syncing
  cookie data.  Unless Next.js has another recommended solution for handling authentication state.

## API Design
Technically we don't need `/api/users` defined in `src/app/api` because there are no browser api calls in the code base that
are calling this endpoint.  I like having it there just in case it is needed.
- Users
  - [GET] /api/users -  get all users
  - [GET] /api/users/[id] - get user by id
- Friends 
  - [GET] /api/users/[id]/friends - get friends by user id
- Photos
  - [GET] /api/users/[id]/photos - get photos by user id
- Posts
  - [GET] /api/users/[id]/posts - get posts by user id

#### API Response Format
```javascript
interface JSONResponse {
  status: number; // status code for api response
  data?: any; // optional data for api resources
  message?: string; // optional message typically for error messaging
}
``` 

When making api calls I used useSWR for client components where I thought data would be dynamic.
Technically speaking none of the data is dynamic.  Data retrieval in `src/components/UsersList` I called
data not using useSWR fetch, but directly from data function, because I suspected this kind of data would not change
often.

```javascript
// api call using useSWR
// api call in client component for handling dynamic data
const { data: users, error: usersError, isLoading: usersLoading } = useSWR<
  User[],
  JSONResponse
>('/api/users', fetcher, { refreshInterval: 1000 });

// fetching data directly from data function
// for data that is not dynamic
const users = = getAllUsers();
```

## Mock Data
I created mock data in `src/data/` to simulate a database.  I used this to populate the users, friends, photos, and posts data.
The naming convention of fields in json used a naming convention that would support sql queries using natural joins and using
clauses.  So user.user_id would be named instead of user.id for unique identification.

## Documentation
Next.js [examples](https://github.com/vercel/next.js/tree/canary/examples) helped me tremendously with grasping some of the nextJS ecosystem.  A lot of times
I copied code from there and adjusted accordingly to the objective I was trying to achieve.
I had to go over [Next.js documentation](https://nextjs.org/docs) many times when I noticed things that could possibly be antipatterns in Next.js environment.

## Future Considerations
I would love to tackle using partial prerendering.  I did not think it was part of the scope
of this assessment.  I think it would be a good use case for the posts page.  Where you can 
add posts live instead of current static page.  Also it appears it is not ready for production use yet.

I would like to get more of a feel for how using global state management in Next.js works.  I battle with if it is really needed.
I know there are some cases like storing active link and user sessions could be good candidates for global state management in Next.js.

For api design I could implement pagination for all endpoints to accommodate for larger data sets.
It would be good experience working on authenticating in Next.js enviornment, it would also give
the opportunity to work with using middleware.

It would have been nice to add some end-to-end and unit testing.  I have used cypress and jest in the past.

I really do not understand good use cases to use `getStaticProps`, `getStaticPaths`, and `getServerSideProps` functions.  In the examples
they are just making api calls and extending them to page props.  Is there significance in getting data from props as opposed to just making 
them in the component body?