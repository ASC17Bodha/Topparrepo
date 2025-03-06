# Building the Workshops App using React
- __Documentation__: https://angular.dev/
- __Production backend__: https://workshops-server.onrender.com/
- __Development backend__: In `workshops-server` folder. To launch the local development server, execute the following in a new terminal. It launches on http://localhost:8001/workshops
```
cd workshops-server
npm i
npm start
```
- Completed frontend app can be run from the `workshops-app-completed` folder

## Before getting started
- You will need Node `>= 14` in order to run a React application created using [`create-react-app`](https://create-react-app.dev/). Install a compatible version of Node if you don't have one.

```
node --version
node -v
```
- Also, install __React Food Truck__ (by _Burke Holland_) which is a collection of VS Code extensions for React application development.

- __References__:

1. https://nodejs.org/en

## Step 1: Create the React app and run it

- Follow the steps on the [`create-react-app`](https://create-react-app.dev/) site in order to scaffold a React application. Since we would like a template with TypeScript (and TS compilation set up), we use that option. Create the React app from the folder of your choice.

```
npx create-react-app workshops-app --template typescript
```

- The project creation fails as React Testing Library that is installed along, requires React 18 (and not the latest React 19). We shall work with React 18. In order to do this, delete `node_modules`, and `package-lock.json` and makes these changes to `package.json`.

```json
"dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "web-vitals": "^2.1.4"
},
"devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^22.13.1",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "cra-template-typescript": "1.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
},
```
- Also create the missing `tsconfig.json` in the project folder
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src"
  ]
}
```
- __Reference__: https://stackoverflow.com/questions/71835697/create-react-app-dependency-version-issues-with-react-18
- Change directory to the created project directory and try installing the dependencies once again. It should succeed.
```
cd workshops-app
npm i
```
- Run the app
```
npm start
```
- It is better to open the app (usually running at `http://localhost:3000/`) in Chrome.
- __Reference__: https://create-react-app.dev/

## Step 2: Understand the project structure and basics of data binding
- Understand the purpose of each and every file in the project (starting from `package.json`), the organization of application code, the build process (that uses Webpack / Vite), and what happens when the React app launches in the browser.
- Make some changes in `src/App.tsx` and observe the changes reflected in the browser (this feature of Webpack is called _hot module replacement_, and it happens without the browser window refresh).
```tsx
import { useState } from "react";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            {/* Exercise */}
            <span>You have clicked this button <span>{/* show the count of times the button is clicked */}</span> times</span>
        </>
    );
}

export default App;
```
- __EXERCISE__: Introduce a data member to keep track of how many times the button is clicked, and display this in the span above.
- Styles can be defined in `src/App.scss`. But before that you need to install the Sass compiler.
```
npm i -D sass
```
- `App.scss` (rename `App.css` as `App.scss`)
```scss
h1 {
    color: crimson;
}
```
- Include it in `App.tsx`
```tsx
import './App.scss';
```

## Step 3: Install React Bootstrap
- __Reference__: https://react-bootstrap.netlify.app/docs/getting-started/introduction
Install React Bootstrap
```
npm install react-bootstrap bootstrap
```
- Include Bootstrap SCSS in `src/index.tsx`
```tsx
/* Importing Bootstrap SCSS file. */
import "bootstrap/scss/bootstrap.scss";

import "./index.css";
```
- Let's use the `Alert` component from React Bootstrap in order to check if the installations completed without issues. In `src/App.tsx`,
```tsx
import { useState } from "react";
import { Alert } from "react-bootstrap";

import "./App.scss";

function App() {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
}

export default App;
```

## Step 4: Add a simple navigation menu for the app
- `src/components/common/Menu/Menu.tsx`
- __Tip__: Create the component skeleton by typing __sfc__ (and hitting the __Enter__ key)
```ts
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand href="/">Workshops App</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="#">List of workshops</Nav.Link>
                        <Nav.Link href="#">Add a workshop</Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
```
- Since all our pages are to have the menu on top, the `App` component is a convenient place to include it. This avoids the need to include it in every page component individually.
- `src/App.tsx`
```tsx
import Menu from "./components/common/Menu/Menu";
```
```ts
return (
    <>
        <Menu />
        
        {/* existing UI... */}
    </>
);
```

## Step 5: Add a Home component
- `src/components/Home/Home.tsx`. We move the page's content (everything below the menu) to this component.
```tsx
import { useState } from "react";

const Home = () => {
    // variable that is NOT state
    // const title = "Workshops App";

    // variable that is state - changes to the variable (using setTitle) will trigger a re-render
    const [title, setTitle] = useState("Workshops App");
    const [count, setCount] = useState(0);

    const changeTitle = () => {
        // incorrect way to change the title - will not trigger a re-render
        // title = "My first React Application";

        // correct way to change the title - will trigger a re-render
        setTitle("My first React Application");

        // The function form of the setState updater is used when the new state is computed using the previous state
        setCount((c) => c + 1);
    };

    return (
        <>
            <h1>{title}</h1>
            <hr />
            <button onClick={changeTitle}>Change title</button>

            <span>
                You have clicked this button <span>{count}</span> times
            </span>
        </>
    );
};

export default Home;
```
- Include the component in the app. In `src/App.tsx`. Note that we have moved the alert to the very top of the page.
```ts
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";

import Menu from "./components/common/Menu/Menu";
import Home from "./components/Home/Home";

import "./App.scss";

function App() {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        v16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Home />
            </Container>
        </>
    );
}

export default App;
```
- In `App.scss` we add the following
```scss
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Now that we have understood data-binding, event handling basics, and made structural changes to move the home page contents to the home component, let's put in actual content for home in `src/components/Home/Home.tsx` (only the rendered UI is shown below). You can remove the state and event handlers completely.
```html
<h1>Workshops App</h1>

<hr />

<section>
  <p>Welcome to Workshops App</p>
  <p>
    The app serves details of (fictitious) technical workshops happening in
    various cities. Every workshop has a broad topic (eg. JavaScript), and a
    workshop has many sessions (each session covers a sub-topic, eg. Closures in
    JavaScript).
  </p>
  <p>
    You can view a list of workshops, details of every workshop, add a workshop,
    view the list of sessions in a workshop, and also add a new session for a
    workshop.
  </p>
</section>
```
- __Exercise__: Just the way we have created a separate component for `Home`, create one for the alert message and include it in the `App` component.

## Step 6: Set up more pages and routing
- The most popular routing library for React apps is [__React router__](https://reactrouter.com/home). Its latest version if v7 which is compatible with v6. v5 and v6 are significantly different however. Starting v7, React router can be used as a React framework to build react apps, or as a library for routing with an existing React app. We use it as a library here.
- Install React router
```
npm i react-router react-router-dom
```
- Start by wrapping the application UI in a `BrowserRouter` within `src/index.tsx`
```tsx
import { BrowserRouter } from "react-router";
```
```tsx
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
```
- It is a common practice to create a folder with page-level components (components that represent pages in the app). The folder structure for this would mirror the routing structure for the app. This is a convention popularized by Next JS (a framework for building apps that use React). The `HomePage` component can extract routing parameters (path parameters, query string parameters) etc. and pass it to the `Home` component if needed.  In `src/pages/home/index.tsx`
```tsx
import Home from "../../components/Home/Home";

const HomePage = () => {
    return <Home />;
};

export default HomePage;
```
- Add a route for the Home page in `src/App.tsx`. Redirection options can be utilized if needed on routes. An example is shown below as an illustration. Both `http://localhost:3000/` and `http://localhost:3000/home` will take the user to the home page (with the canonical path being `http://localhost:3000/`).
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/home" element={<Navigate to ="/" />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
</Container>
```
- You will now be able to navigate to the home page by clicking on the app name or home link in the menu. Other links will not work at the moment.
- Create the following components. Set each one up to have a very basic UI. Note that the folders within which they have to be created are also mentioned. Create the page-level components for these as per the routes mentioned (verify if the folder structure is correct with the instructor).
```
src/workshops/WorkshopsList/WorkshopsList.tsx - path is `/workshops`
src/workshops/AddWorkshop/AddWorkshop.tsx - path is `/workshops/add`
src/workshops/Favorites/Favorites.tsx - path is `/workshops/favorites`
```
- Set up routes for the new components in `src/App.tsx`.
```tsx
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";
```
```tsx
<Container className="my-5">
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/workshops" element={<WorkshopsListPage />} />
        <Route
            path="/workshops/add"
            element={<AddWorkshopPage />}
        />
        <Route
            path="/workshops/favorites"
            element={<FavoritesPage />}
        />
    </Routes>
</Container>
```
- Add their links in `src/components/common/Menu/Menu.tsx`
```tsx
<Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
        <Nav.Link href="/home">
            Home
        </Nav.Link>
        <Nav.Link href="/workshops">
            List of workshops
        </Nav.Link>
        <Nav.Link href="/workshops/add">
            Add a workshop
        </Nav.Link>
    </Nav>
    <NavDropdown title="Personalize" id="basic-nav-dropdown">
        <NavDropdown.Item href="/workshops/favorites">
            Favorites
        </NavDropdown.Item>
        <NavDropdown.Item href="#">
            Change Theme
        </NavDropdown.Item>
    </NavDropdown>
</Navbar.Collapse>
```
- You should be able to navigate to all the pages
- Layout routes were introduced in React Router v6. This feature allows us to define a shared layout that wraps multiple child routes, making it easier to structure applications. A layout route is a parent `<Route>` that renders a common layout component (like a navbar, sidebar, or footer) while dynamically switching its child routes inside it using `<Outlet />`. Create a layout route in `src/pages/layout.tsx`
```tsx
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Menu from "../components/common/Menu/Menu";

import "./layout.scss";

const Layout = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            {show && (
                <Alert
                    variant="warning"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <Alert.Heading>Note on React Version</Alert.Heading>
                    <p>
                        The current version of React is v19. This app is built
                        using React v18. The way an app was built using React
                        16.7 or earlier was significantly different.
                    </p>
                </Alert>
            )}

            <Menu />

            <Container className="my-5">
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
```
- Create `src/pages/layout.scss`. Remove these styles from `App.scss` and add to this new page.
```tsx
/* add this to remove the space below the alert */
.alert {
    margin-bottom: 0;
    text-align: center;
}
```
- Update `src/App.tsx`
```tsx
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";

import HomePage from "./pages/home";
import WorkshopsListPage from "./pages/workshops";
import AddWorkshopPage from "./pages/workshops/add";
import FavoritesPage from "./pages/workshops/favorites";

