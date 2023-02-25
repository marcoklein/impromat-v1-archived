import { useIonAlert, useIonLoading, useIonToast } from "@ionic/react";
import { useMutation } from "urql";
import { environment } from "../environment";
import { graphql } from "../graphql-client";
import { useIsLoggedIn } from "./use-is-logged-in";
import { useLogger } from "./use-logger";

const backendUrl = `${environment.API_URL}/graphql`;

export function useLogout() {
  const [presentIonLoading, dismissIonLoading] = useIonLoading();
  const [displayToast] = useIonToast();
  const logger = useLogger("useLogout");
  const [presentAlert] = useIonAlert();
  const { isLoggedIn, retriggerLogInQuery } = useIsLoggedIn();

  const [, logoutMutation] = useMutation(
    graphql(`
      mutation LogoutMutation {
        logout
      }
    `),
  );

  const startLogout = async () => {
    presentIonLoading("Logging out...");
    const result = await logoutMutation({});
    if (result.error?.networkError) {
      displayToast(
        "An active internet connection is required for logout.",
        2000,
      );
    }
    retriggerLogInQuery();
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
