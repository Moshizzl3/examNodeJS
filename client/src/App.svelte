<script>
  import FrontPage from "./pages/FrontPage/FrontPage.svelte";
  import Signup from "./pages/SignUp/Signup.svelte";
  import UserPage from "./pages/HomePage/HomePage.svelte";
  import { DarkMode } from "flowbite-svelte";
  import { Route, Router } from "svelte-navigator";
  import PrivateRoute from "./components/PrivateRoute/PrivateRoute.svelte";
  import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.svelte";
  import FriendsPage from "./pages/FriendsPage/FriendsPage.svelte";
  import HomePage from "./pages/HomePage/HomePage.svelte";
  import ExplorePage from "./pages/ExplorePage/ExplorePage.svelte";
  import InboxPage from "./pages/InboxPage/InboxPage.svelte";
  import SettingsPage from "./pages/SettingsPage/SettingsPage.svelte";
  import PageNotFound from "./pages/PageNotFound/PageNotFound.svelte";

</script>

<main class="flex flex-col items-center w-full h-screen">
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
    <PrivateRoute path="/settings"><SettingsPage /></PrivateRoute>
    <Route component={PageNotFound}></Route>
  </Router>
  <DarkMode />
</main>
