import { GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    notificationProvider,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { PostList } from "pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <GitHubBanner />
            <ThemeProvider theme={RefineThemes.Blue}>
                <CssBaseline />
                <GlobalStyles
                    styles={{ html: { WebkitFontSmoothing: "auto" } }}
                />
                <RefineSnackbarProvider>
                    <Refine
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "posts",
                                list: "/posts",
                            },
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                        }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route
                                    index
                                    element={
                                        <NavigateToResource resource="posts" />
                                    }
                                />

                                <Route path="/posts" element={<PostList />} />

                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                        <DocumentTitleHandler />
                    </Refine>
                </RefineSnackbarProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;