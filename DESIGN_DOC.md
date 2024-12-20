# Design Documentation

This documentation acts as an explanation to architectural decisions and thought process
for the creation of this code assessment.

## Inspiration
My main design inspirations came from two sites I found on ThemeForest.  For the circled
images of profiles and layout I used this [site](https://friendkit.cssninja.io/navbar-v1-stories-main.html) for inspiration.  For the users list
page I used this [one](https://preview.themeforest.net/item/socializ-social-media-marketing-agency-elementor-template-kit/full_screen_preview/49460522?_ga=2.117159430.1031997906.1734442694-1573185640.1728171194&_gac=1.49014100.1734442694.CjwKCAiA34S7BhAtEiwACZzv4ULWzAKLDh5cKIj1i7ZT8x5GNqn2Ls_nywWBGaURsDVQuTEs0NbtwhoCVKkQAvD_BwE).

## Technologies Used
- **React** - Frontend Framework
- **NextJS** - React framework that processes client and server side rendering.
- **Typescript** - Adds static typing to JavaScript.
- **Recoil** - React state management.
- **Sass** - Advanced features extended to CSS.
- **Tailwind** - Utility based CSS framework.

## Architecture

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

### Component Directory
Most components are comprised in a directory where `index.tsx` and `types.ts` exist for
splitting out typing. 

### CSS
I used both tailwind and sass.  The philosophy I used for the most part was to use Tailwind
for spacing and structural designs and SASS for all other designs.  Global.scss does styling
for main layout component and variables to handle theme changes in application.

### Component/Server Components
For the pages routing located at `src/users`.  I tried to make all of them Server components.
So I abstracted pieces of the page that needed to be client components to the `components`
directory.

## Future Considerations