import "./App.scss";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/workshops" element={<WorkshopsListPage />} />
                <Route path="/workshops/add" element={<AddWorkshopPage />} />
                <Route
                    path="/workshops/favorites"
                    element={<FavoritesPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
```
- The component will now be selected based on the route (browser location), and rendered within `<Outlet />`. Navigate using the menu and check it still works fine. Change it manually in the address bar, and the page that is loaded should change based on the routes configured. 

## Step 7: Update the menu to route to the pages without page refresh, and highlight the active route
- In `src/components/common/Menu/Menu.tsx` use `Link` instead of the usual anchor tag (`a`). `Link` defines the `to` prop instead of `href`. In order for Bootstrap components to make use of the `Link` component under-the-hood, we need to use the `as` prop defined on these Bootstrap components.
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { Link } from "react-router-dom";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops"
                        >
                            List of workshops
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/workshops/add"
                        >
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/workshops/favorites">
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- You should now be able to navigate without page refreshes, using the menu. Also keeo the network tab open to confirm there are no network requests. We now have a true Single Page Application (SPA)!
- It is common practice to highlight the active link (in top-level navigation menus, sidebars menus, breadcrumbs etc.). This is achieved using `NavLink` in place of `Link`. Make the following changes in `app/components/common/Menu/Menu.tsx`
```tsx
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { NavLink } from "react-router-dom";

import "./Menu.scss";

function Menu() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Workshops App
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops">
                            List of workshops
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/workshops/add">
                            Add a workshop
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title="Personalize" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            as={NavLink}
                            to="/workshops/favorites"
                        >
                            Favorites
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#">
                            Change Theme
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
```
- Customize the `active` class that is defined in Bootstrap. In `src/components/common/Menu/Menu.scss`,
```scss
// make sure the selector specificity is at least as much as Bootstrap's selector for the element - you can use the SAME selector that Bootstrap uses.
.navbar-nav .nav-link.active,
a.active {
    color: crimson;
}
```
- You can now navigate the pages using the menu, and see the active page link being highlighted. However, the _List of workshops_ link is highlighted when you go to the 'Add workshop' link as `/workshops` is a prefix for `/workshops/add`, and `NavLink` adds active to even links that are a prefix of the current location. To overcome this add the `end` prop to the _List of workshops_ link - this enforces a full path match instead of a prefix match. In `app/components/common/Menu/Menu.tsx`
```tsx
<Nav.Link as={NavLink} to="/workshops" end>
    List of workshops
</Nav.Link>
```
- __Note__: If you want to customize the active class (applying a class with some other name), or apply the class based on more conditions (than just simple matching), you can pass a function to the `className` prop of `NavLink`. However, this does not work with Bootstrap `Nav.Link`. You can create a custom `NavLink` and use it instead. One implementation is given below.
```tsx
import { NavLink, NavLinkProps } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

// Define TypeScript types for props
interface CustomNavLinkProps extends NavLinkProps {
    to: string; // Ensures 'to' prop is always a string
    children: React.ReactNode; // Ensures 'children' is valid JSX
}

// Custom component to handle className correctly
const CustomNavLink = ({ to, children, ...props }: CustomNavLinkProps) => (
    <NavLink
        to={to}
        {...props}
        className={({ isActive }) =>
            isActive ? "nav-link custom-active" : "nav-link"
        }
    >
        {children}
    </NavLink>
);

export default CustomNavLink;
```

## Step 8: Add a "page not found" page
- In `src/pages/not-found.tsx`
```tsx
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>Page Not Found!</h1>
            <p className="display-6">
                The page you are looking for does not exist. You can try going <Link to="">Home</Link>, or check the <Link to="/workshops">list of workshops</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
```
- Add a catch-all route __as the last route__ in `src/App.tsx`
```tsx
import NotFoundPage from "./pages/not-found";
```
```tsx
<Route element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" />} />
    <Route path="/workshops" element={<WorkshopsListPage />} />
    <Route path="/workshops/add" element={<AddWorkshopPage />} />
    <Route
        path="/workshops/favorites"
        element={<FavoritesPage />}
    />

    {/* Add this route */}
    <Route path="*" element={<NotFoundPage />} />
</Route>
```
- Try navigating to non-existent routes like `xyz` or `workshops/xyz` (by typing the path in the address bar). You should find the not found page appear.

## Step 9: Fetch a list of workshops (hard-coded) using a service and use it to display the list of workshops
- First define the models to represent the data the service shall fetch and give to consumers. Create `src/models/IWorkshop.ts`. While it is not necessary to create ILocation and IModes as separate interfaces, it can help when we want to represent those nested objects. Again the choice between interface and type to define the model is upto you. We use interfaces here.
```ts
interface ILocation {
    address: string;
    city: string;
    state: string;
}

interface IModes {
    inPerson: boolean;
    online: boolean;
}

interface IWorkshop {
    name: string;
    category: string;
    id: number;
    description: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    time: string;
    location: ILocation;
    modes: IModes;
    imageUrl: string;
}

export type {
    ILocation,
    IModes,
    IWorkshop as default
};
```
- Define a service to fetch a list of workshops in 
- We hard-code the list now, but shall later fetch from the backend. In `src/services/workshops.ts`
```ts
import IWorkshop from '../models/IWorkshop';

const getWorkshops = () => {
    return [
      {
        name: 'Angular JS Bootcamp',
        category: 'frontend',
        id: 1,
        description:
          '<p><strong>AngularJS</strong> (also written as <strong>Angular.js</strong>) is a JavaScript-based open-source front-end web application framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.</p><p>It aims to simplify both the development and the testing of such applications by providing a framework for client-side model–view–controller (MVC) and model–view–viewmodel (MVVM) architectures, along with components commonly used in rich Internet applications. (This flexibility has led to the acronym MVW, which stands for "model-view-whatever" and may also encompass model–view–presenter and model–view–adapter.)</p>',
        startDate: '2019-01-01T04:00:00.000Z',
        endDate: '2019-01-03T08:00:00.000Z',
        time: '9:30 am - 1:30 pm',
        location: {
          address: 'Tata Elxsi, Prestige Shantiniketan',
          city: 'Bangalore',
          state: 'Karnataka',
        },
        modes: {
          inPerson: true,
          online: false,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/2000px-AngularJS_logo.svg.png',
      },
      {
        name: 'React JS Masterclass',
        category: 'frontend',
        id: 2,
        description:
          '<p><strong>React</strong> (also known as <strong>React.js</strong> or <strong>ReactJS</strong>) is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.</p><p>React can be used as a base in the development of single-page or mobile applications. Complex React applications usually require the use of additional libraries for state management, routing, and interaction with an API.</p>',
        startDate: '2019-01-14T04:30:00.000Z',
        endDate: '2019-01-16T12:30:00.000Z',
        time: '10:00 am - 6:00 pm',
        location: {
          address: 'Tata Elxsi, IT Park',
          city: 'Trivandrum',
          state: 'Kerala',
        },
        modes: {
          inPerson: true,
          online: true,
        },
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png',
      },
    ] as IWorkshop[];
}

export {
    getWorkshops
};
```
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`
```tsx
import { useEffect } from "react";
import { getWorkshops } from "../../../services/workshops";

const WorkshopsList = () => {
    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const workshops = getWorkshops();
            console.log(workshops);
        },
        // [ ] // empty array -> causes the effect to execute only AFTER first render
        []
    );

    return <div>WorkshopsList works!</div>;
};

export default WorkshopsList;
```
Check the console to verify if the workshops fetched from the service are displayed.
- __Notes__:
1. The workshops will be displayed twice. This is due to the component initializing twice when running in React Strict mode (a feature that React has to run better error checks and report them better in development). You can prevent it if needed by removing the wrapping `<React.StrictMode></React.StrictMode>` in `src/index.tsx`. This is not recommended however (just keep it intact).

## Step 10: Fetch actual workshops from the backend and provide it through a Promise
- You can use the native `fetch` API to get data from the backend. However a third-party library like `axios` provides more features for working with HTTP requests and is easier to work with. Install `axios`.
```
npm i axios
```
- Modify the function in `src/components/WorkshopsList/WorkshopsList.ts` in order to make a request to the backend, and return a Promise for the workshops (or an error). The actual call is made when a consumer (in our case the `WorkshopsList` component) calls this function and waits for the result. You can use the local development backend URL (`http://localhost:8001/workshops`) instead of the production URL if you wish.
```ts
import axios from 'axios';
import IWorkshop from '../models/IWorkshop';

const getWorkshops = async () => {
    // We get a "Promise" object from axios.get()
    // Initially the Promise is in the "pending". Then the Promise is "resolved" / "rejected".
    // NOTE: Explore then(), catch() methods of Promise
    const response = await axios.get(`https://workshops-server.onrender.com/workshops`);
    return response.data as IWorkshop[];
};

export {
    getWorkshops
};
```
- Update `src/components/workshops/WorkshopsList/WorkshopsList.tsx` to consume the service
```tsx
import { useEffect, useState } from "react";
import { getWorkshops } from "../../../services/workshops";
import IWorkshop from "../../../models/IWorkshop";

const WorkshopsList = () => {
    const [loading, setLoading] = useState(true);
    const [workshops, setWorkshops] = useState<IWorkshop[]>([]);
    const [error, setError] = useState<Error | null>(null);

    // side-effect -> eg. we want to fetch workshops data from the backend
    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshops = await getWorkshops();
                    // console.log(workshops);
                    setWorkshops(workshops);
                    setLoading(false);
                } catch (error) {
                    // console.log(error);
                    setError(error as Error);
                    setLoading(false);
                }
            };

            helper();
        },
        []
    );
};

export default WorkshopsList;
```
- __Note__: The `helper` function is needed to overcome a technical problem when using `useEffect()`. `useEffect` can return nothing (`undefined`), or a cleanup function only (function type). Since an `async` function always returns a Promise, the effect function cannot be made `async` (in order to `await` on the call to `getWorkshops`). Hence the workaround with the `helper`.

## Step 11: Showing list of workshops and loading, error states
- In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router";
```
```tsx
return (
    <div>
        <h1>List of workshops</h1>
        <hr />
        <div>
            {/* What we generate by calling Array map() */}
            {/*
                {
                    [
                        <div key={workshops[0].id}>{workshops[0].name}</div>,
                        <div key={workshops[1].id}>{workshops[1].name}</div>,
                        <div key={workshops[2].id}>{workshops[2].name}</div>,
                        <div key={workshops[3].id}>{workshops[3].name}</div>,
                        ....
                    ]
                */
            }
            {
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            }
        </div>
    </div>
);
```
- __Notes__:
1. `key` is set to any value that is unique for every workshop, eg. id, name etc. It is needed to boost the performance of list rendering when new elements are added to / removed from the list (best practice). This is crucial for large lists.

- Add loading and error states to enhance user experience. In `src/components/workshops/WorkshopsList/WorkshopsList.tsx`,
```tsx
import { Alert, Button, Col, Card, Row, Spinner } from "react-bootstrap";
```
```tsx
return (
    <>
        <h1>List of workshops</h1>
        <hr />
        {
            /* if..else like behavior using ? : */
            loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>Completed loading</div>
            )
        }
        {
            /* if like behavior using && */
            loading === false && error !== null && (
                <Alert variant="danger">{error.message}</Alert>
            )
        }
        {
            loading === false && error === null && (
                workshops.map((workshop, idx) => (
                    <div key={workshop.id}>{ workshop.name }</div>
                ))
            )
        }
    </>
);
```

