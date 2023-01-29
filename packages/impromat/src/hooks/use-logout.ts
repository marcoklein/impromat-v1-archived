import { useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { environment } from "../environment";
import { useImpromatRxDb } from "./use-impromat-rx-db";
import { useIsLoggedIn } from "./use-is-logged-in";
import { useLogger } from "./use-logger";

const backendUrl = `${environment.API_URL}/graphql`;

export function useLogout() {
  const [presentIonLoading, dismissIonLoading] = useIonLoading();
  const [displayToast] = useIonToast();
  const database = useImpromatRxDb();
  const logger = useLogger("useLogout");
  const [presentAlert] = useIonAlert();
  const isLoggedIn = useIsLoggedIn();

  const startLogout = async () => {
    try {
      presentIonLoading("Logging out...");
      // TODO refactor REACT_APP_AUTO_LOGIN functionality into a separate hook
      if (!process.env.REACT_APP_AUTO_LOGIN) {
        await fetch(backendUrl, {
          method: "POST",
          body: JSON.stringify({
            query: /* GraphQL */ `
              mutation {
                logout
              }
            `,
          }),
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          credentials: "include",
        });
      } else {
        console.warn("REACT_APP_AUTO_LOGIN: Skipping logout request");
      }
      await database.remove();
      await database.destroy();
      logger("Cleared database");
      // reloading at this point is very important to avoid synchronization with the
      // backend database which could potentially sync the deleted database
      window.stop();
      window.location.reload();
    } catch (e) {
      console.warn(e);
      displayToast(
        "You can only log out with an active internet connection.",
        2000,
      );
    }
    dismissIonLoading();
  };

  const triggerLogout = async (params?: { force: boolean }) => {
    if (!isLoggedIn) {
      logger("Will not log out because user is not logged in");
      return;
    }
    if (params?.force) {
      logger("Forced logout (no confirmation dialog)");
      startLogout();
      return;
    }
    presentAlert({
      header: "Logout",
      message:
        "Are you sure you want to log out? All data on this device will be deleted.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Logout",
          role: "confirm",
          handler: () => {
            startLogout();
          },
        },
      ],
    });
  };

  return { triggerLogout };
}
