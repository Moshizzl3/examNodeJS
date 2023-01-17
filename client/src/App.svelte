<script>
  import FrontPage from "./pages/FrontPage/FrontPage.svelte";
  import Signup from "./pages/SignUp/Signup.svelte";
  import { DarkMode } from "flowbite-svelte";
  import { Route, Router } from "svelte-navigator";
  import PrivateRoute from "./components/PrivateRoute/PrivateRoute.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import FriendsPage from "./pages/FriendsPage/FriendsPage.svelte";
  import ExplorePage from "./pages/ExplorePage/ExplorePage.svelte";
  import InboxPage from "./pages/InboxPage/InboxPage.svelte";
  import SettingsPage from "./pages/SettingsPage/SettingsPage.svelte";
  import PageNotFound from "./pages/PageNotFound/PageNotFound.svelte";
  import Profile from "./pages/Profile/Profile.svelte";
  import FollowerProfile from "./pages/FollowerProfile/FollowerProfile.svelte";
  import HomePage from "./pages/HomePage/HomePage.svelte";
</script>

<main class="flex flex-col items-center w-full h-screen main-container ">
  <div hidden={true}>
    <DarkMode />
  </div >
  <Router>
    <div>
      <Route path="/"><FrontPage /></Route>
      <Route path="/signup"><Signup /></Route>
      <Route path="/forgot-password"><ForgotPassword /></Route>
      <Route path="/forgot-password/*"><ForgotPassword /></Route>
    </div>
    <PrivateRoute path="/home"><HomePage /></PrivateRoute>
    <PrivateRoute path="/explore"><ExplorePage /></PrivateRoute>
    <PrivateRoute path="/inbox"><InboxPage /></PrivateRoute>
    <PrivateRoute path="/friends"><FriendsPage /></PrivateRoute>
    <PrivateRoute path="/profile"><Profile /></PrivateRoute>
    <PrivateRoute path="/profile/follower/*"><FollowerProfile /></PrivateRoute>
    <PrivateRoute path="/settings"><SettingsPage /></PrivateRoute>
    <Route component={PageNotFound} />
  </Router>
</main>