## Step 12: Create utility components for showing loading and error states in the UI when fetching data from the backend
- Create `src/app/common/loading-spinner`, `src/app/common/error-alert` under the `src/app/common` folder
```
ng g c common/loading-spinner
ng g c common/error-alert
```
- Move the code for the spinner from `src/app/workshops/workshops-list/workshops-list.component.html` to `src/app/common/loading-spinner/loading-spinner.component.html`
```html
<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
```
- In `src/app/workshops/workshops-list/workshops-list.component.ts`, we import `LoadingSpinnerComponent`
```ts
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading.spinner.component';
```
```ts
imports: [/* existing imports */, LoadingSpinnerComponent],
```
- Use this in place of the Bootstrap spinner in `src/app/workshops/workshops-list/workshops-list.component.html`
```html
<app-loading-spinner></app-loading-spinner>
```
- Move the code for the error alert from `src/app/workshops/workshops-list/workshop-list.component.html` to `src/app/common/error-alert/error-alert.component.html`. For now, let's hard-code the error message as `Some error occured`. As a good practice we check for null error object and display only if an error is actually passed.
```html
@if( error !== null ) {
    <ngb-alert type="danger">Some error occured</ngb-alert>
}
```
- We move the import for `NgbAlert` as well from `src/app/workshops/workshops-list/workshops-list.component.ts` to `src/app/common/error-alert/error-alert.component.ts` (do remove the same lines from `src/app/workshops/workshops-list/workshops-list.component.ts`)
```ts
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
```
```ts
imports: [ NgbAlert ],
```
- In `src/app/workshops/workshops-list/workshops-list.component.ts`, import the error alert component
```ts
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
```
```ts
@Component({
  ...
  imports: [CommonModule, LoadingSpinnerComponent, ErrorAlertComponent],
  ...
})
```
- In `src/app/workshops/workshops-list/workshops-list.component.html` add the `app-error-alert`. The component HTML looks like this now.
```html
@if(loading) {
    <app-loading-spinner></app-loading-spinner>
} @else if( !loading && error ) {
    <app-error-alert></app-error-alert>
} @else {
    @for( workshop of workshops; track workshop.id ) {
        <div>{{ workshop.name }}</div>
    }
}
```

## Step 13: Passing error object as input to error alert, theme variant as input to the spinner component, and showing it in the UI
- In the `src/app/common/error-alert/app-alert.component.ts` add an Input attribute
```ts
import { Component, Input } from '@angular/core';
```
```ts
export class ErrorAlertComponent {
  @Input()
  error!: Error | null;
}
```
- In `src/app/workshops/workshops-list/workshops-list.component.html` pass the `error` object to `app-error-alert`
```html
<app-error-alert [error]="error"></app-error-alert>
```
__Note__: Observe how attribute binding syntax is used to pass input data in the consumer component (workshops list component).
- Make use of the passed error in `src/app/common/error-alert/error-alert.component.html`
```html
@if( error !== null ) {
    <ngb-alert type="danger">{{ error.message }}</ngb-alert>
}
```
- Let's theme the spinner. We will add an input parameter `variant` that takes one of the 8 Bootstrap themes as a string input. First define the theme values as a type in `src/app/models/utils.ts`
```ts
type Theme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'light'
  | 'dark';
export type { Theme };
```
- In `src/app/workshops/workshops-list/workshops-list.component.html`, pass in the variant as an input attribute.
```html
<app-loading-spinner variant="success"></app-loading-spinner>
```
- Accept it in `src/app/common/loading-spinner/loading-spinner.component.ts`
```ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Theme } from '../../models/utils';
```
```ts
imports: [CommonModule],
```
```ts
export class LoadingSpinnerComponent {
  @Input()
  variant!: Theme;
}
```
- In `src/app/common/loading-spinner/loading-spinner.component.html`, apply the appropriate Bootstrap spinner class conditionally using `ngClass` directive (comes from `CommonModule`)
```html
<div
  class="d-flex justify-content-center"
  [ngClass]="{
    'text-primary': variant === 'primary',
    'text-secondary': variant === 'secondary',
    'text-danger': variant === 'danger',
    'text-success': variant === 'success',
    'text-warning': variant === 'warning',
    'text-info': variant === 'info',
    'text-light': variant === 'light',
    'text-dark': variant === 'dark',
  }"
>
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
```

## Step 14: Create component for workshops list item
- Create a component to show a workshop item
```
ng g c workshops/workshops-list/item
```
- Import item in `src/app/workshops/workshops-list/workshops-list.component.ts`
```ts
import { ItemComponent } from './item/item.component';
```
```ts
imports: [
    /* existing imports */
    ItemComponent,
],
```
- In `src/app/workshops/workshops-list/workshops-list.component.html`, render the item in the loop, and pass the workshop as an input to it. We also set a responsive layout for list of items using the Boostrap Grid system.
```ts
<div class="row">
    @for( workshop of workshops; track workshop.id ) {
        <div class="col-12 col-md-4 my-3 d-flex">
            <app-item [workshop]="workshop"></app-item>
        </div>
    }
</div>
```
- In `src/app/workshops/workshops-list/item/item.component.ts`, accept the `workshop` input
```ts
import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input()
  workshop!: IWorkshop;
}
```
- In `src/app/workshops/workshops-list/item/item.component.html`, render the workshop
```html
@if( workshop !== null ) {
<div class="card p-3">
  <div class="card-img-top-wrapper">
    <img [src]="workshop.imageUrl" class="card-img-top" [alt]="workshop.name" />
  </div>
  <div class="card-body">
    <h5 class="card-title my-0">{{ workshop.name }}</h5>
    <div class="card-text">
      <div>{{ workshop.time }}</div>
      <div>{{ workshop.startDate }} - {{ workshop.endDate }}</div>
      <div>{{ workshop.location.address }}, {{ workshop.location.city }}, {{ workshop.location.state }} </div>
    </div>
    <a href="#" class="btn btn-primary">Know more</a>
  </div>
</div>
}
```
- Provide required styles in `src/app/workshops/workshops-list/item/item.component.scss`
```scss
// :host targets the <app-item></app-item> element that "hosts" the HTML for this component
:host {
    display: flex;
}

.card-img-top-wrapper {
    height: 192px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    // nesting selectors in SCSS
    // in css this selector becomes -> .card-img-top-wrapper .card-img-top
    .card-img-top {
        width: 50%;
    }
}

.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
}
```

## Step 15: Using the built-in and custom pipes to format displayed content
- Reference: https://angular.dev/guide/templates/pipes
- A pipe is a Angular feature used especially in templates to transform content to be displayed (eg. format and display dates) in a reusable way. We could do this using methods / services of our own, but pipes makes the job of formatting displayed content, easier. Import `DatePipe` in `src/app/workshops/workshops-list/item/item.component.ts`
```ts
import { DatePipe } from '@angular/common';
```
```ts
imports: [DatePipe],
```
- In ``
```html
<!-- <div>{{ workshop.startDate }} - {{ workshop.endDate }}</div> -->
<div>
    {{ workshop.startDate | date : "EEEE, MMMM d, y" }} -
    {{ workshop.endDate | date : "EEEE, MMMM d, y" }}
</div>
```
- Generate a custom pipe for formatting location information. The first argument is treating specially and is the value that appears to the left of the pipe symbol(`|`). The rest are arguments passed to the pipe after the pipe's name (see the HTML for understanding this better).
```
ng g p common/location
```
- In `src/app/common/location/location.pipe.ts`
```ts
import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../../workshops/models/IWorkshop';

@Pipe({
  name: 'location',
  standalone: true,
})
export class LocationPipe implements PipeTransform {
  transform(
    location: ILocation,
    format: 'short' | 'long' = 'long',
    numChars = 80
  ) {
    let locationStr = `${location.address}, ${location.city}, ${location.state}`;

    if (format === 'short') {
      locationStr = locationStr.substring(0, numChars) + '...';
    }
    
    return locationStr;
  }
}
```
- Import it in `src/app/workshops/workshops-list/item/item.component.ts`
```ts
import { LocationPipe } from '../../../common/location/location.pipe';
```
```ts
imports: [DatePipe, LocationPipe],
```
- Use it in `src/app/workshops/workshops-list/item/item.component.html`
```html
<!-- <div>{{ workshop.location.address }}, {{ workshop.location.city }}, {{ workshop.location.state }} </div> -->
<div>{{ workshop.location | location : "short" : 40 }}</div>
```

## Step 16: Add pagination for workshops list page
- Modify `src/app/workshops/workshops.service.ts` to support pagination (the backend takes an `_page` query string parameter)
```ts
getWorkshops( page: number = 1 ) {
    // Example: GET https://workshops-server.onrender.com/workshops?page=2
    return this.http.get<IWorkshop[]>(
      `https://workshops-server.onrender.com/workshops`,
      {
        params: {
          _page: page
        }
      }
    );
}
```
- Maintain `page` in `src/app/workshops/workshops-list/workshops-list.component.ts` and modify the call to `getWorkshops()`. Since we need to fetch both on first page load and on page number change, we isolate the data fetch logic into its on method, and call it from `ngOnInit()` and from `changePage()`. Note also that we are passing the page number to the service's `getWorkshops()`.
```ts
page = 1;
```
```ts
getWorkshops() {
    this.loading = true;

    w.getWorkshops(this.page).subscribe(
        {
            next: (workshops) => {
                this.workshops = workshops;
                this.loading = false;
                console.log(workshops);
            },
            error: (error) => {
                this.error = error;
                this.loading = false;
                console.log(error);
            },
        }
    );
}

ngOnInit() {
    this.getWorkshops();
}
```
```ts
// approach 1
// previousPage() {
//     --this.page;
//     this.getWorkshops();
// }

// nextPage() {
//     ++this.page;
//     this.getWorkshops();
// }

// approach 2
// You can define and use this instead of individually defining `previousPage()` and `nextPage()`
changePage(by: number) {
    if (this.page == 1 && by < 0) {
        return;
    }

    this.page = this.page + by;
    
    this.getWorkshops();
}
```
- In `src/app/workshops/workshops-list/workshops-list.component.html` add this
```html
<div class="my-2">
  <div class="mt-1">
    <!-- You can aletrnatively call previousPage() and nextPage(). But notice how we have defined changePage() using a single argument - this helps us avoid code duplication. -->
    <button class="btn btn-primary btn-sm me-2" (click)="changePage(-1)">
      Previous
    </button>
    <button class="btn btn-primary btn-sm" (click)="changePage(1)">Next</button>
  </div>
  <div>You are viewing page {{ page }}</div>
</div>
```

## Step 17: Creating and using a pagination component, communication from child to parent using the `@Output()` decorator
- It makes sense to create a utility component for pagination. That would make it reusable.
```
ng g c common/pagination
```
- `src/app/common/pagination/pagination.component.ts` - the component takes in `page` as an input. We will see later how the change of page can be handled - for now the method body is empty.
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input()
  page: number = 1;
  
  changePage(by: number) {}
}
```
- `src/app/common/pagination/pagination.component.html`
```html
<div class="my-2">
  <div class="mt-1">
    <button class="btn btn-primary btn-sm me-2" (click)="changePage(-1)">
      Previous
    </button>
    <button class="btn btn-primary btn-sm" (click)="changePage(1)">Next</button>
  </div>
  <div>You are viewing page {{ page }}</div>
</div>
```
- Update `src/app/workshops/workshops-list/workshops-list.component.ts` to use this component instead
```ts
import { PaginationComponent } from '../../common/pagination/pagination.component';
```
```ts
imports: [
    /* existing imports */
    PaginationComponent,
]
```
- Update `src/app/workshops/workshops-list/workshops-list.component.html` to use the component instead
```html
<app-pagination
  [page]="page"
></app-pagination>
```
- Right now the pagination has stopped working. We hit a roadblock as the page in the `WorkshopsListComponent` needs to be updated when the `changePage()` method in `PaginationComponent` executes. So how does a child component communicate with its parent? Answer - `@Output()` and `EventEmitter`. In `src/app/common/pagination/pagination.component.ts`,
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
```
```ts
// EventEmitter<data_type_of_output_data>
@Output()
pageChange = new EventEmitter<number>();

