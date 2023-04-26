import {
  IonContent,
  IonFooter,
  IonIcon,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { brush, search, star } from "ionicons/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { routeLibraryTab } from "../library-routes";
import { CustomElementsTabComponent } from "./CustomElementsTabComponent";
import { FavoriteElementsTabComponent } from "./FavoriteElementsTabComponent";
import { SearchElementTabComponent } from "./SearchElementTabComponent";

export enum Tabs {
  CREATE = "create",
  FAVORITES = "favorites",
  SEARCH = "search",
}

interface ContainerProps {
  workshopId?: string;
}

/**
 * Core component for the library page.
 * It contains the tabs for the different library content.
 *
 * @param workshopId if set, the library has been opened from a workshop.
 */
export const LibraryContentComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const hasWorkshopContext = useMemo(() => !!workshopId, [workshopId]);
  const history = useHistory();
  const routeMatch = useRouteMatch();
  const { path } = routeMatch;
  const location = useLocation();
  const logger = useComponentLogger("LibraryContentComponent");
  useStateChangeLogger(workshopId, "workshopId", logger);

  const [tab, setTab] = useState(Tabs.SEARCH);
  useEffect(() => {
    logger("location pathname", location.pathname);
    if (location.pathname.endsWith(Tabs.CREATE)) {
      setTab(Tabs.CREATE);
    } else if (location.pathname.endsWith(Tabs.FAVORITES)) {
      setTab(Tabs.FAVORITES);
    } else {
      setTab(Tabs.SEARCH);
    }
  }, [location.pathname, hasWorkshopContext, logger]);

  const createTabsRoute = useCallback(
    (tab: Tabs) => {
      logger("createTabsRoute workshopId=%s", workshopId);
      return routeLibraryTab(tab, { workshopId });
    },
    [workshopId, logger],
  );

  return (
    <>
      <Switch>
        <Redirect
          from={`${path}/`}
          to={`${path}/${Tabs.SEARCH}${location.search}`}
          exact
        ></Redirect>
        <Route path={`${path}/${Tabs.SEARCH}`} exact>
          <SearchElementTabComponent
            workshopId={workshopId}
          ></SearchElementTabComponent>
        </Route>
        <Route path={`${path}/${Tabs.FAVORITES}`} exact>
          <IonContent>
            <FavoriteElementsTabComponent
              workshopId={workshopId}
            ></FavoriteElementsTabComponent>
          </IonContent>
        </Route>
        <Route path={`${path}/${Tabs.CREATE}`} exact>
          <IonContent>
            <CustomElementsTabComponent
              workshopId={workshopId}
            ></CustomElementsTabComponent>
          </IonContent>
        </Route>
      </Switch>
      <IonFooter className="ion-hide-lg-up">
        <IonToolbar>
          <IonSegment value={tab}>
            <IonSegmentButton
              value={Tabs.SEARCH}
              onClick={() => history.replace(createTabsRoute(Tabs.SEARCH))}
            >
              <IonIcon icon={search}></IonIcon>
              <IonLabel>Explore</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.FAVORITES}
              onClick={() => history.replace(createTabsRoute(Tabs.FAVORITES))}
            >
              <IonIcon icon={star}></IonIcon>
              <IonLabel>Favorites</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton
              value={Tabs.CREATE}
              onClick={() => history.replace(createTabsRoute(Tabs.CREATE))}
            >
              <IonIcon icon={brush}></IonIcon>
              <IonLabel>My Library</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonFooter>
    </>
  );
};