changePage(by: number) {
    if (this.page + by <= 0) {
        return;
    }

    // communicate the new page number to the parent
    this.pageChange.emit(this.page + by);
}
```
- Handle the event emitted by the child in the parent. In `src/app/workshops/workshops-list/workshops-list.component.html`
```html
<app-pagination
  [page]="page"
  (pageChange)="changePage($event)"
></app-pagination>
```
- In `src/app/workshops/workshops-list/workshops-list.component.ts`
```ts
changePage(newPage: number) {
    this.page = newPage;

    this.getWorkshops();
}
```
- To improve the user experience of the pagination component, we will support a `loading` input attribute that is to be set to `true` when the data is being fetched for a page. In `src/app/common/pagination/pagination.component.ts`,
```ts
@Input()
loading: boolean = false;
```
- In `src/app/common/pagination/pagination.component.html`
```html
@if(loading === true) {
  <div>Loading page {{ page }}</div>
} @else {
  <div>You are viewing page {{ page }}</div>
}
```
- In `src/app/workshops/workshops-list/workshops-list.component.html`,
```html
<app-pagination
  [page]="page"
  [loading]="loading"
  (pageChange)="changePage($event)"
></app-pagination>
```

## Step 18: Maintain page number state in query string
- Maintaining the current page number as a query string parameter, serves as current page state information. We can make use of this and enhance user experience further by loading the desired page of workshops on page load (i.e. if you are on `http://localhost:4200/workshops?page=2` and refresh the page, you can still fetch and load the second page of workshops instead of the first).
- In `src/app/workshops/workshops-list/workshops-list.component.ts`, first make the change to set the query string `page` parameter when user tries to navigate to a new page. We use the `Router` service for this. Then use the `ActivatedRoute::queryParamMap` to subscribe to changes in the query string.
```ts
changePage(newPage: number) {
    this.page = newPage;

    // set the query string in the route
    this.router.navigate(['/workshops'], {
        queryParams: {
            page: this.page,
        },
    });
}
```
```ts
constructor(
    private workshopsService: WorkshopsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
) {
    // this.getWorkshops();

    // this.activatedRoute.queryParamMap is an Observable that tracks changes to the query string -> thus whenever `page` in the query string changes, the next() method is called
    this.activatedRoute.queryParamMap.subscribe({
        next: (queryParams) => {
            const queryStr = queryParams.get('page');

            // when the page loads for the first time, there is no `page` query string parameter -> so we set page to 1. Later on there is some `page` value
            if (queryStr === null) {
                this.page = 1;
            } else {
                this.page = +queryStr; // convert `page` from string type to number
            }

            this.getWorkshops(); // page has changed -> get fresh data
        },
    });
}
```
- Navigate to different pages and refresh to note that the right data for the page is fetched.

## Step 19: 2-way data binding and implementing filtering of workshops list (by name) in the frontend
- In `src/app/workshops/workshops-list/workshops-list.component.ts`,
```ts
import { FormsModule } from '@angular/forms';
```
```ts
imports: [
    /* existing imports */
    FormsModule,
]
```
```ts
filterKey = 'Angular';
filteredWorkshops!: IWorkshop[];
```
```ts
next: (workshops) => {
    this.workshops = workshops;
    this.filteredWorkshops = workshops;
    this.loading = false;
},
```
```ts
filterWorkshops() {
    this.filteredWorkshops = this.workshops.filter((w) =>
        w.name.toLowerCase().includes(this.filterKey.toLowerCase())
    );
}
```
- In `src/app/workshops/workshops-list/workshops-list.component.html` add the following. `[(ngModel)]="variable"` enables 2-way data binding. 2-way data binding ensures the input state (value within the input), and `variable` are always in sync.
```html
<input
    type="search"
    class="form-control"
    placeholder="Type to search by name"
    [(ngModel)]="filterKey"
    (input)="filterWorkshops()"
/>

@if ( filterKey !== '' ) {
    <div>
        Workshops whose name has
        <span class="text-primary">{{ filterKey }}</span> are shown.
    </div>
}
```
```html
@for( workshop of filteredWorkshops; track workshop.id ) {
    <div class="col-12 col-md-4 my-3 d-flex">...</div>
}
```

## Step 20: Implementing filtering of workshops list (by category) in the backend
- Modify the service method `getWorkshops()` in `src/app/workshops/workshops.service.ts` to support filtering by category
```ts
getWorkshops(page: number = 1, category: string = '') {
    const params: { _page: number; category?: string } = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops`, {
        // params: params,
        params,
    });
}
```
- Enable filtering by category in `src/app/workshops/workshops-list/workshops-list.component.ts`
```ts
filterByCategory(category: string) {
    this.workshopsService.getWorkshops(this.page, category).subscribe({
        next: (workshops) => {
            this.workshops = workshops;
            // A better alternative: If you make `this.workshops` and `this.filterKey` as signals, you can compute `this.filteredWorkshops` automatically when either `this.workshops` changes or `this.filterKey` changes
            this.filterWorkshops();
        },
    });
}
```
- Add the UI for filtering by category in `src/app/workshops/workshops-list/workshops-list.component.html`,
```html
<div class="btn-group my-3" role="group" aria-label="Filter by category">
    <button type="button" class="btn btn-danger" (click)="filterByCategory('frontend')">Frontend</button>
    <button type="button" class="btn btn-warning" (click)="filterByCategory('backend')">Backend</button>
    <button type="button" class="btn btn-success" (click)="filterByCategory('devops')">Devops</button>
    <button type="button" class="btn btn-info" (click)="filterByCategory('language')">Language</button>
    <button type="button" class="btn btn-light" (click)="filterByCategory('mobile')">Mobile</button>
    <button type="button" class="btn btn-dark" (click)="filterByCategory('database')">Database</button>
</div>
```

## Step 21: Adding a workshop details page
- Create the new component
```
ng g c workshops/workshop-details
```
- Set up the route. Observe the use of dynamic path parameters. The name `id` we have given to the second path fragment (first being `workshops`), will be useful later to extract the workshop's id from the browser windows' location. In `src/app/workshops/workshops.routes.ts` add this __AFTER__ the `workshops/add` route - the order is important as otherwise the `/workshops/add` location would be matched by the `workshops/:id` route due to ordering (first match wins).
```ts
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
```
```ts
{
    path: 'workshops/:id',
    component: WorkshopDetailsComponent,
    title: 'Workshop Details',
},
```
- Set the link in workshops list items to navigate to the workshop details page. In `src/app/workshops/workshops-list/item/item.component.ts`,
```ts
import { RouterLink } from '@angular/router';
```
```ts
imports: [/* existing imports */, RouterLink],
```
- In `src/app/workshops/workshops-list/item/item.component.html` make this change. Note the array form of using `routerLink` - it is an array of strings, with every string being a path fragment. The first is `'workshops'` a string literal, and the second is `workshop.id` a property of the `workshop` input variable (it is __NOT__ a string literal).
```html
<a [routerLink]="['/workshops', workshop.id]" class="btn btn-primary">Know more</a>
```
- Click on the workshop __Know more__ button-styled links to navigate to the details page.

## Step 22: Fetching and showing details of the workshop
- Add a method to fetch a workshop's details by its id in `src/app/workshops/workshops.service.ts`. Note that this API endpoint returns a single `Workshop` object (__NOT__ an array).
```ts
getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(
        `https://workshops-server.onrender.com/workshops/${workshopId}`
    );
}
```
- In `src/app/workshops/workshop-details/workshop-details.component.ts` add the following. Note that we use the `ActivatedRoute::paramMap` which is an Observable to extract the `id` from the path. `ActivatedRoute::snapshot` is an alternative to this when you just want the current value of `id` and not interested in tracking and reacting to changes in `id` (for example when the URL changes from `http:localhost:4200/workshops/1` to `http://localhost:4200/workshops/2`). Reference: https://stackoverflow.com/questions/46050849/what-is-the-difference-between-activatedroute-and-activatedroutesnapshot-in-angu
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { LocationPipe } from '../../common/location/location.pipe';
import { WorkshopsService } from '../workshops.service';
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
```
```ts
imports: [
    DatePipe,
    LocationPipe,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
],
```
```ts
export class WorkshopDetailsComponent implements OnInit {
    loading = true;
    error : Error | null = null;
    workshop!: IWorkshop;
    workshopId!: number;

    constructor(
        private workshopsService: WorkshopsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.loading = true;

        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                const idStr = params.get('id');
                this.workshopId = +(idStr as string);

                this.workshopsService
                    .getWorkshopById(this.workshopId)
                    .subscribe({
                        next: (workshop) => {
                            this.workshop = workshop;
                            this.loading = false;
                        },
                        error: (error) => {
                            this.error = error;
                            this.loading = false;
                        },
                    });
            },
        });
    }
}
```
- In `src/app/workshops/workshop-details/workshop-details.component.html` add the following. Note the use of `innerHTML` attribute to set `innerHTML` instead of `innerText` that is set using interpolation syntax (`{{ variable }}`). When using `innerHTML` for binding user-generated content (like user reviews, blog articles, comments, social media posts etc.) you need to be aware of XSS vulnerability. Make sure such content has been sanitized in the backend.
```html
@if(loading) {
    <app-loading-spinner variant="success"></app-loading-spinner>
} @else if(!loading && error) {
    <app-error-alert [error]="error"></app-error-alert>
} @else {
    <h1>{{ workshop.name }}</h1>

    <hr />

    <div class="row">
        <div class="col-12 col-md-4">
            <img [src]="workshop.imageUrl" [alt]="workshop.name" class="img-fluid" />
        </div>
        <div class="col-12 col-md-8">
            <div class="my-3">
                <div>{{ workshop.time }}</div>
                <div>
                    {{ workshop.startDate | date : "EEEE, MMMM d, y" }} -
                    {{ workshop.endDate | date : "EEEE, MMMM d, y" }}
                </div>
                <div>{{ workshop.location | location }}</div>
            </div>
            <div [innerHTML]="workshop.description"></div>
        </div>
    </div>
}
```
- __EXERCISE__: Use the `TitleService` of Angular to update the title of the workshop details page to the name of the actual workshop loaded

## Step 23: Install FontAwesome and use its icons
- [FontAwesome](https://fontawesome.com/) provides a large set of icons for free (free for use in commercial projects). Follow the steps at https://www.npmjs.com/package/@fortawesome/angular-fontawesome to use it in Angular apps like this one.
```
ng add @fortawesome/angular-fontawesome
```
- Make available necessary icons like so. Add this in `src/app/workshops/workshop-details/workshop-details.component.ts`
```ts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// this gives the individual icons we want to use
import {
    faCheckCircle,
    faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';
```
```ts
imports: [
    /* existing imports */
    FontAwesomeModule
],
```
```ts
icons = {
    // The below is just ES2015+ short for faCheckCircle: faCheckCircle,
    faCheckCircle,
    faTimesCircle,
};
```
- Add it below the location details in `src/app/workshops/workshop-details/workshop-details.component.html`
```html
<div>{{ workshop.location | location }}</div>

<!-- Add this -->
<div>
    <span class="me-4">
        <fa-icon
            [icon]="
                workshop.modes.inPerson
                    ? icons.faCheckCircle
                    : icons.faTimesCircle
            "
        ></fa-icon>
        In person
    </span>
    <span>
        <fa-icon
            [icon]="
                workshop.modes.online
                    ? icons.faCheckCircle
                    : icons.faTimesCircle
            "
        ></fa-icon>
        Online
    </span>
</div>
```
- You can make the code above a bit cleaner. First add this method in `src/app/workshops/workshop-details/workshop-details.component.ts`. TypeScript `keyof` creates a union of keys of an object type (here `keyof IModes` creates `'inPerson' | 'online'`). Note that `IModes` is a named export (and not a default export) - hence the `{}` when importing it.
```ts
import { IModes } from '../models/IWorkshop';
```
```ts
getIconForMode(mode: keyof IModes) {
    return this.workshop.modes[mode]
        ? this.icons.faCheckCircle
        : this.icons.faTimesCircle;
}
```
- Then update `src/app/workshops/workshop-details/workshop-details.component.html` to make use of the method like so
```html
<div>
    <span class="me-4">
        <fa-icon [icon]="getIconForMode('inPerson')"></fa-icon>
        In person
    </span>
    <span>
        <fa-icon [icon]="getIconForMode('online')"></fa-icon>
        Online
    </span>
</div>
```

## Step 24: Add child routing to show session list / add session form based on the child route
- Child routes add on the the parent route and are used to show one of a set of children components conditionally in a parent component. We will show sessions list below the workshop details if the URL is `http://localhost:4200/workshops/:id` (adds nothing to the parent route), and the add session form below the workshop details if the URL is `http://localhost:4200/workshops/:id/add-session` (Adds 'add-session' to the parent route).
- Create 2 components to be used as children in workshop details component
```
ng g c workshops/workshop-details/sessions-list
ng g c workshops/workshop-details/add-session
```
- Add routes for these (child routing). Note the use of `children`, and how we need to mention only what needs to be added to the parent route in their paths. In `src/app/workshops/workshops.routes.ts`,
```ts
import { SessionsListComponent } from './workshop-details/sessions-list/sessions-list.component';
import { AddSessionComponent } from './workshop-details/add-session/add-session.component';
```
```ts
{
    path: 'workshops/:id',
    component: WorkshopDetailsComponent,
    title: 'Workshop Details',
    children: [
        {
            path: '', // same as parent route as nothing is to be added to that route
            component: SessionsListComponent,
        },
        {
            path: 'add-session',
            component: AddSessionComponent,
        },
    ],
}
```
- Add the following in `src/app/workshops/workshop-details/workshop-details.component.ts`, in order to use `RouterOutlet`
```ts
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';
```
```ts
imports: [
    /* existing imports */
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
]
```
- Add a router-outlet in `src/app/workshops/workshop-details/workshop-details.component.html`, in order to show one of the children based on the route. Also add `routerLink`s to switch between children.

```html
<div class="mt-5">
    <button
        [routerLink]="['/workshops', workshop.id]"
        routerLinkActive="btn-active"
        [routerLinkActiveOptions]="{ exact: true }"
        class="btn btn-primary btn-sm btn-child-link me-2"
    >
        Sessions List
    </button>
    <button
        [routerLink]="['/workshops', workshop.id, 'add-session']"
        routerLinkActive="btn-active"
        [routerLinkActiveOptions]="{ exact: true }"
        class="btn btn-primary btn-sm btn-child-link"
    >
        Add a session
    </button>
</div>

<!-- The router will decide whether to show sessions list / add session component, and show it here -->
<div class="my-4">
    <router-outlet></router-outlet>
</div>
```
- In `src/app/workshops/workshop-details/workshop-details.component.scss`,
```scss
.btn-child-link {
    opacity: 0.5;
}

.btn-active {
    opacity: 1;
}
```
- You can now switch between the child routes using the links.

## Step 25: Fetch and show sessions for the workshop
- In `src/app/workshops/models/ISession.ts` define the model to represent a session
```ts
type Level = 'Basic' | 'Intermediate' | 'Advanced';

interface ISession {
    id: number;
    workshopId: number;
    sequenceId: number;
    name: string;
    speaker: string;
    duration: number;
    level: Level;
    abstract: string;
    upvoteCount: number;
}

export type {
    Level,
    ISession as default
};
```
- The general practice is to create a service for every REST resource (roughly an database entity in the backend). Create the service `src/app/workshops/sessions.service.ts` and define the service method to fetch sessions for the workshop with a given id.
```
ng g s workshops/sessions
```
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ISession from './models/ISession';

@Injectable({
    providedIn: 'root',
})
export class SessionsService {
    constructor(private http: HttpClient) {}

    getSessionsForWorkshop(workshopId: number) {
        return this.http.get<ISession[]>(
            `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
        );
    }
}
```
- In `src/app/workshops/workshop-details/sessions-list/sessions-list.component.ts` fetch the sessions. Note how we used `ActivatedRoute::snapshot` as an alternative to using the `ActivatedRoute::paramMap` Observable.
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';

@Component({
    selector: 'app-sessions-list',
    standalone: true,
    imports: [],
    templateUrl: './sessions-list.component.html',
    styleUrl: './sessions-list.component.scss',
})
export class SessionsListComponent implements OnInit {
    workshopId!: number;
    sessions!: ISession[];

    constructor(
        private sessionsService: SessionsService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        // this.activatedRoute.snapshot.paramMap is NOT an observable unlike this.activatedRoute.paramMap which is an observable
        const idStr = this.activatedRoute.snapshot.paramMap.get('id');
        this.workshopId = +(idStr as string);

        this.sessionsService.getSessionsForWorkshop(this.workshopId).subscribe({
            next: (sessions) => {
                this.sessions = sessions;
            },
        });
    }
}
```
- Display the sessions in `src/app/workshops/workshop-details/sessions-list/sessions-list.component.html`
```html
<h2>List of sessions</h2>

<hr />

<ul class="list-group">
    @for( s of sessions; track s.id ) {
        <li class="list-group-item">
            <div class="row">
                <div
                    class="col-1 d-flex flex-column justify-content-center align-items-center"
                >
                    <!-- @todo voting widget -->
                </div>
                <div class="col-11">
                    <h3>{{ s.name }}</h3>
                    <div>by {{ s.speaker }}</div>
                    <div>{{ s.level }}</div>
                    <div>{{ s.duration }}</div>
                    <div>{{ s.abstract }}</div>
                </div>
            </div>
        </li>
    }
</ul>
```
- __EXERCISE__: Handle the loading and error states. Also move the display of sessions list items to a separate component (just the way we handled workshops list items).

## Step 26: Create a voting widget component and use it for voting on a session
- Create the service method to vote on a session in `src/app/workshops/sessions.service.ts`
```ts
export type VoteType = 'upvote' | 'downvote';
```
```ts
voteForSession(sessionId: number, voteType: VoteType) {
    return this.http.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`,
        null // we generally pass data in put request. In this case we don't have any data
    );
}
```
- Create the voting widget component that will be useful for showing votes and providing voting buttons where needed. It takes `votes` as an input, and fires events when the upvote or downvote buttons are clicked.
```
ng g c common/voting-widget
```
- In `src/app/common/voting-widget/voting-widget.component.ts`
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-voting-widget',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './voting-widget.component.html',
    styleUrl: './voting-widget.component.scss',
})
export class VotingWidgetComponent {
    icons = {
        faCaretUp,
        faCaretDown,
    };

    @Input()
    votes!: number;

    // The emitted event will pass to the parent how much to change the vote by (+1, -2 etc.)
    @Output()
    vote = new EventEmitter<number>();

    emitVote(by: number) {
        this.vote.emit(by);
    }
}
```
- In `src/app/common/voting-widget/voting-widget.component.html`,
```html
<fa-icon
    [icon]="icons.faCaretUp"
    (click)="emitVote(1)"
    size="2x"
    style="color: green; cursor: pointer"
></fa-icon>
<span class="upvoteCount">{{ votes }}</span>
<fa-icon
    [icon]="icons.faCaretDown"
    (click)="emitVote(-1)"
    size="2x"
    style="color: red; cursor: pointer"
></fa-icon>
```
- In `src/app/common/voting-widget/voting-widget.component.scss`,
```scss
:host {
    display: flex;
    flex-direction: column;
    align-items: center;
}
```
- Use the voting widget component in `src/app/workshops/workshop-details/sessions-list/sessions-list.component.ts`. Pass down `votes` to the widget, and listen for the `vote` event.
```ts
import { VotingWidgetComponent } from '../../../common/voting-widget/voting-widget.component';
import ISession from '../../models/ISession';
```
```ts
imports: [VotingWidgetComponent],
```
- In `src/app/workshops/workshop-details/sessions-list/sessions-list.component.html`,
```html
<div
    class="col-1 d-flex flex-column justify-content-center align-items-center"
>
    <app-voting-widget
        [votes]="s.upvoteCount"
        (vote)="updateVote(s, $event)"
    ></app-voting-widget>
</div>
```
- Handle the `vote` event in `src/app/workshops/workshop-details/sessions-list/sessions-list.component.ts`. Note how we update the votes for the session being operated on. Since this session object is the exact one being used in the HTML (As part of the `sessions` array), Angular's data-binding is able to detect the change and update the UI!
```ts
updateVote(session: ISession, by: number) {
    this.sessionsService
        .voteForSession(session.id, by === 1 ? 'upvote' : 'downvote')
        .subscribe({
            next: (updatedSession) => {
                session.upvoteCount = updatedSession.upvoteCount;
            },
            // @todo handle error
        });
}
```

## Step 27: Using environment files for enabling environment-based settings
- Environment files help us to use settings for the application based on the environment. We can, for example, have our code work without changes, and comunicate with a local development server in development, and a production server, in a production environment. Angular will take care to use the appropriate settings based on the application build (development/staging/production etc.)
- In `src/environments/environment.ts`
```ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:8001',
};
```
- In `src/environments/environment.production.ts`
```ts
export const environment = {
    production: true,
    apiUrl: 'https://workshops-server.onrender.com',
};
```
- Configure Angular CLI (`ng`) to use the appropriate file based on the build (development/staging/production etc.). In the build command configuration for production environment in the file `angular.json`,
```json
"outputHashing": "all",
"fileReplacements": [
    {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.production.ts"
    }
]
```
- Do necessary changes in `src/app/workshops/workshops.service.ts`
```ts
import { environment } from '../../environments/environment';
```
```ts
export class WorkshopsService {
    private apiUrl = environment.apiUrl;

    // rest of code...
}
```
```ts
getWorkshops(page: number = 1) {
    return this.http.get<IWorkshop[]>(`${this.apiUrl}/workshops`, {
        params: {
            _page: page,
        },
    });
}

getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(
        `${this.apiUrl}/workshops/${workshopId}`
    );
}
```
- Do necessary changes in `src/app/workshops/sessions.service.ts`
```ts
import { environment } from '../../environments/environment';
```
```ts
export class SessionsService {
    private apiUrl = environment.apiUrl;

    // rest of code...
}
```
```ts
getSessionsForWorkshop(workshopId: number) {
    return this.http.get<ISession[]>(
        `${this.apiUrl}/workshops/${workshopId}/sessions`
    );
}

voteForSession(sessionId: number, voteType: VoteType) {
    return this.http.put<ISession>(
        `${this.apiUrl}/sessions/${sessionId}/${voteType}`,
        null
    );
}
```
- To test the correct usage of settings in a production environment, add a script in `package.json` `scripts` to start the Angular app frontend server in a production environemt
```json
"start:production": "ng serve --configuration production",
```
- Start the Angular app in production mode
```
npm run start:production
```
- Verify from the network tab that the production backend is the one being used in HTTP request now.

## Step 28: Set up a toast message service and container to display toast messages
- Create a service to hold toast messages to be displayed, and methods to add and remove toasts
```
ng g s common/toast
```
- In `src/app/common/toast/toast.service.ts`,
```ts
import { Injectable } from '@angular/core';

interface IToast {
    message: string;
    className: string;
    duration: number;
}

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    // shared data - the list of toast messages
    private toasts: IToast[] = [];

    constructor() {}

    getToasts() {
        return this.toasts;
    }
    
    add(toast: IToast) {
        this.toasts.unshift(toast);
    }
    
    remove(toast: IToast) {
        // filter() does not modify this.toasts, it only returns a new Array. So we need to reassign the result to this.toasts
        this.toasts = this.toasts.filter((t) => t !== toast);
    }
    
    clear() {
        this.toasts = [];
    }
}
```
- Create an associated toast component
```
ng g c common/toast
```
- In `src/app/common/toast/toast.component.ts` add the following. We have already used constructor DI many times. Now we see a new way (using `inject()`) that works with functions as well (apart from classes).
```ts
import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast.service';
```
```ts
imports: [NgbToastModule],
```
```ts
export class ToastComponent {
    // Angular 17 Introduced this way on service injection
    public toastService = inject(ToastService);
}
```
- In `src/app/common/toast/toast.component.html`,
```html
@for( toast of toastService.getToasts(); track toast ) {
    <ngb-toast
        class="mb-3"
        [class]="toast.className"
        [autohide]="true"
        [delay]="toast.duration || 5000"
        (hidden)="toastService.remove(toast)"
    >
        {{ toast.message }}
    </ngb-toast>
}
```
- In `src/app/common/toast/toast.component.scss`,
```scss
:host {
    position: fixed;
    top: 50px;
    right: 0px;
    padding: 20px;
    z-index: 1000;
}
```
- Render a toast component instance (that acts as the container for toast messages) in `src/app/app.component.ts`
```ts
import { ToastComponent } from './common/toast/toast.component';
```
```ts
imports: [
    /* existing imports */
    ToastComponent,
],
```
- In `src/app/app.component.html`
```html
<!-- Add this -->
<app-toast></app-toast>

<app-menu></app-menu>
```

## Step 29: Set up options for editing / deleting a workshop in every workshop list item
- In `src/app/workshops/workshops-list/item/item.component.ts`,
```ts
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
```
```ts
imports: [
    /* existing imports */
    FontAwesomeModule
],
```
```ts
export class ItemComponent {
    icons = {
        faPencil,
        faTrash,
    };

    /* rest of code */
}
```
- In `src/app/workshops/workshops-list/item/item.component.scss`,
```scss
:host {
    display: flex;
    position: relative;
}

.card-action-buttons {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 16px;

    .btn-action-button {
        cursor: pointer;
        opacity: 0.7;
        
        &:hover {
            opacity: 1;
        }
    }
}
```
- In `src/app/workshops/workshops-list/item/item.component.html`,
```html
@if( workshop !== null ) {
    <div class="card p-3">
        <div class="card-action-buttons">
            <button class="me-2 btn btn-info btn-sm btn-action-button" title="Edit this workshop">
                <fa-icon [icon]="icons.faPencil"></fa-icon>
            </button>
            <button class="btn btn-danger btn-sm btn-action-button" title="Delete this workshop">
                <fa-icon [icon]="icons.faTrash"></fa-icon>
            </button>
        </div>
        
        <!-- rest of UI... -->
    </div>
}
```

## Step 30: Deleting a workshop
- In `src/app/workshops/workshops-list/item/item.component.html`,
```html
<button
    class="btn btn-danger btn-sm"
    title="Delete this workshop"
    (click)="onDeleteWorkshop()"
>
    <fa-icon [icon]="icons.faTrash"></fa-icon>
</button>
```
- In `src/app/workshops/workshops-list/item/item.component.ts`, set up a `delete` event to inform to the parent when user clicks on the delete icon.
```ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
```
```ts
@Output()
delete = new EventEmitter();

onDeleteWorkshop() {
    this.delete.emit();
}
```
- In the parent component `src/app/workshops/workshops-list/workshops-list.component.html`,
```html
<app-item [workshop]="workshop" (delete)="deleteWorkshop(workshop)"></app-item>
```
- In `src/app/workshops/workshops-list/workshops-list.component.ts`
```ts
deleteWorkshop(workshop: IWorkshop) {
    console.log(workshop);
}
```
- The workshop is now logged in the console when the user tries to delete the workshop
- Add a service method to delete a workshop with a given id in `src/app/workshops/workshops.service.ts`. Note that we use void to indicate an empty-bodied response.
```ts
deleteWorkshopById(workshopId: number) {
    return this.http.delete<void>(`${this.apiUrl}/workshops/${workshopId}`);
}
```
- Use this in `src/app/workshops/workshops-list/workshops-list.component.ts` to delete a workshop.
```ts
import { ToastService } from '../../common/toast/toast.service';
```
```ts
constructor(
        private workshopsService: WorkshopsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private toastService: ToastService
) { }
```
```ts
deleteWorkshop(workshop: IWorkshop) {
    console.log(workshop);

    this.workshopsService.deleteWorkshopById(workshop.id).subscribe({
        next: () => {
            this.toastService.add({
                message: `Deleted workshop with id = ${workshop.id}`,
                className: 'bg-success text-light',
                duration: 5000,
            });
            // update this.workshops
            this.workshops = this.workshops.filter(
                (w) => w.id !== workshop.id
            );
        },
        error: () => {
            this.toastService.add({
                message: `Could not delete workshop with id = ${workshop.id}`,
                className: 'bg-danger text-light',
                duration: 5000,
            });
        },
    });
}
```
- In order to display a confirmation dialog before deletion, we add this in `src/app/workshops/workshops-list/workshops-list.component.ts`. Here, `content` of type `TemplateRef<any>` is a reference to a element node representing the modal dialog (the reference is obtained using a template reference variable). `ng-template` is simply a container element that does not render as an actual HTML element and instead renders the contents within in the browser. Y
```ts
import { Component, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
```
```ts
constructor(
    private workshopsService: WorkshopsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private modalService: NgbModal
) { }
```
```ts
open(content: TemplateRef<any>, workshop: IWorkshop) {
    this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
            (result) => {
                if (result === 'ok') {
                    this.deleteWorkshop(workshop);
                }
            }
            // (reason) => { // on modal.dismiss() - eg. when the dalog is simply closed
            // }
        );
}
```
- In `src/app/workshops/workshops-list/workshops-list.component.html`,
```html
<app-item
    [workshop]="workshop"
    (delete)="open(content, workshop)"
></app-item>
```
```html
<ng-template #content let-modal>
    <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">
            Please confirm deletion!
        </h4>
        <button
            type="button"
            class="btn-close"
            aria-label="Close"
            (click)="modal.dismiss('close')"
        ></button>
    </div>
    <div class="modal-body">
        <div class="mb-3">
            You are about to delete a workshop. This action cannot be undone.
            Are you sure want to proceed?
        </div>
        <div>
            <button class="btn btn-light" (click)="modal.close('cancel')">
                Cancel
            </button>
            <button class="btn btn-danger" (click)="modal.close('ok')">
                OK
            </button>
        </div>
    </div>
</ng-template>
```

## Step 31: Create the form to add a session
- In `src/app/workshops/workshop-details/add-session/add-session.component.html`,
```html
<div class="d-flex justify-content-between align-items-center">
    <h2 class="my-3">Add a session</h2>
    <button class="btn btn-primary" id="list-sessions">List of sessions</button>
</div>

<hr />

<form id="add-session-form">
    <div class="mb-3">
        <label for="sequenceId" class="form-label">Sequence ID</label>
        <input type="text" class="form-control" id="sequenceId" />
        <div class="error-message"></div>
    </div>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" />
    </div>
    <div class="mb-3">
        <label for="speaker" class="form-label">Speaker</label>
        <input type="text" class="form-control" id="speaker" />
    </div>
    <div class="mb-3">
        <label for="duration" class="form-label">Duration</label>
        <input type="number" class="form-control" id="duration" />
    </div>
    <div class="mb-3">
        <label for="level" class="form-label">Level</label>
        <select class="form-select" id="level">
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="abstract" class="form-label">Abstract</label>
        <textarea class="form-control" id="abstract" rows="3"></textarea>
    </div>
    <div class="mb-3">
        <button class="btn btn-primary">Add session</button>
    </div>
</form>
```
- In `src/styles.scss`, add this. We add it to global styles as similar error messages will need to be displayed in other forms in the app.
```scss
.error-message {
    color: crimson;
    font-size: 0.85em;
}
```

## Step 32: Validation using template-driven forms approach
- There are 2 ways of working with forms in Angular
    - Template-driven - for simple forms, simple form handling and simple validations
    - Reactive
- We start with the template-driven approach.
- __Reference__: https://angular.dev/guide/forms/template-driven-forms
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts` add the following. `FormsModule` provides `NgModel` directive and JsonPipe is used for displaying JavaScript objects in the UI (used generally for debugging purposes).
```ts
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
```
```ts
imports: [FormsModule, JsonPipe],
```
- Do the following changes in `src/app/workshops/workshop-details/add-session/add-session.component.html`. Once we add the `ngModel` directive to an input, Angular maintains an `NgModel` object that holds the user input, the validity status (based on attributes like `required`, `pattern`, `min`, `max` etc. that we set on the input), the touched, dirty status etc. `#var` set on a DOM element is called a template reference variable. The template reference variable by default refers to the DOM node. Set it to `ngModel` to get a reference to the `NgModel` object instead.
```html
<input
    type="text"
    class="form-control"
    id="sequenceId"
    name="sequenceId"
    required
    pattern="\d+"
    ngModel
    #sequenceId="ngModel"
    autocomplete="off"
/>
<!-- Note how the JSON pipe is used for inspecting objects and thus useful for debugging! -->
{{ sequenceId.errors | json }}
{{ sequenceId.value }}
<div>{{ "sequenceId.invalid = " + sequenceId.invalid }}</div>
<div>{{ "sequenceId.valid = " + sequenceId.valid }}</div>
<div>{{ "sequenceId.dirty =" + sequenceId.dirty }}</div>
<div>{{ "sequenceId.touched =" + sequenceId.touched }}</div>
@if( sequenceId.invalid && ( sequenceId.touched || sequenceId.dirty ) && sequenceId.errors ) {
    <div class="error-message">
        There is some error
    </div>
}
```
```html
<input type="text" class="form-control" id="name" required />
```
```html
<input type="text" class="form-control" id="speaker" required />
```
```html
<input type="number" class="form-control" id="duration" required />
```
```html
<select class="form-select" id="level" required>...<select>
```
```html
<textarea
    class="form-control"
    id="abstract"
    rows="3"
    required
></textarea>
```
- __EXERCISE__: Set up error handling for rest of the inputs as well.
- We now display error messages based on the type of error that occured.
```html
@if( sequenceId.invalid && ( sequenceId.touched || sequenceId.dirty ) && sequenceId.errors ) {
    <div class="error-message">
        @if(sequenceId.errors['required']) {
            <div>This is required</div>
        } @if(sequenceId.errors['pattern']) {
            <div>Provide a number</div>
        }
    </div>
}
```
```html
<input
    type="text"
    class="form-control"
    id="name"
    name="name"
    required
    pattern="[A-Z][A-Za-z ]+"
    ngModel
    #name="ngModel"
/>
@if( name.invalid && ( name.touched || name.dirty ) && name.errors ) {
    <div class="error-message">
        @if(name.errors['required']) {
            <div>This is required</div>
        } @if(name.errors['pattern']) {
            <div>Provide a valid name (only letters and spaces)</div>
        }
    </div>
}
```
```html
<input
    type="text"
    class="form-control"
    id="speaker"
    name="speaker"
    required
    pattern="[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*"
    ngModel
    #speaker="ngModel"
/>
@if( speaker.invalid && ( speaker.touched || speaker.dirty ) && speaker.errors ) {
    <div class="error-message">
        @if(speaker.errors['required']) {
            <div>This is required</div>
        } @if(speaker.errors['pattern']) {
            <div>
                Provide valid names (only letters and spaces for names, and separate names by commas)
            </div>
        }
    </div>
}
```
```html
<input
    type="number"
    class="form-control"
    id="duration"
    name="duration"
    required
    min="0.5"
    max="10"
    ngModel
    #duration="ngModel"
/>
@if( duration.invalid && ( duration.touched || duration.dirty ) && duration.errors ) {
    <div class="error-message">
        @if(duration.errors['required']) {
            <div>This is required</div>
        } @if(duration.errors['min']) {
            <div>Duration is minimum 0.5</div>
        } @if(duration.errors['max']) {
            <div>Duration is maximum 10</div>
        }
    </div>
}
```
```html
<select
    class="form-select"
    id="level"
    name="level"
    required
    ngModel
    #level="ngModel"
>
    ...
<select>
@if( level.invalid && ( level.touched || level.dirty ) && level.errors ) {
    <div class="error-message">
        @if(level.errors['required']) {
        <div>This is required</div>
        }
    </div>
}
```
```html
<textarea
    class="form-control"
    id="abstract"
    name="abstract"
    rows="3"
    required
    minlength="20"
    ngModel
    #abstract="ngModel"
></textarea>
@if( abstract.invalid && ( abstract.touched || abstract.dirty ) && abstract.errors ) {
    <div class="error-message">
        @if(abstract.errors['required']) {
            <div>This is required</div>
        } @if(abstract.errors['minlength']) {
            <div>Minimum 20 characters needed</div>
        }
    </div>
}
```

## Step 33: Handle form submission and add the session
- In `src/app/workshops/sessions.service.ts`,
```ts
addSession(session: Omit<ISession, 'id'>) {
    return this.http.post<ISession>(`${this.apiUrl}/sessions`, session, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```
- Just like Angular maintains an `NgModel` instance for every input on which the directive is set, it maintains an `NgForm` instance on every form (no need to add any directive to the form though). This has validation and user interaction states for the form (similar to the ones for inputs with `NgModel`). The form is invalid if at least one form input within it, tracked by `NgModel`, is invalid. The form is dirty if at least one input tracked is dirty, etc. We disable form submission if the form is invalid. On submission we call `addSession()` passing it the instance of `NgForm`. In `src/app/workshops/workshop-details/add-session/add-session.component.html`,
```html
<form id="add-session-form" #addSessionForm="ngForm" (ngSubmit)="addSession(addSessionForm)">
    <div>valid = {{ addSessionForm.valid | json }}</div>
    <div>invalid = {{ addSessionForm.invalid | json }}</div>
    <div>value = {{ addSessionForm.value | json }}</div>
    <div>dirty = {{ addSessionForm.dirty | json }}</div>
    ...
    <button class="btn btn-primary" [disabled]="addSessionForm.invalid">
        Add session
    </button>
</form>
```
- Handle the form submission in `src/app/workshops/workshop-details/add-session/add-session.component.ts`. Note how we need to go the `ActivatedRoute::snapshot.parent` to get the `id` value as this child route is not the same as the parent route (it has `/add-session` extra). Note also how the `Router` service is used for programmatic navigaton (client-side redirection).
```ts
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SessionsService } from '../../sessions.service';
import ISession from '../../models/ISession';
```
```ts
export class AddSessionComponent {
    constructor(
        private activatedRoute: ActivatedRoute,
        private sessionsService: SessionsService,
        private router: Router
    ) {}

    addSession(addSessionForm: NgForm) {
        const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
            'id'
        ) as string);

        const newSession = {
            ...addSessionForm.value,
            workshopId: id,
            upvoteCount: 0,
            sequenceId: +addSessionForm.value.sequenceId,
            duration: +addSessionForm.value.duration,
        } as Omit<ISession, 'id'>;

        console.log(newSession);
        
        this.sessionsService.addSession(newSession).subscribe({
            next: (addedSession) => {
                alert(`Added session with id = ${addedSession.id}`);
                
                // You can also use navigateByUrl()
                this.router.navigate(['/workshops', id]);
            },
        });
    }
}
```
- Fill the form correctly, submit it, and verify that the session in added in the backend.

## Step 34: Use the toast service to display toast after trying to add a session
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts`
```ts
import { ToastService } from '../../../common/toast/toast.service';
```
```ts
constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private toastService: ToastService
) {}
```
```ts
this.sessionsService.addSession(newSession).subscribe({
    next: (addedSession) => {
        this.toastService.add({
            message: `Added session with id = ${addedSession.id}`,
            className: 'bg-success text-light',
            duration: 5000,
        });

        // You can also use navigateByUrl()
        this.router.navigate(['/workshops', id]);
    },
    error: (error) => {
        this.toastService.add({
            message: `Unable to add the session - ${error.message}`,
            className: 'bg-danger text-light',
            duration: 5000,
        });
    },
});
```

## Step 35: Handle form validation to add the session using the reactive form approach
- __Note__: You can take a backup copy of `src/app/workshops/workshop-details/add-session` as `src/app/workshops/workshop-details/add-session-template-driven` (for example).
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts` create the `FormGroup` with `FormControl`s for each tracked input. Define initial value for the inputs and validations. The ReactiveFormModule provides a completely different set of directives to be used in the HTML template (`formGroup`, `formControl`, `formControlName`, `formArrayName` etc.)
- __Reference__: https://angular.dev/guide/forms/reactive-forms
```ts
import {
    ReactiveFormsModule,
    NgForm,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
```
```ts
imports: [
    /* existing imports */
    ReactiveFormsModule
],
```
```ts
export class AddSessionComponent {
    addSessionForm = new FormGroup({
        sequenceId: new FormControl([
            '', // initial value of the input
            [
                // the list of validators
                Validators.required,
                Validators.pattern('\\d+'),
            ],
        ]),
        name: new FormControl([
            '',
            [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
        ]),
        speaker: new FormControl([
            '',
            [
                Validators.required,
                Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
            ],
        ]),
        duration: new FormControl([
            '',
            [Validators.required, Validators.min(0.5), Validators.max(10)],
        ]),
        level: new FormControl(['', [Validators.required]]),
        abstract: new FormControl([
            '',
            [Validators.required, Validators.minLength(2)],
        ]),
    });
    
    // helper accessor methods
    get sequenceId() {
        return this.addSessionForm.get('sequenceId') as FormControl;
    }
    
    get name() {
        return this.addSessionForm.get('name') as FormControl;
    }
    
    get speaker() {
        return this.addSessionForm.get('speaker') as FormControl;
    }
    
    get duration() {
        return this.addSessionForm.get('duration') as FormControl;
    }
    
    get level() {
        return this.addSessionForm.get('level') as FormControl;
    }
    
    get abstract() {
        return this.addSessionForm.get('abstract') as FormControl;
    }
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private sessionsService: SessionsService,
        private router: Router,
        private toastService: ToastService
    ) {}

    // NOTE: Only the signature of this method changes fron the template-driven code written earlier.
    addSession() {
        // existing code as is...
    }
}
```
- In `src/app/workshops/workshop-details/add-session/add-session.component.html`, make the following changes. In reactive forms approach, we do not use ngModel, and instead use other directives. So we must remove ngModel and the template variable created for every input. Since validations are set up in the model we have set up in the component class, we remove these as well from the inputs.
```html
<form
    id="add-session-form"
    (ngSubmit)="addSession()"
    [formGroup]="addSessionForm"
    novalidate
>
    ...
</form>
```
```html
<input
    type="text"
    class="form-control"
    id="sequenceId"
    name="sequenceId"
    formControlName="sequenceId"
    autocomplete="off"
/>
```
- __EXERCISE__: Do similarly for the rest of the inputs as well.

## Step 36: Using Form Builder
- The Form Builder service provides an alternative to using FormGroup, FormControl classes directly, but with less boilerplate code.
- In ``,
```ts
import { /* existing imports */, FormBuilder } from '@angular/forms';
```
```ts
export class AddSessionComponent {
    addSessionForm!: FormGroup;
}
```
```ts
constructor(
    private activatedRoute: ActivatedRoute,
    private sessionsService: SessionsService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
) {
    this.addSessionForm = this.fb.group({
        sequenceId: [
            '', // initial value of the input
            [
                // the list of validators
                Validators.required,
                Validators.pattern('\\d+'),
            ],
        ],
        name: [
            '',
            [Validators.required, Validators.pattern('[A-Z][A-Za-z ]+')],
        ],
        speaker: [
            '',
            [
                Validators.required,
                Validators.pattern('[A-Z][A-Za-z ]+(,[A-Z ][A-Za-z ]+)*'),
            ],
        ],
        duration: [
            '',
            [Validators.required, Validators.min(0.5), Validators.max(10)],
        ],
        level: ['', [Validators.required]],
        abstract: ['', [Validators.required, Validators.minLength(20)]],
    });
}
```

## Step 37: Setting up custom and cross-field validations
- In `src/app/workshops/workshop-details/add-session/add-session.component.ts`,
```ts
import { /* existing imports */, AbstractControl } from '@angular/forms';
```
- Set `durationAndLevel()` as a standalone function (outside the class)
```ts
function durationAndLevel(form: AbstractControl) {
    const durationStr = (form.get('duration') as AbstractControl).value;
    const duration = +durationStr;
    const level = (form.get('level') as AbstractControl).value;
    
    // if valid -> return null
    // if invalid -> return an object with the details of the error. Further this object should have the property called `durationAndLevel`
    if (durationStr === '' || level === '') {
        return null;
    }
    
    if (level === 'Basic') {
        return null;
    }
    
    if (level === 'Intermediate') {
        if (duration >= 2) {
            return null;
        }
        
        // error
        return {
            durationAndLevel: 'Intermediate level session should be at least 2 hours in duration',
        };
    }

    if (level === 'Advanced') {
        if (duration >= 3) {
            return null;
        }

        // error
        return {
            durationAndLevel: 'Advanced level session should be at least 3 hours in duration',
        };
    }

    return null;
}
```
```ts
this.addSessionForm = this.fb.group(
    { ... }, 
    {
        validators: durationAndLevel,
    }
);
```
- In `src/app/workshops/workshop-details/add-session/add-session.component.html`,
```html
<form ...>
    <div class="mb-3 error-message">
        @if( addSessionForm.errors && addSessionForm.errors['durationAndLevel']
        ) {
            <div>{{ addSessionForm.errors["durationAndLevel"] }}</div>
        }
    </div>
    <!--  rest of form -->
</form>
```

## Step 38: Getting started with a form to add a workshop
- __EXERCISE__: In `src/app/workshops/add-workshop/add-workshop.component.ts` import `FormGroup`. Do necessary set up for a form to add a new workshop. Group address, city, state under a separate FormGroup as "location". Group the 2 checkboxes under "modes". Set up validations using reactive forms approach. Set the ReactiveFormModule directives in the html file at the appropriate places `[formGroup]="..."` for form, `formControlName="..."` for controls, `formGroupName=""` for "address" and "modes". On submit of the form, log the value of the form. 
```ts
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-add-workshop',
    standalone: true,
    imports: [],
    templateUrl: './add-workshop.component.html',
    styleUrl: './add-workshop.component.scss',
})
export class AddWorkshopComponent {
    addWorkshopForm!: FormGroup;

    constructor() {
        // EXERCISE: Create a FormGroup variable for the form. Group address, city, state under a separate FormGroup as "location". Group the 2 checkboxes under "modes". On submit of the form. Log the value of the form.
    }
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html`,
```html
<div>
    <h1 class="my-3">Add a workshop</h1>
</div>

<hr />

<form id="add-workshop-form" novalidate>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select class="form-select" id="category" name="category">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="language">Language</option>
            <option value="mobile">Mobile</option>
            <option value="devops">Devops</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
        ></textarea>
    </div>
    <div class="mb-3">
        <label for="startDate" class="form-label">Start date</label>
        <input
            type="date"
            class="form-control"
            id="startDate"
            name="startDate"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">End date</label>
        <input
            type="date"
            class="form-control"
            id="endDate"
            name="endDate"
            autocomplete="off"
        />
    </div>
    <div class="mb-3">
        <label for="time" class="form-label">Time</label>
        <input
            type="text"
            class="form-control"
            id="time"
            name="time"
            autocomplete="off"
        />
    </div>
    <div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                autocomplete="off"
            />
        </div>
        <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                autocomplete="off"
            />
        </div>
        <div class="mb-3">
            <label for="state" class="form-label">State</label>
            <input
                type="text"
                class="form-control"
                id="state"
                name="state"
                autocomplete="off"
            />
        </div>
    </div>
    <div class="mb-3">
        <label class="col-lg-2 col-form-label">Modes</label>
        <div class="col-lg-10">
            <div>
                <input type="checkbox" id="inPerson" />
                <label for="inPerson" class="ms-2">In Person</label>
            </div>
            <div>
                <input type="checkbox" id="online" />
                <label for="online" class="ms-2">Online</label>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input
            type="url"
            class="form-control"
            id="imageUrl"
            name="imageUrl"
            autocomplete="off"
        />
    </div>
</form>
```

## Step 39: Solution to the above exercise
- In `src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
```
```ts
imports: [ReactiveFormsModule],
```
```ts
constructor(private fb: FormBuilder) {
    this.addWorkshopForm = this.fb.group({
        name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        description: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        time: ['', [Validators.required]],
        location: this.fb.group({
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
        }),
        modes: this.fb.group({
            inPerson: this.fb.control(false),
            online: this.fb.control(false),
        }),
        imageUrl: ['', [Validators.required]],
    });
}

addWorkshop() {
    console.log(this.addWorkshopForm.value);
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html` (showing validations error messages is left out of this solution).
```html
<div>
    <h1 class="my-3">Add a workshop</h1>
</div>

<hr />

<form
    id="add-workshop-form"
    [formGroup]="addWorkshopForm"
    (ngSubmit)="addWorkshop()"
    novalidate
>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            autocomplete="off"
            formControlName="name"
        />
    </div>
    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select
            class="form-select"
            id="category"
            name="category"
            formControlName="category"
        >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="language">Language</option>
            <option value="mobile">Mobile</option>
            <option value="devops">Devops</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
            class="form-control"
            id="description"
            rows="3"
            name="description"
            formControlName="description"
        ></textarea>
    </div>
    <div class="mb-3">
        <label for="startDate" class="form-label">Start date</label>
        <input
            type="date"
            class="form-control"
            id="startDate"
            name="startDate"
            autocomplete="off"
            formControlName="startDate"
        />
    </div>
    <div class="mb-3">
        <label for="endDate" class="form-label">End date</label>
        <input
            type="date"
            class="form-control"
            id="endDate"
            name="endDate"
            autocomplete="off"
            formControlName="endDate"
        />
    </div>
    <div class="mb-3">
        <label for="time" class="form-label">Time</label>
        <input
            type="text"
            class="form-control"
            id="time"
            name="time"
            autocomplete="off"
            formControlName="time"
        />
    </div>
    <div formGroupName="location">
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                autocomplete="off"
                formControlName="address"
            />
        </div>
        <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <input
                type="text"
                class="form-control"
                id="city"
                name="city"
                autocomplete="off"
                formControlName="city"
            />
        </div>
        <div class="mb-3">
            <label for="state" class="form-label">State</label>
            <input
                type="text"
                class="form-control"
                id="state"
                name="state"
                autocomplete="off"
                formControlName="state"
            />
        </div>
    </div>
    <div class="mb-3" formGroupName="modes">
        <label class="col-lg-2 col-form-label">Modes</label>
        <div class="col-lg-10">
            <div>
                <input
                    type="checkbox"
                    id="inPerson"
                    formControlName="inPerson"
                />
                <label for="inPerson" class="ms-2">In Person</label>
            </div>
            <div>
                <input type="checkbox" id="online" formControlName="online" />
                <label for="online" class="ms-2">Online</label>
            </div>
        </div>
    </div>
    <div class="mb-3">
        <label for="imageUrl" class="form-label">Image URL</label>
        <input
            type="url"
            class="form-control"
            id="imageUrl"
            name="imageUrl"
            autocomplete="off"
            formControlName="imageUrl"
        />
    </div>

    <button class="btn btn-primary" [disabled]="addWorkshopForm.invalid">
        Add workshop
    </button>
</form>
```

## Step 40: Adding workshop to the backend
- In `src/app/workshops/workshops.service.ts`,
```ts
postWorkshop(workshop: Omit<IWorkshop, 'id'>) {
    return this.http.post<IWorkshop>(`${this.apiUrl}/workshops`, workshop, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { ToastService } from '../../common/toast/toast.service';

@Component({
    selector: 'app-add-workshop',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './add-workshop.component.html',
    styleUrl: './add-workshop.component.scss',
})
export class AddWorkshopComponent {
    addWorkshopForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private workshopsService: WorkshopsService,
        private toastService: ToastService,
        private router: Router,
    ) {
        this.addWorkshopForm = this.fb.group({
            name: ['', [Validators.required]],
            category: ['', [Validators.required]],
            description: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            time: ['', [Validators.required]],
            location: this.fb.group({
                address: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
            }),
            modes: this.fb.group({
                inPerson: this.fb.control(false),
                online: this.fb.control(false),
            }),
            imageUrl: ['', [Validators.required]],
        });
    }

    addWorkshop() {
        this.workshopsService
            .postWorkshop(this.addWorkshopForm.value)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully added workshop - ${workshop.name}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not add workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    }
}
```
- You should now be able to fill the details in the form, and submit it to add a new workshop to the backend.

## Step 41: Updating (Editing) workshop
- We reuse the `AddWorkshopComponent` for editing as well as there is very little difference between the two.
- Set up additional routing to the `AddWorkshopComponent` component for editing a workshop with given id in `src/app/workshops/workshops.routes.ts`
```ts
{
    path: 'workshops/edit/:id',
    component: AddWorkshopComponent,
    title: 'Edit a workshop',
},
```
- Set link to navigate to edit workshop in `src/app/workshops/workshops-list/item/item.component.html`
```html
<button
    class="me-2 btn btn-info btn-sm btn-action-button"
    title="Edit this workshop"
    [routerLink]="['/workshops', 'edit', workshop.id]"
>
    <fa-icon [icon]="icons.faPencil"></fa-icon>
</button>
```
- Add service method to update a workshop with a given id in `src/app/workshops/workshops.service.ts`
```ts
putWorkshop(workshop: Omit<IWorkshop, 'id'>, id: number) {
    return this.http.put<IWorkshop>(
        `${this.apiUrl}/workshops/${id}`,
        workshop,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
}
```
- In `demos/10-angular/workshops-app/src/app/workshops/add-workshop/add-workshop.component.ts`,
```ts
import { ActivatedRoute, Router } from '@angular/router';
```
```ts
id!: number;
isEditing = false;
```
```ts
constructor(
    private fb: FormBuilder,
    private workshopsService: WorkshopsService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
) {
    const idStr = this.activatedRoute.snapshot.paramMap.get('id');

    if (idStr === null) {
        this.isEditing = false;
    } else {
        this.isEditing = true;
        this.id = +idStr;

        // @todo Fetch the details of the workshop being edited, and populate the form controls
        // Step 1: get the details of workshop with given id
        // Step 2: (inside next) once we get the details, we can use this.addWorkshopForm.patchValue()
        this.workshopsService.getWorkshopById(this.id).subscribe({
            next: (workshop) => {
                // if you use setValue, the value you pass (in this case `workshop`), should not have any extra / missing fields
                // to take care of difference in format of dates in the backend, and the date format of datepicker
                workshop.startDate = workshop.startDate.substring(0, 10);
                workshop.endDate = workshop.endDate.substring(0, 10);

                this.addWorkshopForm.patchValue(workshop);
            },
            error: () => {
                alert(
                    `Something went wrong fetching workshop details. Please reload the page.`
                );
            },
        });
    }

    // rest of existing code...
}
```
```ts
addWorkshop() {
    if (this.isEditing) {
        this.workshopsService
            .putWorkshop(this.addWorkshopForm.value, this.id)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully updated workshop with id ${workshop.id}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not edit workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    } else {
        this.workshopsService
            .postWorkshop(this.addWorkshopForm.value)
            .subscribe({
                next: (workshop) => {
                    this.toastService.add({
                        message: `Successfully added workshop - ${workshop.name}`,
                        className: 'bg-success text-light',
                        duration: 5000,
                    });

                    this.router.navigateByUrl('/workshops');
                },
                error: (error) => {
                    this.toastService.add({
                        message: `Could not add workshop | ${error.message}`,
                        className: 'bg-danger text-light',
                        duration: 5000,
                    });
                },
            });
    }
}
```
- In `src/app/workshops/add-workshop/add-workshop.component.html`,
```html
<div>
    <h1 class="my-3">{{ isEditing ? "Edit workshop" : "Add a workshop" }}</h1>
</div>
```
```html
<button class="btn btn-primary" [disabled]="addWorkshopForm.invalid">
    {{ isEditing ? "Update workshop" : "Add workshop" }}
</button>
```
- You should now be able to modify the details in the form, and submit it to update a workshop's details in the backend.